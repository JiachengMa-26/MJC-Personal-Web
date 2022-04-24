import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, ListGroup, ButtonGroup } from 'react-bootstrap';
import Calendar from 'react-calendar';
import moment from 'moment';
import Swal from 'sweetalert2';
import AddSubjectModal from './components/AddSubjectModal';
import PersonalSettingsModal from './components/PersonalSettingsModal';
import AddAssignmentModal from './components/AddAssignmentModal';
import SatisfactionModal from './components/SatisfactionModal';
import AssignmentItem from './components/AssignmentItem';
import CourseItem from './components/CourseItem';
import { nanoid } from 'nanoid';


function App({db}) {

  const [pickedDate, setPickedDate] = useState(moment().toDate());
  const [showAddAssignment, setShowAssignment] = useState(false);
  const [showAddSubject, setShowAddSubject] = useState(false);
  const [showPersonalSetting, setShowPersonalSetting] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);

  const [dues, setDues] = useState([]);
  const [finishToday, setFinishToday] = useState([]);
  const [availableSubjects, setAvailableSubjects] = useState([]);

  const [ratingWorkID, setRatingWorkID] = useState('');

  const handleCloseAssignment = () => setShowAssignment(false);
  const handleShowAssignment = () => {
    fetchAvailableSubjects();
    setShowAssignment(true)
  };
  const handleCloseAddSubject = () => setShowAddSubject(false);
  const handleClosePersonalSetting = () => setShowPersonalSetting(false);

  const handleShowAddSubject = () => setShowAddSubject(true);
  const handleShowPersonalSetting = () => setShowPersonalSetting(true);

  const fetchAvailableSubjects = async() =>{
    try{
      const result = await db.courses.toArray();
      setAvailableSubjects(result);
    }catch(e){
      console.error(e);
      alert('Unable to fetch available subjects.')
    }
  }

  const getAssignmentsByDate = async(date)=>{
    try{
      const resultDue = await db.assignments.where({
        'due_date': moment(date).format('L')
      }).toArray();
      const resultFinish = await db.assignments.where({
        'finish_date': moment(date).format('L')
      }).toArray();
      setDues(resultDue);
      setFinishToday(resultFinish);
    }catch(e){
      console.error(e);
      alert('Unable to fetch Due Dates');
    }
  }
  

  const handleAssignmentSubmit = (data) =>{
    db.assignments.put({
      course_id: data.courseID,
      id: nanoid(),
      due_date: moment(data.dueDate).format('L'),
      finish_date: moment(data.finishDateTime).format('L'),
      finish_datetime: data.finishDateTime,
      type: data.assignmentType,
      time_needed: data.assignmentTime,
      name: data.assignmentName,
      description: data.assignmentDescription,
      satification_rate: 0,
      started_on: moment().toDate(),
      ended_on: moment().toDate(),
      isWorkDone: false,
      isWorkStarted: false
    });
    handleCloseAssignment();
    Swal.fire({
      title: 'Assignment Added!',
      text: `${data.courseID}'s ${data.assignmentType} has added! Please finish them early or on time!`,
      icon: 'success',
      confirmButtonText: 'OK!'
    });
  };

  const handleSubjectSubmit = (data) =>{
    db.courses.put({
      id:data.courseID,
      name:data.courseName,
      color: data.subjectColor
    });
    fetchAvailableSubjects();
    handleCloseAddSubject();
    Swal.fire({
      title: 'Course Added!',
      text: data.courseName + ' has added !',
      icon: 'success',
      confirmButtonText: 'Nice!'
    })
  };

  const handlePersonalSettingsSubmit = (data) => {
    console.log(data);
  };

  const handleRemoveCourse = (courseID) =>{
    Swal.fire({
      title: 'Course will be removed!',
      text: courseID + ' and its assignments has removed !',
      icon: 'warning',
      showCancelButton: true,
    }).then((result)=>{
      if (result.isConfirmed) {
        db.courses.where('id').equals(courseID).delete();
        db.assignments.where('course_id').equals(courseID).delete();
        window.location.reload();
      }
    })
  };

  const handleStartWorking = (id) =>{
    db.assignments.where('id').equals(id).modify({
      started_on: moment().toDate().toISOString(),
      isWorkStarted:true
    });
    getAssignmentsByDate(moment(pickedDate))
  };

  const handleStopWorking = (id) =>{
    setRatingWorkID(id);
    setShowRatingModal(true);
  }

  const handleRemoveAssignment = (id) =>{
    Swal.fire({
      title: 'Assignment will be removed!',
      text:  'This assignment history will be gone forever!',
      icon: 'warning',
      showCancelButton: true,
    }).then((result)=>{
      if (result.isConfirmed) {
        db.assignments.where('id').equals(id).delete();
        getAssignmentsByDate(moment(pickedDate))
      }
    })
  }

  const handleRatingAndDoneSubmit = (data) => {
    db.assignments.where('id').equals(data.id).modify({
      ended_on: moment().toDate().toISOString(),
      satification_rate:data.rating,
      isWorkDone:true
    });
    getAssignmentsByDate(moment(pickedDate));
    setShowRatingModal(false);
  }

  useEffect(()=>{
    getAssignmentsByDate(moment());
    fetchAvailableSubjects();
  },[]);

  useEffect(()=>{
    getAssignmentsByDate(moment(pickedDate))
  },[pickedDate])

  return (
  <Container>
    <Row>
      <Col md='6'>
        <div>
          <ButtonGroup aria-label="Basic example">
            <Button variant="primary" onClick={handleShowAssignment}>Add Assignment</Button>
            <Button variant="primary" onClick={handleShowAddSubject}>Add Subject</Button>
            <Button variant="primary" onClick={handleShowPersonalSetting}>Personal Settings</Button>
          </ButtonGroup>
          <Calendar
            onChange={setPickedDate}
            value={pickedDate}
          />
          <div>
            {
              availableSubjects.map((elm,idx)=>{
                return (
                  <CourseItem data={elm} key={idx} removeCourse={handleRemoveCourse}/>
                )
              })
            }
          </div>
        </div>
      </Col>
      <Col md='6'>
        <h2>Due on {moment(pickedDate).format('L')}</h2>
        <ListGroup>
          <ListGroup.Item>
            {
              dues.length === 0 ? <span>
                No dues today!
              </span> : dues.map((elm,index)=>{
                return(
                  <AssignmentItem data={elm} key={index} />
                )
              })
            }
          </ListGroup.Item>
        </ListGroup>
        <h2>If have time, you should work on</h2>
        <ListGroup>
          <ListGroup.Item>
            {
              finishToday.length === 0 ? <span>
                No need to work on anything! Take a day off!
              </span>:finishToday.map((elm,index)=>{
                return(
                  <AssignmentItem data={elm} key={index}
                    handleStartWorking={handleStartWorking}
                    handleStopWorking={handleStopWorking}
                    handleRemoveAssignment={handleRemoveAssignment}
                     />
                )
              })
            }
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </Row>

    <AddAssignmentModal
          isModalShown={showAddAssignment}
          handleSubmit={handleAssignmentSubmit}
          handleModalDismiss={handleCloseAssignment}
          availableSubjects={availableSubjects}
    />
    
    <AddSubjectModal 
      isModalShown={showAddSubject}
      handleSubmit={handleSubjectSubmit}
      handleModalDismiss={handleCloseAddSubject} />
      
    <PersonalSettingsModal
      isModalShown={showPersonalSetting}
      handleSubmit={handlePersonalSettingsSubmit}
      handleModalDismiss={handleClosePersonalSetting} />

    <SatisfactionModal 
      isModalShown={showRatingModal}
      id={ratingWorkID}
      handleSubmit={handleRatingAndDoneSubmit}
    />

  </Container>
  );
}

export default App;
