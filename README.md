# Expense Tracker CLI

A simple Node.js CLI application for tracking your daily expenses. You can add expenses, view a list of all expenses, summarize total expenses, and delete expenses by ID.

Expense tracker cli app. More info can be found here:
https://github.com/racynibaya/expense-tracker-roadmap-sh.git

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/expense-tracker-cli.git
   ```

2. Navigate to the project directory:

   ```bash
   cd expense-tracker-cli
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Make the script executable (optional):

   ```bash
   chmod +x expense-tracker.js
   ```

5. (Optional) Link the CLI tool globally to use `expense-tracker` command anywhere:
   ```bash
   npm link
   ```

## Usage

### Add an Expense

To add an expense with a description and amount:

```bash
$ expense-tracker add --description "Lunch" --amount 20
# Expense added successfully (ID: 1)
```

### List All Expenses

To list all recorded expenses:

```bash
$ expense-tracker list
# ID  Date       Description       Amount
# 1   2024-10-03 Lunch             20
```

### View Total Expenses

To view the total amount spent:

```bash
$ expense-tracker summary
# Total expenses: $20
```

### Filter Summary by Month

To filter the summary by a specific month, pass the `--month` option (use 1-12 for January to December):

```bash
$ expense-tracker summary --month 10
# Total expenses for October: $20
```

### Delete an Expense

To delete an expense by its unique ID:

```bash
$ expense-tracker delete --id 1
# Expense deleted successfully
```

## Example Workflow

```bash
$ expense-tracker add --description "Groceries" --amount 50
# Expense added successfully (ID: 1)

$ expense-tracker add --description "Lunch" --amount 20
# Expense added successfully (ID: 2)

$ expense-tracker list
# ID  Date       Description       Amount
# 1   2024-10-03 Groceries          50
# 2   2024-10-03 Lunch              20

$ expense-tracker summary
# Total expenses: $70

$ expense-tracker summary --month 10
# Total expenses for October: $70

$ expense-tracker delete --id 1
# Expense deleted successfully

$ expense-tracker summary
# Total expenses: $20
```
