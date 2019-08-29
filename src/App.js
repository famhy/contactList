import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AddConatct from "./addContact";
import contactList from "./contactList";
import axios from "axios";
import {connect} from 'react-redux'
import {seeContact} from './action'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      arr: []
    };
  }
  show = () => {
    axios
      .get("/contactlist")
      .then(res => {
        console.log(res.data);
        // this.setState({
        //   arr: res.data
        // });
        this.props.seeContact(res.data)
      })
      .catch(err =>{ console.log(err)});
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Link to="/addContact">
            <button>add contact</button>
          </Link>
          <Link to="/contactlist">
            <button onClick={this.show}>
              See all
            </button>
          </Link>
        </div>

        <Route exact path="/addContact" component={AddConatct} />
        <Route exact path="/contactlist" component={contactList} />
      </Router>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    seeContact: (payload)=>{dispatch(seeContact(payload))},
     
    }
};
export default connect(null,mapDispatchToProps)(App);
