const express = require('express');
const addContact = require('../controllers/createContact');
const createUser = require('../controllers/createUser');
const getAllContact = require('../controllers/getAllContact');
const authenticateUser = require('../middleware/autenticateUser');
const getAllUsers = require('../controllers/getUsers');
const createProfile = require('../controllers/createProfile');
const getProfile = require('../controllers/getProfile');
const editProfile = require('../controllers/editprofile.');
const login = require('../controllers/login');
const getMessage = require('../controllers/getMessage');
const sendMessage = require('../controllers/sendMessage');

const router = express.Router();


router.post("/signup", createUser);


router.get("/contacts", authenticateUser, getAllContact);

router.post("/contacts/add/:id", authenticateUser, addContact);

router.get("/users", authenticateUser, getAllUsers);
router.post("/profile/create", authenticateUser, createProfile);
router.get("/profile", authenticateUser, getProfile)
router.put("/updateprofile", authenticateUser, editProfile)
router.post("/login", login)
router.post("/message/:id", authenticateUser, getMessage)
router.post("/message/send/:id",authenticateUser,sendMessage)

module.exports = router;
