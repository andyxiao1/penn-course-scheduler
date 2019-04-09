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

// NO longer breaks: http://localhost:3000/schedule?classes[]=cis120&classes[]=econ001&classes[]=math240&classes[]=cis160
// DFS get all schedules
// Only sends first 200 schedules
const getAllSchedules = courses => {
  let schedules = [];
  courses[0].forEach(c => {
    visitCourse([c], courses, 1, schedules);
  });
  return schedules;
};

const visitCourse = (currSched, courses, index, allSchedules) => {
  if (allSchedules.length === 200) {
    return;
  }
  if (index === courses.length) {
    allSchedules.push(currSched);
    return;
  }
  courses[index].forEach(c => {
    if (isValidSchedule(currSched, c)) {
      const newSchedule = currSched.slice();
      newSchedule.push(c);
      visitCourse(newSchedule, courses, index + 1, allSchedules);
    }
  });
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
