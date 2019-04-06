const axios = require('axios');
const _ = require('lodash');

const getAllCourses = async classes => {
  const courses = [];
  for (let i = 0; i < classes.length; i++) {
    const data = await courseRequest(classes[i]);
    data.forEach(elt => courses.push(elt));
  }
  return courses;
};

// need activity, meetings[0].section_id, dept, number, end_time_24, start_time_24

// activity, course_department, course_number
// meetings: end_time_24, end_hour_24, end_minutes, end_time, meeting_days,
// meetings(cont): section_id, section_id_normalized, start_hour_24, start_minutes,
// meetings(cont): start_time, start_time_24

const courseRequest = async course => {
  const data = await axios.get(
    `https://api.pennlabs.org/registrar/search?q=${course}`
  );
  const { courses } = data.data;
  const lec = [];
  const rec = [];
  courses.forEach(elt => {
    course = _.pick(elt, [
      'activity',
      'course_department',
      'course_number',
      'meetings',
      'is_cancelled'
    ]);
    if (!course.is_cancelled) {
      course.activity === 'LEC' ? lec.push(course) : rec.push(course);
    }
  });
  // if no recitation only send lecture
  if (lec.length === 0) {
    throw new Error('No Course Available');
  } else if (rec.length === 0) {
    return [lec];
  } else {
    return [lec, rec];
  }
};

module.exports = getAllCourses;
