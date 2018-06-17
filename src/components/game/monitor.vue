<template>
  <div class="row justify-between full-width">
    <profile :team="meta.ally" />
    <div class="column items-center text-center game__monitor">
      <div class="game__monitor--ready">
        <p v-if="active" @click="redeem">PRESS WHEN READY</p>
        <p v-if="!active">OPPONENT'S TURN</p>
      </div>
      <div class="column game__monitor--energy">
        <p>
          <span class="energy__g"></span> {{energy.g}}
          <span class="energy__r"></span> {{energy.r}}
          <span class="energy__b"></span> {{energy.b}}
          <span class="energy__w"></span> {{energy.w}}
          <b>T</b> {{energy.t}}
        </p>
        <p>TURN {{state.turn}} - LADDER</p>
      </div>
      <div class="row game__monitor--exchange">
        <p>ENERGY EXCHANGE</p>
        <p>UNDO</p>
      </div>
      <redeem ref="redeem"></redeem>
    </div>
    <profile :team="meta.enemy" />
  </div>
</template>

<style scoped lang="stylus">
.game__monitor p {
  font-size: 16px;
  display: inline-block;
  margin-bottom: 0px;

  @media screen and (max-width: 800px) {
    font-size: 12px;
  }
}

.game__monitor--ready {
  background: #007efc;
  width: 300px;
  padding: 5px 20px;
  border-radius: 5px;
  border: 1px solid #222;
  color: #fff;
  margin-bottom: 5px;

  @media screen and (max-width: 800px) {
    width: 200px;
    padding: 2px;
  }

  @media screen and (max-width: 375px) {
    width: 120px;
    font-size: 12px !important;
  }
}

.game__monitor--ready p {
  @media screen and (max-width: 375px) {
    font-size: 10px !important;
  }
}

.game__monitor--energy {
  background: rgba(255, 255, 255, 0.8);
  width: 300px;
  padding: 5px 20px;
  border-radius: 5px;
  margin-bottom: 5px;

  @media screen and (max-width: 800px) {
    width: 200px;
  }

  @media screen and (max-width: 375px) {
    width: 120px;
  }
}

.game__monitor--energy p:first-child {
  margin-bottom: 5px;

  @media screen and (max-width: 800px) {
    font-size: 8px;
    margin-bottom: 1px;
  }
}

.game__monitor--energy p:last-child {
  font-size: 12px !important;

  @media screen and (max-width: 800px) {
    font-size: 6px !important;
  }
}

.game__monitor--exchange p:first-child {
  font-size: 12px;
  background-color: rgb(0, 135, 253);
  padding: 2px 10px;
  margin: 0 5px;
  border-radius: 2px;

  @media screen and (max-width: 800px) {
    font-size: 8px;
  }

  @media screen and (max-width: 375px) {
    padding: 2px 2px;
    margin: 0 0px;
  }
}

.game__monitor--exchange p:last-child {
  font-size: 12px;
  background-color: rgb(0, 0, 0, 0.5);
  color: #fff;
  padding: 2px 5px;
  margin: 0 5px;
  border-radius: 2px;

  @media screen and (max-width: 800px) {
    font-size: 8px;
  }
}
</style>

<script>
//Components
import redeem from './redeem'
import profile from './profile'

export default {
  name: 'GameMonitor',
  components: {
    redeem,
    profile
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
