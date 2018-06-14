<template>
  <div class="row">
    <div class="column">
      <img @click="target({char, team})" :src="state[team].char[char].picture" />
      <p>{{details.hp}}</p>
    </div>
    <skills :char="char" :team="team"></skills>
  </div>
</template>

<script>
import skills from './skills'

export default {
  name: 'GameChar',
  props: ['team', 'char'],
  components: {
    skills
  },
  data() {
    return {}
  },
  computed: {
    state: function() {
      return this.$store.getters['game/state']
    },
    details: function() {
      return this.state[this.team].char[this.char]
    }
  },
  methods: {
    target: function(pkg) {
      let payload = {
        type: 'TARGET_REGISTER',
        pkg: pkg
      }
      this.$store.commit('game/target', payload)
    }
  }
}
</script>

<style>
</style>
