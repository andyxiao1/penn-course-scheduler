const _ = require('lodash');

// Try to make more efficient, send 10 at a time?
const getAllSchedules = courses => {
  let schedules = courses[0].map(elt => [elt]);
  for (let i = 1; i < courses.length; i++) {
    const newSchedules = [];
    const coursesToAdd = courses[i];
    schedules.forEach(schedule => {
      coursesToAdd.forEach(course => {
        const copy = schedule.slice();
        if (isValidSchedule(copy, course)) {
          copy.push(course);
          newSchedules.push(copy);
        }
      });
    });
    schedules = newSchedules;
  }
  return schedules;
};

const isValidSchedule = (schedule, course) => {
  for (let i = 0; i < schedule.length; i++) {
    if (classesOverlap(schedule[i], course)) {
      return false;
    }
  }
  return true;
};

const classesOverlap = (c1, c2) => {
  if (_.intersection(c1.days.split(''), c2.days.split('')).length === 0) {
    return false;
  }
  return !(c2.start >= c1.end || c1.start >= c2.end);
};

module.exports = getAllSchedules;
