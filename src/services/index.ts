import { authenticationService } from "./system/AuthenticationService";
import { adminService } from "./system/AdminService";
import { tenantService } from "./system/TenantService";
import { tenantUsersService } from "./system/TenantUsersService";
import { userService } from "./system/UserService";
import { resourceService } from "./system/ResourceService";

import { stripeService } from "./subscription/StripeService";
import { stripeAdminService } from "./subscription/StripeAdminService";

import { expenseService } from "./core/ExpenseService";
import { transactionCategoryService } from "./core/TransactionCategoryService";

class Services {
  authentication = authenticationService;
  admin = adminService;
  tenants = tenantService;
  tenantUsers = tenantUsersService;
  users = userService;
  resources = resourceService;
  stripe = stripeService;
  stripeAdmin = stripeAdminService;
  expenses = expenseService;
  transactionCategories = transactionCategoryService;
}

export default new Services();
