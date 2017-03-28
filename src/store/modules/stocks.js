const state = {
    stocks: [
            {
            id: 1,
            name: 'harley davidson',
            price: 300,
        },
        {
            id:2,
            name: 'apple',
            price: 1500,
        }  
    ]
};

const mutations = {
    'MUTATION_NAME' (state, payload) {
        console.log(payload)
    }
};

const actions = {
    actionName: ({commit}, payload) => {
        commit('MUTATION_NAME', payload);
    }
};

const getters = {
    stocks: state => {
        return state.stocks
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};