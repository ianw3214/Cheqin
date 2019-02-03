import React, { Component } from "react";
import { Radar } from 'react-chartjs-2'
import firebase from "firebase";

class WeekOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {entries:[]}
    fetch("https://pfeifferh.lib.id/journal-service@dev/getSessions/?userId=FFYOkVqrfebqih4m6ZyI")
        .then(response => {
            response.text().then((text) => {
                let data = JSON.parse(text);
                
                this.setState({entries:data});
                // do something with the text response 
              });
        });
  }
  render() {   
    let emotionVals = [0, 0, 0, 0, 0]
    this.state.entries.forEach(entry => {
      let emotions = Object.keys(entry[1].emotions)
      for(let i in emotionVals) {
        emotionVals[i] += emotions[i]
      }
    }) 
    let averageVals = [0, 0, 0, 0, 0];
    
    emotionVals.forEach(emotion => {
      averageVals = [averageVals[0] + emotionVals[0], averageVals[1] + emotionVals[1], averageVals[2] + emotionVals[2], averageVals[3] + emotionVals[3], averageVals[4] + emotionVals[4], averageVals[5]+ emotionVals[5]];
    });
    let totalsum = averageVals[0] + averageVals[1] + averageVals[2] + averageVals[3] + averageVals[4] + averageVals[5] + averageVals[6];
    averageVals = [averageVals[0] / totalsum, averageVals[1] / totalsum, averageVals[2] / totalsum, averageVals[3] / totalsum, averageVals[4]/ totalsum, averageVals[5]/ totalsum];
    
    
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