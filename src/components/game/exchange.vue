<template>
  <q-modal minimized v-model="opened" class="column text-center">
    <div class="redeem">
      <p>Choose
        <b>{{5 - offer.total}}</b> Random Energies</p>
      <p>
        <span class="energy__g"></span> {{energy.g - offer.g}}
        <button @click="plus('g')" :disabled="energy.g - offer.g === 0 || offer.total === 5">+</button>
        <button @click="minus('g')" :disabled="offer.g === 0">-</button> {{offer.g}}</p>
      <p>
        <span class="energy__r"></span> {{energy.r - offer.r}}
        <button @click="plus('r')" :disabled="energy.r - offer.r === 0 || offer.total === 5">+</button>
        <button @click="minus('r')" :disabled="offer.r === 0">-</button> {{offer.r}}</p>
      <p>
        <span class="energy__b"></span> {{energy.b - offer.b}}
        <button @click="plus('b')" :disabled="energy.b - offer.b === 0 || offer.total === 5">+</button>
        <button @click="minus('b')" :disabled="offer.b === 0">-</button> {{offer.b}}</p>
      <p>
        <span class="energy__w"></span> {{energy.w - offer.w}}
        <button @click="plus('w')" :disabled="energy.w - offer.w === 0 || offer.total === 5">+</button>
        <button @click="minus('w')" :disabled="offer.w === 0">-</button> {{offer.w}}</p>
      <div class="row justify-center q-mb-md">
        <span @click="choose('g')" class="energy__g q-mx-sm"></span>
        <span @click="choose('r')" class="energy__r q-mx-sm"></span>
        <span @click="choose('b')" class="energy__b q-mx-sm"></span>
        <span @click="choose('w')" class="energy__w q-mx-sm"></span>
      </div>
      <div class="row justify-around">
        <q-btn color="primary" @click="done" label="Exchange" />
        <q-btn color="secondary" @click="cancel" label="Cancel" />
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
export default {
  name: 'GameRedeem',
  data() {
    return {
      opened: false,
      exchange: {
        receive: '',
        offer: {
          g: 0,
          r: 0,
          b: 0,
          w: 0
        }
      }
    }
  },
  computed: {
    offer: function() {
      let offer = this.exchange.offer
      let total = offer.g + offer.r + offer.b + offer.w
      return {
        ...offer,
        total: total
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
        t: total - costTotal
      }
    }
  },
  methods: {
    plus: function(energy) {
      let offer = this.exchange.offer
      offer[energy] += 1
    },
    minus: function(energy) {
      let offer = this.exchange.offer
      offer[energy] -= 1
    },
    choose: function(energy) {
      this.exchange.receive = energy
    },
    open: function() {
      this.opened = true
    },
    done: function() {
      let exchange = {
        receive: this.exchange.receive,
        offer: this.exchange.offer
      }
      let payload = {
        type: 'EXCHANGE',
        pkg: exchange
      }
      this.$store.commit('game/exchange', payload)
      this.opened = false
      this.exchange = {
        receive: '',
        offer: {
          g: 0,
          r: 0,
          b: 0,
          w: 0
        }
      }
    },
    cancel: function() {
      this.exchange = {
        receive: '',
        offer: {
          g: 0,
          r: 0,
          b: 0,
          w: 0
        }
      }
      this.opened = false
    }
  }
}
</script>