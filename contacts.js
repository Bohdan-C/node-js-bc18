const fs = require('fs');
const path = require('path');

const contactsPath = path.join(__dirname, '/db/contacts.json')

function listContacts() {
    try {
      return JSON.parse(
        fs.readFileSync(contactsPath, "utf-8",async (err) => {
          if (err) throw err;
        })
      );
    } catch (err) {
        console.log(err)
    }
  }
  
  function getContactById(contactId) {
    try {
      const resultId = listContacts().find(
        (contactSearched) => contactSearched.id === contactId
      );
      return resultId;
    } catch (err) {
      console.log(err)
    }
  }
  
  function removeContact(contactId) {
    try {
      const contact = listContacts();
      const removedContact = contact.filter((el) => el.id !== contactId);
      fs.writeFileSync(contactsPath, JSON.stringify(removedContact), (err) => {
      if (err) throw err;
    });
    } catch (err) {
      console.log(err)
    }
  }
  
  function addContact(name, email, phone) {
    try {
      const contacts = listContacts();
      const addNewContact = [
        ...contacts,
        { id: contacts.length + 1, name, email, phone },
      ];
      fs.writeFileSync(contactsPath, JSON.stringify(addNewContact), (err) => {
        if (err) throw err;
      });
    } catch (error) {
      console.log("error: ", error);
    }
  }

  function updateContact(body, id) {
    try {
      const contactUpdatedIndex = listContacts().findIndex(
        (contactSearched) => contactSearched.id === id
      );
      if (contactUpdatedIndex === -1) {
        return false;
      }
      let contacts = listContacts();
      contacts[contactUpdatedIndex] = {
        ...contacts[contactUpdatedIndex],
        ...body,
      };
      const contactUpdatetReturn = contacts[contactUpdatedIndex];
      fs.writeFileSync(contactsPath, JSON.stringify(contacts), (err) => {
        if (err) throw err;
      });

      return contactUpdatetReturn;

    } catch (error) {
      console.log("error: ", error);
    }
  }

  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
  };