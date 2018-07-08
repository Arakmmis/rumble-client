<template>
  <div :class="layout.wrapper">
    <div class="column char justify-between">
      <div :class="layout.char">
        <img v-if="status(char, team)" @click="target({char, team})" :src="state[team].chars[char].picture" class="char__img--active" />
        <img v-if="!status(char, team)" v-on:click="description({char, team})" :src="state[team].chars[char].picture" class="char__img--disabled" />
      </div>
      <div class="char__hp">
        <p>{{details.hp}}</p>
      </div>
    </div>
    <div class="column">
      <status :team="team" :char="char" />
      <div class="row items-center">
        <div class="queue" v-if="queue('visible',char,team)">
          <div class="queue__img">
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

.char__img img {
  width: 100%;
  height: 100%;
}

.char__img--flip {
  transform: scaleX(-1);
}

.char__img {
  background: #FFFF00;
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

.char__img--active {
  animation: pulse 2s infinite;
}

.char__img--disabled {
  opacity: 1;
}

@keyframes pulse {
  0% {
    opacity: 0.3;
  }

  70% {
    opacity: 1;
  }

  100% {
    opacity: 0.3;
  }
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
  font-size: 10px;

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
  width: 60px;
  height: 60px;
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
      // return this.team === meta.ally
      //   ? 'row char__wrapper'
      //   : 'row reverse char__wrapper'
      if (this.team === meta.ally) {
        return {
          wrapper: 'row char__wrapper',
          char: 'char__img'
        }
      } else {
        return {
          wrapper: 'row reverse char__wrapper',
          char: 'char__img char__img--flip'
        }
      }
    },
    details: function() {
      return this.state[this.team].chars[this.char]
    }
  },
  methods: {
    description: function(pkg) {
      let payload = {
        type: 'CHAR',
        pkg: {
          mode: 'char',
          ...pkg
        }
      }
      this.$store.commit('game/desc', payload)
    },
    queue: function(type, char, team) {
      let state = this.$store.getters['game/state']
      let meta = this.$store.getters['game/meta']
      let action = this.$store.getters['game/action']
      let turn = state.turn % 2 === 0 ? 'even' : 'odd'
      let inQueue = action.findIndex(
        x =>
          x.caster.char === char &&
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
          return state[team].chars[char].skills[skill].picture
        }
        return 'https://i.imgur.com/EB6t4nN.jpg'
      }
    },
    status: function(char, team) {
      //Define from Getters
      let state = this.$store.getters['game/state']
      let meta = this.$store.getters['game/meta']
      let buffer = this.$store.getters['game/buffer']
      let details = state[team].chars[char]
      //Logic
      if (buffer.active) {
        let skill =
          state[buffer.caster.team].chars[buffer.caster.char].skills[
            buffer.skill
          ]
        let target = skill.target

        //Check Marking
        if (
          details.status.onState.some(
            x =>
              x.type === 'mark' &&
              x.parent === buffer.skill &&
              x.caster.char === buffer.caster.char &&
              x.caster.team === buffer.caster.team
          )
        ) {
          return false
        }

        switch (target) {
          case 'enemy':
            if (details.status.onState.some(x => x.type === 'invul')) {
              if (!details.status.onState.some(x => x.type === 'disable')) {
                return false
              }
            }
            return team === meta.enemy ? true : false
            break
          case 'all enemies':
            if (details.status.onState.some(x => x.type === 'invul')) {
              if (!details.status.onState.some(x => x.type === 'disable')) {
                return false
              }
            }
            return team === meta.enemy ? true : false
            break
          case 'ally':
            return team === meta.ally ? true : false
            break
          case 'self':
            return team === meta.ally && buffer.caster.char === char
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
          x.caster.char === char &&
          x.caster.team === team &&
          x.turnid === state.turnid
      )
      let payload = {
        type: 'QUEUE_REMOVE',
        pkg: {
          char,
          team,
          skill: action[inQueue].skill,
          turnid: state.turnid
        }
      }
      this.$store.commit('game/queue', payload)
    }
  }
}
</script>
