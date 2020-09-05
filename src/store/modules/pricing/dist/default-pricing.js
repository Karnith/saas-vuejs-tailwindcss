"use strict";
exports.__esModule = true;
exports.defaultProducts = void 0;
var StripePrice_1 = require("@/app/models/subscription/StripePrice");
exports.defaultProducts = [
    {
        stripeId: "prod_HtGXX2r8nL4C6C",
        tier: 1,
        title: "Standard 🔥",
        description: "Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque amet indis perferendis blanditiis repellendus etur quidem assumenda.",
        prices: [
            {
                stripeId: "price_1HJU0mDoGxBcf8G2gCMykdW1",
                type: StripePrice_1.PriceType.Recurring,
                billingPeriod: StripePrice_1.BillingPeriod.Monthly,
                price: 9,
                currency: "usd",
                trialDays: 14,
                active: true
            },
            {
                stripeId: "price_1HJU0nDoGxBcf8G2DktUkg3W",
                type: StripePrice_1.PriceType.Recurring,
                billingPeriod: StripePrice_1.BillingPeriod.Yearly,
                price: 90,
                currency: "usd",
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
        stripeId: "prod_HtGYPFZuDgmGSM",
        tier: 2,
        title: "Enterprise 🚀",
        description: "Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque amet indis perferendis blanditiis repellendus etur quidem assumenda.",
        prices: [
            {
                stripeId: "price_1HJU1IDoGxBcf8G2xAJsr8UF",
                type: StripePrice_1.PriceType.Recurring,
                billingPeriod: StripePrice_1.BillingPeriod.Monthly,
                price: 29,
                currency: "usd",
                trialDays: 0,
                product: undefined,
                active: true
            },
            {
                stripeId: "price_1HJU1IDoGxBcf8G2eOukIu6e",
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
        stripeId: "prod_HtGZTsJFkj6VM7",
        tier: 3,
        title: "Unlimited 🦄",
        description: "Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque amet indis perferendis blanditiis repellendus etur quidem assumenda.",
        prices: [
            {
                stripeId: "price_1HJU1uDoGxBcf8G216V95r4U",
                type: StripePrice_1.PriceType.OneTime,
                billingPeriod: StripePrice_1.BillingPeriod.Once,
                price: 399,
                currency: "usd",
                trialDays: 0,
                product: undefined,
                active: true
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
