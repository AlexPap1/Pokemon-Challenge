import React from 'react';
import speaker from "./speaker.png";
import './App.css';

//App function starts game (changed to class to avoid error in constructor)
class App extends React.Component {
    constructor(props) {
        //gets high score from cookie function, if null, score is set to 0
        let record = getCookie("score")
        if (record == null) {
            record=0;
        }
        //state on starting application, not playign and record is set to above record status
        this.state = {
            playing: false,
            record: record
        };
    };

    setPlay = () => {
        this.setState({playing: true});
    };

    setNoPlay = () => {
        this.setState({playing: false})
    };

    appStart() {
        let comp;
        if (!this.state.playing)
            comp = <Intro record={this.state.record} setPlay={this.setPlay} />;
        else
            comp = <Play checkRecord={this.checkRecord} setNoPlay={this.setNoPlay} />;
        return (
            <div className="App">
                <h1>Pokemon Explorers</h1>
                <div id="View">
                    {comp}
                </div>
            </div>
        );
    }
}

//Intro for home screen before game begins. Displays record and start button
class Intro extends React.Component {
  render() {
      return(
          <div id="menu">
              <p>Click the Pokemon whose cry you hear</p>
              <p>Your record is {this.props.record}.</p>
              <button onClick={this.props.setPlay}>Begin!</button>
          </div>
      )
  }
}

//Play will set the game up and start
class Play extends React.Component {

}

//shortest method of get cookie in JS I could find. set cookie and delete cookie commented below for future reference
function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}
// function setCookie(name, value, days) {
//     var d = new Date;
//     d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
//     document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
//   } 
// function deleteCookie(name) { setCookie(name, '', -1); }
        

//runs function
export default App;
