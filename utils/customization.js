// takes in customization options and returns courses that follow options
// current options are: no classes before 10 AM, no classes on Friday
const customizeCourses = (courses, options) => {
  const newCourses = [];
  courses.forEach(course => {
    const newCourse = [];
    course.forEach(c => {
      if (shouldAddClass(options, c)) {
        newCourse.push(c);
      }
    });
    checkIfCourseIsValid(newCourse);
    newCourses.push(newCourse);
  });
  return newCourses;
};

const shouldAddClass = (options, c) => {
  const { noEarlyClasses, noFridayClasses } = options;
  if (noEarlyClasses === 'true') {
    if (c.start < 10) {
      return false;
    }
  }
  if (noFridayClasses === 'true') {
    if (c.days.includes('F')) {
      return false;
    }
  }
  return true;
};

const checkIfCourseIsValid = course => {
  if (course.length === 0) {
    throw new Error('Customization Fails');
  }
};

module.exports = customizeCourses;
