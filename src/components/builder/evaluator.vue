<template>
  <q-modal v-model="opened">
    {{parent.model}}
    <q-field label="Condition">
      <q-select v-model="model.condition" :options="condition" />
    </q-field>

    <q-field label="Subject">
      <q-select v-model="model.comparison" :options="skills" v-if="model.condition.owner === 'effect'" />
    </q-field>

    <q-field label="Evaluator">
      <q-select v-model="model.evaluator" :options="evaluator.int" v-if="model.condition.eval === 'int'" />
      <q-select v-model="model.evaluator" :options="evaluator.bool" v-if="model.condition.eval === 'bool'" />
    </q-field>

    <q-field label="Comparison">
      <q-select v-model="model.comparison" :options="options.int" v-if="model.condition.eval === 'int'" />
    </q-field>

    <q-field label="Value">
      <q-input v-model="model.value" />
    </q-field>

    <q-btn color="primary" @click="close()" label="Close" />
  </q-modal>
</template>

<script>
import { condition, evaluator } from '../../definitions/evaluator'
import _ from 'lodash'

export default {
  data() {
    return {
      opened: false,
      parent: {},
      model: {
        condition: '',
        evaluator: '',
        comparison: '',
        value: true
      },
      options: {
        int: [
          { label: '0', value: 0 },
          { label: '1', value: 1 },
          { label: '2', value: 2 },
          { label: '3', value: 3 },
          { label: '4', value: 4 },
          { label: '5', value: 5 },
          { label: '10', value: 10 },
          { label: '15', value: 15 },
          { label: '20', value: 20 },
          { label: '30', value: 30 },
          { label: '35', value: 35 },
          { label: '40', value: 40 },
          { label: '45', value: 45 },
          { label: '50', value: 50 },
          { label: '55', value: 55 },
          { label: '60', value: 60 },
          { label: '65', value: 65 },
          { label: '70', value: 70 },
          { label: '75', value: 75 },
          { label: '80', value: 80 },
          { label: '85', value: 85 },
          { label: '90', value: 90 },
          { label: '95', value: 95 },
          { label: '100', value: 100 }
        ]
      }
    }
  },
  computed: {
    skills: function() {
      let skills = this.$store.getters['builder/skills']
      let effects = _.concat(skills)
      return effects.map(x => {
        return {
          label: x.name,
          value: x.name
        }
      })
    },
    condition: function() {
      return condition.map(x => {
        return {
          label: x.type + ' of ' + x.owner,
          value: x
        }
      })
    },
    evaluator: function() {
      let evaluators = evaluator.map(x => {
        return {
          label: x.type,
          value: x.type,
          self: x
        }
      })

      return {
        int: evaluators.filter(x => x.self.eval === 'int'),
        bool: evaluators.filter(x => x.self.eval === 'bool')
      }
    }
  },
  methods: {
    open: function(pkg) {
      this.opened = true
      this.parent = pkg
    },
    close: function() {
      let condition = {
        type: 'condition',
        subject: { ...this.model.condition },
        evaluator: this.model.evaluator,
        comparison: this.model.comparison,
        value: this.model.value
      }
      let payload = {
        pkg: condition,
        model: this.parent.model
      }
      this.opened = false
      this.$emit('send', payload)
    }
  }
}
</script>