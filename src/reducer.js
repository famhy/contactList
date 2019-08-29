import {ADD_CONTACT,SEE_CONTACT} from './actionType'

export const contactReducer = (state ={}, action) => {
    switch (action.type) {
      case ADD_CONTACT:
       console.log(state) 
       return  {
              name: action.payload.name,
              phone: action.payload.phone,
              mail: action.payload.mail
            }
        
   
      default:
        return state
    }
  }

  export const contactListReducer = (state =[{arr:[]}], action)=>{
    switch (action.type) {
      case SEE_CONTACT:
       return  action.payload
        
   
      default:
        return state
    }
  }
