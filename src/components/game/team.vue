<template>
  <div>
    <char :team="team" :char="0"></char>
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
    }
  }
}
</script>

<style>
</style>
