import Vue from 'vue'
import Vuex from 'vuex'

const state = {
    indexState: 1, //哪个场景
    defeat_num: 0, //【击败多少人】
    code: "", //【code码 抽奖接口需要提供该code码】
    prize_id: undefined, //【code码 抽奖接口需要提供该code码】
    score: 0, //分数
    img1load: false,
    img2load: false,
    userInfo: undefined
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
    },
    ["SET_DEFEAT_NUM"](state, num) {
        state.defeat_num = num
    },
    ["SET_CODE"](state, str) {
        state.code = str
    },
    ["SET_PRIZE_ID"](state, num) {
        state.prize_id = num
    },
    ["SET_USER_INFO"](state, info) {
        state.userInfo = info
    }
}

Vue.use(Vuex)


export default new Vuex.Store({
  mutations,
  state,
})
