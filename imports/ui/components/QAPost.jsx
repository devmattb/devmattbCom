import React, { Component } from 'react';

import Button from "./Button.jsx"
// Question component - represents a single asked question.
export default class QAPost extends Component {

  constructor(props){
    super(props);
    // Bind all component methods:
    this.like = this.like.bind(this);
    this.shareFB = this.shareFB.bind(this);
    this.shareTW = this.shareTW.bind(this);
  }

  like() {
    this.likeBtn.like(this.props.question._id);
  }

  shareFB() {
    this.shareFBBtn.shareFB(this.props.question._id);
  }

  shareTW() {
    this.shareTWBtn.shareTW(this.props.question._id);
  }

  componentDidMount() {
    // Enable QAPost icon tooltips
    $('.tooltipped').tooltip();
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
              {this.props.question.answer}
            </span>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <b style={{marginLeft: "15px", marginRight: "-15px", fontSize: "22px"}}> {this.props.question.likes} </b>
            <Button
              classes="circle fa fa-thumbs-up tooltipped waves-effect"
              tooltip="This was interesting / helpful!"
              onClick={this.like}
              onRef={(ref) => this.likeBtn = ref}
            />
            <br/><br/>
            <b style={{marginLeft: "15px"}}> Share this answer:</b> <br/><br/>

            <Button
              style={{paddingLeft: "14px", paddingRight: "15px"}}
              classes="circle fa fa-facebook tooltipped waves-effect"
              tooltip="Share this on Facebook!"
              onClick={this.shareFB}
              onRef={(ref) => this.shareFBBtn = ref}
            />

            <Button
              classes="circle fa fa-twitter tooltipped waves-effect"
              tooltip="Share this on Twitter!"
              onClick={this.shareTW}
              onRef={(ref) => this.shareTWBtn = ref}
            />

          </div>
        </div>
      </li>
      );
  }
}
