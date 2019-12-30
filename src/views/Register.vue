<template>
  <div>
    <b-container v-if="notification" class="notification">
      <h3>
        {{ this.notification }}
      </h3>
    </b-container>

    <div v-if="!notification" clas="login-container">
      <h1>Register</h1>
      <b-container>
        <b-row>
          <b-col sm="6" offset="3">
            <b-form @submit.prevent="register">
              <b-form-group id="input-group-1" label-for="input-1">
                <b-form-input
                  id="input-1"
                  type="email"
                  required
                  placeholder="Enter email"
                  v-model="email"
                ></b-form-input>
              </b-form-group>

              <b-form-group>
                <b-input
                  type="password"
                  id="text-password"
                  aria-describedby="password-help-block"
                  placeholder="Enter password"
                  v-model="password"
                ></b-input>
                <b-form-text id="password-help-block">
                  Your password must be 8-20 characters long, contain letters
                  and numbers, and must not contain spaces, special characters,
                  or emoji.
                </b-form-text>
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
    ...mapActions(["registerUser", "clearNotification"]),
    register() {
      this.registerUser({ email: this.email, password: this.password });
      setTimeout(() => this.clearNotification(), 3000);
    }
  },
  computed: {
    ...mapGetters(["user", "notification"])
  }
};
</script>

