<template>
  <q-page class="flex flex-center game--background">
    <div v-if="loaded">
      <monitor></monitor>
      <div class="row justify-center">
        <team :team="meta.ally"></team>
        <team :team="meta.enemy"></team>
      </div>
    </div>
  </q-page>
</template>

<style lang="stylus">
.game--background {
  background: url('https://i.imgur.com/pj0h7aO.jpg') no-repeat center center;
  fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  padding: 5px;
}

.energy__g {
  display: inline-block;
  background-color: rgb(0, 255, 42);
  height: 10px;
  width: 10px;
  border: 0.5px solid #222;

  @media screen and (max-width: 800px) {
    width: 7px;
    height: 7px;
  }
}

.energy__r {
  display: inline-block;
  background-color: rgb(255, 0, 0);
  height: 10px;
  width: 10px;
  border: 0.5px solid #222;

  @media screen and (max-width: 800px) {
    width: 7px;
    height: 7px;
  }
}

.energy__b {
  display: inline-block;
  background-color: rgb(0, 94, 255);
  height: 10px;
  width: 10px;
  border: 0.5px solid #222;

  @media screen and (max-width: 800px) {
    width: 7px;
    height: 7px;
  }
}

.energy__w {
  display: inline-block;
  background-color: rgb(255, 255, 255);
  height: 10px;
  width: 10px;
  border: 0.5px solid #222;

  @media screen and (max-width: 800px) {
    width: 7px;
    height: 7px;
  }
}
</style>

<script>
import io from 'socket.io-client'
const socket = io('http://192.168.1.8:3000')
// const socket = io('http://35.231.223.180:3000')
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
    socket.emit('initiate', { player: this.$route.query.player, room: this.$route.params.room })
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
