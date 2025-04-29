const expenses = []

function addExpensesFn(name, amount, type) {
    if (!name) {
        throw new Error("Invalid input name");
    }
    if (isNaN(amount) || amount <= 0 ) {
        throw new Error("Invalid input amount")
    }
    if (!type) {
        throw new Error("Invalid input type")
    }
    if(!isNaN(name)){
        throw new Error('Title cannot be a number')
    }
    const item = {
        id: expenses.length + 1,
        name,
        amount: parseFloat(amount),
        type
      };
    
      expenses.push(item);
}

function deleteExpensesFn(id) {
    const index = expenses.findIndex(exp => exp.id === id);
    if (index !== -1) {
        expenses.splice(index, 1);
    } else {
        throw new Error(`Expense with id ${id} not found.`);
    }

}
export { expenses, addExpensesFn, deleteExpensesFn}
