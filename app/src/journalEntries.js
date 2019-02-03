import React, { Component } from "react";
import firebase from "firebase";
class JournalEntries extends Component {
    constructor(props) {
        super(props);
        this.state = {entries:[]}
        firebase.auth().currentUser.getIdToken(true).then(async (idToken) => {
            console.log(idToken);
            fetch("https://pfeifferh.lib.id/journal-service@dev/getSessions/?userToken="+idToken)
            .then(response => {
                response.text().then((text) => {
                    let data = JSON.parse(text);
                    this.setState({entries:data});
                    // do something with the text response 
                  });
            });
    
          }).catch(function(error) {
            // Handle error
          });
      }
  render() {      
    let journalEntries = this.state.entries;
    var entries = [];
    for (var i = 0; i < journalEntries.length; i++) {
        // note: we add a key prop here to allow react to uniquely identify each
        // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
        entries.push(<JournalCard key={journalEntries[i][0]} entry={journalEntries[i][1]}/>);
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
            <p>{this.props.entry.text}</p>
            <p className="entryCardDetails">Mood: {this.props.entry.emotions}</p><hr/></div>
        );
      }
    }

 
export default JournalEntries;