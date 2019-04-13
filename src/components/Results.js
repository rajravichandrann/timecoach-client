import React from "react";
import { Chart } from "react-google-charts";
import CircularProgress from '@material-ui/core/CircularProgress';

const devMode = true;
let studentInfo = null;

class Results extends React.Component {
  constructor(props) {
    super(props);
    studentInfo = props.student;
    this.state = {
      estimateList: null,
      activityList: null,
      loading: true
    };
  }

  render() {
    if (this.state.loading) {
      return <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
      }}>
        <CircularProgress/>
      </div>
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
    try {
      let estPromise = null; // replace this null with actual dispatcher call
      let actPromise = null; // replace this null with actual dispatcher call
      if(devMode) {
        estPromise = ResultTestClass.getEstimatesPromise(studentInfo);
        actPromise = ResultTestClass.getActivitiesPromise(studentInfo);
      }
      const [estList, actList] = await Promise.all([estPromise, actPromise]);
      const localState = {
        estimateList: estList,
        activityList: actList,
        loading: false
      };
      this.setState(localState);
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
    console.debug(`getEstimatePromise for student id: ${student.lms_id} email: ${student.email} gradeid: ${student.gradeid}`);
    return new Promise(resolve => {
      setTimeout(() => resolve(ResultTestClass.getEstimates()), 2000);
    });
  }

  static getActivitiesPromise(student) {
    console.debug(`getActivitiesPromise for student id: ${student.lms_id} email: ${student.email} gradeid: ${student.gradeid}`);
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
