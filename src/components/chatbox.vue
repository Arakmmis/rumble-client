<template>
    <q-layout-footer>
        <demo-tabs v-if="$q.theme === 'ios'" />
        <q-toolbar :inverted="$q.theme === 'ios'" class="chatbox">
            <!-- <q-btn flat round dense icon="menu" @click="left = !left" aria-label="Toggle menu on left side" /> -->
            <span @click="exit">Exit</span>
            <!-- <q-btn flat round dense icon="menu" @click="right = !right" aria-label="Toggle menu on right side" /> -->
        </q-toolbar>
    </q-layout-footer>
</template>

<script>
export default {
  name: 'Chatbox',
  data() {
    return {}
  },
  methods: {
    exit: function() {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="stylus">
.chatbox {
    min-height: 20px;
    padding: 10px;
    font-size: 14px;

    @media screen and (max-width: 800px) {
        font-size: 12px;
        padding: 2px 5px;
    }
}
</style>
