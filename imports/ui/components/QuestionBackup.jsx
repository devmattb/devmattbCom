import React, { Component } from 'react';
import { Badge } from 'react-materialize';

import '../../api/collections/QuestionBackups/QuestionBackups.js';

// QuestionBackup component - represents a single asked QuestionBackup.
export default class QuestionBackup extends Component {

  /**
  *  Deletes this QuestionBackup Component from the "QuestionBackups" Collecion.
  **/
  deleteThisQuestionBackup() {
    Meteor.call('QuestionBackups.remove', this.props.QuestionBackup._id);
  }

  render() {

    return (
      <li>
        <button className="delete" onClick={this.deleteThisQuestionBackup.bind(this)}>
          &times;
        </button>

        <span className="text">
          <Badge className="left new red" data-badge-caption="QuestionBackup"></Badge>
          {this.props.QuestionBackup.text}
        </span>
        <br/><br/>
        <span className="text">
          <Badge className="left new blue" data-badge-caption="Answer"></Badge>

        </span>
      </li>
    );
  }
}
