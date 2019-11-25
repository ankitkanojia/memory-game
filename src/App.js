import React from 'react';
import note from "./note.png";
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allFliped: false,
      isGameStart: false,
      isTimerStart: false,
      jumbeledArray: "",
      isGameOver : false
    };
  }

  shuffle = () => {
    var a = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split(""),
      n = a.length;
    for (var i = n - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }

    let array1 = a.join("").substring(0, 12);
    let temparray = array1.split("");
    for (var i = n - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = temparray[i];
      temparray[i] = temparray[j];
      temparray[j] = tmp;
    }
    let array2 = temparray.join("");
    let finalArray = array1.concat(array2);
    return finalArray;
  }

  componentDidMount() {
    this.setState({
      jumbeledArray: this.shuffle().split("")
    });
  }

  startGame = () => {
    this.setState({
      isGameStart: true
    });
    this.allfliped();
  }

  allfliped = () => {
    this.setState({
      allFliped: true
    }, () => {
      setTimeout(() => {
        this.setState({
          allFliped: false,
          isTimerStart : false
        });
      }, 3000);
    });
  }

  singleFliped = (index) => {
    console.log(index);
  }

  render() {
    return (
      <div className="App">
        <div class="container">
          <div class="row">
            <div className="col-md-9">
              <div className="row">
                <div className="col-md-12 contentBox d-flex justify-content-center align-items-center align-content-around flex-wrap">
                  {this.state.jumbeledArray && this.state.jumbeledArray.map((data, index) => {
                    return <div class={"flip-box" + (this.state.allFliped ? " flipped" : "")} onClick={() => this.singleFliped(index)}>
                      <div class="flip-box-inner">
                        <div class="flip-box-front">
                          <h2>&nbsp;</h2>
                        </div>
                        <div class="flip-box-back">
                          <h2>{data}</h2>
                        </div>
                      </div>
                    </div>
                  })}
                </div>
              </div>
            </div>
            <div className="col-md-3 text-center">
              <div className="row d-flex justify-content-center align-items-center text-white">
                <div className="col-md-12 ">
                  <img width="100%" src={note} alt="notes" />
                  <br />
                  <br />
                  {!this.state.isGameStart && <p><button className="gamebutton" onClick={this.startGame}>START GAME</button></p>}
                  {this.state.isGameStart && this.state.isGameOver && <p><button className="gamebutton">RESTART GAME</button></p>}
                  {this.state.isGameStart && <p><button className="timerbutton">00 : 00</button></p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
