import React, { Component } from "react";
import { Radar } from 'react-chartjs-2'

class WeekOverview extends Component {
  constructor(props) {
    super(props);
    
  }
  render() {      
    let data = {
      labels: ["Fear", "Sadness", "Anger", "Joy", "Surprise"],
      datasets: [
        {
          label: "My First dataset",
          fillColor: "#6610f2",
          strokeColor: "#6610f2",
          pointColor: "#6610f2",
          pointStrokeColor: "#6610f2",
          pointHighlightFill: "#6610f2",
          pointHighlightStroke: "#6610f2",
          backgroundColor: "rgba(102, 16, 242, 0.3)",
          data: Array.from({length: 5}, () => Math.random())
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