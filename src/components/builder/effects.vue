<template>
  <q-card class="q-mb-md">
    <q-card-main>
      Choose Skills
      <q-field label="Choose Skill">
        <q-select v-model="skillActive" :options="skillsOption" />
      </q-field>
      <q-field label="Choose Effect" v-if="skillActive !== false">
        <q-select v-model="effectActive" :options="effectsOption" />
      </q-field>
    </q-card-main>
    <!-- <q-card-title>
      <p>Effect</p>
      <q-btn label="Save Effect" color="primary" @click="save" icon="save" />
    </q-card-title> -->
    <q-card-main v-if="skillActive !== false && effectActive !== false">
      <q-field label="Name" helper="For internal purpose only">
        <q-input v-model="model.name" />
      </q-field>
      <q-field label="Type" helper="Effect type">
        <q-select v-model="model.type" :options="types" />
      </q-field>
      <q-field label="Value" helper="Value">
        <q-input v-model="model.val" />
      </q-field>
      <q-field label="Target" helper="Self, All Allies, Other Allies, Enemy, All Enemies, Random Enemy">
        <q-select v-model="model.target" :options="target" />
      </q-field>

      <q-field label="Duration" helper="Minimum 1, or -1 for Indefinite">
        <q-input v-model="model.duration" />
      </q-field>

      <q-field label="During" helper="Effect take place during This Turn effect is applied or Next's Turn after effect is applied?">
        <q-select v-model="model.during" :options="during" />
      </q-field>

      <q-field label="Class" helper="Physical, Mental, Energy, Affliction, Strategic">
        <q-select v-model="model.class" :options="classes" />
      </q-field>

      <q-field label="Scope" helper="Set Class/Skill specific effect">
        <div class="row col-12">
          <q-select class="col-4" v-model="model.scope[0]" float-label="Type" :options="scope.type" />
          <q-select class="col-4" v-model="model.scope[1]" multiple :options="makeOptions(scope.options[0])" v-if="model.scope[0] === 'classes'" />
          <q-select class="col-4" v-model="model.scope[1]" multiple :options="makeOptions(scope.options[1])" v-if="model.scope[0] === 'types'" />
          <q-select class="col-4" v-model="model.scope[1]" multiple :options="skillsOption" v-if="model.scope[0] === 'skills'" />
          <q-select class="col-4" v-model="model.scope[2]" :options="makeOptions(scope.detail[0])" v-if="model.scope[0] === 'classes' || model.scope[0] === 'types'" />
          <q-select class="col-4" v-model="model.scope[2]" :options="makeOptions(scope.detail[1])" v-if="model.scope[0] === 'skills'" />
        </div>
      </q-field>

      <q-field label="Condition" helper="Effect activate if condition satisfied">
        <q-input v-model="model.condition" />
      </q-field>

      <q-field label="Stack">
        <q-checkbox v-model="model.isStack" />
      </q-field>
      <q-field label="Invisible">
        <q-checkbox v-model="model.isInvisible" />
      </q-field>
      <q-field label="Multi">
        <q-checkbox v-model="model.isMulti" />
      </q-field>
      <q-field label="Unremovable">
        <q-checkbox v-model="model.isUnremovable" />
      </q-field>
      <q-field label="Marking">
        <q-checkbox v-model="model.isMarking" />
      </q-field>
      <q-field label="Harmful">
        <q-checkbox v-model="model.isHarmful" />
      </q-field>
      <q-field label="Piercing">
        <q-checkbox v-model="model.isPiercing" />
      </q-field>
      <q-field label="Active">
        <q-checkbox v-model="model.isActive" />
      </q-field>
      <q-field label="No Counter">
        <q-checkbox v-model="model.isNoCounter" />
      </q-field>

      <q-card-separator class="q-my-md" />

      <p>Add Side-effects</p>
      <q-field label="Effect Name">
        <div class="row col-12 justify-between">
          <q-input v-model="create.after" class="col-8" />
          <q-btn label="Add" color="primary" @click="after('add')" icon="save" />
        </div>
      </q-field>

      <p v-for="(item, index) in afters" :key="index">{{item.name}}</p>
    </q-card-main>
  </q-card>
</template>

<script>
import effect, { types } from '../../definitions/effect'
import target from '../../definitions/target'
import persistence from '../../definitions/persistence'
import classes from '../../definitions/classes'
import during from '../../definitions/during'
import scope from '../../definitions/scope'

export default {
  name: 'BuilderEffects',
  data() {
    return {
      types,
      target,
      persistence,
      classes,
      during,
      scope,
      skillActive: false,
      effectActive: false,
      create: {
        after: ''
      }
    }
  },
  computed: {
    model: function() {
      if (this.skillActive === false) {
        return effect
      } else {
        return this.skills[this.skillActive].effects[this.effectActive]
      }
    },
    char: function() {
      return this.$store.getters['builder/char']
    },
    skills: function() {
      return this.char.skills
    },
    skillsOption: function() {
      return this.skills.map((x, i) => {
        return {
          label: x.name,
          value: i
        }
      })
    },
    effectsOption: function() {
      return this.skills[this.skillActive].effects.map((x, i) => {
        return {
          label: x.name,
          value: i
        }
      })
    },
    afters: function() {
      return this.char.skills[this.skillActive].effects[this.effectActive].after
    }
  },
  methods: {
    save: function() {},
    makeOptions: function(options) {
      return options.map(x => {
        return {
          label: x,
          value: x
        }
      })
    },
    after: function(type, pkg) {
      if (type === 'add') {
        let prep = _.cloneDeep(effect)
        prep.name = this.create.after
        let payload = {
          type: 'AFTER_ADD',
          skill: this.skillActive,
          effect: this.effectActive,
          pkg: prep
        }
        this.$store.commit('builder/after', payload)
      }
    }
  }
}
</script>

<style>
</style>
