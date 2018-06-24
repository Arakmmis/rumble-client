<template>
    <q-modal v-model="opened">

        <q-field label="Subject">
            <q-select v-model="model.subject" :options="subject" />
        </q-field>

        <q-field label="Evaluator">
            <q-select v-model="model.evaluator" :options="evaluator" />
        </q-field>

        <q-field label="Comparison">
            <q-input v-model="model.comparison" />
        </q-field>

        <q-field label="Name">
            <q-input v-model="model.name" />
        </q-field>

        <q-btn color="primary" @click="opened = false" label="Close" />
    </q-modal>
</template>

<script>
import { condition, subject, evaluator } from '../../definitions/evaluator'

export default {
  data() {
    return {
      opened: false,
      model: condition
    }
  },
  computed: {
    subject: function() {
      return subject.map(x => {
        return {
          label: x,
          value: x
        }
      })
    },
    evaluator: function() {
      return evaluator.map(x => {
        return {
          label: x,
          value: x
        }
      })
    }
    // model: function() {
    //   return condition
    //   // if (this.skillActive === false) {
    //   //   return skill
    //   // } else {
    //   //   return this.skills[this.skillActive]
    //   // }
    // }
  },
  methods: {
    open: function() {
      this.opened = true
    }
  }
}
</script>