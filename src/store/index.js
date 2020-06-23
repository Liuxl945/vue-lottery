import Vue from 'vue'
import Vuex from 'vuex'

const state = {
    indexState: 1,
}

const mutations = {
    ["SET_INDEX"](state, index) {
        state.indexState = index
    }
}

Vue.use(Vuex)


export default new Vuex.Store({
  mutations,
  state,
})
