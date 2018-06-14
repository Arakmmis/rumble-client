<template>
  <div class="row">
    <div v-for="(skill, index) in state[team].char[char].skills" :key="index">
      <!-- <p>{{skill.name}}</p> -->
      <img @click="queue({char, team, skill: index})" :src="skill.picture" class="disabled"/>
    </div>  
  </div>
</template>

<script>
export default {
  name: 'GameSkills',
  props: ['char', 'team'],
  data() {
    return {}
  },
  computed: {
    state: function() {
      return this.$store.getters['game/state']
    }
  },
  methods: {
    queue: function(pkg) {
      let payload = {
        type: 'QUEUE_SKILL',
        pkg: pkg
      }
      this.$store.commit('game/queue', payload)
    }
  }
}
</script>

<style>
  .disabled {
    opacity: 0.6;
  }
</style>
