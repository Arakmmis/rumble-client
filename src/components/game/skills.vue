<template>
  <div class="row skill__wrapper" v-if="show">
    <div v-for="(skill, index) in skills" :key="index" class="skill">
      <!-- <p>{{skill.name}}</p> -->
      <img v-if="status(char,skill,team)" v-on:click="queue({char, team, skill: index})" :src="skill.picture" />
      <img v-if="!status(char,skill,team)" v-on:click="description({char, team, skill: index})" :src="skill.picture" class="skill__img--disabled" />
      <p v-if="cooldownShow(skill, team)" class="cooldown flex flex-center">{{skill.counter}}</p>
      <q-tooltip :anchor="layout.tooltipAnchor" :self="layout.tooltipSelf" v-if="$q.platform.is.mobile">
        <p class="q-ma-none">Test</p>
      </q-tooltip>
    </div>
  </div>
</template>

<style scoped lang="stylus">
.disabled {
  opacity: 0.6;
}

.skill__wrapper {
  background: rgba(255, 255, 255, 0.8);
  padding: 5px;
  border-radius: 2px;
  // border: 1px solid #222;

  @media screen and (max-width: 800px) {
    padding: 2px;
  }
}

.skill {
  background: #fff;
  position: relative;
  width: 60px;
  height: 60px;
  margin: 0 5px;
  border: 1px solid #222;

  @media screen and (max-width: 800px) {
    width: 40px;
    height: 40px;
  }
}

.skill img {
  width: 100%;
  height: 100%;
}

.skill__img--disabled {
  opacity: 0.6;
}

.cooldown {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  font-size: 40px;
}
</style>

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
    skills: function() {
      return this.state[this.team].chars[this.char].skills
    },
    layout: function() {
      let meta = this.$store.getters['game/meta']
      let layoutLeft = {
        wrapper: 'row q-pl-sm status--wrapper',
        tooltipAnchor: 'bottom left',
        tooltipSelf: 'top left'
      }
      let layoutRight = {
        wrapper: 'row reverse q-pr-sm status--wrapper',
        tooltipAnchor: 'bottom right',
        tooltipSelf: 'top right'
      }
      return this.team === meta.ally ? layoutLeft : layoutRight
    },
    show: function() {
      let meta = this.$store.getters['game/meta']
      let settings = this.$store.getters['game/settings'].skills
      if (this.team === meta.ally) {
        return true
      } else {
        return settings
      }
    },
    energy: function() {
      return function(team) {
        //Define from Getters
        let state = this.$store.getters['game/state']
        let action = this.$store.getters['game/action']
        //Exchange
        let exchangeOffer = this.$store.getters['game/exchange'].offer
        let exchangeReceive = this.$store.getters['game/exchange'].receive
        let exchange = { ...exchangeOffer }
        let receive = {
          g: 0,
          r: 0,
          b: 0,
          w: 0
        }
        if (exchangeReceive !== '') {
          receive[exchangeReceive] = receive[exchangeReceive] + 1
        }
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
          let char = state[skill.caster.team].chars[skill.caster.char]
          let skillCost = char.skills[skill.skill].cost

          cost.g += skillCost.g
          cost.r += skillCost.r
          cost.b += skillCost.b
          cost.w += skillCost.w
          cost.rd += skillCost.rd
        }
        //Return
        let costTotal = cost.g + cost.r + cost.b + cost.w + cost.rd
        let exchangeTotal = exchange.g + exchange.r + exchange.b + exchange.w
        let receiveTotal = receive.g + receive.r + receive.b + receive.w
        return {
          g: energy.g - cost.g - exchange.g + receive.g,
          r: energy.r - cost.r - exchange.r + receive.r,
          b: energy.b - cost.b - exchange.b + receive.b,
          w: energy.w - cost.w - exchange.w + receive.w,
          total: total - costTotal - exchangeTotal + receiveTotal
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
      this.description(pkg)
    },
    description: function(pkg) {
      let payload = {
        type: 'SKILL',
        pkg: {
          mode: 'skill',
          ...pkg
        }
      }
      this.$store.commit('game/desc', payload)
    },
    status: function(char, skill, team) {
      //Define from Getters
      let state = this.$store.getters['game/state']
      let meta = this.$store.getters['game/meta']
      let action = this.$store.getters['game/action']
      //Define
      let details = state[team].chars[char]
      let energy = this.energy(team)
      let cost = skill.cost
      let costTotal = cost.g + cost.r + cost.b + cost.w + cost.rd
      let turn = state.turn % 2 === 0 ? 'even' : 'odd'
      let inQueue = action.some(
        x =>
          x.caster.char === char &&
          x.caster.team === team &&
          x.turnid === state.turnid
      )
      //Basic Condition
      if (turn !== team || team !== meta.ally || inQueue || !skill.active) {
        return false
      }
      //Advance Condition
      // if (details.status.onState.some(x => x.type === 'stun')) {
      //   return false
      // }
      // if (!skill.isAllowed) {
      //   return false
      // }
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
    },
    cooldownShow: function(skill, team) {
      let meta = this.$store.getters['game/meta']
      if (meta.ally === team && skill.isCooldown) {
        return true
      }
      return false
    }
  }
}
</script>
