import React, { } from 'react';
import moment from 'moment';
import { Button } from 'react-bootstrap';
import { RatingView } from 'react-simple-star-rating'

function AssignmentItem({data, handleStartWorking, handleStopWorking, handleRemoveAssignment}){


    const handleInternalStart = ()=>{
        handleStartWorking(data.id)
    }

    const handleInternalEnd = ()=>{
        handleStopWorking(data.id)
    }

    const handleInternalRemove = ()=>{
        handleRemoveAssignment(data.id)
    }

    return(
        <p>
            Assignment {data.isWorkDone ? 'is' : 'is not'} finished. <br />
            Subject: {data.course_id} <br />
            Assignment Type: {data.type.toUpperCase()} <br />
            Assignment Description: {data.description} <br />
            Time Estimate Needed: {data.time_needed} minutes. <br />
            Due: {moment(data.due_date).fromNow()}, on {moment(data.due_date).format('L')} <br />
            {
                data.isWorkStarted ? <span>
                                Start Time: {moment(data.started_on).fromNow()}, on {moment(data.started_on).format('lll')} <br />
                                {
                                    !data.isWorkDone ? <Button variant="info" onClick={handleInternalEnd}>Done!</Button> : null
                                }
                </span> : <Button variant="success" onClick={handleInternalStart}>Start Working!</Button>
            }
            {
                data.isWorkDone ? <span>
                                End Time: {moment(data.ended_on).fromNow()}, on {moment(data.ended_on).format('lll')} <br />
                                Time Used on this assignment: {moment.utc(moment(data.ended_on).diff(moment(data.started_on))).format("HH:mm:ss")} <br />
                                Assignment satisfaction rate: <RatingView ratingValue={data.satification_rate} /* RatingView Props */ />
                </span> : null
            }
            <br/>
            <Button variant="danger" onClick={handleInternalRemove}>Remove</Button>
        </p>
    );
}

export default AssignmentItem;
