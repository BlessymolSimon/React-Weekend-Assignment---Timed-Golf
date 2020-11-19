import React, { Component, useState } from "react";
import "../styles/App.css";
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: 0, x: 0, y: 0 };
    this.renderBallOrButton = this.renderBallOrButton.bind(this)
    this.buttonClickHandler = this.buttonClickHandler.bind(this)
    this.keyPress=this.keyPress.bind(this);
    this.timerRuns=this.timerRuns.bind(this);
    this.interval_id=null;
  }
  keyPress(event) {
    if(this.state.time > 0){
      if(event.keyCode === 39) { //right
        let newX= this.state.x + 5;
        this.setState({
          x: newX,
        })            
      }
      else if(event.keyCode === 37) { //left
        let newX= this.state.x - 5;
        this.setState({
          x: newX,
        })            
      }
      else if(event.keyCode === 38) { //up
        let newY= this.state.y - 5;
        this.setState({
          y: newY,
        })  
      }
      else if(event.keyCode === 40) { //down
        let newY= this.state.y + 5;
        this.setState({
          y: newY,
        })  
      }
      if(this.state.x === 250 && this.state.y ===250) {
        clearInterval(this.interval_id);
      }
    }
  }
  componentDidMount() {
    document.addEventListener("keydown", this.keyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyPress)
  }

  renderBallOrButton() {
		if (this.state.time > 0) {
      return <div>
        <div className="ball" style={
          {
            position : "absolute",
            left : this.state.x+"px" ,
            top : this.state.y+"px"
          }
        }></div>
        <h3 className="heading-timer">{this.state.time -1}</h3>
        <div className="hole" style={
          {
            position : "absolute",
            left : "250 px" ,
            top : "250 px"
          }
        }></div>
      </div>
		} else {
      return <button className="start" onClick={this.buttonClickHandler} >start</button>
		}
  }

  timerRuns() {
    let new_time=this.state.time + 1;
    this.setState({time: new_time});
    console.log("new time",this.state.time);
  }

  buttonClickHandler() {
    //render ball, render hole, render timer, start timer
    console.log("start btn clicked");
    let new_time=this.state.time + 1;
    this.setState({time: new_time});
    this.interval_id=setInterval(this.timerRuns, 1000);  
  }


  render() {
    return (
      <div className="playground">
        {this.renderBallOrButton()}
      </div>
    );
  }
}

export default Timer;
