<template>
    <q-layout-footer>
        <demo-tabs v-if="$q.theme === 'ios'" />
        <q-toolbar :inverted="$q.theme === 'ios'">
            <!-- <q-btn flat round dense icon="menu" @click="left = !left" aria-label="Toggle menu on left side" /> -->
            <q-toolbar-title>
                Footer
            </q-toolbar-title>
            <!-- <q-btn flat round dense icon="menu" @click="right = !right" aria-label="Toggle menu on right side" /> -->
        </q-toolbar>
    </q-layout-footer>
</template>

<script>
export default {
  name: 'Chatbox',
  data() {
    return {}
  },
  methods: {}
}
</script>

<style>
</style>
