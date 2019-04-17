import EstimateDispatcher from "../dispatchers/EstimateDispatcher";

async function validateCreateEstimate(estimate) {
  let checkCreateEstimate = false;
  if (estimate) {
    const createEstimateDis = await EstimateDispatcher.createEstimate(estimate);
    console.log(createEstimateDis.data.estimate_id);

    if (createEstimateDis.data.estimate_id) {
      checkCreateEstimate = true;
    }
  }
  return checkCreateEstimate;
}

async function getEstimatesPerStudent(student_id) {
  if (student_id) {
    var getEstimatesPerStudentDis = await EstimateDispatcher.getEstimatesPerStudent(
      student_id
    );
    console.log(getEstimatesPerStudentDis.data);
  }
  return getEstimatesPerStudentDis;
}

const EstimateController = {
  validateCreateEstimate: validateCreateEstimate,
  getEstimatesPerStudent: getEstimatesPerStudent
};

export default EstimateController;
