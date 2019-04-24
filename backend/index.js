const express = require('express');
const getAllCourses = require('./utils/courses');
const getAllSchedules = require('./utils/schedules');
const customizeCourses = require('./utils/customization');
const app = express();

// schedules sent back as object: {
//   schedules: [[{id, start, end, days},...],[],...]
// }

// http://localhost:8080/schedule?classes[]=cis240&classes[]=cis320&classes[]=stat430&classes[]=ipd509
app.get('/schedule', async (req, res, next) => {
  try {
    const { classes, noEarlyClasses, noFridayClasses } = req.query;
    const courses = await getAllCourses(classes);
    const customCourses = customizeCourses(courses, {
      noEarlyClasses,
      noFridayClasses
    });
    const schedules = getAllSchedules(customCourses);
    res.send({ schedules });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// old printing for testing
const printSchedules = schedules => {
  let toReturn = '';
  schedules.forEach((elt, index) => {
    toReturn += `Schedule ${index + 1} is ${printSchedule(elt)} <br>`;
  });
  return toReturn;
};

const printSchedule = schedule => {
  let toReturn = '';
  schedule.forEach(elt => {
    toReturn += elt.id + ' ';
  });
  return toReturn;
};

app.use((err, req, res, next) => {
  res.send(err.message);
});

app.listen(8080, () => {
  console.log('listening...');
});
