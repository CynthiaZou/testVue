import Vue from 'vue'
import Vuex from './tvuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 0,
  },
  mutations: {
    add(state){
      state.counter++;
    }
  },
  actions: {
    add({ commit }) {
      setTimeout(() => {
        commit('add')
      }, 1000);
    }
  },
  modules: {

  },
  getters: {
    doubleCounter(state) {
      return state.counter * 2;
    }
  }
})