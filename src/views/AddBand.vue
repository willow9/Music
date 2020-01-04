<template>
  <div>
    <b-container class="notification" v-if="!user">
      <h3>
        Hey, first let's get to know each other, please login or register.
      </h3>
    </b-container>
    <b-container class="notification" v-if="!formNotSubmited">
      <h3>
        Hurray! Your band is already in the database.
      </h3>
    </b-container>

    <b-container v-if="user && formNotSubmited">
      <h1>Add Band</h1>
      <b-row>
        <b-col>
          <div
            class="image-input"
            :style="{ 'background-image': `url(${imageData})` }"
            @click="chooseImage"
          >
            <span v-if="!imageData" class="placeholder">
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
          <b-form @submit.prevent="validateForm">
            <b-form-group>
              <b-form-input
                v-model="form.name"
                placeholder="Enter band name"
                name
                :class="{ 'is-invalid': attemptSubmit && missingName }"
              ></b-form-input>
              <div class="invalid-feedback">No name? It can't be that way.</div>
            </b-form-group>

            <b-form-group>
              <b-form-textarea
                v-model="form.description"
                placeholder="Enter band description"
                rows="5"
              ></b-form-textarea>
            </b-form-group>

            <b-form-group>
              <b-form-checkbox-group
                v-model="form.genre"
                :class="{ checkboxes: missingGenre && attemptSubmit }"
              >
                <b-form-checkbox value="rock">Rock</b-form-checkbox>
                <b-form-checkbox value="gothic">Gothic</b-form-checkbox>
                <b-form-checkbox value="black"
                  >Black/Death metal</b-form-checkbox
                >
                <b-form-checkbox value="heavy">Heavy metal</b-form-checkbox>
                <b-form-checkbox value="other">Other</b-form-checkbox>
              </b-form-checkbox-group>
              <p class="required-msg" v-if="missingGenre && attemptSubmit">
                Please, select one or more.
              </p>
            </b-form-group>

            <b-form-group label="Formed in year:">
              <b-form-select
                v-model="form.formed"
                :options="years"
                :class="{
                  'is-invalid': attemptSubmit && missingFormedYear
                }"
              ></b-form-select>
              <div class="invalid-feedback">It would be nice to know this.</div>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button @click="clearForm" variant="danger">Reset</b-button>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      attemptSubmit: false,
      imageData: null,
      formNotSubmited: true,
      form: {
        name: "",
        description: "",
        genre: [],
        formed: "",
        rawImage: null
      },
      years: []
    };
  },
  computed: {
    ...mapGetters(["user"]),

    missingName() {
      return this.form.name === "";
    },
    missingGenre() {
      return this.form.genre.length === 0;
    },
    missingFormedYear() {
      return this.form.formed === "";
    }
  },

  methods: {
    ...mapActions(["addBand"]),
    chooseImage() {
      this.$refs.fileInput.click();
    },
    onSelectFile() {
      const input = this.$refs.fileInput;
      const files = input.files;

      if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = e => {
          this.imageData = e.target.result;
        };
        reader.readAsDataURL(files[0]);
        this.form.rawImage = files[0];
      }
    },

    validateForm() {
      this.attemptSubmit = true;
      if (!this.missingName && !this.missingGenre && !this.missingFormedYear)
        this.post();
    },

    clearForm() {
      this.form.name = "";
      this.form.description = "";
      this.form.genre = [];
      this.form.formed = "";
      this.form.rowImage = null;
      this.imageData = null;
      this.attemptSubmit = false;
    },

    post() {
      this.addBand(this.form);
      this.formNotSubmited = false;
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
  padding-bottom: 10px;
  margin: 0 auto;
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
  margin-bottom: 10px;
}

.notification {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: unset;
  color: #294456;
  font-weight: bold;
}

.checkboxes {
  border-style: solid;
  border-width: 1px;
  border-color: #dc3545;
  border-radius: 5px;
}

.required-msg {
  width: 100%;
  margin-top: 0.25rem;
  font-size: 80%;
  color: #dc3545;
}

.form-control.is-invalid,
.custom-select.is-invalid {
  background-image: unset;
}

@media (max-width: 992px) {
  .image-input {
    max-width: 350px;
    max-height: 300px;
  }
}
@media (max-width: 776px) {
  .image-input {
    max-width: 300px;
    max-height: 250px;
  }
}
@media (max-width: 490px) {
  .image-input {
    max-width: 280px;
    max-height: 240px;
  }
}
</style>
