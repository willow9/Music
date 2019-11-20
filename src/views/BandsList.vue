<template>
  <div>
    
<div v-for="band in allBands" :key='band.id'>{{band.name}}</div>
    <button @click="listBands()">list</button>
  </div>
</template>

<script>
import { mapGetters, mapActions} from 'vuex'
  export default {
    name: "BandsList",

    data() {
      return {
        
      }
    },

    methods: {
     ...mapActions(['fetchBands']), 
    
    listBands(){
      
    }
  },
  computed: mapGetters(['allBands']),
  
  created() {
    this.fetchBands();
  }
  }
</script>