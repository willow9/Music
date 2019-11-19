<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">About</router-link> |
      <router-link to="/add">Add band</router-link> |
      <router-link to="/test">Test</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
//  import AddBand from './views/AddBand'
// export default {
//   name: 'app',
//   components: {
//     // 'add-band': AddBand,
//   }

// }
//
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;

  text-align: center;
  color: #2c3e50;
  
}

#nav {
  padding: 30px;
  background-color: #294456;
  position: sticky;
  top:0;
  
}

#nav a {
  font-weight: bold;
  color: #afbab1;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
