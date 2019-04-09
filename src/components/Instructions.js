import React, { Component } from 'react';
import queryString from 'query-string';
import StudentController from '../controllers/StudentController';


class Instructions extends Component {
    
    componentDidMount() { 

    }
    
    componentWillMount() {
        const params = queryString.parse(window.location.search);
        console.log(params);

        let validateCreateStudent = StudentController.validateCreateStudent(params);
        console.log(validateCreateStudent);
    }

    render() {
        return (
            <div>
                <p>Instructions</p>
            </div>
        );
    }
}

export default Instructions;