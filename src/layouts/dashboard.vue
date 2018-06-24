<template>
  <q-layout> <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-layout-header>
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          icon="menu"
          @click="leftDrawer = !leftDrawer"
        />
        <q-toolbar-title>
          Anime Rumble
          <span slot="subtitle">Running on AR v2</span>
        </q-toolbar-title>
      </q-toolbar>      
    </q-layout-header>    

    <!-- (Optional) A Drawer; you can add one more with side="right" or change this one's side -->
    <q-layout-drawer
      side="left"
      v-model="leftDrawer"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >            
      <!-- Content here -->
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list-header>Essential Links</q-list-header>
        <q-item @click.native="$router.push('/admin')">
          <q-item-side icon="home" />
          <q-item-main label="Dashboard" sublabel="Start here" />
        </q-item>
        <q-item @click.native="$router.push('/admin/builder')">
          <q-item-side icon="code" />
          <q-item-main label="Builder" sublabel="Create characters" />
        </q-item>        
      </q-list>      
    </q-layout-drawer>

    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  // name: 'LayoutName',
  data() {
    return {
      leftDrawer: true
    }
  }
}
</script>

<style>
</style>
