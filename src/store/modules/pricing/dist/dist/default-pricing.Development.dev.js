"use strict";

exports.__esModule = true;
exports.defaultProductsDevelopment = void 0;

var Product_1 = require("@/app/models/subscription/StripeProduct");

var Feature_1 = require("@/app/models/subscription/Feature");

var Price_1 = require("@/app/models/subscription/StripePrice");

var defaultCurrency = "usd";
exports.defaultProductsDevelopment = [new Product_1["default"](1, "Standard 🔥", "Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque amet indis perferendis blanditiis repellendus etur quidem assumenda.", "border-orange-300 bg-orange-100 inline-flex px-4 py-1 rounded-full text-sm leading-5 font-semibold tracking-wide uppercase border text-indigo-600", [{
  id: "price_1HJTXGD4effBJvI8KH5pL8yT",
  type: Price_1.PriceType.Recurring,
  billingPeriod: Price_1.BillingPeriod.Monthly,
  price: 9,
  currency: defaultCurrency,
  trialDays: 14,
  product: undefined
}, {
  id: "price_1HJTXGD4effBJvI8iMHZaweA",
  type: Price_1.PriceType.Recurring,
  billingPeriod: Price_1.BillingPeriod.Yearly,
  price: 90,
  currency: defaultCurrency,
  trialDays: 30,
  product: undefined
}], [new Feature_1["default"]("Feature 1", true), new Feature_1["default"]("Feature 2", true), new Feature_1["default"]("Feature 3", true), new Feature_1["default"]("Feature 4", false), new Feature_1["default"]("Feature 5", false)], false, 1), new Product_1["default"](2, "Enterprise 🚀", "Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque amet indis perferendis blanditiis repellendus etur quidem assumenda.", "border-green-300 bg-green-100 inline-flex px-4 py-1 rounded-full text-sm leading-5 font-semibold tracking-wide uppercase border text-indigo-600", [{
  id: "price_1HJTXnD4effBJvI8eHgzIoFt",
  type: Price_1.PriceType.Recurring,
  billingPeriod: Price_1.BillingPeriod.Monthly,
  price: 29,
  currency: defaultCurrency,
  trialDays: 0,
  product: undefined
}, {
  id: "price_1HJTXoD4effBJvI8EJSPmNwj",
  type: Price_1.PriceType.Recurring,
  billingPeriod: Price_1.BillingPeriod.Yearly,
  price: 290,
  currency: defaultCurrency,
  trialDays: 0,
  product: undefined
}], [new Feature_1["default"]("Feature 1", true), new Feature_1["default"]("Feature 2", true), new Feature_1["default"]("Feature 3", true), new Feature_1["default"]("Feature 4", true), new Feature_1["default"]("Feature 5", false)], true, 2), new Product_1["default"](3, "Unlimited 🦄", "Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque amet indis perferendis blanditiis repellendus etur quidem assumenda.", "border-indigo-300 bg-indigo-100 inline-flex px-4 py-1 rounded-full text-sm leading-5 font-semibold tracking-wide uppercase border text-indigo-600", [{
  id: "price_1HJTY8D4effBJvI81KaKNmzm",
  type: Price_1.PriceType.OneTime,
  billingPeriod: Price_1.BillingPeriod.Once,
  price: 399,
  currency: defaultCurrency,
  trialDays: 0,
  product: undefined
}], [new Feature_1["default"]("Feature 1", true), new Feature_1["default"]("Feature 2", true), new Feature_1["default"]("Feature 3", true), new Feature_1["default"]("Feature 4", true), new Feature_1["default"]("Feature 5", true)], false, 99)];