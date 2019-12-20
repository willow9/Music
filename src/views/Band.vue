<template>
  <div>
    <!-- Band card -->

    <b-container v-if="notification == '' && !edit">
      <b-row>
        <b-col v-if="oneBand" class="card-frame" md="10" offset-md="1">
          <h1>{{ oneBand.name }}</h1>
          <b-card-img :src="oneBand.imageUrl" class="rounded-0"></b-card-img>
          <p>{{ oneBand.description }}</p>

          <ul>
            Genre:
            <li v-for="genre in oneBand.genre" v-bind:key="genre">
              {{ genre }}
            </li>
          </ul>

          <p>Formed in year: {{ oneBand.formed }}</p>
        </b-col>
      </b-row>
      <b-button @click="removeBand" variant="danger">Delete</b-button>
      <b-button @click="editBandTogle" variant="primary">Edit</b-button>
    </b-container>

    <!-- Notifications -->
    <b-container v-if="notification != ''"
      ><h3>{{ notification }}</h3>
    </b-container>

    <!-- Form for editing -->
    <b-container v-if="edit && notification == ''"
      ><h3>Editing...</h3>
      <b-row>
        <b-col>
          <p>Click on picture to change it</p>
          <div
            class="image-input"
            :style="{ 'background-image': `url(${imageData})` }"
            @click="chooseImage"
          >
            <span
              v-if="!imageData"
              class="placeholder"
              :style="{ 'background-image': `url(${oneBand.imageUrl})` }"
            >
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
            <b-form-group label="Edit band name:">
              <b-form-input
                v-model="oneBand.name"
                required
                placeholder="Enter band name"
                name
              ></b-form-input>
            </b-form-group>

            <b-form-group label="Edit band description:">
              <b-form-textarea
                rows="8"
                v-model="oneBand.description"
                required
              ></b-form-textarea>
            </b-form-group>

            <b-form-group label="Edit band genre:">
              <b-form-checkbox-group v-model="oneBand.genre">
                <b-form-checkbox value="rock">Rock</b-form-checkbox>
                <b-form-checkbox value="gothic">Gothic</b-form-checkbox>
                <b-form-checkbox value="black"
                  >Black/Death metal</b-form-checkbox
                >
                <b-form-checkbox value="heavy">Heavy metal</b-form-checkbox>
                <b-form-checkbox value="other">Other</b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group>

            <b-form-group label="Edit formation year:">
              <b-form-select
                v-model="oneBand.formed"
                :options="years"
              ></b-form-select>
            </b-form-group>

            <b-button @click.prevent="post" type="submit" variant="primary"
              >Submit</b-button
            >
            <b-button
              @click.prevent="resetChanges"
              type="reset"
              variant="danger"
              >Reset</b-button
            >
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      edit: false,
      imageData: "",
      years: [],
      imageFile: null
    };
  },

  methods: {
    ...mapActions([
      "getBandById",
      "editBand",
      "deleteBand",
      "clearNotification"
    ]),
    ...mapGetters(["notification"]),
    removeBand() {
      this.deleteBand(this.$route.params.id).then(() => {});
    },
    editBandTogle() {
      this.edit = true;
    },
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
        this.imageFile = files[0];
      }
    },

    post() {
      this.editBand({
        id: this.$route.params.id,
        editedBand: this.oneBand,
        imageFile: this.imageFile
      });
    },

    resetChanges() {
      this.getBandById(this.$route.params.id);
      this.imageData = "";
    }
  },
  computed: {
    ...mapGetters(["band", "notification"]),
    oneBand() {
      return this.band;
    }
  },
  created() {
    this.getBandById(this.$route.params.id);

    let years = [];
    for (let i = 1975; i <= new Date().getFullYear(); i++) {
      years.push(i);
    }
    this.years = years;
  },
  destroyed() {
    this.clearNotification();
  }
};
</script>
<style scoped>
/* legend {
  text-align: left;
  color: #ae8a5d;
} */

ul {
  padding: 0;
  text-align: left;
}
li {
  display: inline;
  margin: 0 5px 0 0;
  text-align: left;
}
p {
  text-align: justify;
}
/* .col-form-label{
  text-align: left;
  color: #ae8a5d;
} */

.btn {
  margin-left: 10px;
  margin-bottom: 10px;
  margin-top: 10px;
}
.container {
  margin-top: 20px;
  border: 1px dotted #ccc;
  background: #d8e1e796;
  padding: 20px;
}
.card-img {
  border-radius: calc(0.25rem - 1px);
  float: left;
  margin-right: 20px;
}

.image-input {
  display: block;
  width: 500px;
  height: 400px;
  margin: 0 auto;
  padding-bottom: 10px;
  padding-bottom: 10px;
  cursor: pointer;
  background-size: cover;
  background-position: center center;
  object-fit: contain;
}

.placeholder {
  background: #b0bcc4;
  width: 100%;
  height: 100%;
  display: flex;
  /* justify-content: center;
  align-items: center; */
  /* color: #333; */
  font-size: 18px;
  font-family: Helvetica;
  background-size: cover;
  background-position: center center;
}

.file-input {
  display: none;
  object-fit: contain;
}
@media (min-width: 2000px) {
  .card-img {
    max-width: 500px;
  }
}

@media (max-width: 2000px) {
  .card-img {
    max-width: 300px;
  }
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

@media (max-width: 550px) {
  .card-img {
    max-width: 250px;
  }
}
@media (max-width: 450px) {
  .card-img {
    max-width: 200px;
  }
}
</style>
