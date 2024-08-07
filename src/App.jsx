import { useEffect, useState } from 'react';

import ContactForm from './components/ContactForm/ContactForm';
import SearchBox from './components/SearchBox/SearchBox';
import ContactList from './components/ContactList/ContactList';

import inputContacts from './inputContacts.json';

const App = () => {
  const [searchVal, setSearchVal] = useState('');

  const [contacts, setContacts] = useState(
    localStorage.getItem('contacts')
      ? JSON.parse(localStorage.getItem('contacts'))
      : inputContacts
  );

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (inputContact) => {
    setContacts((contacts) => [...contacts, inputContact]);
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const filterContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchVal.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <SearchBox value={searchVal} onSearch={setSearchVal} />
      <ContactList contacts={filterContacts} onDelete={deleteContact} />
    </div>
  );
};

export default App;