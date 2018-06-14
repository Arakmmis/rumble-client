<template>
  <div class="column text-center">
    
    <p>PRESS TO END TURN</p>
    <p>TURN 1</p>
    <p @click="test">{{marcel}}</p>
  </div>
</template>

<script>
export default {
  name: 'Monitor',
  data() {
    return {
      marcel: 'test'
    }
  },
  methods: {
    test: function(){    
      let getGet = this.$store.getters['game/getTesting']('boo')
      this.marcel = getGet
      console.log(this.$store.state)
    }
  }
  // computed: {
  //   testing: {
  //     get() {
  //       return this.$store.state.testing
  //     },
  //     set(val) {
  //       this.$store.commit('showcase/updateDrawerState', val)
  //     }
  //   }
  // }
}
</script>

<style>
</style>
