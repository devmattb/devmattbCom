import React, { Component } from 'react';

export default class Button extends Component {

  constructor(props){
    super(props);
    this.state = { clicked: false };
  }

  componentDidMount() {
    this.props.onRef(this)
  }

  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  // Likes/Unlikes a given QAPost.
  like(qId){
    var toggledValue = !this.state.clicked;
    this.setState({ clicked: toggledValue });
    Meteor.call("questions.like", qId, toggledValue);
  }

  // Shares a given QAPost on facebook
  shareFB(qId){
    this.setState({ clicked: true });
    // TODO: Share on Facebook
  }

  // Shares a given QAPost on twitter
  shareTW(qId){
    this.setState({ clicked: true });
    // TODO: Share on Twitter
  }

  // Deletes a QAPost permanently from the Questions collection.
  deleteQAPost(qId){
    Meteor.call("questions.delete", qId);
  }

  // Pins a QAPost to the FAQ!
  pinQAPost(qId){
    this.setState({ clicked: !this.state.clicked });
    Meteor.call("questions.pin", qId, !this.state.clicked);
  }

  render()  {
    var className = (this.state.clicked) ? "activatedBtn waves-orange " : "waves-light ";
    return (
      <i
      className={className + this.props.classes}
      data-tooltip={this.props.tooltip}
      onClick={this.props.onClick}
      style={this.props.style}
      >
      </i>
    )

  }

}
