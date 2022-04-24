import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { SketchPicker } from 'react-color';

function AddSubjectModal({isModalShown, handleSubmit, handleModalDismiss}){
    const [validated, setValidated] = useState(false);
    const [subjectColor, setSubjectColor] = useState('#658877');
    const [courseID, setcourseID] = useState('');
    const [courseName, setcourseName] = useState('');

    const handleInternalSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        setValidated(true);
        if (form.checkValidity() === false) {
          return false;
        }
        handleSubmit({
          courseID,
          courseName,
          subjectColor
        });
    }

    return(
        <Modal show={isModalShown} onHide={handleModalDismiss}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleInternalSubmit} noValidate validated={validated}>

            <Form.Group className="mb-3" controlId="formSubjectId">
              <Form.Label>Course ID</Form.Label>
              <Form.Control onChange={(evt)=>{setcourseID(evt.target.value)}} required type="text" placeholder="CMPSC132" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSubjectName">
              <Form.Label>Course Name</Form.Label>
              <Form.Control onChange={(evt)=>{setcourseName(evt.target.value)}} required type="text" placeholder="Computer Science 132" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSubjectColor">
              <Form.Label>Course Color</Form.Label>
              <SketchPicker color={subjectColor} onChange={(color)=>{setSubjectColor(color.hex)}}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSubjectSubmit">
              <Button type="submit" variant="primary">Add Course</Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalDismiss}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default AddSubjectModal;