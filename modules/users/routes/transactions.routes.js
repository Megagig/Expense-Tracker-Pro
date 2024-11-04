const express = require('express');

const auth = require('../../../middleware/auth');
const addIncome = require('../../transactions/controllers/addIncome');
const addExpense = require('../../transactions/controllers/addExpense');


const transactionRoutes = express.Router();

// Routes .......

transactionRoutes.use(auth); //Authentication middleware


// Protected routes
transactionRoutes.post('/create', addIncome);
transactionRoutes.post('/addexpense', addExpense);

module.exports = transactionRoutes;
