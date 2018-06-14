<template>
  <div class="column text-center">    
    <p @click="end">PRESS WHEN READY</p>
    <p>TURN {{state.turn}}</p>
    <p>G{{energy.g}} B{{energy.b}} R{{energy.r}} W{{energy.w}} T{{energy.t}}</p>
  </div>
</template>

<script>
import io from 'socket.io-client'
const socket = io('http://localhost:3000')

export default {
  name: 'Monitor',
  data() {
    return {}
  },
  computed: {
    state: function() {
      return this.$store.getters['game/state']
    },
    energy: function() {
      //Define State
      let state = this.$store.getters['game/state']
      let energy = state.odd.energy
      let total = energy.g + energy.b + energy.r + energy.w
      //Define Action
      let action = this.$store.getters['game/action']
      let skills = action.filter(x => x.turnid === state.turnid)
      let cost = {
        g: 0,
        b: 0,
        r: 0,
        w: 0,
        rd: 0
      }
      //Logic
      for(let skill of skills){
        let char = state[skill.caster.team].char[skill.caster.id]
        let skillCost = char.skills[skill.skill].cost

        cost.g += skillCost.g
        cost.b += skillCost.b
        cost.r += skillCost.r
        cost.w += skillCost.w
        cost.rd += skillCost.rd
      }    
      //Return
      let costTotal = cost.g + cost.b + cost.r + cost.w + cost.rd
      return {
        g: energy.g - cost.g,
        b: energy.b - cost.b,
        r: energy.r - cost.r,
        w: energy.w - cost.w,
        t: total - costTotal
      }
    }
  },
  methods: {
    end: function() {
      let payload = {
        action: this.$store.getters['game/action'],
        redeem: this.$store.getters['game/redeem']
      }
      socket.emit('battle', payload)
    }
  }
}
</script>

<style>
</style>
