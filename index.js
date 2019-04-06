const express = require('express');
const axios = require('axios');

let app = express();

// format query string as http://localhost:3000/schedule?classes[]=cis121&classes[]=cis262&classes[]=cis197&classes[]=eas203&classes[]=econ002
app.get('/schedule', async (req, res) => {
  const courses = await getAllCourses(req.query.classes);
  res.send(Object.keys(courses));

  // activity, instructors.section_id, course_department, course_number
  // meetings: end_time_24, end_hour_24, end_minutes, end_time, meeting_days,
  // meetings(cont): section_id, section_id_normalized, start_hour_24, start_minutes,
  // meetings(cont): start_time, start_time_24
});

const getAllCourses = async classes => {
  const courses = [];
  for (let i = 0; i < classes.length; i++) {
    const data = await courseRequest(classes[i]);
    data.forEach(elt => courses.push(elt));
  }
  return courses;
};

const courseRequest = async course => {
  const data = await axios.get(
    `https://api.pennlabs.org/registrar/search?q=${course}`
  );
  const { courses } = data.data;
  const lec = [];
  const rec = [];
  courses.forEach(elt => {
    elt.activity === 'LEC' ? lec.push(elt) : rec.push(elt);
  });
  // if no recitation only send lecture
  return rec.length === 0 ? [lec] : [lec, rec];
};

app.listen(3000, () => {
  console.log('listening...');
});

// TODO: no data for cis197, in such a case need to return error
