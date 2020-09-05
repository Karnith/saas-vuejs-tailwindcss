import server from "../../plugins/axios-helper";
import store from "@/store";
import {
  getExpensesResponse,
  getCategoriesResponse,
} from "../core/FakeExpenseServer";
import { expenseService } from "../core/ExpenseService";

export class CrudService {
  tenantDatabase: boolean = true;
  controller: string;
  constructor(controller: string, tenantDatabase: boolean) {
    this.controller = controller + "";
    this.tenantDatabase = tenantDatabase;
  }
  get(id: number = 0) {
    const url = this.controller + (id > 0 ? "/find/" + id : "");
    return new Promise((resolve, reject) => {
      const timeOut = id === 0 ? 1500 : 0;
      setTimeout(() => {
        if (this.controller === "Expense") {
          if (id > 0) {
            const expense = getExpensesResponse.data.find(
              (f) => f.id?.toString() === id.toString()
            );
            console.log("expense: " + expense);
            resolve({ data: expense });
          } else {
            resolve(getExpensesResponse);
          }
        } else if (this.controller === "TransactionCategory") {
          resolve(getCategoriesResponse);
        }
      }, timeOut);
      return;
      // unavailable on frontend, implement your own or get netcoresaas.com
      server
        .get(url, {
          masterDatabase: !this.tenantDatabase,
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  post(object: any) {
    return new Promise((resolve, reject) => {
      resolve({ data: object });
      return;
      // unavailable on frontend, implement your own or get netcoresaas.com
      server
        .post(this.controller, object, {
          masterDatabase: !this.tenantDatabase,
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  put(id?: number, object?: any) {
    return new Promise((resolve, reject) => {
      resolve({ data: object });
      return;
      // unavailable on frontend, implement your own or get netcoresaas.com
      server
        .put(this.controller + "?id=" + id, object, {
          masterDatabase: !this.tenantDatabase,
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  delete(id?: number) {
    return new Promise((resolve, reject) => {
      server
        .delete(this.controller + "?id=" + id, {
          masterDatabase: !this.tenantDatabase,
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
