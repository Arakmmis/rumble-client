<template>
  <q-page class="flex flex-center">
    <div v-if="loaded">
      <monitor></monitor>      

      <div class="row">
        <team :team="'odd'"></team>
        <team :team="'even'"></team>
      </div>      
    </div>    
  </q-page>
</template>

<style>
</style>

<script>
import io from 'socket.io-client'
import monitor from 'components/game/monitor'
import team from 'components/game/team'
let store

export default {
  name: 'GameIndex',
  components: {
    monitor,
    team    
  },
  created: function() {
    store = this.$store
    // this.$store.commit('game/load')
  },
  data() {
    return {}
  },
  computed: {
    loaded: function() {
      return this.$store.getters['game/load']
    }
  }
}

const socket = io('http://localhost:3000')
socket.emit('initiate')

socket.on('initiate', res => {
  let team = res.state.turn % 2 === 0 ? 'even' : 'odd'
  store.commit('game/load', true)
  store.commit('game/action', res.state[team].using)
  store.commit('game/state', res.state)
  store.commit('game/redeem')
})

socket.on('result', res => {
  console.log(res)
  let team = res.state.turn % 2 === 0 ? 'even' : 'odd'
  store.commit('game/load', true)
  store.commit('game/action', res.state[team].using)
  store.commit('game/state', res.state)
  store.commit('game/redeem')
})
</script>
