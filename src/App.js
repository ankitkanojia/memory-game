import React from 'react';
import logo from "./logo.svg";
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFliped : false
    };
  }

  flip = () => {
    this.setState({
      isFliped : true
    }, () => {
      setTimeout(() => {
        this.setState({
          isFliped: false
        });
      }, 3000);
    });
  }

  render() {
    return (
      <div className="App">
        <div class="container">
          <div class="row">
            <div className="col-md-9">
              <div className="row">
                <div className="col-md-12 contentBox d-flex justify-content-center align-items-center align-content-around flex-wrap">
                  {[...Array(24)].map((data) => {
                    return <div className="flipblock">&nbsp;</div>
                  })}
                </div>
              </div>
            </div>
            <div className="col-md-3 sblock">
                &nbsp;
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
