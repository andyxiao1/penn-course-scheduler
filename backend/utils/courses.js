const axios = require('axios');

const getAllCourses = async classes => {
  const courses = [];
  for (let i = 0; i < classes.length; i++) {
    const data = await courseRequest(classes[i]);
    data.forEach(elt => courses.push(elt));
  }
  return courses;
};

// returns array where each elt represents a course
// each course has an array of times
// [[c1.lecs], [c1.recs], [c2.lecs]]
const courseRequest = async course => {
  const data = await axios.get(
    `https://api.pennlabs.org/registrar/search?q=${course}`
  );
  const { courses } = data.data;
  const lec = [];
  const rec = [];
  courses.forEach(elt => {
    const c = processCourseData(elt);
    if (!c.cancelled) {
      c.activity === 'LEC' ? lec.push(c) : rec.push(c);
      delete c.activity;
      delete c.cancelled;
    }
  });

  // treat recitations and lectures as different courses
  if (lec.length === 0) {
    throw new Error('No Course Available');
  } else if (rec.length === 0) {
    return [lec];
  } else {
    return [lec, rec];
  }
};

const processCourseData = c => {
  const meetings = c.meetings[0];
  return {
    activity: c.activity,
    cancelled: c.is_cancelled,
    id: getId(meetings.section_id_normalized),
    start: meetings.start_time_24,
    end: meetings.end_time_24,
    days: meetings.meeting_days,
    startMin: meetings.start_minutes,
    endMin: meetings.end_minutes
  };
};

const getId = id => {
  if (id.charAt(3) === ' ') {
    id = id.slice(0, 3) + id.slice(4);
  }
  return id;
};

module.exports = getAllCourses;

// need activity, meetings[0].section_id, dept, number, end_time_24, start_time_24
// activity, course_department, course_number
// meetings: end_time_24, end_hour_24, end_minutes, end_time, meeting_days,
// meetings(cont): section_id, section_id_normalized, start_hour_24, start_minutes,
// meetings(cont): start_time, start_time_24
