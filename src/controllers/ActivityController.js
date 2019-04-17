import ActivityDispatcher from "../dispatchers/ActivityDispatcher";

async function validateCreateActivity(activity) {
  let checkCreateActivity = false;
  if (activity) {
    const createActivityDis = await ActivityDispatcher.createActivity(activity);
    console.log(createActivityDis.data.activities_id);

    if (createActivityDis.data.activities_id) {
      checkCreateActivity = true;
    }
  }
  return checkCreateActivity;
}

const ActivityController = {
  validateCreateActivity: validateCreateActivity
};

export default ActivityController;
