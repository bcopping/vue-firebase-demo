import Vue from 'vue';

export const loadData = ({commit}) => {
    console.log('load server');
    Vue.http.get('test.json')
        .then(response => response.json())
        .then(data => {
            if (data) {
                
                const stocks = data.stocks;
                const funds = data.funds;
                const stockPortfolio = data.stockPortfolio;
                
                const portfolio = {
                    stockPortfolio,
                    funds
                }
                console.log(stocks);
                commit('SET_STOCKS', stocks);
                
                commit('LOAD_PORTFOLIO', portfolio);
            }
        })
}