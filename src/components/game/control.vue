<template>
  <div class="column justify-between button--wrapper col-4">
    <p class="button">SURRENDER</p>
    <p class="button" @click="setSettings('skills')">{{settings.skills ? 'HIDE' : 'SHOW'}} SKILLS</p>
    <p class="button">MUTE SOUND</p>
  </div>
</template>

<script>
export default {
  name: 'GameControl',
  props: ['team'],
  components: {},
  data() {
    return {}
  },
  computed: {
    state: function() {
      return this.$store.getters['game/state']
    },
    layout: function() {
      let meta = this.$store.getters['game/meta']
      return this.team === meta.ally ? '' : 'items-end'
    },
    settings: function(type) {
      return this.$store.getters['game/settings']
    }
  },
  methods: {
    setSettings: function(type) {
      if (type === 'skills') {
        this.$store.commit('game/settings', { type: 'SKILLS' })
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.button {
  background: #fff;
  margin-bottom: 5px;
  padding: 5px;
  font-size: 14px;
  border-radius: 5px;
  text-align: center;
  border: 1px solid #222;
}

.button:last-child {
  margin-bottom: 0px;
}

.button--wrapper {
  width: 100%;
  padding: 0px 10px;
  // max-width: 200px;
}
</style>
