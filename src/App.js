import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Instructions from "./components/Instructions";
import Estimates from "./components/Estimates";
import Activities from "./components/Activities";
import Results from "./components/Results";
import Errors from "./components/Errors";
import NavigationBar from "./components/NavigationBar";

import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavigationBar />
        <Router>
          <Switch>
            <Route path="/" component={Instructions} exact />
            <Route path="/estimates" component={Estimates} />
            <Route path="/activities" component={Activities} />
            <Route path="/results" component={Results} />
            <Route component={Errors} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
