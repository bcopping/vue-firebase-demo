const state = {
    loggedOn : false,
    user: {
        
    }
};

const mutations = {
    'SET_LOGIN' (state, payload) {
        state.loggedOn = payload;
        console.log(payload)
    },
    'SET_USER' (state, payload) {
        state.user = payload;
        console.log('from store user is', state.user.displayName);
    }
};

const actions = {
    setLogin: ({commit}, payload) => {
        commit('SET_LOGIN', payload);
    },
    setUser: ({commit}, payload) => {
        console.log(payload);
        commit('SET_USER', payload);
    }
};

const getters = {
    login: state => {
        console.log('here get state login', state.loggedOn);
        return state.loggedOn
    },
    user: state => {
        console.log('here getter: get user');
        return state.user
    },
    uid: state => {
        console.log('here get state uid', state.user.uid);
        return state.user.uid
    }
};


export default {
    state,
    mutations,
    actions,
    getters
};