<template>
  <div :class="layout">
    <div class="column">
      <img v-if="status(char, team)" @click="target({char, team})" :src="state[team].char[char].picture" />
      <img v-if="!status(char, team)" :src="state[team].char[char].picture" class="disabled" />
      <p>{{details.hp}}</p>
    </div>
    <div class="column">
      <status :team="team" :char="char" />
      <div class="row">
        <div v-if="queue('visible',char,team)" class="queue">
          <img @dblclick="remove(char,team)" v-if="queue('icon',char,team)" :src="queue('img',char,team)" />
          <img v-if="!queue('icon',char,team)" src="https://i.imgur.com/EB6t4nN.jpg" />
        </div>
        <skills :char="char" :team="team"></skills>
      </div>
    </div>
  </div>
</template>

<script>
import skills from './skills'
import status from './status'

export default {
  name: 'GameChar',
  props: ['team', 'char'],
  components: {
    skills,
    status
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
      return this.team === meta.ally ? 'row' : 'row reverse'
    },
    details: function() {
      return this.state[this.team].char[this.char]
    }
  },
  methods: {
    queue: function(type, char, team) {
      let state = this.$store.getters['game/state']
      let meta = this.$store.getters['game/meta']
      let action = this.$store.getters['game/action']
      let turn = state.turn % 2 === 0 ? 'even' : 'odd'
      let inQueue = action.findIndex(
        x =>
          x.caster.id === char &&
          x.caster.team === team &&
          x.turnid === state.turnid
      )
      if (type === 'visible') {
        return meta.ally === turn && meta.ally === team ? true : false
      }
      if (type === 'icon') {
        return inQueue > -1 ? true : false
      }
      if (type === 'img') {
        if (inQueue > -1) {
          let skill = action[inQueue].skill
          return state[team].char[char].skills[skill].picture
        }
        return 'https://i.imgur.com/EB6t4nN.jpg'
      }
    },
    status: function(char, team) {
      //Define from Getters
      let state = this.$store.getters['game/state']
      let meta = this.$store.getters['game/meta']
      let buffer = this.$store.getters['game/buffer']
      let details = state[team].char[char]
      //Logic
      if (buffer.active) {
        let skill =
          state[buffer.caster.team].char[buffer.caster.id].skills[buffer.skill]
        let target = skill.target
        switch (target) {
          case 'enemy':
            if (details.status.onState.some(x => x.type === 'invul')) {
              return false
            }
            return team === meta.enemy ? true : false
            break
          case 'self':
            return team === meta.ally && buffer.caster.id === char
              ? true
              : false
            break
          default:
            return false
        }
      }
      //Default
      return false
    },
    target: function(pkg) {
      let payload = {
        type: 'TARGET_REGISTER',
        pkg: pkg
      }
      this.$store.commit('game/target', payload)
      this.$store.commit('game/buffer', { type: 'RESET' })
    },
    remove: function(char, team) {
      let state = this.$store.getters['game/state']
      let action = this.$store.getters['game/action']
      let inQueue = action.findIndex(
        x =>
          x.caster.id === char &&
          x.caster.team === team &&
          x.turnid === state.turnid
      )
      let payload = {
        type: 'QUEUE_REMOVE',
        pkg: {
          char,
          team,
          skill: action[inQueue].skill
        }
      }
      this.$store.commit('game/queue', payload)
    }
  }
}
</script>

<style scoped>
.queue {
  width: 65px;
  height: 65px;
}
.queue img {
  width: 100%;
  height: 100%;
}
</style>
