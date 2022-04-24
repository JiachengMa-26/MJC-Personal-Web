import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import TimePicker from 'react-time-picker';

function PersonalSettingModal({isModalShown, handleSubmit, handleModalDismiss, userData={
  studyDuration:2,
  freeAfter:'17:00'
}}){
    const [validated, setValidated] = useState(false);

    const [studyDuration, setStudyDuration] = useState(userData.studyDuration);
    const [freeAfter, setfreeAfter] = useState(userData.freeAfter)

    const handleInternalSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        setValidated(true);
        if (form.checkValidity() === false) {
          return false;
        }
        handleSubmit({
          studyDuration:parseInt(studyDuration),
          freeAfter
        });
    }

    return (
        <Modal show={isModalShown} onHide={handleModalDismiss}>
        <Modal.Header closeButton>
          <Modal.Title>Personal Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleInternalSubmit} validated={validated} noValidate>

            <Form.Group className="mb-3" controlId="formSubjectId">
              <Form.Label>Perferd Study Duration (Hours)</Form.Label>
              <Form.Control type="number" required defaultValue={studyDuration} min='1' max='12' onChange={(evt)=>{
                setStudyDuration(evt.target.value)
              }} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSubjectId">
              <Form.Label>Available To Work After: </Form.Label>
              <TimePicker
                onChange={setfreeAfter}
                value={freeAfter}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSubjectSubmit">
              <Button type="submit" variant="primary">Save</Button>
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

export default PersonalSettingModal;