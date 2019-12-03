<template>
  <div>
    <div class="cards-wrapper">
      <b-form-input
        v-model="search"
        placeholder="Enter band name"
      ></b-form-input>
      <b-form-checkbox-group v-model="searchGenre" class="checkbox-label">
        <b-form-checkbox value="rock">Rock</b-form-checkbox>
        <b-form-checkbox value="gothic">Gothic</b-form-checkbox>
        <b-form-checkbox value="black">Black/Death metal</b-form-checkbox>
        <b-form-checkbox value="heavy">Heavy metal</b-form-checkbox>
        <b-form-checkbox value="other">Other</b-form-checkbox>
      </b-form-checkbox-group>
      <h1>Bands</h1>
      <b-card-group columns>
        <b-card
          v-for="band in filterBands"
          :key="band.index"
          img-alt="Image"
          img-top
          :img-src="band.imageUrl"
        >
          <b-card-text>
            <router-link :to="`/list/${band.id}`">
              <h3>{{ band.name }}</h3></router-link
            >

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
  data() {
    return {
      search: "",
      searchGenre: []
    };
  },

  methods: {
    ...mapActions(["fetchBands"])
  },
  computed: {
    ...mapGetters(["allBands"]),
    filterBands() {
      return this.allBands.filter(band => {
        if (band.genre != undefined) {
          return (
            band.name.match(this.search) &&
            (this.searchGenre.some(item => band.genre.includes(item)) ||
              this.searchGenre.length == 0)
          );
        } else return band.name.match(this.search);
      });
    }
  },
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

.checkbox-label {
  color: aliceblue;
}

@media (min-width: 1300px) {
  .card-columns {
    column-count: 5;

    column-gap: 1.25rem;
    orphans: 1;
    widows: 1;
  }
}
</style>
