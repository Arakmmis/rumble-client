<template>
  <q-page class="flex flex-center">
    <div v-if="loaded">
      <monitor></monitor>
      <div class="row">
        <team :team="meta.ally"></team>
        <team :team="meta.enemy"></team>
      </div>      
    </div>    
  </q-page>
</template>

<style>
</style>

<script>
import io from 'socket.io-client'
const socket = io('http://localhost:3000')
import monitor from 'components/game/monitor'
import team from 'components/game/team'
let store, route

export default {
  name: 'GameIndex',
  components: {
    monitor,
    team
  },
  created: function() {
    store = this.$store
    route = this.$route

    //Make Connection
    socket.emit('initiate', { player:  this.$route.query.player })    
  },
  data() {
    return {}
  },
  computed: {
    loaded: function() {
      return this.$store.getters['game/load']
    },
    meta: function() {
      return this.$store.getters['game/meta']
    }
  }
}

socket.on('initiate', res => {
  console.log(res)
  let team = res.state.turn % 2 === 0 ? 'even' : 'odd'
  store.commit('game/load', true)
  store.commit('game/action', res.state[team].using)
  store.commit('game/state', res.state)
  store.commit('game/meta', res.meta)
  store.commit('game/redeem', { type: 'RESET' })
  store.commit('game/buffer', { type: 'RESET' })
})

socket.on('result', res => {
  console.log(res)
  let team = res.state.turn % 2 === 0 ? 'even' : 'odd'
  store.commit('game/load', true)
  store.commit('game/action', res.state[team].using)
  store.commit('game/state', res.state)
  store.commit('game/redeem', { type: 'RESET' })
  store.commit('game/buffer', { type: 'RESET' })
})
</script>
