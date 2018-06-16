<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar color="primary" :glossy="$q.theme === 'mat'" :inverted="$q.theme === 'ios'">
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu" v-if="!leftDrawerOpen">
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title class="flex justify-center">
          Anime Rumble
          <!-- <div slot="subtitle">Running on AR Alpha v2</div> -->
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer v-model="leftDrawerOpen" :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null" mini>
      <q-list no-border link inset-delimiter>
        <q-item @click.native="leftDrawerOpen = !leftDrawerOpen" v-if="leftDrawerOpen">
          <q-item-side icon="menu" />
        </q-item>
        <q-item @click.native="openURL('http://quasar-framework.org')">
          <q-item-side icon="school" />
        </q-item>
        <q-item @click.native="openURL('https://github.com/quasarframework/')">
          <q-item-side icon="code" />
        </q-item>
        <q-item @click.native="openURL('https://discord.gg/5TDhbDg')">
          <q-item-side icon="chat" />
        </q-item>
        <q-item @click.native="openURL('http://forum.quasar-framework.org')">
          <q-item-side icon="record_voice_over" />
        </q-item>
        <q-item @click.native="openURL('https://twitter.com/quasarframework')">
          <q-item-side icon="rss feed" />
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'LayoutProfile',
  data() {
    return {
      // leftDrawerOpen: this.$q.platform.is.desktop
      leftDrawerOpen: true
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
.glossy {
  background: #222 !important;
  background-image: none !important;
}
</style>
