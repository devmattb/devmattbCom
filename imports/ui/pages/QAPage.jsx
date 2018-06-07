import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

import { Badge } from 'react-materialize';

// Import Child Components to this Component.
import QAPost from '../components/QAPost.jsx';

// Import used collections:
import "../../api/collections/questions/questions.js"

// QAPage Page Component
class QAPage extends Component {

  /**
  *  Manipulate the questions array prop in to an
  *  array of Question components, with their respective
  *  information as "props".
  **/
  renderQAPosts() {
    // Only show answered questions:
    let ansQuestions = this.props.questions;
    ansQuestions = ansQuestions.filter(question => question.answered);

    return ansQuestions.map((question) => (
      <QAPost key={question._id} question={question} />
    ));
  }

  /**
  *  Handles the submission of the ".new-question" form.
  *  see onSubmit attribute on <input/> element.
  **/
  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React "ref" (see <input/> element)
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    // Insert the found value in to the collection:
    Meteor.call('questions.insert', text);

    // Notify the user that the question has been received for review!
    Materialize.toast("Your question has been received! After review, I will answer it shortly!", 12000, "green");

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  render() {
    return (
      /* QAPage Content */
      <div className="container">
        <header>
          <h3>
            Ask Me Anything!
            <Badge className="badge new light-blue hide-on-small-only" data-badge-caption="Answered Questions">
              {this.props.count}&nbsp;
            </Badge>
          </h3>

          <form className="new-question" onSubmit={this.handleSubmit.bind(this)} >
            <input type="text" ref="textInput" placeholder="Ask a question..."/>

          </form>
        </header>

        <ul>
          {this.renderQAPosts()}
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
    // Find/Return the most recent questions first.
    questions: Questions.find({}, { sort: { createdAt: -1 } } ).fetch(),
    count: Questions.find({answered: true}).count(),
  };
})(QAPage);
