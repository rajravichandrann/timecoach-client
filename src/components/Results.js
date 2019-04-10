import React from 'react';
import {Chart} from 'react-google-charts';

  const MsPerDay = 1000 * 60 * 60 * 24;
  const Results = () => {
    let estimates = ResultTestClass.getEstimates();
    let actuals = ResultTestClass.getActivities();
    let chartData = [];
    chartData.push([`activity`, `Estimated`, `Actual`]);
    for(const est of estimates){
      chartData.push(getInnerArray(est.activity_id, estimates, actuals));
    }
    return (
      <div style={{display: 'flex', maxWidth: 900}}>
        <Chart
          width={'500px'}
          height={'300px'}
          chartType="BarChart"
          loader={<div>Loading Chart</div>}
          data={chartData}
          options={{
            title: 'Estimated hours verses Actual hours per Activity',
            chartArea: {width: '50%'},
            hAxis: {
              title: 'Minutes',
              minValue: 0,
            },
            vAxis: {
              title: 'Activity',
            },
          }}
          // For tests
          rootProps={{'data-testid': '1'}}
        />
      </div>
    );
  };

  /*
      Assumptions:
      1. There is always one and only one estimate per activity_id.
      2. There
   */
  const getInnerArray = function(activityId, estimates, activities){
  //  let innerArray = [];
    let activity;
    let estimate = 0;
    let actual = 0;
//    let hit = 0;
    for(const est of estimates){
      if(est.activity_id === activityId){
        activity = est.activity_name;
        estimate = est.estimated_time;
        break;
      }
    }
    for(const act of activities){
      if(act.activity_id === activityId) {
        actual += act.logged_time;
      }
    }
    return [activity, estimate, actual / 7];
  };

  export default Results;

const HourMinutes = 60;
const MsPerHour = 1000 * 60 * 60;
const actCount = 6;
const estimateDay = new Date("April 09, 2019 00:00:00").getTime();

class ResultTestClass {

  static getActivities(){
    let activitiesArray = [];
//    let now = new Date().getTime();
    for(let activityId = 0; activityId < actCount; activityId++)
    {
      if(activityId === 2)
        continue;
      for(let day=0; day < 7; day++)
      {
        let hours = (activityId + 1) + 5;
        activitiesArray.push({
          estimated_date: estimateDay, //"2019-04-0"+day,
          activity_name: "activity-"+activityId,
          student_email: "time.coach@wgu.edu",
          updatedAt: estimateDay + (MsPerDay * (day + 1)) + (MsPerHour * (day + 1)), //"2019-04-09 18:13:18",
          logged_time: (HourMinutes * hours) + ((day +1) * 10),
          student_id: "555",
          activities_id: "333",
          activity_id: activityId
        });
      }
    }
    return activitiesArray;
  }

  static getEstimates(){
    let estimatesArray = [];
//    let now = new Date().getTime();
    for(let activityId = 0; activityId < actCount; activityId++)
    {
      let hours = (activityId +1) + 5;
      estimatesArray.push({
            estimated_date: estimateDay, //"2019-02-0"+day,
            activity_name: "activity-"+activityId,
            estimate_id: "111",
            student_email: "time.coach@wgu.edu",
            updatedAt: estimateDay + (MsPerHour * (activityId +1)), //"2019-04-08 17:48:48",
            student_id: "555",
            estimated_time: HourMinutes * hours,
            activity_id: activityId
          });
      }
      return estimatesArray;
    }
}

