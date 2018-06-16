<template>
  <div :class="layout">
    <div class="column char justify-between">
      <div class="char__img">
        <img v-if="status(char, team)" @click="target({char, team})" :src="state[team].char[char].picture" />
        <img v-if="!status(char, team)" :src="state[team].char[char].picture" class="disabled" />
      </div>
      <div class="char__hp">
        <p>{{details.hp}}</p>
      </div>
    </div>
    <div class="column">
      <status :team="team" :char="char" />
      <div class="row items-center">
        <div class="queue">
          <div v-if="queue('visible',char,team)" class="queue__img">
            <img @dblclick="remove(char,team)" v-if="queue('icon',char,team)" :src="queue('img',char,team)" />
            <img v-if="!queue('icon',char,team)" src="https://i.imgur.com/EB6t4nN.jpg" />
          </div>
        </div>
        <skills :char="char" :team="team"></skills>
      </div>
    </div>
  </div>
</template>

<style scoped lang="stylus">
.char__wrapper {
  margin-bottom: 5px;
}

.char {
  padding: 0px 5px;
  @media screen and (max-width: 800px) {
    padding: 0px 2px;
  }
}

.char__img {
  background: #fff;
  border-radius: 2px;
  border: 1px solid #222;
  width: 75px;
  height: 75px;
  margin-bottom: 2px;

  @media screen and (max-width: 800px) {
    width: 45px;
    height: 45px;
  }
}

.char__img img {
  width: 100%;
  height: 100%;
}

.char__hp {
  background: rgb(68, 255, 0);
  border-radius: 2px;
  border: 1px solid #222;
  text-align: center;
  padding: 2px 5px;
  @media screen and (max-width: 800px) {
    padding: 2px;
  }
}

.char__hp p {
  margin: 0;
  font-size: 12px;
  @media screen and (max-width: 800px) {
    font-size: 8px;
  }
}

.queue {
  padding: 5px;
  @media screen and (max-width: 800px) {
    padding: 2px;
  }
}

.queue__img {
  width: 65px;
  height: 65px;
  border-radius: 5px;
  border: 1px solid #222;

  @media screen and (max-width: 800px) {
    width: 40px;
    height: 40px;
  }
}

.queue__img img {
  border-radius: 5px;
  width: 100%;
  height: 100%;
}
</style>

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
      return this.team === meta.ally
        ? 'row char__wrapper'
        : 'row reverse char__wrapper'
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
