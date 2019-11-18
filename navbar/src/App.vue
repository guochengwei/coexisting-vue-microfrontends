<template>
  <div id="navbar-app">
    <div id="nav">
      <template v-for="app in apps">
        <router-link v-for="route in app.routes"
                     :key="`${app.name}-${route.name}`"
                     :append="false"
                     :to="`${app.path}${route.path}`">
          {{`${app.name}-${route.name}`}} |
        </router-link>
      </template>
    </div>
    <router-view/>
  </div>
</template>
<script>
import apps from './routes'

export default {
  name: 'App',
  data () {
    return {
      apps
    }
  },
  methods: {
  }
}
</script>
<style>
#navbar-app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2C3E50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2C3E50;
}

#nav a.router-link-exact-active {
  color: #42B983;
}
</style>
