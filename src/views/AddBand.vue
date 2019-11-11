<template>
  <div>
    <h1>Add Band</h1>
    <div>
      <b-form class="form-container">
        <b-form-group>
          <b-form-input v-model="form.name" required placeholder="Enter band name"></b-form-input>
        </b-form-group>

        <b-form-group label="Enter band description">
          <b-form-textarea v-model="form.description" required placeholder="Enter band description"></b-form-textarea>
        </b-form-group>

        <b-form-group>
          <b-form-checkbox-group v-model="form.genre">
            <b-form-checkbox value="rock">Rock</b-form-checkbox>
            <b-form-checkbox value="gothic">Gothic</b-form-checkbox>
            <b-form-checkbox value="black">Black/Death metal</b-form-checkbox>
            <b-form-checkbox value="heavy">Heavy metal</b-form-checkbox>
            <b-form-checkbox value="other">Other</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>

        <b-form-group id="input-group-3" label="Formed in year:">
          <b-form-select
            placeholder="hello"
            id="input-3"
            v-model="form.formed"
            :options="years"
            required
          ></b-form-select>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </div>
    <div id="preview" class="form-container">
      <h5>Preview</h5>
      <p>Band name:{{ form.name }}</p>
      <p>Description: {{ form.description }}</p>
      <p>Genre:</p>
      <ul>
        <li v-for="genre in form.genre" v-bind:key="genre">{{ genre }}</li>
      </ul>
      <p>Formed in year: {{ form.formed}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        description: '',
        genre: [],
        formed: ''
      },
      years: []
    };
  },
  methods: {},
  created() {
    let years = [];
    for (let i = 1975; i <= new Date().getFullYear(); i++) {
      years.push(i);
    }
    this.years = years;
  }
};
</script>

<style scoped>
.form-container {
  max-width: 800px;
  margin: 0 auto;
  padding-bottom: 60px;
}

#preview {
  border: 1px dotted #ccc;
  text-align: left;
  padding: 10px;
}
</style>
