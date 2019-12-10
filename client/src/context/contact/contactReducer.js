 import {
 GET_CONTACTS,
 ADD_CONTACT,
 DELETE_CONTACT,
 SET_CURRENT,
 CLEAR_CURRENT,
 UPDATE_CONTACT,
 FILTER_CONTACTS,
 CLEAR_FILTER,
 CONTACT_ERROR,
 CLEAR_CONTACTS,
 SET_ALERT,
 REMOVE_ALERT } from '../types';

 export default (state, action) => {
     console.log('state', state)
     switch(action.type) {

         case GET_CONTACTS:
             return {
                 ...state,
                 contacts: action.payload,
                 loading: false
             }
         case ADD_CONTACT:
             return{
                ...state,
                contacts: [action.payload, ...state.contacts ],
                loading: false
             };
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(item => item._id !== action.payload),
                filtered: state.filtered && state.filtered.filter(item => item._id !== action.payload),
                loading: false
            };
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload,
                loading: false
            };
        case UPDATE_CONTACT:
            return{
                ...state,
                contacts: state.contacts.map(contact => contact._id === action.payload._id ?
                    action.payload : contact ),
                filtered: state.filtered && state.filtered.map(contact => contact._id === action.payload._id ?
                    action.payload : contact ),
                loading: false
              
            };
            case CLEAR_CURRENT:
                    return {
                        ...state,
                        current: null,
                        loading: false
                    };

            case CLEAR_CONTACTS:
                return {
                    ...state,
                    contacts: [],
                    current: null,
                    filtered: null,
                    error: null
                };
            case FILTER_CONTACTS:
                return {
                    ...state,
                    filtered: state.contacts.filter(contact => {
                        const regex = new RegExp(`${action.payload}`, 'gi');
                        return contact.name.match(regex) || contact.email.match(regex);

                    }),
                    loading: false
                };
            case CONTACT_ERROR:
                return {
                    ...state,
                    error: action.payload,
                    loading: false
                }
            case CLEAR_FILTER:
                    return {
                        ...state,
                        filtered: null,
                        loading: false
                    };     
        default:return state;
     }
 }