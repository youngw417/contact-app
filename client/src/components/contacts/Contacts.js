import React, { Fragment, useContext, useEffect} from 'react';
import Spinner from '../layout/Spinner';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';


const Contacts = () => {

    const contactContext = useContext(ContactContext);

    const { contacts, filtered, getContacts, loading } = contactContext;

    useEffect(() => {
        getContacts();

        // eslint-diable-next-line
    }, [])

    if (contacts.length === 0 & !loading) {
        return <h4>Please add a contact</h4>
    }

    return (
        <Fragment>
            { !loading ? (<>
                { filtered !== null ? filtered.map(contact => (
                
                    <ContactItem key = {contact._id} contact = {contact} />
              
                ))
                : contacts.map(contact => (
                   
                    <ContactItem key = {contact._id} contact = {contact} />
               ))}
                </>) :<Spinner/>}
                
         
            
            
        </Fragment>
    )
}

export default Contacts;
