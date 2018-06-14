<template>
  <div class="row">
    <div v-for="(skill, index) in state[team].char[char].skills" :key="index">
      <!-- <p>{{skill.name}}</p> -->
      <img v-if="status(char,skill,team)" @click="queue({char, team, skill: index})" :src="skill.picture"/>
      <img v-if="!status(char,skill,team)" :src="skill.picture" class="disabled"/>
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
    },
    energy: function() {
      return function(team) {
        //Define from Getters
        let state = this.$store.getters['game/state']
        let action = this.$store.getters['game/action']
        //Define Action
        let energy = state[team].energy
        let total = energy.g + energy.r + energy.b + energy.w
        let skills = action.filter(x => x.turnid === state.turnid)
        let cost = {
          g: 0,
          r: 0,
          b: 0,
          w: 0,
          rd: 0
        }
        //Logic
        for (let skill of skills) {
          let char = state[skill.caster.team].char[skill.caster.id]
          let skillCost = char.skills[skill.skill].cost

          cost.g += skillCost.g
          cost.r += skillCost.r
          cost.b += skillCost.b
          cost.w += skillCost.w
          cost.rd += skillCost.rd
        }
        //Return
        let costTotal = cost.g + cost.r + cost.b + cost.w + cost.rd
        return {
          g: energy.g - cost.g,
          r: energy.r - cost.r,
          b: energy.b - cost.b,
          w: energy.w - cost.w,
          t: total - costTotal
        }
      }
    }
  },
  methods: {
    queue: function(pkg) {
      let payload = {
        type: 'QUEUE_SKILL',
        pkg: pkg
      }
      this.$store.commit('game/queue', payload)
    },
    status: function(char, skill, team) {
      //Define from Getters
      let state = this.$store.getters['game/state']
      let meta = this.$store.getters['game/meta']
      let action = this.$store.getters['game/action']
      //Define
      let details = state[team].char[char]
      let energy = this.energy(team)
      let cost = skill.cost
      let costTotal = cost.g + cost.r + cost.b + cost.w + cost.rd
      let turn = state.turn % 2 === 0 ? 'even' : 'odd'
      let inQueue = action.some(
        x =>
          x.caster.id === char &&
          x.caster.team === team &&
          x.turnid === state.turnid
      )
      //Basic Condition
      if (turn !== team || team !== meta.ally || inQueue) {
        return false
      }
      //Advance Condition
      if (details.status.onState.some(x => x.type === 'stun')) {
        return false
      }
      if (!skill.isAllowed) {
        return false
      }
      if (
        cost.g > energy.g ||
        cost.r > energy.r ||
        cost.b > energy.b ||
        cost.w > energy.w ||
        costTotal > energy.total
      ) {
        return false
      }
      return true
    }
  }
}
</script>

<style>
.disabled {
  opacity: 0.6;
}
</style>
