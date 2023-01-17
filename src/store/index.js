import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
    checkedUsers: [],
    searchTerm: '',
  },
  getters: {
  },
  mutations: {
    setUsers(state, value) {
      state.users = value;
    },
    setCheckedUsers(state, value) {
      state.checkedUsers = value;
    },
    setSearchTerm(state, value) {
      state.searchTerm = value;
    },
    addUser(state, value) {
      state.users.push(value);
    },
    removeUser(state, id) {
      state.users = state.users.filter((user) => user.id !== id);
    },
  },
  actions: {
  },
  modules: {
  },
});
