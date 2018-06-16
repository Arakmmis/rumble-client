<template>
  <div :class="layout">
    <char v-for="(char, index) in state[team].char" :team="team" :char="index" :key="index"></char>
  </div>
</template>

<script>
import char from './char'

export default {
  name: 'GameTeam',
  props: ['team'],
  components: {
    char
  },
  data() {
    return {}
  },
  computed: {
    state: function() {
      return this.$store.getters['game/state']
    },
    layout: function() {
      let meta = this.$store.getters['game/meta']
      return this.team === meta.ally ? '' : 'items-end'
    }
  }
}
</script>

<style>
</style>
