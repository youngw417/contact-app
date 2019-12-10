import React, {useState, useContext, useEffect} from 'react';
import ContactContext from '../../context/contact/contactContext';


    
function ContactForm() {
    const contactContext = useContext(ContactContext);
    const {addContact, current, clearCurrent, updateContact} = contactContext;
    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    })

    useEffect( () => {
    
        if (current != null)
        setContact(current)
        
        else  
            setContact({
            name: '',
            email: '',
            phone: '',
            type: 'personal'
            })

    },[current, contactContext]);

    
    const {name, email, phone, type} = contact;

    const onChange = e => setContact( {
        ...contact, [e.target.name]: e.target.value
    })

    const onSubmit = e => {
        e.preventDefault();
        if (!current)
            addContact(contact)
        else updateContact(contact);

        clearAll();
        // setContact({
        // name: '',
        // email: '',
        // phone: '',
        // type: 'personal'
        // })
    }
    const clearAll = () => {
        clearCurrent();
    }
    return (
       <form onSubmit = {onSubmit}>
           <h2 className="text-primary">{(current) ? 'Edit Contact' : 'Add Contact'}</h2>
           <input type="text" placeholder='name' name ='name' value={name} onChange={onChange} />
           <input type="text" placeholder='email' name ='email' value={email} onChange={onChange} />
           <input type="text" placeholder='phone' name ='phone' value={phone} onChange={onChange} />
          <h5>Contact Type</h5>
          <input type="radio" name='type' value='personal' checked = {type === 'personal'} onChange={onChange}/> Personal{' '}
          <input type="radio" name='type' value='professional' checked = {type === 'professional'} onChange={onChange}/>Professional
          <div>
              <input type="submit" value={(current) ? 'Update Contact' : 'Add Contact'} className="btn btn-primary btn-block"/>
          </div>
          {current && <idv>
              <button className="btn btn-light btn-block" onClick={clearAll}>Clear</button>
          </idv>}
       </form>
    )
}

export default ContactForm
