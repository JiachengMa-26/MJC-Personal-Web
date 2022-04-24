import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Dexie from 'dexie';

const db = new Dexie('pa_database');
db.version(1).stores({
  courses: 'id',
  assignments: 'id,course_id,due_date,finish_date,assignment_type'
});

ReactDOM.render(
  <React.StrictMode>
    <App db={db}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
