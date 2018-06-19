<template>
  <q-page class="flex flex-center profile--background">
    <q-card class="profile">
      <q-card-title>
        Leciel
        <q-btn flat dense round @click="test" aria-label="Menu" v-if="!leftDrawerOpen">
          <q-icon name="edit" />
        </q-btn>
      </q-card-title>
      <q-card-separator />
      <q-card-main>
        <p><b>WIN(S)</b> 1</p>
        <p>Lose(s) 1</p>
        <p>Streak(s) 1</p>
        <p>Game Played 1</p>
      </q-card-main>
    </q-card>
  </q-page>
</template>

<style scoped>
.profile {
  width: 100%;
  max-width: 600px;
  background: rgba(255, 255, 255, 0.8);
}
.profile--background {
  background-image: url('https://i.ytimg.com/vi/iqA13s0YLyY/maxresdefault.jpg');
}
</style>

<script>
export default {
  name: 'MainWelcome',
  methods: {
    test: function() {}
  }
}
</script>
