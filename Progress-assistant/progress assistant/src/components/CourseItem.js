import React, { } from 'react';
import { Button } from 'react-bootstrap';
function CourseItem({data, removeCourse}){
    return(
        <p>
            Course: {data.name} <span style={{backgroundColor: data.color}}>{data.id}</span>
            <Button variant="danger" onClick={()=>{removeCourse(data.id)}}>Remove Course</Button>
        </p>
    );
}

export default CourseItem;
