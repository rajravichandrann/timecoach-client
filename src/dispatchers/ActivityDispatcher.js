/* eslint-disable no-unused-vars */
/* eslint-disable no-template-curly-in-string */
import axios from "axios";

const getActivitiesPerStudent = student_id => {
  return new Promise((resolve, reject) => {
    console.log("in getActivitiesPerStudent");

    const getActivitiesPerStudentDis = axios.get(
      `https://ku7v422rcd.execute-api.us-west-2.amazonaws.com/dev/activities/student/${student_id}`
    );

    if (getActivitiesPerStudentDis) {
      resolve(getActivitiesPerStudentDis);
    } else {
      reject(
        `There are no activities created by this student. Student needs to create activities`
      );
    }
  });
};

const createActivity = activity => {
  return new Promise((resolve, reject) => {
    console.log("in createActivity");

    //POST rest call to Activity-create
    const createNewActivity = axios.post(
      `https://ku7v422rcd.execute-api.us-west-2.amazonaws.com/dev/activities/create`,
      activity
    );

    if (createNewActivity) {
      resolve(createNewActivity);
    } else {
      reject(Error(`New Activity creation error`));
    }
  });
};

const deleteActivity = (activities_id, student_id) => {
  return new Promise((resolve, reject) => {
    console.log("in deleteActivity");

    const deleteActivity = axios.delete(
      `https://ku7v422rcd.execute-api.us-west-2.amazonaws.com/dev/activities/${activities_id}/student/${student_id}`
    );

    if (deleteActivity) {
      resolve(deleteActivity);
    } else {
      reject(Error(`Activity for student deletion error`));
    }
  });
};

const getAllActivities = () => {
  return new Promise((resolve, reject) => {
    console.log("in getAllActivities");

    const getActivities = axios.post(
      `https://ku7v422rcd.execute-api.us-west-2.amazonaws.com/dev/activities/getAll`
    );

    if (getActivities) {
      resolve(getActivities);
    } else {
      reject(Error(`There are no activities in our database`));
    }
  });
};

const ActivityDispatcher = {
  createActivity: createActivity,
  getActivitiesPerStudent: getActivitiesPerStudent,
  getAllActivities: getAllActivities,
  deleteActivity: deleteActivity
};

export default ActivityDispatcher;
