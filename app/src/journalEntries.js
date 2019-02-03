import React, { Component } from "react";
import firebase from "firebase";
class JournalEntries extends Component {
    constructor(props) {
        super(props);
        this.state = {entries:[]}
        let idToken = "abcd";
        fetch("https://pfeifferh.lib.id/journal-service@dev/getSessions/?userId=FFYOkVqrfebqih4m6ZyI")
        .then(response => {
            response.text().then((text) => {
                let data = JSON.parse(text);
                
                this.setState({entries:data, userToken: idToken});
                // do something with the text response 
              });
        });
        /*firebase.auth().currentUser.getIdToken(true).then(async (idToken) => {
            console.log(idToken);
            fetch("https://pfeifferh.lib.id/journal-service@dev/getSessions/?userToken="+idToken)
            .then(response => {
                response.text().then((text) => {
                    let data = JSON.parse(text);
                    
                    this.setState({entries:data, userToken: idToken});
                    // do something with the text response 
                  });
            });
    
          }).catch(function(error) {
            // Handle error
          });*/
      }
  render() {      
    let journalEntries = this.state.entries;
    var entries = [];
    for (var i = 0; i < journalEntries.length; i++) {
        // note: we add a key prop here to allow react to uniquely identify each
        // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
        entries.push(<JournalCard key={journalEntries[i][0]} entry={journalEntries[i]} userToken={this.state.userToken}/>);
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

  constructor() {
    super()
    this.state = { 
      editing: false
    }
    this.updateText = this.updateText.bind(this)
  }

  updateText() {
    fetch("https://pfeifferh.lib.id/journal-service@dev/updateSession/?userId=FFYOkVqrfebqih4m6ZyI&sessionId=" + this.props.entry[0] + "&text=" + this.state.text)
      .then().catch(err => console.log(err));

    this.setState({ editing: false })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ text: nextProps.entry[1].text })
  }

  render() {
    const entry = this.props.entry[1]
    entry.emotions.foreach(emotion => {
      emotion = Math.floor(emotion*100)
    })
    const text = this.state.text ? this.state.text : entry.text
    return (
      <div className="entryCard">
        { this.state.editing
          ? <div className="input-group">
              <div className="input-group-prepend">
               <button className="btn btn-outline-secondary" type="button" onClick={(e) => this.updateText()}>Save</button>
              </div>
              <textarea className="form-control" aria-label="With textarea" onChange={(e) => this.setState({text: e.target.value})}>{this.state.text}</textarea>
            </div>
          : <p>{text} <button type="button" className="btn btn-link" onClick={(e) => this.setState({ editing: true, text: text })}>Edit</button></p>
        }
        <p className="entryCardDetails">Fear: {entry.emotions.fear}%</p><hr/>
        <p className="entryCardDetails">Anger: {entry.emotions.anger}%</p><hr/>
        <p className="entryCardDetails">Joy: {entry.emotions.joy}%</p><hr/>
        <p className="entryCardDetails">Sadness: {entry.emotions.sadness}%</p><hr/>
        <p className="entryCardDetails">Surprise: {entry.emotions.surprise}%</p><hr/>
      </div>
    );
  }
}

 
export default JournalEntries;