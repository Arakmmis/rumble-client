<template>
  <q-page class="flex flex-center home--background">
    <div class="column items-center">
      <img alt="Quasar logo" src="https://i.imgur.com/5SdKVB8.png" class="logo">
      <img @click="enter" :src="isHover === false ? button : buttonHover" @mouseover="isHover = !isHover" @mouseout="isHover = !isHover" class="enter">
    </div>
    <search ref='search' />
  </q-page>
</template>

<style scoped lang="stylus">
.home--background {
  background: url('https://i.imgur.com/rPu37ND.jpg') no-repeat center center;
  fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

.logo {
  width: 500px;

  @media screen and (max-width: 800px) {
    width: 300px;
  }
}

.enter {
  width: 200px;

  @media screen and (max-width: 800px) {
    width: 150px;
  }
}
</style>

<script>
import search from 'components/main/search'

export default {
  name: 'PageIndex',
  components: {
    search
  },
  data: function() {
    return {
      button: 'https://i.imgur.com/65DXg5y.png',
      buttonHover: 'https://i.imgur.com/m7I8pgH.png',
      isHover: false
    }
  },
  methods: {
    enter: function() {
      this.$refs.search.open()
    }
  }
}
</script>
