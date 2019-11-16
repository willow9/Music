<template>
  <div>
    <h1>Add Band</h1>
    <b-container>
      <b-row>
        <b-col>
          <!-- <b-img class="preview2" :src="url"></b-img>
          <input type="file" @change="onFileChange" variant="primary" /> -->
          <div>
            <image-input v-model="imageData" />
          </div>

          <div class="image-input" :style="{ 'background-image': `url(${imageData})` }" @click="chooseImage">
            <span v-if="!imageData" class="placeholder">
              Choose an Image
            </span>
            <input class="file-input" ref="fileInput" type="file" @input="onSelectFile" />
          </div>
        </b-col>

        <b-col>
          <b-form>
            <b-form-group>
              <b-form-input v-model="form.name" required placeholder="Enter band name" name></b-form-input>
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
                <b-form-checkbox value="black">Black/Death metal</b-form-checkbox>
                <b-form-checkbox value="heavy">Heavy metal</b-form-checkbox>
                <b-form-checkbox value="other">Other</b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group>

            <b-form-group label="Formed in year:">
              <b-form-select v-model="form.formed" :options="years" required></b-form-select>
            </b-form-group>

            <b-button variant="primary">Preview</b-button>
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
          </b-form>
        </b-col>
      </b-row>
    </b-container>

    <b-container>
      <b-row>
         <b-col>
          <img src="..." alt="..." class="img-thumbnail">
        </b-col>
        <b-col>
          <div>
            <h5>Preview</h5>
            <p bandName>Band name:{{ form.name }}</p>
            <p>Description: {{ form.description }}</p>
            <p>Genre:</p>
            <ul>
              <li v-for="genre in form.genre" v-bind:key="genre">{{ genre }}</li>
            </ul>
            <p>Formed in year: {{ form.formed }}</p>
          </div>
        </b-col>
       
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageData: null,
      file: null,
      url: null,
      form: {
        name: '',
        description: '',
        genre: [],
        formed: ''
      },
      years: []
    };
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
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
        this.$emit('input', files[0]);
      }
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
}

/* .img-fluid {
  height: 75%;
} */

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

.image-preview2 {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  padding: 20px;
}
.preview2 {
  width: 400px;
  height: 300px;
  background-color: rgb(90, 87, 87);
  border: 1px solid #ddd;
  padding: 5px;
  margin-bottom: 5px;
}

.image-input {
  display: block;
  width: 100%;
  height: 100%;
  cursor: pointer;
  background-size: cover;
  background-position: center center;
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
}

.btn {
  margin-left: 10px;
}
</style>
