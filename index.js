const contacts = require("./contacts");
const express = require('express');
const Joi = require('@hapi/joi');
const cors = require('cors');
const morgan = require('morgan');

const PORT = 3000;
const ALLOWED_ORIGIN = 'http://localhost:3001'

const server = express();

server.use(express.json())
server.use(cors({ origin: ALLOWED_ORIGIN}))
server.use(morgan('dev'))


// GET Contact list
server.get('/api/contacts',(req, res, next) => {
    const listContacts = contacts.listContacts();
    return res.json(listContacts)
})


// GET contact by id
server.get("/api/contacts/:contactId", async (req, res, next) => {
    try {
      const contactId = Number(req.params.contactId);
      const contactFind = await contacts.getContactById(contactId);

        if ( !contactFind ) {
            return res.status(404).send('Contact not found')
        }

      return res.status(200).json(contactFind);
      } catch (error) {} 
  });


// POST new contact
server.post('/api/contacts', validateCreateContact, async (req, res, next) => {
    try {
        const { name, email, phone } = req.body;
        await contacts.addContact(name, email, phone);
        res.sendStatus(201);
    } catch (err) {
        next(err)
    }
})


// DELETE contact
server.delete('/api/contacts/:contactId', async (req, res, next) => {
    try {
      const contactId = Number(req.params.contactId);
      const contactRemove = await contacts.removeContact(contactId)
    
        return res.status(204).json(contactRemove);
    } catch (err) {
        next(err)
    }
})


// PATCH contact
server.patch("/api/contacts/:contactId", validateUpdateContact, async (req, res, next) => {
    try {
      const body = req.body;
      const contactId = Number(req.params.contactId);
      if (isEmpty(body)) {
        res.status(400).json({ message: "missing fields" });
      } else {
        const updatedContact = await contacts.updateContact(body, contactId);

        if (!updatedContact) {
          return res.status(404).json({ message: "Not found" });
        }
        return res.status(200).json(updatedContact);
      }
      function isEmpty(obj) {
        for (let key in obj) {
          return false;
        }
        return true;
      }
    } catch (error) {}
  });


server.listen(PORT, () => {
    console.log("Server started on port:", PORT)
})


function validateCreateContact(req, res, next) {
    const body = req.body;

    const contactRules = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        phone: Joi.string().required(),
    });

    const validationResult = contactRules.validate(body)
    if ( validationResult.error ) {
        return res.status(400).json(validationResult.error);
    } 
    
    next();
}

function validateUpdateContact(req, res, next) {
    const body = req.body;

    const contactRules = Joi.object({
        name: Joi.string(),
        email: Joi.string(),
        phone: Joi.string(),
    });

    const validationResult = contactRules.validate(body)
    if ( validationResult.error ) {
        return res.status(400).json(validationResult.error);
    } 
    
    next();
}

