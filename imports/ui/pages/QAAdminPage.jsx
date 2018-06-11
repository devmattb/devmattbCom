// React Imports:
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

// Import Child Components to this Component.
import NavComponent from '../components/NavComponent.jsx';
import QAAdminPost from '../components/QAAdminPost.jsx';

// Import used collections:
import "../../api/collections/questions/questions.js"

// QAPage Page Component
class QAAdminPage extends Component {

  componentDidMount() {
    // Enable QAAdminPost icon tooltips
    $('.tooltipped').tooltip();
  }

  /**
  *  Manipulate the questions array prop in to an
  *  array of Question components, with their respective
  *  information as "props".
  **/
  renderQAAdminPosts() {
    // Only show answered questions:
    let notAnsQuestions = this.props.questions;
    notAnsQuestions = notAnsQuestions.filter(question => !question.answered);

    return notAnsQuestions.map((question) => (
      <QAAdminPost key={question._id} question={question} />
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
    var toastHTML =
      '<img style="width: 50px; height:50px;" src="https://yt3.ggpht.com/a-/AJLlDp3fBviBJtLPp4a5JjTd2DoYfveKIImr9SK0UA=s900-mo-c-c0xffffffff-rj-k-no" class="circle"/> '+
      '<span class="black-text hide-on-small-only" style="margin-left: 15px;">Your question has been received! <br/> After review, I will answer it shortly!</span>'+
      '<span class="black-text hide-on-med-and-up">Your question has been received! <br/> After review, I will answer it shortly!</span>';
    Materialize.toast({html: toastHTML, classes: 'white'}, 12000);

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  render() {
    return (
      <div className="container">

        <NavComponent/>

        <header>
          <h3>
            Answer AMA Questions:
            <span className="badge new red hide-on-small-only" data-badge-caption="Unanswered Questions">
              {this.props.count}&nbsp;
            </span>
          </h3>
        </header>

        <ul>
          {this.renderQAAdminPosts()}
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
    questions: Questions.find({answer: null}, { sort: { createdAt: -1 } } ).fetch(),
    count: Questions.find({answer: null}).count(),
  };
})(QAAdminPage);
