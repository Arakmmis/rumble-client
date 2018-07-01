<template>
  <div class="row skill__wrapper">
    <div v-for="(skill, index) in skills" :key="index" class="skill">
      <!-- <p>{{skill.name}}</p> -->
      <img v-if="status(char,skill,team)" @click="queue({char, team, skill: index})" :src="skill.picture" />
      <img v-if="!status(char,skill,team)" :src="skill.picture" class="disabled" />
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
  background: rgba(255, 255, 255, 1);
  padding: 5px;
  border-radius: 2px;
  border: 1px solid #222;

  @media screen and (max-width: 800px) {
    padding: 2px;
  }
}

.skill {
  background: #fff;
  position: relative;
  width: 65px;
  height: 65px;
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
        return {
          g: energy.g - cost.g,
          r: energy.r - cost.r,
          b: energy.b - cost.b,
          w: energy.w - cost.w,
          total: total - costTotal
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
