// React Imports:
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

import Materialize from 'materialize-css';
// Import Child Components to this Component.
import NavComponent from '../components/NavComponent.jsx';
import QAPost from '../components/QAPost.jsx';

// Import used collections:
import "../../api/collections/questions/questions.js"

// QAPage Page Component
class SharedQuestionPage extends Component {

  renderSharedPost() {
    return (this.context.router.getCurrentParams().id)
  }

  render() {
    return (
      <div className="container">

        <NavComponent/>

        <header>
          <h3>
          <a href="https://www.facebook.com/sharer/sharer.php?u=example.org/askme#" target="_blank">
            Share on Facebook
          </a>
            Answered Question:
          </h3>
        </header>

        <ul>
          {this.renderSharedPost()}
        </ul>
      </div>
    );
  }
}

/**
*   Adds the "questions" prop to the QAPage Component.
*   The "questions" prop is populated with all our questions
*   from the database collection "Questions".
*
*   NOTE: This will reactively populate data to the
*   QAPage Component. If data is changed in the "Questions"
*   collection, the QAPage Component will re-render.
**/
export default withTracker(() => {
  // Subscribe to all collections of interest:
  Meteor.subscribe('questions');

  // Set some props of the QAPage Component:
  return {
    // Find/Return the most recent questions first, and only those which are answered.
    questions: Questions.find({answer: {$exists:true}}, { sort: { createdAt: -1 } } ).fetch(),
    count: Questions.find({answer: {$exists:true}}).count(),
  };
})(SharedQuestionPage);
