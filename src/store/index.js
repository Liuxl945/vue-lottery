import Vue from 'vue'
import Vuex from 'vuex'

const state = {
    indexState: 2,
    score: 0,
    img1load: false,
    img2load: false
}

const mutations = {
    ["SET_INDEX"](state, index) {
        state.indexState = index
    },
    ["SET_SCORE"](state, score) {
        state.score = score
    },
    ["SET_IMG1_LOAD"](state, states = false) {
        state.img1load = states
    },
    ["SET_IMG2_LOAD"](state, states = false) {
        state.img2load = states
    }
}

Vue.use(Vuex)


export default new Vuex.Store({
  mutations,
  state,
})
