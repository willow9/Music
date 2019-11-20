<template>
  <div>
    <h1>Add Band</h1>
    <b-container>
      <b-row>
        <b-col>
          <div
            class="image-input"
            :style="{ 'background-image': `url(${form.imageData})` }"
            @click="chooseImage"
          >
            <span v-if="!form.imageData" class="placeholder">
              Choose an Image
            </span>
            <input
              class="file-input"
              ref="fileInput"
              type="file"
              @input="onSelectFile"
            />
          </div>
        </b-col>

        <b-col>
          <b-form>
            <b-form-group>
              <b-form-input
                v-model="form.name"
                required
                placeholder="Enter band name"
                name
              ></b-form-input>
            </b-form-group>

            <b-form-group label="Enter band description">
              <b-form-textarea
                v-model="form.description"
                required
                placeholder="Enter band description"
              ></b-form-textarea>
            </b-form-group>

            <b-form-group>
              <b-form-checkbox-group v-model="form.genre">
                <b-form-checkbox value="rock">Rock</b-form-checkbox>
                <b-form-checkbox value="gothic">Gothic</b-form-checkbox>
                <b-form-checkbox value="black"
                  >Black/Death metal</b-form-checkbox
                >
                <b-form-checkbox value="heavy">Heavy metal</b-form-checkbox>
                <b-form-checkbox value="other">Other</b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group>

            <b-form-group label="Formed in year:">
              <b-form-select
                v-model="form.formed"
                :options="years"
                required
              ></b-form-select>
            </b-form-group>

            <b-button @click="preview = !preview" variant="primary"
              >Preview</b-button
            >
            <b-button @click.prevent="post" type="submit" variant="primary"
              >Submit</b-button
            >
            <b-button type="reset" variant="danger">Reset</b-button>
          </b-form>
        </b-col>
      </b-row>
    </b-container>

    <b-container v-if="preview" class="preview">
      <h1>{{ form.name }}</h1>
      <b-img :src="form.imageData"></b-img>

      <div>
        <p>Description: {{ form.description }}</p>
        <ul>
          Genre:
          <li v-for="genre in form.genre" v-bind:key="genre">{{ genre }}</li>
        </ul>
        <p>Formed in year: {{ form.formed }}</p>
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      preview: false,
      // imageData: null,

      form: {
        name: "",
        description: "",
        genre: [],
        formed: "",
        imageData: null
      },
      years: []
    };
  },
  methods: {
    chooseImage() {
      this.$refs.fileInput.click();
    },
    ...mapActions(["addBand", "fetchBands"]),

    onSelectFile() {
      const input = this.$refs.fileInput;
      const files = input.files;

      if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = e => {
          this.form.imageData = e.target.result;
        };
        reader.readAsDataURL(files[0]);
      }
    },

    clearForm() {
      this.form.name = "";
      this.form.description = "";
      this.form.genre = [];
      this.form.formed = "";
      this.form.imageData = null;
    },

    post() {
      this.addBand(this.form);
      // this.clearForm();
    }
  },

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
.container {
  padding: 10px;
  margin: 20px auto;
  border: 1px dotted #ccc;
  height: fit-content;
}

.image-input {
  display: block;
  width: 500px;
  height: 400px;
  cursor: pointer;
  background-size: cover;
  background-position: center center;
  object-fit: contain;
}

.placeholder {
  background: #f0f0f0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 18px;
  font-family: Helvetica;
}

.placeholder:hover {
  background: #e0e0e0;
}
.file-input {
  display: none;
  object-fit: contain;
}

.btn {
  margin-left: 10px;
}

.preview {
  border: 1px dotted #ccc;
  text-align: justify;
  padding: 10px;
  min-height: 400px;
}

.preview img {
  float: left;
  margin: 10px;
  width: 300px;
  height: 300px;
  background: gray;
}

.preview h1 {
  text-align: center;
}

.preview li {
  display: inline;
  margin: 0 5px 0 0;
}

</style>
