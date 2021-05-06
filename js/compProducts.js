Vue.component('product', {
  data() {
    return {
      catalogUrl: '/catalogData.json',
      goodsAll: [], // все товары
      imgCatalog: 'image.png',
    };
  },
  template: `
    <div class="products">
	<product-item class="product__item" v-for="good of $root.$refs.search.filtered" :key="good.id_product" :img="imgCatalog" :product="good"></product-item>
    </div>
`,
  methods: {  },
  beforeCreate() {},
  created() {
    this.$root.getJson(this.$root.API + this.catalogUrl)
      .then(data => {
        for (let el of data) {
          this.goodsAll.push(el);
        }
	this.$root.$refs.search.filterProduct();
      });
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
});

Vue.component('product-item', {
  props: ["product", "img"],
  template: `
      <div class="product__item">
        <img :src="img" alt="photo-product">
        <div class="product__info">
          <h3>{{product.product_name}}</h3>
          <p>{{product.price}}₽</p>
          <button class="buy_btn" @click="$root.$refs.bascet.addProduct(product)">Купить</button>
        </div>
      </div>
`
});
