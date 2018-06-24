import Vue from 'vue'
import Vuex from 'vuex'

import game from './module-game'
import builder from './module-builder'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    game,
    builder
  }
})

export default store
