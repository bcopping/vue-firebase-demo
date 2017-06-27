import * as firebase from 'firebase/app';

const state = {
    people: [],
    addPersonVisible: false
   
};

const mutations = {
    'SET_PEOPLE' (state, payload) {
        state.people = payload; 
    },
    'SET_PERSON_MODAL' (state, payload) {
        state.addPersonVisible = payload; 
    },
};

const actions = {
    setPeople: ({commit}, payload) => {
        commit('SET_PEOPLE', payload);
    },

    setPersonModal: ({commit}, payload) => {
        commit('SET_PERSON_MODAL', payload);
    },
};

const getters = {
    people: state => {
       return state.people
    },
    addPersonVisible: state => {
        return state.addPersonVisible
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};