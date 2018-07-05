<template>
  <div class="row justify-between panel" v-if="$q.platform.is.desktop">
    <control />
    <description />
  </div>
</template>

<script>
import control from './control'
import description from './description'

export default {
  name: 'GamePanel',
  props: ['team'],
  components: {
    control,
    description
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
      return this.team === meta.ally ? '' : 'items-end'
    }
  }
}
</script>

<style scoped lang="stylus">
.panel {
  padding-top: 20px;
}
</style>
