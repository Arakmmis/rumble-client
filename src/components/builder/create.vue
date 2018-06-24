<template>
  <q-card class="q-mb-md">
    <q-card-title>
      <div class="row content-center items-center justify-between">
        <p class="q-ma-none">Create</p>
        <q-btn label="Create Character" color="primary" @click="save" icon="save" />
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
    </q-card-main>

    <q-page-sticky position="top-right" :offset="[18, 18]">

    </q-page-sticky>
  </q-card>
</template>

<script>
import char from '../../definitions/char'
import skill from '../../definitions/skill'

export default {
  name: 'BuilderCreate',
  props: ['enable'],
  data() {
    return {
      model: char,
      create: {
        skill: ''
      }
    }
  },
  methods: {
    save: function() {
      let payload = {
        type: 'CHAR_CREATE',
        pkg: this.model
      }
      this.$store.commit('builder/char', payload)
      this.$emit('enable')
    },
    skill: function(type, pkg) {
      if (type === 'add') {
        let prep = skill
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
