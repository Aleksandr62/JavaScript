'use strict';
const products = [
    { id: 1, name: 'Ноутбук', price: 35000, },
    { id: 2, name: 'Монитор', price: 12000, },
    { id: 3, name: 'Мышка', price: 1000, },
    { id: 4, name: 'Клавиатура', price: 2000, },
];

class ProductItem {
    constructor(product, img = './image.jpg') {
        this.id = product.id;
        this.img = img;
        this.name = product.name;
        this.price = product.price;
        // стоит добавить this.quantity - кол-во товаров в магазине и
        // метод уменьшения (резервирования до продажи) кол-ва при добавлении в корзину 
    }
    render() {
        return `<div class="product__item" data-id=${this.id}>
        <img class="product__image" src="${this.img}" alt="Image">
        <h3>${this.name}</h3>
        <p>${this.price} &#8381;</p>
        <button class="product__btn">Добавить в корзину</button>
      </div>`;
    }
}

class ProductList {
    constructor(products, container = '.products') {
        this.container = document.querySelector(container);
        this.goods = [];
        this.goodsLinks = [];
        this.fetchGoods(products);
        this.render();
    }
    fetchGoods(products) {
        products.forEach((good) => {
            this.goods.push(good)
        });
    }
    summaryProducts() {
        return this.goods.reduce((sum, good) => {
            return sum + good.price;
        }, 0);
    }
    getProductById(id) {
        return this.goods.filter((good) => {
            if (good.id === +id) return good;
        });
    }
    render() {
        this.goods.forEach((good) => {
            this.goodsLinks.push(new ProductItem(good))
        });
        this.goodsLinks.forEach((good) => {
            this.container.insertAdjacentHTML('beforeEnd', good.render())
        });
    }
}

// класс продукта в корзине
class OrderItem {
    constructor(product, img = './image.jpg') {
        this.id = product.id;
        this.img = img;
        this.name = product.name;
        this.quantity = product.quantity;
        this.price = product.price;
    }
    summaryProduct() {
        return this.quantity * this.price;
    }
    render() {
        return `<div class="bascet__item" data-id=${this.id}>
        <img class="bascet__image" src="${this.img}" alt="Image">
        <h3>${this.name}</h3>
        <p>Кол-во: ${this.quantity}</p>
        <p>Цена за ед.: ${this.price} &#8381;</p>
        <p>Сумма: ${this.summaryProduct()} &#8381;</p>
        <button class="bascet__btn">Удалить из корзины</button>
      </div>`;
    }
}

// класс корзины
class Bascet {
    constructor(container = '.bascet') {
        this.container = document.querySelector(container);
        this.goods = [];
        this.goodsLinks = [];
    }
    addProductToBascet(product) {
            if (this.goods.length === 0) this.goods.push(product);
            else
                this.existsProductInBascet(product) ? this.increaseQuant(product) : this.goods.push(product);
        }
        // увеличение кол-ва (если в корзине есть такой товар)
    increaseQuant(product) {
            this.goods.forEach((good) => {
                if (product.id === good.id) good.quantity++;
            });
        }
        // проверка есть ли в корзине добавляемый продукт
    existsProductInBascet(product) {
        return this.goods.some((good) => { return product.id === good.id });
    }
    deleteItemFromBascet(id) {

        }
        // 2. Добавьте для корзины (GoodsList) метод, определяющий суммарную стоимость всех товаров.
    summaryOrder() {
        return this.goods.reduce((sum, good) => {
            return sum + good.price * good.quantity;
        }, 0);
    }
    render() {
        this.goods.forEach((good) => {
            this.goodsLinks.push(new OrderItem(good))
        });
        this.goodsLinks.forEach((good) => {
            this.container.insertAdjacentHTML('beforeEnd', good)
        });
    }
}

// теоретически можно унифицировать класс продукта 
// и либо наследовать продукт корзины от него (с добавлением методов)
// либо применять один класс от объекта-заказчика
const catalog = new ProductList(products);
const bascet = new Bascet();

/* 3 задача:------------------------------------------------
 Некая сеть фастфуда предлагает несколько видов гамбургеров:
    Маленький (50 рублей, 20 калорий).
    Большой (100 рублей, 40 калорий).
Гамбургер может быть с одним из нескольких видов начинок (обязательно):
    С сыром (+10 рублей, +20 калорий).
    С салатом (+20 рублей, +5 калорий).
    С картофелем (+15 рублей, +10 калорий).
Дополнительно гамбургер можно 
    посыпать приправой (+15 рублей, +0 калорий) 
    и полить майонезом (+20 рублей, +5 калорий). 
Напишите программу, рассчитывающую стоимость и калорийность гамбургера. 
Можно использовать примерную архитектуру класса со следующей страницы, но можно использовать и свою.
 */

class Hamburger {
    constructor(size = { size: 'small', price: 50, calories: 20, }, baseTopping = 'cheese') {
        this.size = size;
        this.stuffing = [];
        this.addTopping(baseTopping);
    }
    addTopping(topping) { // Добавить добавку 
        this.stuffing.push(...this.selectTopping(topping));
    }
    removeTopping(topping) { // Убрать добавку 
        this.stuffing = this.stuffing.map((stuff) => {
            if (topping !== stuff.name) return stuff;
        });
    }
    selectTopping(topping) {
        // выбрать добавку для добавления
        return this.getToppings().filter((stuff) => {
            if (topping === stuff.name) return stuff;
        });
    }
    getToppings() { // Получить список добавок 
        return [
            { name: 'cheese', price: 10, calories: 20, },
            { name: 'salad', price: 20, calories: 5, },
            { name: 'potato', price: 15, calories: 10, },
            { name: 'spice', price: 15, calories: 0, },
            { name: 'mayonnaise', price: 20, calories: 5, },
        ];
    }
    getSize() { // Узнать размер гамбургера 
        return this.size.size;
    }
    getStuffing() { // Узнать начинку гамбургера 
        return this.stuffing.map((stuff) => { return stuff.name });
    }
    calculatePrice() { // Узнать цену 
        return this.size.price + this.stuffing.reduce((price, stuff) => { return price + stuff.price }, 0);
    }
    calculateCalories() { // Узнать калорийность 
        return this.size.calories + this.stuffing.reduce((calories, stuff) => { return calories + stuff.calories }, 0);
    }
}

const hambSmall = new Hamburger();
const hambBig = new Hamburger({ size: 'big', price: 100, calories: 40, });
hambSmall.addTopping('salad');
hambSmall.addTopping('potato');
hambSmall.addTopping('mayonnaise');
hambBig.addTopping('potato');
console.log(hambSmall.getStuffing());
console.log(hambSmall.calculatePrice());
console.log(hambSmall.calculateCalories());
console.log(hambBig.getStuffing());
console.log(hambBig.calculatePrice());
console.log(hambBig.calculateCalories());