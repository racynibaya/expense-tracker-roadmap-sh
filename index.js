#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { Command } = require('commander');

const filePath = path.join(__dirname, 'data.json');

const program = new Command();

program
  .command('add')
  .option('--description <desc>')
  .option('--amount <val>')
  .action((expense) => {
    const { amount, description } = expense;
    const expenses = fetchExpenses();
    const id = generateID(expenses);

    const newExpense = {
      id: id,
      description,
      amount: Number(amount),
      date: new Date().toISOString().split('T')[0],
    };

    try {
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, converToJSON([newExpense]), 'utf-8');
      } else {
        expenses.push(newExpense);

        fs.writeFileSync(filePath, converToJSON(expenses), 'utf-8');
      }
      console.log(`# Expense added successfully (ID: ${id})`);
    } catch (error) {
      console.error('Something went wrong' + error.message);
    }
  });

program.command('list').action(() => {
  const expenses = fetchExpenses();

  const { id, date, description, amount } = expenses[0];

  console.log(
    `# ${'ID'.padEnd(id.length + 1)} ${'Date'.padEnd(
      date.length
    )} ${'Description'.padEnd(20)} ${'Amount'.padEnd(
      amount.toString().length + 1
    )}`
  );

  if (expenses.length === 0) {
    console.log('Empty list');
  } else {
    expenses.forEach((expense) => {
      console.log(
        `# ${expense.id}  ${expense.date} ${expense.description?.padEnd(20)} ${
          expense.amount
        }`
      );
    });
  }
});

program
  .command('summary')
  .option('--month <month>')
  .action((options) => {
    const expenses = fetchExpenses();

    const { month } = options;

    const monthName = getMonth(month);

    if (month) {
      console.log(+month, '78');
      console.log(new Date('2024-10-03').getMonth() + 1, '79');

      const filteredExpenses = expenses
        .filter((expense) => new Date(expense.date).getMonth() + 1 === +month)
        .reduce((acc, curr) => acc + curr.amount, 0);

      console.log(`# Total expenses for ${monthName}: $${filteredExpenses}`);

      return;
    }

    if (expenses.length === 0) {
      console.log(`# Total expenses: $0`);
    } else {
      const totalExpense = expenses.reduce((acc, curr) => {
        return acc + curr.amount;
      }, 0);

      console.log(`# Total expenses: $${totalExpense}`);
    }
  });

program
  .command('delete')
  .option('--id <id>')
  .action((options) => {
    try {
      const id = +options.id;
      const expenses = fetchExpenses();

      const expenseIndex = expenses.findIndex((expense) => expense.id === id);

      console.log('# Expense deleted successfully');

      if (expenseIndex === -1) {
        throw new Error(`Expense with ID: ${id} doesn't exists`);
      }

      const filteredExpenses = expenses.filter((expense) => expense.id !== id);

      fs.writeFileSync(filePath, converToJSON(filteredExpenses), 'utf-8');
    } catch (error) {
      console.error('Someting went wrong: ' + error.message);
    }
  });

program.parse(process.argv);

function fetchExpenses() {
  if (fs.existsSync(filePath)) {
    const expenses = fs.readFileSync(filePath, 'utf-8');

    return JSON.parse(expenses);
  } else {
    return [];
  }
}

function generateID(expenses) {
  return expenses.length === 0 ? 1 : expenses[expenses.length - 1].id + 1;
}

function converToJSON(obj) {
  return JSON.stringify(obj);
}

function getMonth(month) {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return monthNames[month - 1];
}

const options = program.opts();
const limit = options.description ? 1 : undefined;

// console.log(program.args);

// check if file exists
// if existing add new expense
// else create a new file and add new expense
