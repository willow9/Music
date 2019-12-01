<template>
  <div>
    {{ band.name }}
    {{ band.description }}
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      band: {}
    };
  },

  methods: {
    ...mapGetters(["allBands"])
  },
  created() {
    this.band = this.allBands().find(band => {
      return band.id == this.$route.params.id;
    });
    console.log(this.band);
  }
};
</script>
