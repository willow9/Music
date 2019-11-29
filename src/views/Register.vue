<template>
  <div>
    <div clas="login-container">
      <h1>Register</h1>
      <b-container>
        <b-row>
          <b-col sm="6" offset="3">
            <h3>Register</h3>
            <b-form @submit.prevent="register">
              <b-form-group
                id="input-group-1"
                label="Email address:"
                label-for="input-1"
                description="We'll never share your email with anyone else."
              >
                <b-form-input
                  id="input-1"
                  type="email"
                  required
                  placeholder="Enter email"
                  v-model="email"
                ></b-form-input>
              </b-form-group>

              <b-form-group>
                <label for="text-password">Password</label>
                <b-input
                  type="password"
                  id="text-password"
                  aria-describedby="password-help-block"
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
    ...mapActions(["registerUser"]),
    register() {
      this.registerUser({ email: this.email, password: this.password });
    }
  },
  computed: {
    ...mapGetters(["user"]),
    registeredUser() {
      return this.user;
    }
  },
  watch:{
      registeredUser(value){
          if( value !=null || value!==undefined){
              console.log('registered')
          }
      }
  }
};
</script>

<style scoped></style>
