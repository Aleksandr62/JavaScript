Vue.component('error', {
  data() {
    return {
      showErr: false,
      holder: '',
      errText: '',
    };
  },
  template: `
	<div class="error" v-show="showErr" @click="showErr = !showErr">
            <span>Не удалось выполнить запрос к серверу (компонент {{ holder }}), повторите позднее.<br>{{ errText }}</span>
	</div>`,
  methods: {
    err(err, url) {
	if(/(catalog)/i.test(url)) this.holder = `"Каталог"`;
	if(/(getBasket)/i.test(url)) this.holder = `"Корзина"`;
	if(/(addToBasket)/i.test(url)) this.holder = `"Корзина - добавление"`;
	if(/(deleteFromBasket)/i.test(url)) this.holder = `"Корзина - удаление"`;
	this.errText = err;
	this.showErr = true;
    },
  },
});