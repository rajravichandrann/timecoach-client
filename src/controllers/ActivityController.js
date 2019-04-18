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

async function getActivitiesPerStudent(student_id) {
  if (student_id) {
    var getActivitiesPerStudentDis = await ActivityDispatcher.getActivitiesPerStudent(
      student_id
    );
  }
  return getActivitiesPerStudentDis;
}

const ActivityController = {
  validateCreateActivity: validateCreateActivity,
  getActivitiesPerStudent: getActivitiesPerStudent
};

export default ActivityController;
