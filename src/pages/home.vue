<template>
  <q-page class="flex flex-center home--background">
    <div class="column items-center">
      <img alt="Quasar logo" src="https://i.imgur.com/QB06Zdr.png" width="500px;">
      <img @click="$router.push('/admin/builder')" :src="isHover === false ? button : buttonHover" @mouseover="isHover = !isHover" @mouseout="isHover = !isHover" width="200px">
    </div>
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
</style>

<script>
export default {
  name: 'PageIndex',
  data: function(){
    return{
      button: 'https://i.imgur.com/TD1W01X.png',
      buttonHover: 'https://i.imgur.com/mBosSxP.png',
      isHover: false
    }
  }
}
</script>
