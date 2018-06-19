<template>
  <q-modal v-model="opened" minimized content-classes="search--modal">
    <p>AR Engine V2 Demo</p>
    <q-input v-model="player" float-label="Temporary Name" class="q-mb-md" v-if="!searching" maxlength="10"/>
    <p v-if="searching">Searching...</p>
    <div class="row justify-center">
      <q-btn color="primary" @click="search" label="Find Match" class="q-mr-xs" :disable="player === '' || searching" />
      <q-btn color="warning" @click="opened = false" label="Cancel" />
    </div>

  </q-modal>
</template>

<script>
import io from 'socket.io-client'
// const socket = io('http://192.168.1.8:3000')
const socket = io('http://35.231.223.180:3000')
let router

export default {
  data() {
    return {
      opened: false,
      player: '',
      searching: false
    }
  },
  created: function() {
    router = this.$router
  },
  methods: {
    open: function() {
      this.opened = true
    },
    search: function() {
      let payload = {
        player: this.player
      }
      socket.emit('search', payload)
      this.searching = true
    },
    cancel: function(){
      let payload = {
        player: this.player
      }
      socket.emit('cancel', payload)
      this.searching = false
      this.opened = false      
    }
  }
}

socket.on('found', packet => {
  let url = '/game/' + packet.room + '?player=' + packet.player
  router.push(url)
})
</script>

<style lang="stylus">
.search--modal {
  padding: 20px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.8);
}
</style>