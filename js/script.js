﻿const app = new Vue({
  el: '#app',
  data: {
    API: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses',

  },
  methods: {
    getJson(url) {
      return fetch(url)
        .then(result => result.json())
        .catch(err => {this.$refs.error.err(err, url)})
    },
  },

});