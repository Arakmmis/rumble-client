<template>
  <q-card class="q-mb-md">
    <q-card-main>
      Choose Skills
      <q-field label="Choose Skill">
        <q-select v-model="skillActive" :options="skillsOption" />
      </q-field>
    </q-card-main>

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

      <q-card-separator class="q-my-md" />

      <q-field label="Persistence" helper="Instant, Action, Control, Aura, Passive">
        <q-select v-model="model.persistence[0].value" :options="persistence" />
      </q-field>

      <q-field label="Class" helper="Physical, Mental, Energy, Affliction, Strategic">
        <q-select v-model="model.class[0].value" :options="classes" />
      </q-field>

      <q-field label="Target" helper="Self, All Allies, Other Allies, Enemy, All Enemies, Random Enemy">
        <q-select v-model="model.target[0].value" :options="target.skill" />
      </q-field>

      <q-field label="Cooldown" helper="Minimum 0" type="number">
        <q-input v-model="model.cooldown[0].value" />
        <q-btn label="Condition" color="primary" @click="evaluate({model: 'cooldown'})" icon="save" />
        <div v-for="(item, index) in model.cooldown" :key="'cooldown'+index">
          <p v-if="item.type === 'condition'">When {{item.subject.type}} of {{item.subject.owner}} is {{item.evaluator}} {{item.comparison}}, this will be {{item.value}} -
            <span>delete</span>
          </p>
        </div>
      </q-field>

      <q-field label="Cost" helper="">
        <q-input v-model="model.cost.g[0].value" float-label="Green" />
        <q-input v-model="model.cost.r[0].value" float-label="Red" />
        <q-input v-model="model.cost.b[0].value" float-label="Blue" />
        <q-input v-model="model.cost.w[0].value" float-label="White" />
        <q-input v-model="model.cost.rd[0].value" float-label="Random" />
      </q-field>

      <q-field label="Harmful">
        <q-toggle v-model="model.isHarmful[0].value" />
      </q-field>
      <q-field label="Allowed">
        <q-toggle v-model="model.isAllowed[0].value" />
        <q-btn label="Condition" color="primary" @click="evaluate({model: 'isAllowed'})" icon="save" />
        <div v-for="(item, index) in model.isAllowed" :key="'isAllowed'+index">
          <p v-if="item.type === 'condition'">When {{item.subject.type}} of {{item.subject.owner}} is {{item.evaluator}} {{item.comparison}}, this will be {{item.value}} -
            <span>delete</span>
          </p>
        </div>
      </q-field>
      <q-field label="Store">
        <q-toggle v-model="model.isStore[0].value" />
      </q-field>
      <q-field label="Ignore Invul">
        <q-toggle v-model="model.isIgnoreInvul[0].value" />
      </q-field>
      <q-field label="Ignore Stun">
        <q-toggle v-model="model.isIgnoreStun[0].value" />
      </q-field>
      <q-field label="Ignore Counter">
        <q-toggle v-model="model.isIgnoreCounter[0].value" />
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

      <evaluator ref="evaluator" v-on:send="register" />
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
import BuilderForm from './BuilderForm'

export default {
  name: 'BuilderSkills',
  components: {
    evaluator,
    BuilderForm
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
      return this.char.skills[this.skillActive].effects
    }
  },
  methods: {
    register: function(payload) {
      console.log(payload)
      this.model[payload.model].push(payload.pkg)
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
