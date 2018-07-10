<template>
  <q-card class="q-mb-md">
    <q-card-main>
      Choose Skills
      <q-field label="Choose Skill">
        <q-select v-model="skillActive" :options="skillsOption" />
      </q-field>
    </q-card-main>

    <!-- <q-card-title>
      <div class="row content-center items-center justify-between">
        <p class="q-ma-none">Skill</p>
        <q-btn label="Save Skill" color="primary" @click="save" icon="save" />
      </div>
    </q-card-title> -->
    <q-card-main v-if="skillActive !== false">
      <q-field label="Name">
        <q-input v-model="model.name" />
      </q-field>
      <q-field label="Description">
        <q-input v-model="model.description" type="textarea" float-label="Skill Description" :max-height="100" rows="7" />
      </q-field>
      <q-field label="Picture">
        <q-input v-model="model.picture" helper="Paste Image URL" />
      </q-field>
      <q-field label="Classes" helper="To show on description">
        <q-input v-model="model.classes" />
      </q-field>

      <q-card-separator class="q-my-md" />

      <q-field label="Persistence" helper="Instant, Action, Control, Aura, Passive">
        <q-select v-model="model.persistence" :options="persistence" />
      </q-field>

      <q-field label="Class" helper="Physical, Mental, Energy, Affliction, Strategic">
        <q-select v-model="model.class" :options="classes" />
      </q-field>

      <q-field label="Target" helper="Self, All Allies, Other Allies, Enemy, All Enemies, Random Enemy">
        <q-select v-model="model.target" :options="target.skill" />
      </q-field>

      <q-field label="Cooldown" helper="Minimum 0" type="number">
        <q-input v-model="model.cooldown" />
        <q-btn label="Evaluator" color="primary" @click="evaluate({model: 'cooldown'})" icon="save" />
      </q-field>

      <q-field label="Cost" helper="">
        <q-input v-model="model.cost.g" float-label="Green" />
        <q-input v-model="model.cost.r" float-label="Red" />
        <q-input v-model="model.cost.b" float-label="Blue" />
        <q-input v-model="model.cost.w" float-label="White" />
        <q-input v-model="model.cost.rd" float-label="Random" />
      </q-field>

      <q-field label="Harmful">
        <q-toggle v-model="model.isHarmful" />
      </q-field>
      <q-field label="Allowed">
        <q-toggle v-model="model.isAllowed" />
        <q-btn label="Condition" color="primary" @click="evaluate({model: 'isAllowed'})" icon="save" />
      </q-field>
      <q-field label="Store">
        <q-toggle v-model="model.isStore" />
      </q-field>
      <q-field label="Ignore Invul">
        <q-toggle v-model="model.isIgnoreInvul" />
      </q-field>
      <q-field label="Ignore Stun">
        <q-toggle v-model="model.isIgnoreStun" />
      </q-field>
      <q-field label="Ignore Counter">
        <q-toggle v-model="model.isIgnoreCounter" />
      </q-field>

      <q-card-separator class="q-my-md" />

      <p>Add Effects</p>
      <q-field label="Effect Name">
        <div class="row col-12 justify-between">
          <!-- <q-input v-model="create.effect" class="col-8" /> -->
          <q-select v-model="create.effect" :options="types" class="col" />
          <q-btn label="Add" color="primary" @click="effect('add')" icon="save" />
        </div>
      </q-field>

      <p v-for="(item, index) in effects" :key="'skill'+skillActive+index">{{item.type}}</p>

      <evaluator ref="evaluator" v-on:send="register"/>
    </q-card-main>
  </q-card>
</template>

<script>
import skill from '../../definitions/skill'
import effect, { types } from '../../definitions/effect'
import target from '../../definitions/target'
import persistence from '../../definitions/persistence'
import classes from '../../definitions/classes'

import evaluator from './evaluator'

export default {
  name: 'BuilderSkills',
  components: {
    evaluator
  },
  data() {
    return {
      types,
      target,
      persistence,
      classes,
      skillActive: false,
      create: {
        effect: ''
      }
    }
  },
  computed: {
    model: function() {
      if (this.skillActive === false) {
        return skill
      } else {
        return this.skills[this.skillActive]
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
    effects: function() {
      console.log(this.char.skills[this.skillActive].effects, this.skillActive)
      return this.char.skills[this.skillActive].effects
    }
  },
  methods: {
    register: function(pkg){
      console.log(pkg)
    },
    evaluate: function(pkg) {
      this.$refs.evaluator.open(pkg)
    },
    save: function() {},
    effect: function(type, pkg) {
      if (type === 'add') {
        let prep = _.cloneDeep(effect)
        prep.type = this.create.effect
        prep.during = 'this turn'
        prep.class = this.char.skills[this.skillActive].class
        let payload = {
          type: 'EFFECT_ADD',
          skill: this.skillActive,
          pkg: prep
        }
        this.$store.commit('builder/effect', payload)
      }
    }
  }
}
</script>

<style>
</style>
