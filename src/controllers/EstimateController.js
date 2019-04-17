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
  }
  return getEstimatesPerStudentDis;
}

async function deleteEstimate(activity_name, student_id) {
  if (activity_name !== "" && student_id !== "") {
    var deleteEstimateDis = await EstimateDispatcher.deleteEstimate(
      activity_name,
      student_id
    );
    console.log(deleteEstimateDis);
  }
}

const EstimateController = {
  validateCreateEstimate: validateCreateEstimate,
  getEstimatesPerStudent: getEstimatesPerStudent,
  deleteEstimate: deleteEstimate
};

export default EstimateController;
