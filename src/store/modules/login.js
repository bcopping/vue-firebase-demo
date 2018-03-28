const state = {
  loggedOn: false,
  user: {

  }
};

const mutations = {
  'SET_LOGIN'(state, payload) {
    state.loggedOn = payload;
  },
  'SET_USER'(state, payload) {
    state.user = payload;
  }
};

const actions = {
  setLogin: ({ commit }, payload) => {
    commit('SET_LOGIN', payload);
  },
  setUser: ({ commit }, payload) => {
    commit('SET_USER', payload);
  }
};

const getters = {
  login: state => {
    return state.loggedOn
  },
  //get the user details
  user: state => {
    return state.user
  },
  //get the uid
  uid: state => {
    return state.user.uid
  }
};


export default {
  state,
  mutations,
  actions,
  getters
};
