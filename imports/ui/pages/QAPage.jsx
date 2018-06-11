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
class QAPage extends Component {

  constructor(props){
    super(props);

    // Method binds
    this.toggleRecent = this.toggleRecent.bind(this);
    this.toggleFAQ = this.toggleFAQ.bind(this);
    this.toggleTAQ = this.toggleTAQ.bind(this);

    // UI States:
    this.state = {
      showRecent: true,
      showFAQ: false,
      showTAQ: false
    }
  }

  componentDidMount() {
    // Enable QAPost icon tooltips
    $('.tooltipped').tooltip();
  }

  /**
  *  Manipulate the questions array prop in to an
  *  array of Question components, with their respective
  *  information as "props".
  **/
  renderQAPosts() {
    // By default only recently answered questions.
    let targetQuestions = this.props.questions;
    if (this.state.showRecent) {
      targetQuestions = targetQuestions.filter( question => !question.pinned );
    } else if (this.state.showFAQ) {
      targetQuestions = targetQuestions.filter( question => question.pinned );
    } else if (this.state.showTAQ) {
      // TODO: FIXXX
      targetQuestions = targetQuestions.filter( question => question.likes >= 5 );
    }

    return targetQuestions.map((question) => (
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
    var toastHTML =
      '<img style="width: 50px; height:50px;" src="https://yt3.ggpht.com/a-/AJLlDp3fBviBJtLPp4a5JjTd2DoYfveKIImr9SK0UA=s900-mo-c-c0xffffffff-rj-k-no" class="circle"/> '+
      '<span class="black-text hide-on-small-only" style="margin-left: 15px;">Your question has been received! <br/> After review, I will answer it shortly!</span>'+
      '<span class="black-text hide-on-med-and-up">Your question has been received! <br/> After review, I will answer it shortly!</span>';
    Materialize.toast({html: toastHTML, classes: 'white'}, 12000);

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  toggleRecent() {
    this.setState({ showRecent: true, showFAQ: false, showTAQ: false });
  }

  toggleFAQ() {
    this.setState({ showRecent: false, showFAQ: true, showTAQ: false });
  }

  toggleTAQ() {
    this.setState({ showRecent: false, showFAQ: false, showTAQ: true });
  }

  render() {
    return (
      <div className="container">

        <NavComponent/>

        <header>
          <h3>
            Ask Me Anything!
            <span className="badge new green hide-on-small-only" data-badge-caption="Answered Questions">
              {this.props.count}&nbsp;
            </span>
            <br/>
            <form className="filter-questions" onSubmit={this.filterForm} >
              <label style={{marginLeft: "5px"}}>
                <input
                  className="filled-in" checked={this.state.showRecent} ref="toggleRecent" type="checkbox"
                  onClick={this.toggleRecent}
                />
                <span>RECENT</span>
              </label>
              <label>
                <input
                  className="filled-in" checked={this.state.showFAQ} ref="toggleFaq" type="checkbox"
                  onClick={this.toggleFAQ}
                />
                <span>FAQ</span>
              </label>
              <label>
                <input
                  className="filled-in" checked={this.state.showTAQ} ref="toggleTaq" type="checkbox"
                  onClick={this.toggleTAQ}
                />
                <span>Top Questions</span>
              </label>
            </form>
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
    // Find/Return the most recent questions first, and only those which are answered.
    questions: Questions.find({answer: {$exists:true}}, { sort: { createdAt: -1 } } ).fetch(),
    count: Questions.find({answer: {$exists:true}}).count(),
  };
})(QAPage);
