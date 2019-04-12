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
        gradeid: cookies.get("gradeid")
      };
    }

    this.state = {
      displayEstimates: false,
      displayInstructions: false,
      displayActivities: false,
      displayResults: false
    };

    this.child = React.createRef();
  }

  async componentDidMount() {
    console.log(studentInfo.email);
    let validateStudent = await StudentDispatcher.getStudent(studentInfo.email);

    if (validateStudent.data.Count < 1) {
      console.log("Student is here for the first time.");
      let validateCreateStudent = await StudentController.validateCreateStudent(
        studentInfo
      );
      if (validateCreateStudent) {
        this.setState({
          displayInstructions: true
        });
      }
    } else {
      console.log("Student was here!!!");
      this.setState({
        displayEstimates: true
      });
      this.setState({
        displayInstructions: false
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
              render={props => <Estimates {...props} student={studentInfo} />}
            />
            <Route
              path="/activities"
              ref={this.child}
              render={props => <Activities {...props} student={studentInfo} />}
            />
            <Route
              path="/results"
              render={props => <Results {...props} student={studentInfo} />}
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
