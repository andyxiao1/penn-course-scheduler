import React, { Component } from 'react';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.getCourses = this.getCourses.bind(this);
    this.state = { courses: '' };
  }

  getCourses() {
    const courseList = this.state.courses.split(', ');
    console.log(courseList);
  }

  render() {
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
              onChange={courses => this.setState({ courses })}
            />
          </form>
        </div>
      </div>
    );
  }
}
