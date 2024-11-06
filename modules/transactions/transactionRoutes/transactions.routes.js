const express = require('express');

const auth = require('../../../middleware/auth');
const addIncome = require('../controllers/addIncome');
const addExpense = require('../controllers/addExpense');
const getTransactions = require("../controllers/getTransactions");
const deleteTransaction = require("../controllers/deleteTransaction");

const transactionRoutes = express.Router();

// Routes .......

transactionRoutes.use(auth); //Authentication middleware

// Protected routes
transactionRoutes.post('/create', addIncome);
transactionRoutes.post('/addexpense', addExpense);
transactionRoutes.get('/', getTransactions);
transactionRoutes.delete('/delete/:id', deleteTransaction);



module.exports = transactionRoutes;
