import React, { Component } from 'react';
import './styles/App.css';
import Calendar from './components/Calendar';
import api from './utils/api';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.getCourses = this.getCourses.bind(this);
    this.prevSchedule = this.prevSchedule.bind(this);
    this.nextSchedule = this.nextSchedule.bind(this);
    this.state = {
      courses: '',
      schedules: [],
      currSchedule: 0
    };
  }

  // TODO fix CORS problem
  async getCourses(e) {
    e.preventDefault();
    try {
      const classes = this.state.courses.split(', ');
      const scheduleData = await api.get('/', {
        params: {
          classes
        }
      });
      const { schedules } = scheduleData.data;
      this.setState({ schedules });
    } catch (err) {
      console.log(err);
    }
  }

  prevSchedule() {
    const { currSchedule } = this.state;
    this.setState({
      currSchedule: Math.max(0, currSchedule - 1)
    });
  }

  nextSchedule() {
    const { schedules, currSchedule } = this.state;
    this.setState({
      currSchedule: Math.min(schedules.length - 1, currSchedule + 1)
    });
  }

  render() {
    const { schedules, currSchedule } = this.state;
    if (schedules.length > 0) {
      return (
        <div className="app-container">
          <Calendar className="calendar" schedule={schedules[currSchedule]} />
          <div className="button-container">
            <button onClick={this.prevSchedule}>{'< Previous'}</button>
            <button onClick={this.nextSchedule}>{'Next >'}</button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="app-container">
          <div className="app-header">Penn Course Scheduler</div>
          <div className="form">
            <form className="form" onSubmit={this.getCourses}>
              <input
                type="text"
                name="courses"
                placeholder="CIS197"
                autocomplete="off"
                onChange={e => this.setState({ courses: e.target.value })}
              />
            </form>
          </div>
        </div>
      );
    }
  }
}
