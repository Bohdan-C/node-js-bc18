const contacts = require("./contacts");
const argv = require("yargs").argv;

console.log("it is started!");
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      console.table(contacts.listContacts());
      break;

    case "get":
      const userGet = contacts.getContactById(id);
      console.log(userGet);
      break;

    case "add":
      contacts.addContact(name, email, phone);
      console.log(contacts.listContacts());
      break;

    case "remove":
      contacts.removeContact(id);
      console.log(contacts.listContacts());
      // ... id
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}
invokeAction(argv);