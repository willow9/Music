<template>
  <div>
    <div clas="login-container">
      <h1>Login</h1>
      <b-container>
        <b-row>
          <b-col sm="6" offset="3">
            <b-form @submit.prevent="login">
              <b-form-group >
                <b-form-input
                  type="email"
                  required
                  placeholder="Enter email"
                  v-model="email"
                ></b-form-input>
              </b-form-group>

              <b-form-group>
                <b-input
                  type="password"
                  placeholder="Enter password"
                  aria-describedby="password-help-block"
                  v-model="password"
                ></b-input>
              </b-form-group>
              <b-button type="submit" variant="primary">Submit</b-button>
            </b-form>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    ...mapActions(["signInUser"]),
    login() {
      this.signInUser({ email: this.email, password: this.password });
    }
  },
  computed: {
    ...mapGetters(["user"]),
    signedInUser() {
      // console.log(this.user.id)
      return this.user;
    }
  },
  watch: {
    signedInUser(value) {
      if (value != null || value !== undefined) {
        console.log("user is signed in")
      }
    }
  }
};
</script>

<style></style>
