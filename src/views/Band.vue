<template>
  <div>
    <b-container v-if="notificationMsg=='' && !edit">
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
    </b-container>

    <b-container v-if="notificationMsg!=''"><h3>{{notificationMsg}}</h3>
    </b-container>

    <b-container v-if="edit"><h3>Editing...</h3>
    </b-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      notificationMsg: "",
      edit:true
    };
  },

  methods: {
    ...mapActions(["fetchBands", "deleteBand"]),
    ...mapGetters(["notification"]),
    removeBand() {
      this.deleteBand(this.$route.params.id).then(() => {
        this.notificationMsg = this.notification();
      });
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
