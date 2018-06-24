<template>
  <q-card class="q-mb-md">
    <q-card-title>
      <p>Result</p>
    </q-card-title>
    <q-card-main>
      <q-input v-model="result" type="textarea" float-label="Textarea" :min-height="500" rows="7" />
    </q-card-main>

    <q-page-sticky position="top-right" :offset="[18, 18]">

    </q-page-sticky>
  </q-card>
</template>

<script>
export default {
  name: 'BuilderResult',
  data() {
    return {}
  },
  computed: {
    result: {
      get: function() {
        return JSON.stringify(this.$store.getters['builder/char'], null, 4)
      },
      set: function(value) {}
    }
  },
  methods: {}
}
</script>

<style>
</style>
