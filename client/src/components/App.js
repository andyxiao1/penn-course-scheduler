import React, { Component } from 'react';
import '../styles/App.css';
import Calendar from './Calendar';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import Customization from './Customization';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.getCourses = this.getCourses.bind(this);
    this.prevSchedule = this.prevSchedule.bind(this);
    this.nextSchedule = this.nextSchedule.bind(this);
    this.resetState = this.resetState.bind(this);
    this.toggleTenAM = this.toggleTenAM.bind(this);
    this.toggleFriday = this.toggleFriday.bind(this);
    this.state = {
      courses: '',
      schedules: [],
      currSchedule: 0,
      view: 'home',
      noTenAM: false,
      noFriday: false
    };
  }

  // TODO fix CORS problem - prob fine when deployed
  async getCourses(e) {
    e.preventDefault();
    try {
      const classes = this.state.courses.split(', ');
      const scheduleData = await axios.get('/schedule', {
        params: {
          classes,
          noEarlyClasses: this.state.noTenAM,
          noFridayClasses: this.state.noFriday
        }
      });
      const { schedules } = scheduleData.data;
      if (schedules.length === 0) {
        throw new Error('No Schedules');
      }
      this.setState({ schedules, view: 'calendar' });
    } catch (err) {
      this.setState({ view: 'error' });
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

  resetState() {
    this.setState({
      view: 'home',
      schedules: [],
      currSchedule: 0,
      courses: '',
      noTenAM: false,
      noFriday: false
    });
  }

  toggleTenAM() {
    this.setState({ noTenAM: !this.state.noTenAM });
  }

  toggleFriday() {
    this.setState({ noFriday: !this.state.noFriday });
  }

  render() {
    const { schedules, currSchedule, view, noTenAM, noFriday } = this.state;
    if (view === 'home') {
      return (
        <div className="app-container">
          <Customization
            noTenAM={noTenAM}
            noFriday={noFriday}
            toggleTenAM={this.toggleTenAM}
            toggleFriday={this.toggleFriday}
          />
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
    } else if (view === 'calendar') {
      return (
        <div className="app-container">
          <button className="home-btn" onClick={this.resetState}>
            <FontAwesomeIcon icon={faHome} />
          </button>
          <div className="app-header">Schedule #{currSchedule + 1}</div>
          <div className="calendar">
            <Calendar schedule={schedules[currSchedule]} />
          </div>
          <div className="button-container">
            <button className="calendar-switch" onClick={this.prevSchedule}>
              {'< Previous'}
            </button>
            <button className="calendar-switch" onClick={this.nextSchedule}>
              {'Next >'}
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="app-container">
          <button className="home-btn" onClick={this.resetState}>
            <FontAwesomeIcon icon={faHome} />
          </button>
          <div className="app-header">You dun goofed!</div>
        </div>
      );
    }
  }
}
