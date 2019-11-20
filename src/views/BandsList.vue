<template>
  <div>
    <div class="just">
      <h1>Bands</h1>
      <b-card-group columns>
        <b-card
          v-for="band in allBands"
          :key="band.index"
          img-alt="Image"
          img-top
        >
          <b-card-text>
            <h3>Hilllow</h3>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo
          </b-card-text>
        </b-card>

        <b-card
          v-for="band in allBands"
          :key="band.index"
          img-alt="Image"
          img-top
          img-src="https://placekitten.com/500/350"
        >
          <b-card-text>
            <h3>{{ band.name }}</h3>
            {{ band.description }}
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
.just {
  background-color: #294456;
  padding: 20px;
}
.just h1 {
  color: aliceblue;
}
</style>
