<template>
  <q-modal minimized v-model="opened" class="column text-center">
    <div class="redeem">
      <p>Choose
        <b>{{redeem.rd}}</b> Random Energies</p>
      <p>
        <span class="energy__g"></span> {{energy.g - redeem.g}}
        <button @click="plus('g')" :disabled="energy.g - redeem.g === 0 || redeem.rd === 0">+</button>
        <button @click="minus('g')" :disabled="redeem.g === 0">-</button> {{redeem.g}}</p>
      <p>
        <span class="energy__r"></span> {{energy.r - redeem.r}}
        <button @click="plus('r')" :disabled="energy.r - redeem.r === 0 || redeem.rd === 0">+</button>
        <button @click="minus('r')" :disabled="redeem.r === 0">-</button> {{redeem.r}}</p>
      <p>
        <span class="energy__b"></span> {{energy.b - redeem.b}}
        <button @click="plus('b')" :disabled="energy.b - redeem.b === 0 || redeem.rd === 0">+</button>
        <button @click="minus('b')" :disabled="redeem.b === 0">-</button> {{redeem.b}}</p>
      <p>
        <span class="energy__w"></span> {{energy.w - redeem.w}}
        <button @click="plus('w')" :disabled="energy.w - redeem.w === 0 || redeem.rd === 0">+</button>
        <button @click="minus('w')" :disabled="redeem.w === 0">-</button> {{redeem.w}}</p>
      <div class="q-mb-sm">
        <draggable v-model='action'>
          <img v-for="(item, index) in action" :key="index" :src="image(item.caster.team,item.caster.id,item.skill)" class="redeem__img" />
        </draggable>
      </div>
      <div class="row justify-around">
        <q-btn color="primary" @click="end" label="End Turn" />
        <q-btn color="secondary" @click="opened = false" label="Cancel" />
      </div>
    </div>
  </q-modal>
</template>

<style lang="stylus">
.redeem {
  padding: 10px;
}

.redeem p {
  font-size: 14px;
}

.redeem__img {
  padding: 5px;
  height: 50px;
  width: 50px;
}
</style>

<script>
import io from 'socket.io-client'
// const socket = io('http://192.168.1.8:3000')
const socket = io('http://35.231.223.180:3000')
import draggable from 'vuedraggable'

export default {
  name: 'GameRedeem',
  data() {
    return {
      opened: false
    }
  },
  components: {
    draggable
  },
  computed: {
    action: {
      get() {
        return this.$store.getters['game/action']
      },
      set(value) {
        this.$store.commit('game/action', value)
      }
      // return this.$store.getters['game/action']
    },
    redeem: function() {
      //Define from Getters
      let state = this.$store.getters['game/state']
      let redeem = this.$store.getters['game/redeem']
      let action = this.$store.getters['game/action']
      //Define
      let redeemTotal = redeem.g + redeem.r + redeem.b + redeem.w
      let skills = action.filter(x => x.turnid === state.turnid)
      let random = 0
      //Logic
      for (let skill of skills) {
        let char = state[skill.caster.team].char[skill.caster.id]
        let skillCost = char.skills[skill.skill].cost
        random += skillCost.rd
      }
      //Return
      return {
        g: redeem.g,
        r: redeem.r,
        b: redeem.b,
        w: redeem.w,
        rd: random - redeemTotal
      }
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
    image: function(team, char, skill) {
      let state = this.$store.getters['game/state']
      return state[team].char[char].skills[skill].picture
    },
    plus: function(energy) {
      let redeem = this.$store.getters['game/redeem']
      redeem[energy] += 1
      let payload = {
        type: 'MUTATE',
        pkg: redeem
      }
      this.$store.commit('game/redeem', payload)
    },
    minus: function(energy) {
      let redeem = this.$store.getters['game/redeem']
      redeem[energy] -= 1
      let payload = {
        type: 'MUTATE',
        pkg: redeem
      }
      this.$store.commit('game/redeem', payload)
    },
    open: function() {
      this.opened = true
    },
    end: function() {
      if (this.redeem.rd !== 0) {
        return
      }
      let payload = {
        action: this.$store.getters['game/action'],
        redeem: this.$store.getters['game/redeem'],
        room: this.$route.params.room
      }
      socket.emit('battle', payload)
      this.opened = false
    }
  }
}
</script>