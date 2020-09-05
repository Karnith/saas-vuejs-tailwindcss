import { Expense } from "../../app/models/core/Expense";
import { i18n } from "../../plugins/vue-i18n";

export const expenses: Expense[] = [];

export const transactionCategories = [
  { id: 1, name: i18n.t("models.expense.category") + " 1" },
  { id: 2, name: i18n.t("models.expense.category") + " 2" },
];

for (let index = 1; index <= 10; index++) {
  const expense = {
    id: index,
    uuid: "",
    description: i18n.t("models.expense.object") + " " + index,
    quantity: index,
    price: 1.5,
    amount: 0,
    date: new Date().toString(),
    category:
      index % 2 === 0
        ? transactionCategories[0].id
        : transactionCategories[1].id,
    image: "",
  };
  expense.amount = expense.quantity * expense.price;
  expenses.push(expense);
}

export const getExpensesResponse = {
  data: expenses,
};

export const getCategoriesResponse = {
  data: transactionCategories,
};
