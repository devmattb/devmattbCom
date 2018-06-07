import React, { Component } from 'react';
//   <Badge className="left new red" data-badge-caption="Question"></Badge>
//   <Badge className="left new blue" data-badge-caption="Answer"></Badge>
// Question component - represents a single asked question.
export default class QAPost extends Component {
  render() {
    return (
      <li>
        <span className="text">

          {this.props.question.text}
        </span>
        <br/><br/>
        <span className="text">

          {this.props.question.answer}
        </span>
      </li>
      );
  }
}
