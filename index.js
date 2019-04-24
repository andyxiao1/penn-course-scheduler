const express = require('express');
const getAllCourses = require('./utils/courses');
const getAllSchedules = require('./utils/schedules');
const customizeCourses = require('./utils/customization');
const app = express();
const PORT = process.env.NODE_ENV || 3001;

// if (process.env.NODE_ENV === 'production') {
//   app.use('/', express.static('client/build'));
// }
app.use('/', express.static('client/build'));

// schedules sent back as object: {
//   schedules: [[{id, start, end, days},...],[],...]
// }
// http://localhost:3001/schedule?classes[]=cis121&classes[]=cis262&classes[]=econ002&classes[]=eas203&noEarlyClasses=true&noFridayClasses=true
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
    // const schedulesAsString = printSchedules(schedules);
    // res.send(schedulesAsString);
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

app.listen(PORT, () => {
  console.log('listening...');
});
