const _ = require('lodash');

// can i improve efficiency? probably fine for small inputs
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
  c1 = c1.meetings[0];
  c2 = c2.meetings[0];
  const d1 = c1.meeting_days.split('');
  const d2 = c2.meeting_days.split('');
  if (_.intersection(d1, d2).length === 0) {
    return false;
  }

  const s1 = c1.start_time_24;
  const e1 = c1.end_time_24;
  const s2 = c2.start_time_24;
  const e2 = c2.end_time_24;
  //   console.log(
  //     `COMPARISON ${c1.meetings[0].section_id + ' ' + s1} ${e1} | ${c2.meetings[0]
  //       .section_id +
  //       ' ' +
  //       s2} ${e2} OUTPUT: ${!(s2 >= e1 || s1 >= e2) ? 'overlap' : 'no overlap'}`
  //   );
  return !(s2 >= e1 || s1 >= e2);
};

module.exports = getAllSchedules;

// TODO: right now only gets schhedules in the same day, need to add ability to change days
