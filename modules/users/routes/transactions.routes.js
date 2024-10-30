const express = require('express');

const auth = require('../../../middleware/auth');
const addIncome = require('../../transactions/controllers/addIncome');


const transactionRoutes = express.Router();

// Routes .......

transactionRoutes.use(auth); //Authentication middleware


// Protected routes
transactionRoutes.post('/create', addIncome);
module.exports = transactionRoutes;
