import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import moment from 'moment';
import TimePicker from 'react-time-picker';

function AddAssignmentModal({isModalShown, handleSubmit, handleModalDismiss, availableSubjects }){

    const [validated, setValidated] = useState(false);
    const [courseID, setCourseID] = useState('');
    const [assignmentName, setAssignmentName] = useState('');
    const [assignmentDescription, setAssignmentDescrpition] = useState('');
    const [assignmentType, setAssignmentType] = useState('hw');
    const [dueDate, setDueDate] = useState(moment().add(3,'days').toDate());
    const [assignmentTime, setAssignmentTime] = useState('');
    const [finishDateTime, setFinishDateTime] = useState(moment().add(1,'days').toDate());

    useEffect(()=>{
        if (availableSubjects.length ===0){
            handleModalDismiss();
            return;
        }
        setCourseID(availableSubjects[0].id)
    },[])

    const handleInternalSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if(courseID === ''){
            alert('No course selected!')
            return false;
        }
        if(assignmentType === ''){
            alert('No work type selected!')
            return false;
        }
        setValidated(true);
        if (form.checkValidity() === false) {
          return false;
        }

        handleSubmit({
            courseID,
            assignmentName,
            assignmentDescription,
            assignmentType,
            dueDate,
            assignmentTime:parseInt(assignmentTime),
            finishDateTime
        });
    }
    return (
        <Modal show={isModalShown} onHide={handleModalDismiss}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleInternalSubmit} noValidate validated={validated}>
            <Form.Group className="mb-3" controlId="formWorkSubject">
              <Form.Label>Course</Form.Label>
              <Form.Select aria-label="Course Select" required value={courseID} onChange={(evt)=>{setCourseID(evt.target.value)}}>
                <option value=''>Select Course</option>
                {
                  availableSubjects.map((elm,i)=>{
                    return(
                      <option key={i} value={elm.id}>{elm.name}({elm.id})</option>
                    )
                  })
                }
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAssignmentName">
              <Form.Label>Assignment Name</Form.Label>
              <Form.Control required type="text" placeholder="HW#1/Quiz#2/Exam#3" onChange={(evt)=>{setAssignmentName(evt.target.value)}} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Assignment Description</Form.Label>
              <Form.Control required as="textarea" placeholder="Exam 1 covers from module 1 - 4" onChange={(evt)=>{setAssignmentDescrpition(evt.target.value)}} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formWorkTypeSelect">
              <Form.Label>Assignment Type</Form.Label>
              <Form.Select aria-label="Work Type Select" defaultValue={assignmentType} required onChange={(evt)=>{setAssignmentType(evt.target.value)}}>
                <option value=''>Select Work Type</option>
                <option value="hw">Homework</option>
                <option value="quiz">Quiz</option>
                <option value="exam">Exam</option>
                <option value="review">Review Seesion</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formTimeNeeded">
              <Form.Label>Assignment Time Needed (Minutes)</Form.Label>
              <Form.Control onChange={(evt)=>{setAssignmentTime(evt.target.value)}} min='1' required type="number" placeholder="Recommend Time: HW 20min Quiz 30min Exam: 50min" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAssignmentDueDate">
              <Form.Label>Due Date</Form.Label>
              <DatePicker selected={dueDate} onChange={(date) => setDueDate(date)} />
            </Form.Group>

            <hr/>
            <p>To get an early start, this assignment should be worked on your next free slot.</p>
            <Form.Group className="mb-3" controlId="formAssignmentDueDate">
              <Form.Label>Next free slot date</Form.Label>
              <DatePicker selected={finishDateTime} onChange={(date) => setFinishDateTime(date)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAssignmentDueDate">
              <Form.Label>On:</Form.Label>
              <TimePicker value={finishDateTime} onChange={(time) => setFinishDateTime(time)} />
            </Form.Group>
            <p></p>
            <hr/>

            <Form.Group className="mb-3" controlId="formAssignmentSubmit">
              <Button type="submit" variant="primary">Add Assignment</Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalDismiss}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
}

export default AddAssignmentModal;