import React, { Component } from 'react';
import { Badge } from 'react-materialize';

// Question component - represents a single asked question.
export default class QAPost extends Component {

    render() {

      return (
        <li>
          <span className="text">
            <Badge className="left new red" data-badge-caption="Question"></Badge>
            {this.props.question.text}
          </span>
          <br/><br/>
          <span className="text">
            <Badge className="left new blue" data-badge-caption="Answer"></Badge>
            {this.props.question.answer}
          </span>
        </li>
      );
  }
}
