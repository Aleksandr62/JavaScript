'use strict';
const products = [
    { id: 1, name: 'Ноутбук', price: 35000, },
    { id: 2, name: 'Монитор', price: 12000, },
    { id: 3, name: 'Мышка', price: 1000, },
    { id: 4, name: 'Клавиатура', price: 2000, },
];

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

/*
//Задача 1 -------------------------------------------
// Переделать в ДЗ не использовать fetch а Promise
let makeGetRequest = (url) => {
	return new Promise((resolve, reject) => {
		let xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		xhr.send();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status !== 200) {
                console.log('Error');
            } else {
                resolve(xhr.response);
            }
        }
    };

	})

};
*/

class ProductItem {
    constructor(product, img = './image.png') {
        this.id = product.product_id;
        this.img = img;
        this.name = product.product_name;
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
        this.fetchGoods(`${API}/catalogData.json`)
            .then((data) => {
        	this.goods = data;
	})
            .then(() => {
        	this.render();
	})

    }
    fetchGoods(url) {
// Задача 3 -------------------------------------------	
	return new Promise((resolve, reject) => {
		let xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		xhr.responseType = 'json';
		xhr.send();
		xhr.onload = () => resolve(xhr.response);
	})

/* Задача 1 -------------------------------------------	
 	return makeGetRequest(`${API}/catalogData.json`)
            .then((data) => {
                this.goods = JSON.parse(data);
	}) */

/*        return fetch(`${API}/catalogData.json`)
            .then((response) => response.json())
            .catch((error) => {
                console.log(error);
            }); */
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
	this.goodsLinks = [];
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
    constructor(product, img = './image.png') {
        this.id = product.product_id;
        this.img = img;
        this.name = product.product_name;
        this.quantity = product.quantity;
        this.price = product.price;
    }
    summaryProduct() {
        return this.quantity * this.price;
    }
    render() {
        return `<div class="bascet__item" data-id=${this.id}>
        <img class="bascet__image" src="${this.img}" alt="Image">
	<div>
        <h3>${this.name}</h3>
        <p>Кол-во: ${this.quantity}</p>
        <p>Цена за ед.: ${this.price} &#8381;</p>
        <p>Сумма: ${this.summaryProduct()} &#8381;</p>
	</div>
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
	this.getBascetProduct(`${API}/getBasket.json`)
            .then((data) => {
        	this.goods = data.contents;
	})
            .then(() => {
        	this.render();
	})
    }
// из задачи 2 запрос на сервер список продуктов из getBasket.json
    getBascetProduct(url) {
	return new Promise((resolve, reject) => {
		let xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		xhr.responseType = 'json';
		xhr.send();
		xhr.onload = () => resolve(xhr.response);
	})
    }
    addProductToBascet(url) {
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
	this.goodsLinks = [];
        this.goods.forEach((good) => {
            this.goodsLinks.push(new OrderItem(good))
        });
        this.goodsLinks.forEach((good) => {
            this.container.insertAdjacentHTML('beforeEnd', good.render())
        });
    }
}

const catalog = new ProductList(products);
const bascet = new Bascet();
document.querySelector('body').addEventListener('click', (event) => {
		if(event.target.className === 'btn-cart') {
			bascet.container.style.display = 'flex';
			catalog.container.style.display = 'none';
			bascet.container.innerText = '';
			bascet.render(); 
		}
		if(event.target.className === 'logo') {
			bascet.container.style.display = 'none';
			catalog.container.style.display = 'flex';
			catalog.container.innerText = '';
			catalog.render(); 
		}
});
