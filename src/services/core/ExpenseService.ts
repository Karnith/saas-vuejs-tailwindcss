import { CrudService } from "../shared/CrudService";

class ExpenseService extends CrudService {
  constructor() {
    super("Expense", true);
  }
}
export const expenseService = new ExpenseService();
