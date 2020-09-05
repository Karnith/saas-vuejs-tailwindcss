import { CrudService } from "../shared/CrudService";

class TransactionCategoryService extends CrudService {
  constructor() {
    super("TransactionCategory", true);
  }
}
export const transactionCategoryService = new TransactionCategoryService();
