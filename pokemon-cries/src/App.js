import React from 'react';
import speaker from "./speaker.png";
import './App.css';

//App function starts game (changed to class to avoid error in constructor)
class App extends React.Component {
    constructor(props) {
        super(props);
        //gets high score from cookie function, if null, score is set to 0
        let record = getCookie("record")
        if (record == null) {
            record = 0;
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

    //checks and compares score to record to overwrite
    checkRecord = (score) => {
        if (score > this.state.record) {
            this.setState({record: score});
            document.cookie = "record=" + score;
        }
    }

    render() {
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
              <p>Your high score is {this.props.record}.</p>
              <button onClick={this.props.setPlay}>Start!</button>
          </div>
      )
  }
}

//Play will set the game up and start
class Play extends React.Component {
    constructor(props) {
        super(props);
        let choices = this.generateChoices();
        this.state = {
            score: 0,
            choices: choices,
            answer: choices[Math.floor(Math.random() * 3)],
            gameOver: false
        };
    }

    //generates 3 numbers between 1 and 151 without repeats
    generateChoices = () => {
        let choices = [];
        while (choices.length < 3) {
            let num = Math.floor(Math.random() * 151) + 1;
            if (!choices.includes(num)) {
                choices.push(num);
            }
        }
        return choices;
    }

    //plays <audio>
    playAudio = () => {
        this.refs.cry.play();
    }

    //cries are random number snwer (b/w 1 and 151) .wav. All .wav cries are #.wav
    render() {
        let cries = `${process.env.PUBLIC_URL}/cries/${this.state.answer}.wav`;
        return(
            <div className="playingTrue">
                <audio id="cry" ref="cry" src={cries}></audio>
                <div id="speaker">
                    <img src={speaker} alt="speaker icon" className="speakerimg" onClick={this.playAudio}/>
                </div>
            </div>
        )
    }
}

// //end of game function
// class Result extends React.Component {
//     render() {
//         return (
//             <div>
//                 <div>
//                     <h2>Game Over!</h2>
//                     <p>Your score is {this.props.score}.</p>
//                 </div>
//                 <div>
//                     <button onClick={this.props.restart}>Restart</button>
//                 </div>
//             </div>
//         );
//     }
// }

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
