const _ = require('lodash');

// BFS get all schedules
const getAllSchedulesBFS = courses => {
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

// breaks: http://localhost:3000/schedule?classes[]=cis120&classes[]=econ001&classes[]=math240&classes[]=cis160
// DFS get all schedules
// still breaks on inputs, TODO: make it so we send 100 classes each time and only send more on subsequent requests
const getAllSchedules = courses => {
  let schedules = [];
  courses[0].forEach(c => {
    schedules = schedules.concat(visitCourse([c], courses, 1));
  });
  return schedules;
};

const visitCourse = (schedule, courses, index) => {
  if (index === courses.length) {
    return [schedule];
  }
  let allSchedules = [];
  courses[index].forEach(c => {
    if (isValidSchedule(schedule, c)) {
      const newSchedule = schedule.slice();
      newSchedule.push(c);
      allSchedules = allSchedules.concat(
        visitCourse(newSchedule, courses, index + 1)
      );
    }
  });
  return allSchedules;
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
