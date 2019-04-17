/* eslint-disable no-unused-vars */
/* eslint-disable no-template-curly-in-string */
import axios from "axios";

const getEstimatesPerStudent = student_id => {
  return new Promise((resolve, reject) => {
    console.log("in getEstimatesPerStudent");

    const getEstimatesPerStudentDis = axios.get(
      `https://ku7v422rcd.execute-api.us-west-2.amazonaws.com/dev/estimates/student/${student_id}`
    );

    if (getEstimatesPerStudentDis) {
      resolve(getEstimatesPerStudentDis);
    } else {
      reject(
        `There are no estimates created by this student. Student needs to create estimates`
      );
    }
  });
};

const createEstimate = estimate => {
  return new Promise((resolve, reject) => {
    console.log("in createEstimate");

    const createNewEstimate = axios.post(
      `https://ku7v422rcd.execute-api.us-west-2.amazonaws.com/dev/estimates/create`,
      estimate
    );

    if (createNewEstimate) {
      resolve(createNewEstimate);
    } else {
      reject(Error(`New Estimate creation error`));
    }
  });
};

const deleteEstimate = (activity_name, student_id) => {
  return new Promise((resolve, reject) => {
    console.log("in deleteEstimate");

    const deleteEstimate = axios.delete(
      `https://ku7v422rcd.execute-api.us-west-2.amazonaws.com/dev/estimates/${activity_name}/student/${student_id}`
    );

    if (deleteEstimate) {
      resolve(deleteEstimate);
    } else {
      reject(Error(`Estimate for student deletion error`));
    }
  });
};

const getAllEstimates = () => {
  return new Promise((resolve, reject) => {
    console.log("in getAllEstimates");

    //POST rest call to student-create
    const getEstimates = axios.post(
      `https://ku7v422rcd.execute-api.us-west-2.amazonaws.com/dev/estimates/getAll`
    );

    if (getEstimates) {
      resolve(getEstimates);
    } else {
      reject(Error(`There are no estimates in our database`));
    }
  });
};

const EstimateDispatcher = {
  createEstimate: createEstimate,
  getEstimatesPerStudent: getEstimatesPerStudent,
  getAllEstimates: getAllEstimates,
  deleteEstimate: deleteEstimate
};

export default EstimateDispatcher;
