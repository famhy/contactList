import React from "react";
import "./conatctlist.css";
import {connect} from 'react-redux'
import store from "./store"
import {addContact,seeContact} from './action'
import axios from "axios";


import './bootstrap.min.css'

class contactList extends React.Component {
  constructor(){
    super()
    this.state={
      id:"",
      name: "",
      phone: "",
      mail: "",
    }
  }
  modify=(el)=>{
    // console.log(e.target)
    console.log(el._id)
    this.setState({
    
        id: el._id,
        name: el.name,
        phone: el.phone,
        mail: el.mail,
      
      
    })

  }
  modifyContact=(e)=>{
    this.props.addContact({
      name:this.state.name,
      phone:this.state.phone,
      mail:this.state.mail,
    })
    console.log(store.getState().contactReducer)
    console.log(this.props.contactList)
    axios
    .put('/modify-contact/' + this.state.id, {
      name:store.getState().contactReducer.name,
      phone: store.getState().contactReducer.phone,
      mail: store.getState().contactReducer.mail
    }).then(this.show())
    
    this.setState({
    
      id: "",
      name: "",
      phone: "",
      mail: "",
    
    
  })
  }

  nameOnChange = e => {
    this.setState({
      name: e.target.value
    });
  };

  phoneOnChange = e => {
    this.setState({
      phone: e.target.value
    });
  };

  emailOnChange = e => {
    this.setState({
      mail: e.target.value
    });
  };


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


  render(){ 
    this.show()
    console.log(this.props.contactList,this.state.id)
    // console(store.getState().contactListReducer)
    return (
    <div className="contactList" >
        {this.props.contactList.map(el=> {console.log(el)
          if(el._id!==this.state.id)
        return <div className='contact col-3' id={el._id} onClick={(e)=>this.modify(el)}>
            <h3>{el.name} </h3>
            <p>{el.phone} </p>
            <p>{el.mail} </p>
        </div>
      
        else
        return <div className='contact col-3'>
            
          <input type="text" name="name" value={this.state.name} onChange={this.nameOnChange} />
          <br />
          <input type="text" name="phone" value={this.state.phone} onChange={this.phoneOnChange}  />
          <br />
          <input type="email" name="mail" value={this.state.mail} onChange={this.emailOnChange} />
          <br />
          <button onClick={this.modifyContact}>
              Add contact
            </button>
        </div>
      
      })}
    </div>
    
  );
}
}
const mapStateToProps = (state) => ({
  // contactList: state.contactListReducer
  contactList :store.getState().contactListReducer
})
const mapDispatchToProps = (dispatch) => {
  return {
      addContact: (payload)=>{dispatch(addContact(payload))},
      seeContact: (payload)=>{dispatch(seeContact(payload))},

     
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(contactList);
