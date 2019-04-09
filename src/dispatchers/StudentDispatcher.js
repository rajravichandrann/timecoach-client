/* eslint-disable no-unused-vars */
/* eslint-disable no-template-curly-in-string */
import axios from 'axios';

const getStudent = (email) => {
    return new Promise((resolve, reject) => {
        console.log('in getStudent');
        
        const getStudentDis = axios.get(`https://ku7v422rcd.execute-api.us-west-2.amazonaws.com/dev/students/get/${email}`);
    
        if(getStudentDis){
            resolve(getStudentDis);
        } else {
            reject(`Student doesn't exist in our database. Student needs to be created`);
        }
    });
}

const createStudent = (student) => {
    return new Promise((resolve, reject) => {
        console.log('in createStudent');

        //POST rest call to student-create
        const createNewStudent = axios.post(`https://ku7v422rcd.execute-api.us-west-2.amazonaws.com/dev/students/create`, student);

        if(createNewStudent){
            resolve(createNewStudent);
        } else {
            reject(Error(`New Student creation error`));
        }
    });
}

const StudentDispatcher = {
    createStudent: createStudent,
    getStudent: getStudent
};

export default StudentDispatcher;