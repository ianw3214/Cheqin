import React, { Component } from "react";
import { Radar } from 'react-chartjs-2'
import firebase from "firebase";

class WeekOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {entries:[]}
    
  }

  async componentDidMount() {
    await fetch("https://pfeifferh.lib.id/journal-service@dev/getSessions/?userId=FFYOkVqrfebqih4m6ZyI")
      .then(response => {
        response.text().then((text) => {
          let data = JSON.parse(text);
          
          this.setState({entries:data});
        // do something with the text response 
        });
      });
  }

  render() {
    if(!this.state.entries) return null   
    let emotionVals = [0, 0, 0, 0, 0]
    this.state.entries.forEach(entry => {
      if(entry[1].emotions){
        console.log(entry)
        let emotions = Object.values(entry[1].emotions)
        console.log(emotions)
        for(let i in emotionVals) {
          emotionVals[i] += emotions[i]
        }
        console.log(emotionVals)
      }
    }) 
    emotionVals.forEach(emotion => {
      
      emotion = emotion / this.state.entries.length 
    });
    
    
    let data = {
      labels: ["Anger", "Fear", "Joy", "Sadness", "Surprise"],
      datasets: [
        {
          label: "",
          fillColor: "#6610f2",
          strokeColor: "#6610f2",
          pointColor: "#6610f2",
          pointStrokeColor: "#6610f2",
          pointHighlightFill: "#6610f2",
          pointHighlightStroke: "#6610f2",
          backgroundColor: "rgba(102, 16, 242, 0.3)",
          data: emotionVals
        }
      ]
    };
    let options = {
      legend: {
        display: false
      }
    }
    
    return (
      <div>
        <h2>Weekly Overview</h2>
        <Radar style={{marginTop: '20px'}}data={data} options={options}/>
      </div>
    );
  }
}     
 
export default WeekOverview;