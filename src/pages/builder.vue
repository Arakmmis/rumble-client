<template>
  <q-page class="q-pt-none">
    <div class="column width-100">
      <p>Character Builder</p>
      <q-tabs v-model="selectedTab">
        <!-- Tabs - notice slot="title" -->
        <q-tab default slot="title" name="tab-1" label="Create" />
        <q-tab slot="title" :disable="disable" name="tab-2" label="EDIT" />
        <q-tab slot="title" :disable="disable" name="tab-3" label="Skills" />
        <q-tab slot="title" :disable="disable" name="tab-4" label="Effects" />
        <q-tab slot="title" :disable="disable" name="tab-5" label="Result" />

        <!-- Targets -->
        <q-tab-pane name="tab-1">
          <create @enable="enable" />
        </q-tab-pane>
        <q-tab-pane name="tab-2">
          <char />
        </q-tab-pane>
        <q-tab-pane name="tab-3">
          <skills />
        </q-tab-pane>
        <q-tab-pane name="tab-4">
          <effects />
        </q-tab-pane>
        <q-tab-pane name="tab-5">
          <result />
        </q-tab-pane>
      </q-tabs>
    </div>
  </q-page>
</template>

<style>
.width-100 {
  width: 100% !important;
  padding: 20px;
}
.q-field {
  margin-bottom: 10px;
}
.q-card {
  box-shadow: none;
}
.q-tab-pane {
  padding: 0px;
}
</style>

<script>
import create from 'components/builder/create'
import char from 'components/builder/char'
import skills from 'components/builder/skills'
import effects from 'components/builder/effects'
import result from 'components/builder/result'

export default {
  name: 'Builder',
  components: {
    create,
    char,
    skills,
    effects,
    result
  },
  data: function() {
    return {
      disable: true,
      selectedTab: 'tab-1'
    }
  },
  methods: {
    enable: function() {
      this.disable = false
    },
    selectThirdTab() {
      // we select third tab which has `name` set to 'tab-3'
      this.selectedTab = 'tab-2'
    }
  }
}
</script>
