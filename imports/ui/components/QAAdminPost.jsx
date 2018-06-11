import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Materialize from 'materialize-css';

import Button from "./Button.jsx"
// Question component - represents a single asked question.
export default class QAAdminPost extends Component {

  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteQAPost = this.deleteQAPost.bind(this);
    this.pinQAPost = this.pinQAPost.bind(this);
  }

  componentDidMount() {
    // Enable QAPost icon tooltips
    $('.tooltipped').tooltip();
  }

  deleteQAPost() {
    this.deleteBtn.deleteQAPost(this.props.question._id);
  }

  pinQAPost() {
    this.pinBtn.pinQAPost(this.props.question._id);
  }

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React "ref" (see <input/> element)
    const answer = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    // Insert the found value in to the collection:
    Meteor.call('questions.answer', this.props.question._id, answer);

    // Notify the user that the question has been received for review!
    var toastHTML =
      '<img style="width: 50px; height:50px;" src="https://yt3.ggpht.com/a-/AJLlDp3fBviBJtLPp4a5JjTd2DoYfveKIImr9SK0UA=s900-mo-c-c0xffffffff-rj-k-no" class="circle"/> '+
      '<span class="black-text hide-on-small-only" style="margin-left: 15px;">Answered Successfully!';
    Materialize.toast({html: toastHTML, classes: 'white'}, 12000);

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  render() {
    return (
      <li className="z-depth-2 qaPost">
        <div className="row">
          <div className="col s12">
            <span className="text">
              <span className="badge left new red" data-badge-caption="Question"></span>
              {this.props.question.text}
            </span>
            <br/><br/>
            <span className="text">
              <span className="badge left new blue" data-badge-caption="Answer"></span>
              <form className="new-answer" onSubmit={this.handleSubmit} >
                <input style={{marginLeft: "10px"}} type="text" ref="textInput" placeholder="Answer this question..."/>
                <br/><br/>
                <Button
                  classes="circle fa fa-times tooltipped waves-effect"
                  tooltip="Delete this Q/A Post."
                  onClick={this.deleteQAPost}
                  onRef={(ref) => this.deleteBtn = ref}
                />
                <Button
                  style={{paddingRight: "15px", paddingLeft: "15px"}}
                  classes="circle fa fa-map-pin tooltipped waves-effect"
                  tooltip="Pin this Q/A Post to FAQ."
                  onClick={this.pinQAPost}
                  onRef={(ref) => this.pinBtn = ref}
                />
              </form>
            </span>
          </div>
        </div>
      </li>
      );
  }
}
