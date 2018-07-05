<template>
  <div class="flex col-8 description--wrapper flex-center">
    <div class="row description">
      <div>
        <img src="https://i.imgur.com/EqnqvRO.jpg" class="description__img">
      </div>
      <div class="column justify-between col description__info">
        <div class="column">
          <div class="row justify-between">
            <p class="description__title">KO PUNCH</p>
            <div class="row justify-between description__cost">
              <p>ENERGY</p>
              <span class="energy__g"></span>
              <span class="energy__g"></span>
              <span class="energy__g"></span>
              <span class="energy__g"></span>
            </div>
          </div>
          <p class="description__text">SAKURA PUNCHES ONE ENEMY WITH ALL HER STRENGTH DEALING 20 DAMAGE TO THEM AND STUNNING THEIR PHYSICAL OR MENTAL SKILLS FOR 1 TURN. DURING 'INNER SAKURA', KO PUNCH DEALS 10 ADDITIONAL DAMAGE.</p>
        </div>
        <div class="row justify-between">
          <p class="description__classes">CLASSES MENTAL</p>
          <p class="description__cooldown">COOLDOWN NONE</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameDescription',
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
    }
  }
}
</script>

<style scoped lang="stylus">
.description--wrapper {
  background: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid #222;
}

.description p {
  margin-bottom: 0px;
}

.description__img {
  border: 1px solid #222;
  width: 74px;
  height: 74px;
}

.description__info {
  padding-left: 10px;
}

.description__title {
  font-size: 12px;
  font-weight: 400;
  padding-bottom: 5px;
}

.description__text {
  font-size: 10px;
  padding-bottom: 5px;
}

.description__cost p {
  font-size: 10px;
  padding-right: 4px;
}

.description__cost span {
  margin: 0px 1px;
}

.description__classes {
  font-size: 10px;
}

.description__cooldown {
  font-size: 10px;
}
</style>
