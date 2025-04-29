// import test, { describe, beforeEach, expect } from 'node:test';
import { expenses, addExpensesFn, deleteExpensesFn } from '../js/expenses.js';

describe('[expenses]', () => {
    beforeEach(() => {
        expenses.length = 0;
    });

    test('should be defined', () => {
        expect(expenses).toBeDefined();
    });

    test('should be an array', () => {
        expect(Array.isArray(expenses)).toBe(true);
    });

    test('should start empty', () => {
        expect(expenses.length).toBe(0);
    });
});

describe('[addExpensesFn]', () => {
    beforeEach(() => {
        expenses.length = 0;
    });
    test('should be defined', () => {
        expect(addExpensesFn).toBeDefined();
    });
    test('should be a function', () => {
        expect(typeof addExpensesFn).toBe("function");
    });
    test('should add a valid expense', () => {
        addExpensesFn('Groceries', 100, 'Expense');
        expect(expenses.length).toBe(1);
        // expect(expenses[expenses.length - 1]).toBe({
        //     id: 1,
        //     name: 'Groceries',
        //     amount: 100,
        //     type: 'Expense',
        // });
        expect(expenses[0]).toEqual({
            id: 1,
            name: 'Groceries',
            amount: 100,
            type: 'Expense',
        });
    });

    test('should throw error if name is missing', () => {
        expect(() => addExpensesFn('', 100, 'Expense')).toThrow("Invalid input name");
    });

    test('should throw error if amount is invalid', () => {
        expect(() => addExpensesFn('Rent', -50, 'Expense')).toThrow("Invalid input amount");
    });

    test('should throw error if name is a number', () => {
        expect(() => addExpensesFn(123, 1000, 'Expense')).toThrow("Title cannot be a number");
    });

    test('should throw error if type is missing', () => {
        expect(() => addExpensesFn('Salary', 1000, '')).toThrow("Invalid input type");
    });
});

describe('[deleteExpensesFn]', () => {
    beforeEach(() => {
        expenses.length = 0;
        addExpensesFn("Lunch", 50, "Expense");
        addExpensesFn("Salary", 1000, "Income");
    });
    test('should be defined', () => {
        expect(deleteExpensesFn).toBeDefined();
    });
    test('should be a function', () => {
        expect(typeof deleteExpensesFn).toBe("function");
    });
    test('should handle deleting multiple items', () => {
        deleteExpensesFn(1);
        deleteExpensesFn(2);
        expect(expenses.length).toBe(0);
    });
    test('should delete the correct item by id', () => {
        expect(expenses.length).toBe(2);
        deleteExpensesFn(1);
        expect(expenses.length).toBe(1);
        //expect(expenses[0].name).toBe("Salary");
    });
    test('should throw an error if the id does not exist', () => {
        expect(() => deleteExpensesFn(1000)).toThrowError('Expense with id 1000 not found.');
    });
});




