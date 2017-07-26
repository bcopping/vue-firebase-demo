

//var _ = require('lodash/core')
import filter from 'lodash/filter'
import uniq from 'lodash/uniq'

import * as firebase from 'firebase/app';

const state = {
    invoices: [],
    invoicesFiltered: [],
    companies: [],
    invoicesCompanies: [],
    invoicesFilterActive: false,
    invoicesTradingYear: [],
    invoicesTradingYearActive: false,
    invoicesViewingTradingYear: ''
};

const mutations = {

    'SET_INVOICES' (state, payload) {
        state.invoices = payload;
        console.log('STATE INV = ', state.invoices);
    },
    'FILTER_INVOICE_COMPANY'(state, payload){
        if(state.invoicesTradingYearActive == true){
            state.invoicesFiltered = filter(state.invoicesTradingYear, {company: payload});
        }
        else {
            state.invoicesFiltered = filter(state.invoices, {company: payload});
        }

        state.invoicesFilterActive = true;
    },
    'FILTER_INVOICE_TRADING_YEAR'(state, payload){
        state.invoicesTradingYear = filter(state.invoices, {tradingYear: Number(payload)});
        state.invoicesTradingYearActive = true;
        state.invoicesViewingTradingYear = payload;
        console.log('viewing YEAR ---', state.invoicesViewingTradingYear);
        //state.invoicesFilterActive = true;
    },
    'REMOVE_FILTER_INVOICES'(state){
        state.invoicesFiltered = [];
        state.invoicesFilterActive = false;
    },
    'SHOW_ALL_INVOICES'(state){
        state.invoicesTradingYearActive = false;
    },
    //gets the invoice companies and number of items in each type
    'SET_INVOICE_COMPANIES' (state) {

        //push all types into expeseTypesOnly
        state.invoicesCompanies = [];

        let array_elements = []
        let companies = []
        var invoices

        if (state.invoicesTradingYearActive === true){
            invoices = state.invoicesTradingYear
        }
        else {
            invoices = state.invoices
        }
        state.companies = [];

        state.invoices.forEach(function(payload){
            let x = payload.company;
            state.companies.push(x);
            state.companies = uniq(state.companies);
        });
        invoices.forEach(function(payload){
            let x = payload.company;
            array_elements.push(x);
        });

        array_elements.sort();

        let current = null;
        let cnt = 0;

        for (let i = 0; i < array_elements.length; i++) {

            if (array_elements[i] != current) {
                if (cnt > 0) {
                    companies.push({company:current, count:cnt})
                }
                current = array_elements[i];
                cnt = 1;
            } else {
                cnt++;
            }
        }
        if (cnt > 0) {

            companies.push({company:current, count:cnt})
        }

       state.invoicesCompanies = companies;
    }
};

const actions = {
    setInvoices: ({commit}, payload) => {
        commit('SET_INVOICES', payload);
    },
    filterInvoiceTradingYear: ({commit}, payload) => {
        commit('FILTER_INVOICE_TRADING_YEAR', payload)
    },
    filterByInvoiceCompany: ({commit}, payload) => {
        commit('FILTER_INVOICE_COMPANY', payload)
    },
    removeFilterInvoices: ({commit}) => {
        commit('REMOVE_FILTER_INVOICES');
    },
    setInvoiceCompanies: ({commit}) => {
        console.log('set inv companies');
        commit('SET_INVOICE_COMPANIES')
    },
    showAllInvoices: ({commit}, payload) => {
        commit('SHOW_ALL_INVOICES')
    }
};

const getters = {

    invoices: state => {
       return state.invoices
    },
    invoicesLength: state => {
       return state.invoices.length
    },
    invoicesFiltered: state => {
       return state.invoicesFiltered
    },
    invoicesViewingTradingYear: state => {
        return state.invoicesViewingTradingYear
    },
    //returns an array only of invoice amounts
    invoiceAmountsAry: state => {
        const invoices = state.invoices;
        let invoicesOnly = [];

        invoices.forEach(function(invoices){
            var x = invoices.amount;
            invoicesOnly.push(x);
        });

        return invoicesOnly
    },
    invoiceAmountsVATAry: state => {
        const invoices = state.invoices;
        let invoicesOnly = [];

        invoices.forEach(function(invoices){
            var x = invoices.amountVAT;
            invoicesOnly.push(x);
        });

        return invoicesOnly
    },
    //returns an array only of invoice amounts
    filteredInvoiceAmountsAry: state => {
        const invoicesFiltered = state.invoicesFiltered;
        let invoicesOnly = [];

        invoicesFiltered.forEach(function(invoicesFiltered){
            var x = invoicesFiltered.amount;
            invoicesOnly.push(x);
        });

        return invoicesOnly
    },
    //returns an array only of inv VAT amounts
    filteredInvoiceAmountsVATAry: state => {
        const invoicesFiltered = state.invoicesFiltered;
        let invoicesOnly = [];

        invoicesFiltered.forEach(function(invoicesFiltered){
            var x = invoicesFiltered.amountVAT;
            invoicesOnly.push(x);
        });
        return invoicesOnly
    },
    //returns an array only of invoice amounts
    tradingYearInvoiceAmountsAry: state => {
        const invoicesFiltered = state.invoicesTradingYear;
        let invoicesOnly = [];

        invoicesFiltered.forEach(function(invoicesFiltered){
            var x = invoicesFiltered.amount;
            invoicesOnly.push(x);
        });

        return invoicesOnly
    },
    //returns an array only of invoice amounts
    tradingYearInvoiceAmountsVATAry: state => {
        const invoicesFiltered = state.invoicesTradingYear;
        let invoicesOnly = [];

        invoicesFiltered.forEach(function(invoicesFiltered){
            var x = invoicesFiltered.amountVAT;
            invoicesOnly.push(x);
        });

        return invoicesOnly
    },
    //returns an array of expense types only
    companies: state => {
        return state.companies
    },
    //returns an array of expense types only
    invoicesCompanies: state => {
        return state.invoicesCompanies
    },
    invoicesFilterActive: state => {
        return state.invoicesFilterActive
    },
    invoicesTradingYearActive: state => {
        return state.invoicesTradingYearActive
    },
    invoicesTradingYear: state => {
        return state.invoicesTradingYear
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
