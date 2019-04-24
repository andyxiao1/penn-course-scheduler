import React, { Component } from 'react';
import WeekCalendar from 'react-week-calendar';
import 'react-week-calendar/dist/style.css';
import moment from 'moment';

export default class Calendar extends Component {
  static defaultProps = {
    M: [2019, 0, 7],
    T: [2019, 0, 8],
    W: [2019, 0, 9],
    R: [2019, 0, 10],
    F: [2019, 0, 11]
  };

  // schedule: [{id, start, end, days, startTime, endTime}, ...]
  // gets all the course intervals for the schedule
  getIntervals() {
    const { schedule } = this.props;
    let intervals = [];
    schedule.forEach(course => {
      intervals = intervals.concat(this.getCourseTimes(course));
    });
    return intervals;
  }

  // gets all the intervals (multiple days) for the given course
  // MW course would have 2 intervals
  getCourseTimes(course) {
    const { id, start, end, days, startMin, endMin } = course;
    const intervals = [];
    const startTime = [Math.floor(start), startMin];
    const endTime = [Math.floor(end), endMin];
    for (let i = 0; i < days.length; i++) {
      const startMoment = moment(this.props[days.charAt(i)].concat(startTime));
      const endMoment = moment(this.props[days.charAt(i)].concat(endTime));
      intervals.push({ start: startMoment, end: endMoment, value: id });
    }
    return intervals;
  }

  // preprocess courses to determine earliest start time and latest end time
  // not working child WeekCalendar won't resize
  getStartEndTimes() {
    const { schedule } = this.props;
    let start = 24;
    let startMin = 0;
    let end = 0;
    let endMin = 0;
    schedule.forEach(course => {
      if (course.start < start) {
        start = course.start;
        startMin = course.startMin;
      }
      if (course.end > end) {
        end = course.end;
        endMin = course.endMin;
      }
    });
    return {
      start: moment({ h: Math.floor(start), m: startMin }),
      end: moment({ h: Math.floor(end), m: endMin })
    };
  }

  render() {
    return (
      <WeekCalendar
        firstDay={moment(this.props.M)}
        startTime={moment({ h: 8, m: 0 })}
        endTime={moment({ h: 19, m: 0 })}
        scaleUnit={30}
        dayFormat={'dddd'}
        numberOfDays={5}
        modalComponent={() => <div />}
        selectedIntervals={this.getIntervals()}
      />
    );
  }
}
