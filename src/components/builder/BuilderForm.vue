<template>
  <q-field label="Duration" helper="Minimum 1, or -1 for Indefinite">
    <q-input v-model="model[property][0].value" />
    <q-btn label="Condition" color="primary" @click="evaluate({model: property})" icon="save" />
    <div v-for="(item, index) in model[property]" :key="index">
      <p>{{item}}</p>
    </div>
    <evaluator ref="evaluator" v-on:send="register" />
  </q-field>
</template>

<script>
import evaluator from './evaluator'

export default {
  name: 'BuilderForm',
  props: {
    model: Object,
    property: String
  },
  components: {
    evaluator
  },
  data() {
    return {}
  },
  created: function() {
    console.log(this.model)
  },
  computed: {},
  methods: {
    evaluate: function(pkg) {
      this.$refs.evaluator.open(pkg)
    },
    register: function(payload) {
      console.log(payload)
      this.model[payload.model].push(payload.pkg)
      this.$emit('send', payload)
    }
  }
}
</script>

<style>
</style>
