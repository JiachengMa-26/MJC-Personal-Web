import React, { useState } from 'react';
import { Modal, Form, Button, ButtonGroup } from 'react-bootstrap';
import { Rating } from 'react-simple-star-rating'

function SatisfactionModal({isModalShown, handleSubmit, id}){
    const [validated, setValidated] = useState(false);
    const [rating, setRating] = useState(5);
    
    const handleInternalSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        setValidated(true);
        if (form.checkValidity() === false) {
          return false;
        }
        handleSubmit({
            id,
            rating
        });
    }

    const handleRating = (rate) => {
        setRating(rate)
      }

    return (
        <Modal show={isModalShown}>
        <Modal.Header>
          <Modal.Title>Rate Your Work!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleInternalSubmit} validated={validated} noValidate>

            <Form.Group className="mb-3" controlId="formSubjectId">
              <Form.Label>Rate your work!</Form.Label>
              <Rating onClick={handleRating} ratingValue={rating}/>
            </Form.Group>


            <Form.Group className="mb-3" controlId="formSubjectSubmit">
                <ButtonGroup aria-label="Basic example">
                    <Button type="submit" variant="info">Rate &amp; Done!</Button>
                    <Button type="submit" variant="primary">No rating, I'm Done!</Button>
                </ButtonGroup>
            </Form.Group>

          </Form>
        </Modal.Body>
      </Modal>
    );
}

export default SatisfactionModal;