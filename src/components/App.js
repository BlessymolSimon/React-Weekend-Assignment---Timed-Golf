import React, { Component, useState } from "react";
import "../styles/App.css";
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: 0, x: 0, y: 0 };
    this.renderBallOrButton = this.renderBallOrButton.bind(this)
    this.buttonClickHandler = this.buttonClickHandler.bind(this)
    this.keyPressed=this.keyPressed.bind(this);
    this.timerRuns=this.timerRuns.bind(this);
    this.interval_id=null;
  }
  keyPressed(event) {
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
    }
  }
  componentDidUpdate() {
    if(this.state.x === 250 && this.state.y ===250) {
      clearInterval(this.interval_id);
      document.removeEventListener('keydown', this.keyPressed)
    }
  }
  // componentDidMount() {
  //   document.addEventListener("keydown", this.keyPressed);
  // }

  // componentWillUnmount() {
  //   document.removeEventListener('keydown', this.keyPressed)
  // }

  renderBallOrButton() {
		if (this.state.time > 0) {
      return <React.Fragment>
        <div className="ball" style={
          {
            position : "absolute",
            left : this.state.x+"px" ,
            top : this.state.y+"px"
          }
        }></div>  
      </React.Fragment>
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
    document.addEventListener("keydown", this.keyPressed);
    console.log("start btn clicked");
    let new_time=this.state.time + 1;
    this.setState({time: new_time});
    this.interval_id=setInterval(this.timerRuns, 1000);  
  }


  render() {
    return (
      <div className="playground">
        <h3 className="heading-timer">{this.state.time}</h3>
        <div className="hole" style={
          {
            position : "absolute",
            left : "250 px" ,
            top : "250 px"
          }
        }></div>
        {this.renderBallOrButton()}
      </div>
    );
  }
}

export default Timer;
