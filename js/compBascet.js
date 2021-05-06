Vue.component('bascet', {
  data() {
    return {
      bascetUrl: '/getBasket.json',
      addUrl: '/addToBasket.json',
      delUrl: '/deleteFromBasket.json',
      img: 'image.png',
      bascetGoods: [],
      orderNum: null,
      orderCounter: null, // счетчик заказов
      isVisibleCart: false,
      isCartNull: true,
    };
  },
  template: `
	<div class="bascet-box">
            <button class="btn-cart" @click="isVisibleCart = !isVisibleCart">корзина</button>
            <div class="bascet" v-show="isVisibleCart">
              <div class="bascet__number" v-if="orderNum">Заказ № {{ orderNum }}</div>              
                <bascet-item class="bascet__item" 
			v-for="good of bascetGoods" 
			:key="good.id_product"
                	:item="good" 
                	:img="img"
                	@remove="delProduct">
		</bascet-item>
              <div class="bascet__summary" v-if="!isCartNull">Сумма заказа: {{ summaryOrder() }}₽</div>
              <div class="bascet__summary" v-else>Корзина пуста.</div>              
            </div>
	</div>`,
  methods: {
    addProduct(product) {
      this.$root.getJson(this.$root.API + this.addUrl)
        .then((data) => {
          if (+data.result === 1) {
            let index = this.bascetGoods.findIndex(item => item.id_product === product.id_product);
            if (index === -1)
              this.bascetGoods.push(Object.assign({
                quantity: 1
              }, product));
            else
              this.bascetGoods[index].quantity++;
          };
        })
        .catch((error) => this.$root.error); // ДОБАВИТЬ МЕТОД!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    },
    delProduct(product) {
      this.$root.getJson(this.$root.API + this.delUrl)
        .then((data) => {
          if (+data.result === 1) {
            if (product.quantity > 1) {
              product.quantity--;
            } else
              this.bascetGoods.splice(this.bascetGoods.indexOf(product), 1);
          }
        })
        .catch((error) => this.$root.error); // ДОБАВИТЬ МЕТОД!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    },
    summaryOrder() {
      return this.bascetGoods.reduce(
        (sum, {
          price,
          quantity
        }) => (sum += +price * quantity),
        0
      );
    },
    //  счетчик заказов
    counter() {
      let count = 1;
      return () => count++;
    }
  },
  beforeCreate() {},
  created() {
    this.orderCounter = this.counter();
    this.$root.getJson(this.$root.API + this.bascetUrl)
      .then((data) => {
        for (let el of data.contents) {
          this.bascetGoods.push(el);
        }
      })
      .catch((error) => this.$root.error); // ДОБАВИТЬ МЕТОД!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  },
  updated() {
    if (this.bascetGoods.length === 0) {
      (this.orderNum = null);
      (this.isCartNull = true);
    } else {
      if (this.orderNum === null) this.orderNum = this.orderCounter();
      this.isCartNull = false;
    }
  },

});

Vue.component('bascet-item', {
  props: ["item", "img"],
  template: `
              <div class="bascet__item">
                <img :src="img" alt="photo-product">
                <div class="bascet__info">
                  <h3>{{item.product_name}}</h3>
                  <p>Кол-во: {{item.quantity}}</p>
                  <p>Стоимость: {{item.price * item.quantity}}₽</p>
                </div>
                <button class="cart-del-btn" @click="$emit('remove', item)">&times;</button>
	      </div>
`
});
