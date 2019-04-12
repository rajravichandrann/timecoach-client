import StudentDispatcher from "../dispatchers/StudentDispatcher";

async function validateCreateStudent(args) {
  let studentCheck = false;

  try {
    const student = {
      student_email: args["email"],
      lms_id: args["id"],
      gradeid: args["gradeid"]
    };

    if (student) {
      //Checking if student already esixts in our database
      const validateStudent = await StudentDispatcher.getStudent(
        student.student_email
      );

      //Check if student returns from our database and if not create a new student
      if (validateStudent.data.Count < 1) {
        console.log(
          `Student doesn't exist in our database. Student needs to be created`
        );

        //Creating a new student if they don't exist in our database
        const createStudent = await StudentDispatcher.createStudent(student);

        //Check if new student has been created successfully
        if (createStudent.data.student_id) {
          console.log(
            `Student has been created with Student_id: `,
            createStudent.data.student_id
          );
          studentCheck = true;
        } else {
          console.error(`Student was not created successfully`);
        }
      } else {
        console.log(`Student exists in our database`);
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    return studentCheck;
  }
}

const StudentController = {
  validateCreateStudent: validateCreateStudent
};

export default StudentController;
