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
  getIntervals() {
    const { schedule } = this.props;
    let intervals = [];
    schedule.forEach(course => {
      intervals = intervals.concat(this.getCourseTimes(course));
    });
    return intervals;
  }

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

  render() {
    return (
      <div className="app-container">
        <WeekCalendar
          firstDay={moment(this.props.M)}
          startTime={moment({ h: 8, m: 0 })}
          endTime={moment({ h: 18, m: 0 })}
          scaleUnit={30}
          dayFormat={'dddd'}
          numberOfDays={5}
          modalComponent={() => <div />}
          selectedIntervals={this.getIntervals()}
        />
      </div>
    );
  }
}

// import React, { Component } from 'react';
// import BigCalendar from 'react-big-calendar-like-google';
// import moment from 'moment';
// import 'react-big-calendar-like-google/lib/css/react-big-calendar.css';

// BigCalendar.momentLocalizer(moment);

// export default class Calendar extends Component {
//   render() {
//     return (
//       <BigCalendar
//         events={{}}
//         startAccessor="startDate"
//         endAccessor="endDate"
//       />
//     );
//   }
// }
