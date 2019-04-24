import React, { Component } from 'react';
import s from 'styled-components';

const Wrapper = s.div`
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  padding: 0rem 1rem 0 1rem;
  background: #123072;
  width: 10%;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.1);
  border-radius: 4px;

  p {
    font-size: 0.8rem;
    margin-bottom: 1rem;
  }
`;

const Close = s.span`
  position: absolute;
  right: 20px;
  top: 25px;
  opacity: 0.4;
  transform: translateY(-4px);
  cursor: hand;

  :hover {
    opacity: 0.5;
  }

  ::after {
    content: "${({ active }) => (active ? '\\2013' : '\\002B')}";
  }
`;

const Content = s.div`
  transition: max-height 0.4s ease;
  overflow: hidden;
  max-height: ${({ active }) => (active ? '100vh' : 0)};
`;

const Title = s.h3`
  margin-bottom: 1rem;
`;

export default class Customization extends Component {
  constructor(props) {
    super(props);
    this.state = { active: true };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    const { active } = this.state;
    this.setState({ active: !active });
  }

  render() {
    const { active } = this.state;
    const { noTenAM, toggleTenAM, noFriday, toggleFriday } = this.props;
    return (
      <Wrapper>
        <Close onClick={this.toggle} active={active} />
        <Title>Customize</Title>
        <Content active={active}>
          <button className="toggle" onClick={toggleTenAM}>
            {noTenAM ? 'After 10 AM' : 'Before 10 AM'}
          </button>
          <button className="toggle" onClick={toggleFriday}>
            {noFriday ? 'No Friday' : 'Yes Friday'}
          </button>
        </Content>
      </Wrapper>
    );
  }
}
