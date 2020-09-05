"use strict";
exports.__esModule = true;
exports.defaultProductsDevelopment = void 0;
var StripePrice_1 = require("@/app/models/subscription/StripePrice");
exports.defaultProductsDevelopment = [
    {
        stripeId: "",
        tier: 1,
        title: "Standard 🔥",
        description: "Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque amet indis perferendis blanditiis repellendus etur quidem assumenda.",
        prices: [
            {
                stripeId: "",
                type: StripePrice_1.PriceType.Recurring,
                billingPeriod: StripePrice_1.BillingPeriod.Monthly,
                price: 9,
                currency: "usd",
                trialDays: 14,
                active: true
            },
            {
                stripeId: "",
                type: StripePrice_1.PriceType.Recurring,
                billingPeriod: StripePrice_1.BillingPeriod.Yearly,
                price: 50,
                currency: "usd",
                trialDays: 30,
                active: true,
                priceBefore: 60
            },
            {
                stripeId: "",
                type: StripePrice_1.PriceType.Recurring,
                billingPeriod: StripePrice_1.BillingPeriod.Monthly,
                price: 170,
                currency: "mxn",
                trialDays: 14,
                active: true
            },
            {
                stripeId: "",
                type: StripePrice_1.PriceType.Recurring,
                billingPeriod: StripePrice_1.BillingPeriod.Yearly,
                price: 1001,
                currency: "mxn",
                trialDays: 30,
                active: true
            },
        ],
        features: [
            { key: "maxNumberOfUsers", value: "1", included: true },
            { key: "feature2", value: "", included: true },
            { key: "feature3", value: "", included: true },
            { key: "feature4", value: "", included: true },
            { key: "feature5", value: "", included: false },
        ],
        badge: "",
        active: true
    },
    {
        stripeId: "",
        tier: 2,
        title: "Enterprise 🚀",
        description: "Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque amet indis perferendis blanditiis repellendus etur quidem assumenda.",
        prices: [
            {
                stripeId: "",
                type: StripePrice_1.PriceType.Recurring,
                billingPeriod: StripePrice_1.BillingPeriod.Monthly,
                price: 29,
                currency: "usd",
                trialDays: 0,
                product: undefined,
                active: true
            },
            {
                stripeId: "",
                type: StripePrice_1.PriceType.Recurring,
                billingPeriod: StripePrice_1.BillingPeriod.Yearly,
                price: 290,
                currency: "usd",
                trialDays: 0,
                product: undefined,
                active: true
            },
        ],
        features: [
            { key: "maxNumberOfUsers", value: "5", included: true },
            { key: "feature2", value: "", included: true },
            { key: "feature3", value: "", included: true },
            { key: "feature4", value: "", included: true },
            { key: "feature5", value: "", included: false },
        ],
        badge: "recommended",
        active: true
    },
    {
        stripeId: "",
        tier: 3,
        title: "Unlimited 🦄",
        description: "Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque amet indis perferendis blanditiis repellendus etur quidem assumenda.",
        prices: [
            {
                stripeId: "",
                type: StripePrice_1.PriceType.OneTime,
                billingPeriod: StripePrice_1.BillingPeriod.Once,
                price: 399,
                currency: "usd",
                trialDays: 0,
                product: undefined,
                active: true,
                priceBefore: 499
            },
            {
                stripeId: "",
                type: StripePrice_1.PriceType.OneTime,
                billingPeriod: StripePrice_1.BillingPeriod.Once,
                price: 336,
                currency: "eur",
                trialDays: 0,
                product: undefined,
                active: true,
                priceBefore: 421
            },
        ],
        features: [
            { key: "unlimitedUsers", value: "", included: true },
            { key: "feature2", value: "", included: true },
            { key: "feature3", value: "", included: true },
            { key: "feature4", value: "", included: true },
            { key: "feature5", value: "", included: true },
        ],
        badge: "",
        active: true
    },
];
