import {ADD_CONTACT,SEE_CONTACT} from './actionType'

export const addContact = payload => ({
    type: ADD_CONTACT,
    payload
  })
  export const seeContact = payload => ({
    type: SEE_CONTACT,
    payload
  })