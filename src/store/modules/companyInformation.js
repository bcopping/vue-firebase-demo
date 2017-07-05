const state = {
    VAT: 20,
    companyDetails: {

    },
    tradingYear: '',
    totalYearsTrading: '',
    tradingYearsArry: [],
    firstTaxYear: '',
    selectTaxYear: [],

};

const mutations = {
    'SET_COMPANY_DETAILS' (state, payload) {
        state.companyDetails = payload;


    },
    'SET_TRADING_YEAR' (state, payload){
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
        /*
        create an array of objects to use for filtering tax years in forcasting
        {
            year: 1,
            taxYear: '2015/2016'
        },
        {
            year: 2,
            taxYear: '2016/2017'
        }
        */

        const d = state.companyDetails.date.split("-")

        if(d[1] > 4) {
            state.firstTaxYear = parseInt(d[2]) - 1
        }
        else {
            state.firstTaxYear = parseInt(d[2]) - 2
        }

        let i = 1;
        for (i = 1; i <= state.totalYearsTrading; i++) {
            state.tradingYearsArry.push(i);
            state.selectTaxYear.push({year: i, taxYear: state.firstTaxYear + i });
        }
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
    totalYearsTrading: state => {
        return state.totalYearsTrading
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
