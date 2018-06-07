import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

// Import Child Components to this Component.
import Question from '../components/Question.jsx';

// Import used collections:
import "../../api/collections/questions/questions.js"

// AppBackup component - represents the whole AppBackup
class AppBackup extends Component {

  /**
  *  Manipulate the questions array prop in to an
  *  array of Question components, with their respective
  *  information as "props".
  **/
  renderQuestions() {
    return this.props.questions.map((question) => (
      <Question key={question._id} question={question} />
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

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  render() {
    return (
      /* AppBackup Content */
      <div className="container">
        <header>
          <h3>Ask Me Anything! ({this.props.count})</h3>

          <form className="new-question" onSubmit={this.handleSubmit.bind(this)} >
            <input type="text" ref="textInput" placeholder="Ask a question..."/>

          </form>
        </header>

        <ul>
          {this.renderQuestions()}
        </ul>
      </div>
    );
  }
}

/**
*   Adds the "questions" prop to the AppBackup Component.
*   The "questions" prop is populated with all our questions
*   from the database collection "Questions".
*
*   NOTE: This will reactively populate data to the
*   AppBackup Component. If data is changed in the "Questions"
*   collection, the AppBackup Component will re-render.
**/
export default withTracker(() => {
  // Subscribe to all collections of interest:
  Meteor.subscribe('questions');

  // Set some props of the AppBackup Component:
  return {
    // Find/Return the most recent questions first.
    questions: Questions.find({}, { sort: { createdAt: -1 } } ).fetch(),
    count: Questions.find().count(),
  };
})(AppBackup);
