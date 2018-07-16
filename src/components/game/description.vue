<template>
  <div class="flex col-8 description--wrapper flex-center">
    <!-- Default -->
    <div class="row description full-width" v-if="description.mode === 'profile'">
      <div>
        <img src="https://i.imgur.com/EqnqvRO.jpg" class="description__img">
      </div>
      <div class="column justify-between col description__info">
        <div class="column">
          <div class="row justify-between">
            <p class="description__title">{{description.name}}</p>
          </div>
          <p class="description__text">Ladder Rank: 1</p>
          <p class="description__text">W/L: 30 - 10</p>
          <p class="description__text">Streak: +3</p>
        </div>
      </div>
    </div>

    <div class="row description full-width" v-if="description.mode === 'char'">
      <div>
        <img :src="description.picture" class="description__img">
      </div>
      <div class="column justify-between col description__info">
        <div class="column">
          <div class="row justify-between">
            <p class="description__title">{{description.name}}</p>
            <div class="row justify-between description__cost">
              <p>ANIME {{description.anime}}</p>
            </div>
          </div>
          <p class="description__text">{{description.description}}</p>
        </div>
        <div class="row justify-between">
          <p class="description__classes">AUTHOR {{description.credit.author}}</p>
          <p class="description__cooldown">PICTURE {{description.credit.picture}}</p>
        </div>
      </div>
    </div>

    <div class="row description full-width" v-if="description.mode === 'skill'">
      <div>
        <img :src="description.picture" class="description__img">
      </div>
      <div class="column justify-between col description__info">
        <div class="column">
          <div class="row justify-between">
            <p class="description__title">{{description.name}}</p>
            <div class="row justify-between description__cost">
              <p>ENERGY</p>
              <span class="energy__g" v-for="i in description.cost.g" :key="'g'+i"></span>
              <span class="energy__r" v-for="i in description.cost.r" :key="'r'+i"></span>
              <span class="energy__b" v-for="i in description.cost.b" :key="'b'+i"></span>
              <span class="energy__w" v-for="i in description.cost.w" :key="'w'+i"></span>
              <span class="energy__rd" v-for="i in description.cost.rd" :key="'rd'+i"></span>
              <p v-if="description.costTotal === 0">none</p>
            </div>
          </div>
          <p class="description__text">{{description.description}}</p>
        </div>
        <div class="row justify-between">
          <p class="description__classes">CLASSES {{description.classes}}</p>
          <p class="description__cooldown">COOLDOWN {{description.cooldown}}</p>
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
    },
    description: function() {
      let meta = this.$store.getters['game/meta']
      let desc = this.$store.getters['game/desc']
      let mode = desc.mode
      if (mode === 'skill') {
        let team = desc.team
        let charIndex = desc.char
        let skillIndex = desc.skill
        let skill = this.state[team].chars[charIndex].skills[skillIndex]
        let classes = _.uniq(skill.effects.map(x => x.class))
        return {
          mode: mode,
          name: skill.name,
          description: skill.description,
          picture: skill.picture,
          classes: skill.persistence+', '+classes.join(', '),
          cost: skill.cost,
          costTotal:
            skill.cost.g +
            skill.cost.r +
            skill.cost.b +
            skill.cost.w +
            skill.cost.rd,
          cooldown: skill.cooldown
        }
      } else if (mode === 'char') {
        let team = desc.team
        let charIndex = desc.char
        let char = this.state[team].chars[charIndex]
        return {
          mode: mode,
          name: char.name,
          description: char.description,
          credit: char.credit,
          anime: char.anime,
          picture: char.picture
        }
      } else {
        let team = desc.team !== '' ? desc.team : meta.ally
        let profile = this.state[team].name
        return {
          mode: mode,
          name: profile
        }
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.description--wrapper {
  background: rgba(255,255,255,0.8);
  padding: 5px 10px;
  border-radius: 5px;
  // border: 1px solid #222;
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
