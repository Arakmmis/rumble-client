<template>
  <div :class="layout.wrapper">
    <div class="status" v-for="(item, index) of queue(char, team)" :key="'queue'+index">
      <img :src="item.picture" />
      <q-tooltip :anchor="layout.tooltipAnchor" :self="layout.tooltipSelf">
        <p class="tooltip">
          {{item.char}}'s {{item.skill}}
        </p>
      </q-tooltip>
    </div>
    <div class="status" v-for="(item, index) of status" :key="'stauts'+index">
      <img :src="item.picture" />
      <q-tooltip :anchor="layout.tooltipAnchor" :self="layout.tooltipSelf">
        <p v-for="(desc, index) of descriptions(item.parent, item.caster.id, item.caster.team)" :key="index" class="tooltip">
          {{desc}}
        </p>
      </q-tooltip>
    </div>
  </div>
</template>

<style scoped lang="stylus">
.status--wrapper {
  height: 20px;
  margin-bottom: 2px;

  @media screen and (max-width: 800px) {
    height: 15px;
  }
}

.status {
  width: 20px;
  height: 20px;
  border: 1px solid #222;

  @media screen and (max-width: 415px) {
    border: 0px solid #222;
  }

  @media screen and (max-width: 800px) {
    border: 0px solid #222;
    width: 15px;
    height: 15px;
  }
}

.status img {
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
}

.tooltip {
  font-size: 14px;
  margin-bottom: 0px;
}
</style>

<script>
import _ from 'lodash'

export default {
  name: 'GameStatus',
  props: ['team', 'char'],
  components: {},
  data() {
    return {}
  },
  computed: {
    state: function() {
      return this.$store.getters['game/state']
    },
    status: function() {
      let status = this.state[this.team].char[this.char].status
      let allStatus = _.concat(
        status.onAttack,
        status.onReceive,
        status.onSkill,
        status.onState
      )
      allStatus = _.uniqBy(allStatus, v =>
        [v.parent, v.caster.id, v.caster.team].join()
      )
      return allStatus
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
    }
  },
  methods: {
    queue: function(char, team) {
      let action = this.$store.getters['game/action']
      let queue = action.filter(
        x =>
          x.target.id === char &&
          x.target.team === team &&
          x.turnid === this.state.turnid
      )
      return queue.map(x => {
        return {
          picture: this.state[x.caster.team].char[x.caster.id].skills[x.skill]
            .picture,
          skill: this.state[x.caster.team].char[x.caster.id].skills[x.skill]
            .name,
          char: this.state[x.caster.team].char[x.caster.id].name
        }
      })
    },
    descriptions: function(parent, char, team) {
      let status = this.state[this.team].char[this.char].status
      let allStatus = _.concat(
        status.onAttack,
        status.onReceive,
        status.onSkill,
        status.onState
      )
      allStatus = allStatus.filter(
        x =>
          x.parent === parent && x.caster.id === char && x.caster.team === team
      )
      let description = allStatus.map(x => {
        let type = x.type
        switch (type) {
          case 'allow':
            return 'Allow'
            break
          case 'dr':
            return 'Damage Reduction'
            break
          case 'stun':
            return 'Stunned'
            break
          case 'damage':
            return 'Damage for ' + x.duration + ' turns'
            break
          case 'invul':
            return 'Invulnerable'
            break
          case 'buff':
            return 'Damage Increase'
            break
          case 'state':
            return 'State for ' + x.duration + ' turns'
            break
          default:
            return
        }
      })
      return description
    }
  }
}
</script>