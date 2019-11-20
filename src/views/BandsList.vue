<template>
  <div>
    <div class="cards-wrapper">
      <h1>Bands</h1>
      <b-card-group columns>
        <b-card
          v-for="band in allBands"
          :key="band.index"
          img-alt="Image"
          img-top
          img-src="https://placekitten.com/500/350"
        >
          <b-card-text>
            <h3>{{ band.name }}</h3>
            <ul>
              Genre:
              <li v-for="genre in band.genre" v-bind:key="genre">
                {{ genre }} |
              </li>
            </ul>
            {{ band.description }}
            <p>Formed in year: {{ band.formed }}</p>
          </b-card-text>
        </b-card>
      </b-card-group>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "BandsList",

  data() {
    return {};
  },

  methods: {
    ...mapActions(["fetchBands"]),

    listBands() {}
  },
  computed: mapGetters(["allBands"]),

  created() {
    this.fetchBands();
  }
};
</script>
<style scoped>
.cards-wrapper {
  background-color: #294456;
  padding: 20px;
  min-height: 100vh;
}
.cards-wrapper h1 {
  color: aliceblue;
  text-align: center;
}
.cards-wrapper h3 {
  text-align: center;
}
.cards-wrapper li {
  display: inline;
  margin: 0 5px 0 0;
  text-align: left;
}

.cards-wrapper p {
  text-align: left;
}
</style>
