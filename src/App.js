import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Estimates from './components/Estimates';
import Activities from './components/Activities';
import Results from './components/Results';
import Errors from './components/Errors';
import Layout from './components/Layout';
import NavigationBar from './components/NavigationBar';


class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavigationBar />
        <Layout>
          <Router>
            <Switch>
              <Route path="/" component={Estimates} exact />
              <Route path="/activities" component={Activities} />
              <Route path="/results" component={Results} />
              <Route component={Errors} />
            </Switch>
          </Router>
        </Layout>
      </React.Fragment>
    );
  }
}

export default App;
