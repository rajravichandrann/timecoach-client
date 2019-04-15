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

const EstimateController = {
  validateCreateEstimate: validateCreateEstimate
};

export default EstimateController;
