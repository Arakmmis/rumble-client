<template>
  <div :class="layout.wrapper">
    <div :class="layout.details">
      <p class="l--big">Leciel</p>
      <p class="l--small">W/L/S - 10/2/5</p>
    </div>
    <div class="game__profile--img">
      <img src="https://i.imgur.com/JUq1q2f.jpg">
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameProfile',
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
      let layoutLeft = {
        wrapper: 'row game__profile',
        details: 'column items-end game__profile--details'
      }
      let layoutRight = {
        wrapper: 'row reverse game__profile',
        details: 'column items-start game__profile--details'
      }
      return this.team === meta.ally ? layoutLeft : layoutRight
    }
  }
}
</script>

<style scoped lang="stylus">
.game__profile {
  height: 75px;

  @media screen and (max-width: 800px) {
    height: 40px;
  }
}

.game__profile--img {
  height: 75px;
  width: 75px;

  @media screen and (max-width: 800px) {
    height: 40px;
    width: 40px;
  }

  @media screen and (max-width: 375px) {
    height: 30px;
    width: 30px;
  }
}

.game__profile img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  border: 1px solid #222;
}

.game__profile--details {
  padding: 0px 5px;

  @media screen and (max-width: 375px) {
    max-width: 50px;
  }
}

.game__profile--details p {
  background: rgba(255, 255, 255, 0.8);
  margin: 0 0 2px 0;
  padding: 2px 5px;
  border-radius: 2px;

  @media screen and (max-width: 375px) {
    font-size: 8px;
  }

  @media screen and (max-width: 800px) {
    font-size: 10px;
  }
}

.l--small {
  font-size: 12px;

  @media screen and (max-width: 375px) {
    display: none;
  }

  @media screen and (max-width: 800px) {
    font-size: 10px;
  }
}
</style>
