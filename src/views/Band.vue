<template>
  <div>
    <b-container>
      <b-row>
        <b-col md="10" offset-md="1">
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

          <!-- <b-card style="max-width: 800px;">
            <b-row>
              <b-col md="6">
                <b-card-img
                  :src="oneBand.imageUrl"
                  class="rounded-0"
                ></b-card-img>
              </b-col>
              <b-col md="6">
                <b-card-body
                  ><h1>{{ oneBand.name }}</h1>
                  <b-card-text>
                    <p>{{ oneBand.description }}</p>
                    <ul>
                      Genre:
                      <li v-for="genre in oneBand.genre" v-bind:key="genre">
                        {{ genre }}
                      </li>
                    </ul>
                    <p>Formed in year: {{ oneBand.formed }}</p>
                  </b-card-text>
                </b-card-body>
              </b-col>
            </b-row>
          </b-card> -->
        </b-col>
      </b-row>
      <b-button @click="removeBand" variant="danger">Button</b-button>
    </b-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {};
  },

  methods: {
    ...mapActions(["fetchBands"]),
    removeBand() {
      this.deleteBand(this.$route.params.id);
    }
  },
  computed: {
    ...mapGetters(["allBands"]),
    oneBand() {
      return this.allBands.find(band => {
        return band.id.match(this.$route.params.id);
      });
    }
  },
  created() {
    this.fetchBands();
  }
};
</script>
<style scoped>
li {
  display: inline;
  margin: 0 5px 0 0;
  text-align: left;
}

@media (max-width: 1900px) {
  .card-img {
    max-width: 500px;
    border-radius: calc(0.25rem - 1px);
    float: left;
  }
}
@media (max-width: 1600px) {
  .card-img {
    max-width: 400px;
    border-radius: calc(0.25rem - 1px);
    float: left;
  }
}
@media (max-width: 900px) {
  .card-img {
    max-width: 200px;
    border-radius: calc(0.25rem - 1px);
    float: left;
  }
}
</style>