const state = {
    VAT: 20,
    companyDetails: {

    },
    tradingYear: '',
    totalYearsTrading: '',
    tradingYearsArry: [],
    
};

const mutations = {
    'SET_COMPANY_DETAILS' (state, payload) {
        state.companyDetails = payload;
    },
    'SET_TRADING_YEAR' (state, payload){
        state.tradingYear = payload
        console.log('years trading is', state.tradingYear)
    },
    'SET_TOTAL_YEARS_TRADING' (state, payload){
        console.log('total years trading is -------------', payload)
        state.totalYearsTrading = payload

    },
    'SET_TRADING_YEAR_ARRAY' (state) {
        state.tradingYearsArry = [];
        
        let i = 1;
        for (i = 1; i <= state.totalYearsTrading; i++) { 
            state.tradingYearsArry.push(i);
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
        console.log('trading year array', state.tradingYearsArry)
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