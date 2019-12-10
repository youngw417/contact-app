import React, { useReducer} from 'react';
// import uuid from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import axios from 'axios';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    GET_CONTACTS,
    CLEAR_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR
    
} from '../types';

// GET CONTACTS



const ContactState = props => {
    const initialState = {
        contacts: [],
    current: null,
    filtered: null,
    loading: true,
    error: null
};
    const [state, dispatch] = useReducer(contactReducer, initialState);

// GET CONTACTS
    const getContacts = async() => {

        
        try {
            const res = await axios.get('/api/contacts');
            dispatch({type: GET_CONTACTS, payload: res.data});
        } catch (err) {
            dispatch( {
                type: CONTACT_ERROR,
                payload: err.response.msg
            })
            
        }
        // contact.id = uuid.v4();
        
    }

    // Add contact
    const addContact = async(contact) => {

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        } 
        try {
            const res = await axios.post('/api/contacts', contact, config);
            dispatch({type: ADD_CONTACT, payload: res.data});
        } catch (err) {
            dispatch( {
                type: CONTACT_ERROR,
                payload: err.response.msg
            })
            
        }
        // contact.id = uuid.v4();
        
    }

  
    // Delete contact
    const deleteContact = async (id)  => {
        try {
            const res = await axios.delete(`/api/contacts/${id}`);
            dispatch({type: DELETE_CONTACT, payload: id});
        } catch (err) {
            dispatch( {
                type: CONTACT_ERROR,
                payload: err.response.msg
            })
            
        }
        
    }
 // update contact
    const updateContact = async (contact) => {
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        } 
        try {
            const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);
            dispatch({type: UPDATE_CONTACT, payload: res.data});
        } catch (err) {
            dispatch( {
                type: CONTACT_ERROR,
                payload: err.response.msg
            })
            
        }
        // contact.id = uuid.v4();
        
    
    dispatch({type: UPDATE_CONTACT, payload: contact});
}

    // set current contact

    const setCurrent = contact => {
        dispatch({type: SET_CURRENT, payload: contact});
    }

    // clear contacts
    const clearContacts= () => {
        dispatch({type: CLEAR_CONTACTS});
    }
    // clear current contact
    const clearCurrent = () => {
        dispatch({type: CLEAR_CURRENT});
    }

   
    // filter contacts
    const filterContacts = text => {
        dispatch({type: FILTER_CONTACTS, payload: text});
    }
    // clear filter
    const clearFilter = () => {
        dispatch({type: CLEAR_FILTER})
    }

    return (
        <ContactContext.Provider value = {{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            error: state.error,
            loading: state.loading,
            getContacts,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            clearContacts,
            updateContact,
            filterContacts,
            clearFilter
            

        }}>
            { props.children}
        </ContactContext.Provider>


    )

};

export default ContactState;
