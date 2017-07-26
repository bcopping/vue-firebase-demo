const state = {
    VAT: 20,
    companyDetails: {

    },
    tradingYear: '',
    totalYearsTrading: '',
    tradingYearsArry: [],
    firstTaxYear: '',
    selectTaxYear: [],
    homeLoaded: false,
    editCompany: false,
};

const mutations = {
    'SET_COMPANY_DETAILS' (state, payload) {
        state.companyDetails = payload;
    },
    'SET_HOME_LOADED' (state, payload) {
        state.homeLoaded = payload;
        console.log('LOADED STATE', state.homeLoaded)
    },
    'SET_TRADING_YEAR' (state, payload){
        alert(payload);
        state.tradingYear = payload

    },
    'SET_TOTAL_YEARS_TRADING' (state, payload){
        console.log('total years trading is -------------', payload)
        state.totalYearsTrading = payload

    },
    'SET_TRADING_YEAR_ARRAY' (state) {

        state.tradingYearsArry = [];
        //simple array structure [1, 2, 3] etc...

        state.selectTaxYear = [];



        const d = state.companyDetails.date.split("-")
        /*
            if incorp month is after apr first then tax year should be the same as incorp year
        */
        if(d[1] > 4) {
            state.firstTaxYear = parseInt(d[2]) - 1
        }
        //else set first tax year to the year before
        else {
            state.firstTaxYear = parseInt(d[2]) - 2
        }

        let i = 1;
        for (i = 1; i <= state.totalYearsTrading; i++) {
            state.tradingYearsArry.push(i);
        }

        for (i = 1; i <= state.totalYearsTrading + 1; i++) {
            state.selectTaxYear.push({year: i, taxYear: state.firstTaxYear + i });
        }
    },
    'SET_EDIT_COMPANY' (state, payload) {
        state.editCompany = payload
    }

};

const actions = {

    setCompanyDetails: ({commit}, payload) => {
        commit('SET_COMPANY_DETAILS', payload);
    },
    setTradingYear: ({commit}, payload) => {
        commit('SET_TRADING_YEAR', payload);
    },
    setTradingYearArray: ({commit}) => {
        commit('SET_TRADING_YEAR_ARRAY');
    },
    setTotalYearsTrading: ({commit}, payload) => {
        commit('SET_TOTAL_YEARS_TRADING', payload);
    },
    setHomeLoaded: ({commit}, payload) => {
        console.log('set home loaded', payload)
        commit('SET_HOME_LOADED', payload)
    },
    setEditCompany: ({commit}, payload) => {
        commit('SET_EDIT_COMPANY', payload);
    }
};

const getters = {
    VATRate: state => {
       return state.VAT
    },
    companyDetails: state => {
       return state.companyDetails
    },
    tradingYear: state => {
        return state.tradingYear
    },
    tradingYearsArry: state => {
        return state.tradingYearsArry
    },
    selectTaxYear: state => {
        return state.selectTaxYear
    },
    totalYearsTrading: state => {
        return state.totalYearsTrading
    },
    homeLoaded: state => {
        return state.homeLoaded
    },
    editCompany: state => {
        return state.editCompany
    }

};

export default {
    state,
    mutations,
    actions,
    getters
};
