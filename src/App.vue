<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/add">Add Band</router-link> |
      <router-link to="/list">Bands List</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/register">Register</router-link> |
      <b-link @click="logOut" v-if="user">Logout</b-link> |
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "app",
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions(["signOutUser"]),

    logOut() {
      this.signOutUser();
    }
  },
  computed: {
    ...mapGetters(["user"])
  }
};
</script>

<style>
.notification {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: unset;
  color: #294456;
  font-weight: bold;
  
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  background-color: #294456;
  position: sticky;
  top: 0;
  z-index: 1;
}

#nav a {
  font-weight: bold;
  color: #afbab1;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
