import React from 'react';
import note from "./note.png";
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mins: "2",
      seconds: "59",
      allFliped: false,
      isGameStart: false,
      isTimerStart: false,
      isGameFinish : false,
      jumbeledArray: "",
      isGameOver : false,
      previousIndex : -1
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
    let jumbeledArray = this.shuffle().split("");
    let jumbeledArrayUpdated = jumbeledArray.map((data,index) => {
        return {
          ID :index,
          CLUE : data,
          ISFLIPPED : false,
          ISDISABLED : false
        }
    });
    this.setState({
      jumbeledArray: jumbeledArrayUpdated
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
        },() => {
          setInterval(this.timer, 1000);
        });
      }, 3000);
    });
  }

  timer = () => {
    let seconds = this.state.seconds;
    let minute = this.state.mins;
    if (seconds === "00") {
      seconds = "59";
      minute = parseInt(minute) - 1;
    } else {
      seconds = parseInt(seconds) - 1;
    }

    if (parseInt(seconds) < 10) {
      seconds = "0" + seconds
    }

    if (!this.state.isGameFinish && !this.state.isGameOver) {
      if (minute === "0" && seconds === "00") {
        this.setState({
          seconds: seconds.toString(),
          isGameOver: true,
          isGameFinish : true
        })
      } else {
        this.setState({
          seconds: seconds.toString(),
          mins: minute.toString()
        })
      }
    }
  }

  singleFliped = (index) => {
    let previousIndex = this.state.previousIndex;
    let jumbeledArray = this.state.jumbeledArray;
    jumbeledArray[index].ISFLIPPED = true;
    if(this.state.previousIndex !== -1)
    {
      if(jumbeledArray[index].CLUE === jumbeledArray[previousIndex].CLUE){
        jumbeledArray[index].ISDISABLED = true;
        jumbeledArray[previousIndex].ISDISABLED = true;
        this.setState({
          previousIndex: -1,
          jumbeledArray: jumbeledArray
        });
      }else{
        jumbeledArray[index].ISFLIPPED = true;
        this.setState({
          previousIndex:-1,
          jumbeledArray: jumbeledArray
        },() =>{
          setTimeout(() => {
            jumbeledArray[index].ISFLIPPED = false;
            jumbeledArray[previousIndex].ISFLIPPED = false;
            this.setState({
              jumbeledArray: jumbeledArray
            });
          }, 1000);
        });
      }
    }else{
      jumbeledArray[index].ISFLIPPED = true;
      this.setState({
        previousIndex: index,
        jumbeledArray: jumbeledArray
      })
    }
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
                    return <div class={"flip-box" + (this.state.allFliped && this.state.isGameStart ? " flipped" : "") + (data.ISFLIPPED  && this.state.isGameStart ? " flipped" : "")} onClick={() => this.singleFliped(index)}>
                      <div class="flip-box-inner">
                        <div class="flip-box-front">
                          <h2>&nbsp;</h2>
                        </div>
                        <div class="flip-box-back">
                          <h2>{data.CLUE}</h2>
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
                  {this.state.isGameStart && this.state.isGameOver && this.state.isGameFinish && <p><button className="gamebutton">RESTART GAME</button></p>}
                  {this.state.isGameStart && <p><button className="timerbutton">{"0" + this.state.mins + " : " + this.state.seconds}</button></p>}
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
