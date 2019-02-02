import React, { Component } from "react";
 
class JournalEntries extends Component {
  render() {
    var data = [{date:'Jan 2, 2019', transcriptExcerpt: 'blah blah blah', details:'sad'},{date:'Jan 3, 2019', transcriptExcerpt: 'blah blah blah', details:'sad'},{date:'Jan 4, 2019', transcriptExcerpt: 'blah blah blah', details:'sad'}];
    var entries = [];
    for (var i = 0; i < data.length; i++) {
        // note: we add a key prop here to allow react to uniquely identify each
        // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
        entries.push(<JournalCard key={i} entry={data[i]}/>);
    }
    return (
      <div>
        <h2>Journal</h2>
        <div className="entriesList">{entries}</div>
      </div>
    );
  }
}
class JournalCard extends Component {
      render() {
        return (
          <div className="entryCard">
            <h4>{this.props.entry.date}</h4>
            <p>{this.props.entry.transcriptExcerpt}</p>
            <p className="entryCardDetails">Mood: {this.props.entry.details}</p>
          </div>
        );
      }
    }

 
export default JournalEntries;