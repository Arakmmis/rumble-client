<template>
  <div class="column text-center">    
    <p v-if="active" @click="redeem">PRESS WHEN READY</p>
    <p v-if="!active">OPPONENT'S TURN</p>
    <p>TURN {{state.turn}}</p>
    <p>G{{energy.g}} R{{energy.r}} B{{energy.b}} W{{energy.w}} T{{energy.t}}</p>
    <redeem ref="redeem"></redeem>
  </div>
</template>

<script>
//Components
import redeem from './redeem'

export default {
  name: 'Monitor',
  components: {
    redeem
  },
  data() {
    return {}
  },
  computed: {
    state: function() {
      return this.$store.getters['game/state']
    },
    meta: function() {
      return this.$store.getters['game/meta']
    },
    active: function() {
      let turn = this.state.turn % 2 === 0 ? 'even' : 'odd'
      return this.meta.ally === turn ? true : false
    },
    energy: function() {
      //Define from Getters
      let state = this.$store.getters['game/state']
      let meta = this.$store.getters['game/meta']
      let action = this.$store.getters['game/action']
      //Define
      let energy = state[meta.ally].energy
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
  },
  methods: {
    redeem: function() {
      this.$refs.redeem.open()
    }
  }
}
</script>

<style>
</style>
