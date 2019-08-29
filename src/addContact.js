import React from "react";
import "./App.css";
import axios from "axios";
import {connect} from 'react-redux'
import {addContact} from './action'
import store from "./store"
import {Link,Route} from'react-router-dom'
import contactList from "./contactList";

class AddConatct extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      phone: "",
      mail: ""
    };
  }
  nameOnChange = e => {
    if (!e.target.value.match(/[^a-z" "]/gi) && e.target.value.length < 21)
    this.setState({
      name: e.target.value
    });
  };

  phoneOnChange = e => {
    if (!e.target.value.match(/[^0-9" "]/gi))
    this.setState({
      phone: e.target.value
    });
  
  };
  emailOnChange = e => {
    this.setState({
      mail: e.target.value
    });
   
  };

  add = () => {
    
    if (!this.state.mail.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
      window.alert('invalide email')
    }
    else{
      this.props.addContact(this.state)
      console.log(store.getState().contactReducer)
      console.log(this.props.contact)
      axios
        .post("/add", {
          name:store.getState().contactReducer.name,
          phone: store.getState().contactReducer.phone,
          mail: store.getState().contactReducer.mail
        })
        //   .then(()=>console.log(this.state))
        //   .then(req=>req.send(this.state))
        .catch(()=>console.log("err sarra"));
    }
    
  };
  render() {
    console.log(this.props.contact)

    return (
        <div>
          <input type="text" name="name" onChange={this.nameOnChange} value={this.state.name} />
          <br />
          <input type="text" name="phone" onChange={this.phoneOnChange} value={this.state.phone} />
          <br />
          <input type="email" name="mail" onChange={this.emailOnChange} value={this.state.mail}/>
          <br />

           <Link to="/contactlist"> 
            <button onClick={this.add}>
              Add contact
            </button>
           </Link> 
           <Route exact path="/contactlist" component={contactList} />

        </div>
    );
  }
}
// const mapStateToProps = (state) => ({
//   // contact: state.contactReducer
//   contact :str
// })
const mapDispatchToProps = (dispatch) => {
  return {
      addContact: (payload)=>{dispatch(addContact(payload))},
     
    }
};

export default connect(null,mapDispatchToProps)(AddConatct);
