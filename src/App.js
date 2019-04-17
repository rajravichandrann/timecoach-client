import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Instructions from "./components/Instructions";
import Estimates from "./components/Estimates";
import Activities from "./components/Activities";
import Results from "./components/Results";
import Errors from "./components/Errors";
import NavigationBar from "./components/NavigationBar";

import queryString from "query-string";
import Cookies from "universal-cookie";
import StudentController from "./controllers/StudentController";
import StudentDispatcher from "./dispatchers/StudentDispatcher";

import "./App.css";

var studentInfo = {};

class App extends Component {
  constructor(props) {
    super(props);
    const cookies = new Cookies();
    const params = queryString.parse(window.location.search);
    console.log(params);
    if (Object.entries(params).length > 0) {
      cookies.set("email", params.email);
      cookies.set("lms_id", params.id);
      cookies.set("gradeid", params.gradeid);
      studentInfo = params;
    } else {
      studentInfo = {
        email: cookies.get("email"),
        lms_id: cookies.get("lms_id"),
        gradeid: cookies.get("gradeid"),
        student_id: cookies.get("student_id")
      };
    }

    this.state = {
      displayEstimates: false,
      displayInstructions: false,
      displayActivities: false,
      displayResults: false,
      student_info: studentInfo
    };

    this.child = React.createRef();
  }

  async componentDidMount() {
    console.log(studentInfo.email);

    const cookies = new Cookies();

    let validateStudent = await StudentDispatcher.getStudent(studentInfo.email);

    if (validateStudent.data.Count < 1) {
      console.log("Student is here for the first time.");
      let validateCreateStudent = await StudentController.validateCreateStudent(
        studentInfo
      );

      cookies.set("student_id", studentInfo.student_id);

      if (validateCreateStudent) {
        this.setState({
          displayInstructions: true,
          student_info: studentInfo
        });
      }
    } else {
      console.log("Student was here!!!");
      studentInfo.student_id = validateStudent.data.Items[0].student_id;
      cookies.set("student_id", studentInfo.student_id);
      this.setState({
        displayEstimates: true
      });
      this.setState({
        displayInstructions: false
      });
      this.setState({
        student_info: studentInfo
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <NavigationBar />
        <Router>
          <Switch>
            <Route
              path="/"
              exact
              render={props => (
                <Estimates {...props} student={this.state.student_info} />
              )}
            />
            <Route
              path="/activities"
              ref={this.child}
              render={props => (
                <Activities {...props} student={this.state.student_info} />
              )}
            />
            <Route
              path="/results"
              render={props => (
                <Results {...props} student={this.state.student_info} />
              )}
            />
            <Route component={Errors} />
          </Switch>
          {this.state.displayInstructions ? <Instructions /> : null}
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
