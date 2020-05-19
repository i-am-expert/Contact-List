const express = require('express');
const router = express.Router();

const Contact = require('../models/contacts');

// retreiving contacts
router.get('/contacts', function(req, res) {   // /api/contacts wala path. /api app.js se aa rha h
    Contact.find(function(err, contacts) {
        res.json(contacts);
    });
});

// add contact
router.post('/contact', function(req, res, next) {
    // create new contact
    let newContact = new Contact({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone
    });

    newContact.save(function(err, contact) {
        if(err) {
            res.json({msg: 'Failed to add contact'});
        } else {
            res.json({msg: 'Contact added successfully'});
        }
    });

});

// delete contact
router.delete('/contact/:id', function(req, res, next) {
   Contact.deleteMany({ _id: req.params.id}, function(err, result) {
        if(err) {
            res.json(err);
        } else {
            res.json(result);
        }
   });
});



// export route
module.exports = router;