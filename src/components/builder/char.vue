<template>
  <q-card class="q-mb-md">
    <q-card-title>
      <div class="row content-center items-center justify-between">
        <p class="q-ma-none">Character</p>
        <q-btn label="Save Character" color="primary" @click="save" icon="save" />
      </div>
    </q-card-title>
    <q-card-main>
      <q-field label="Name">
        <q-input v-model="model.name" />
      </q-field>
      <q-field label="Description">
        <q-input v-model="model.description" type="textarea" float-label="Textarea" :max-height="100" rows="7" />
      </q-field>
      <q-field label="Author">
        <q-input v-model="model.credit.author" />
      </q-field>
      <q-field label="Pictures Credit" helper="Credit person that made the pictures">
        <q-input v-model="model.credit.pictures" />
      </q-field>

      <q-card-separator class="q-my-md" />

      <p>Create Skills</p>
      <q-field label="Skill Name">
        <div class="row col-12 justify-between">
          <q-input v-model="create.skill" class="col-8" />
          <q-btn label="Add" color="primary" @click="skill('add')" icon="save" />
        </div>
      </q-field>

      <p v-for="(item, index) in skills" :key="index">{{item.name}}</p>

    </q-card-main>

    <q-page-sticky position="top-right" :offset="[18, 18]">

    </q-page-sticky>
  </q-card>
</template>

<script>
import _ from 'lodash'
import char from '../../definitions/char'
import skill from '../../definitions/skill'

export default {
  name: 'BuilderChar',
  data() {
    return {
      model: char,
      create: {
        skill: ''
      }
    }
  },
  computed: {
    skills: function(){
      return this.$store.getters['builder/skills']
    }
  },
  methods: {
    save: function() {
      let payload = this.model
      this.$store.commit('builder/char', payload)
    },
    skill: function(type, pkg) {
      if (type === 'add') {
        let prep = _.cloneDeep(skill)
        prep.name = this.create.skill
        let payload = {
          type: 'SKILL_ADD',
          pkg: prep
        }
        this.$store.commit('builder/skill', payload)
      }
    }
  }
}
</script>

<style>
</style>
