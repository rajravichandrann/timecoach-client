import React from "react";
import { Chart } from "react-google-charts";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import EstimateDispatcher from "../dispatchers/EstimateDispatcher";
import ActivityDispatcher from "../dispatchers/ActivityDispatcher";
//import {AxiosPromise, AxiosRequestConfig} from "axios/index";

const devMode = true;
//let studentInfo = null;

class Results extends React.Component {
  constructor(props) {
    super(props);
    //    studentInfo = props.student;
    this.state = {
      estimateList: null,
      activityList: null,
      loading: true
    };
  }

  render() {
    if (this.state.loading) {
      return (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)"
          }}
        >
          <CircularProgress />
        </div>
      );
    }
    let chartData = [];
    chartData.push([`activity`, `Estimated`, `Actual`]);
    for (const est of this.state.estimateList) {
      chartData.push(
        this.getInnerArray(
          est.activity_id,
          this.state.estimateList,
          this.state.activityList
        )
      );
    }
    return (
      <div style={{ display: "flex", maxWidth: "90%" }}>
        {/* 90%, 70%, 50%*/}
        <Chart
          width={"100%"} //500px
          // height={'60%'}  // 300px
          chartType="BarChart"
          //
          //          loader={<CircularProgress />}
          data={chartData}
          options={{
            title: "Estimated hours verses Actual hours per Activity",
            chartArea: { width: "50%" },
            hAxis: {
              title: "Minutes",
              minValue: 0
            },
            vAxis: {
              title: "Activity"
            }
          }}
          // For tests
          rootProps={{ "data-testid": "1" }}
        />
      </div>
    );
  }

  async componentDidMount() {
    console.log(this.props);
    console.log(this.props.student);
    console.log(`student_id:${this.props.student.student_id}`);
    try {
      let estPromise = await EstimateDispatcher.getEstimatesPerStudent(
        this.props.student.student_id
      );
      let actPromise = await ActivityDispatcher.getActivitiesPerStudent(
        this.props.student.student_id
      );
      if (devMode) {
        estPromise = ResultTestClass.getEstimatesPromise(this.props.student);
        actPromise = ResultTestClass.getActivitiesPromise(this.props.student);
      }
      const [estList, actList] = await Promise.all([estPromise, actPromise]);
      const localState = {
        estimateList: estList,
        activityList: actList,
        loading: false
      };
      this.setState(localState);
      if (actList.length > 2) {
        let url = `https://https://qlti.cals-learn.org/grade/passback`;
        if (devMode)
          url = `https://https://qlti.devcals-learn.org/grade/passback`;
        // fire callback
        axios
          .post(url, {
            gradeid: this.props.student.gradeid,
            grade: "1.0"
            //            callbackurl: environment.qlti.callbackUrl
          })
          .then(function(response) {
            // handle success
            console.log(`success response:`);
            console.log(response);
          })
          .catch(function(error) {
            // if (err.error instanceof Error) {
            //   // A client-side or network error occurred. Handle it accordingly.
            //   console.error('An error occurred:', err.error.message);
            // } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            //          console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
            console.log(`failure error:`);
            console.log(error);
            console.error(
              `Backend returned code ${error.status}, body was: ${error.error}`
            );
            // }
          })
          .then(function() {
            // finally
            console.log(`finally hit`);
          });
      }
    } catch (e) {
      console.error(e);
    }
  }

  getInnerArray = function(activityId, estimates, activities) {
    let activity;
    let estimate = 0;
    let actual = 0;
    let hit = 0;
    for (const est of estimates) {
      if (est.activity_id === activityId) {
        activity = est.activity_name;
        estimate = est.estimated_time;
        //        break;  take the last if more than one
      }
    }
    for (const act of activities) {
      if (act.activity_id === activityId) {
        actual += act.logged_time;
        ++hit;
      }
    }
    return [activity, estimate, actual / hit];
  };
}
export default Results;

/* ****************************************************************************
 * Everything below here is development/initial testing code and could be removed
 *****************************************************************************/
const MsPerDay = 1000 * 60 * 60 * 24;
const HourMinutes = 60;
const MsPerHour = 1000 * 60 * 60;
const actCount = 6;
const estimateDay = new Date("April 09, 2019 00:00:00").getTime();

class ResultTestClass {
  static getEstimatesPromise(student) {
    console.debug(
      `getEstimatePromise for student id: ${student.lms_id} email: ${
        student.email
      } gradeid: ${student.gradeid}`
    );
    return new Promise(resolve => {
      setTimeout(() => resolve(ResultTestClass.getEstimates()), 2000);
    });
  }

  static getActivitiesPromise(student) {
    console.debug(
      `getActivitiesPromise for student id: ${student.lms_id} email: ${
        student.email
      } gradeid: ${student.gradeid}`
    );
    return new Promise(resolve => {
      setTimeout(() => resolve(ResultTestClass.getActivities()), 3000);
    });
  }

  static getActivities() {
    let activitiesArray = [];
    //    let now = new Date().getTime();
    for (let activityId = 0; activityId < actCount; activityId++) {
      if (activityId === 2) continue;
      for (let day = 0; day < 7; day++) {
        let hours = activityId + 1 + 5;
        activitiesArray.push({
          estimated_date: estimateDay, //"2019-04-0"+day,
          activity_name: "activity-" + activityId,
          student_email: "time.coach@wgu.edu",
          updatedAt: estimateDay + MsPerDay * (day + 1) + MsPerHour * (day + 1), //"2019-04-09 18:13:18",
          logged_time: HourMinutes * hours + (day + 1) * 10,
          student_id: "555",
          activities_id: "333",
          activity_id: activityId
        });
      }
    }
    return activitiesArray;
  }

  static getEstimates() {
    let estimatesArray = [];
    //    let now = new Date().getTime();
    for (let activityId = 0; activityId < actCount; activityId++) {
      let hours = activityId + 1 + 5;
      estimatesArray.push({
        estimated_date: estimateDay, //"2019-02-0"+day,
        activity_name: "activity-" + activityId,
        estimate_id: "111",
        student_email: "time.coach@wgu.edu",
        updatedAt: estimateDay + MsPerHour * (activityId + 1), //"2019-04-08 17:48:48",
        student_id: "555",
        estimated_time: HourMinutes * hours,
        activity_id: activityId
      });
    }
    return estimatesArray;
  }
}
