'use strict';

const dataProducts = [{
        id: 1,
        category: 'notebook',
        name: 'Ноутбук Acer',
        price: 25000,
        description: 'Core i3/4GB/500GB',
    },
    {
        id: 2,
        category: 'notebook',
        name: 'Ноутбук Samsung',
        price: 23500,
        description: 'Core i3/3GB/500GB',
    },
    {
        id: 3,
        category: 'notebook',
        name: 'Ноутбук Lenovo',
        price: 35000,
        description: 'Core i5/6GB/500GB',
    },
    {
        id: 4,
        category: 'monitor',
        name: 'Монитор Samsung',
        price: 8000,
        description: 'Диагональ 17',
    },
];
const order = {
    header: ['Артикул', 'Наименование товара', 'Цена', 'Кол-во', 'Сумма', '', ],
    products: [],
    containerElements: null,
    arrayElements: [],
    orderProductCreate(product, quant) {
        return {
            id: product.id,
            name: product.name,
            price: product.price,
            quant: quant,
            summary: product.price * quant,
        }
    },
    addProduct(product, quant) {
        this.products.push(this.orderProductCreate(product, quant));
        this.render();
    },
    delProduct(product) {
        this.products.splice(this.products.indexOf(product), 1);
        this.render();
    },
    quantityOrder() {
        if (this.products.length > 0)
            return this.products.reduce((totalQuant, orderItem) => totalQuant + +orderItem.quant, 0);
    },
    sumOrder() {
        if (this.products.length > 0)
            return this.products.reduce((totalPrice, orderItem) => totalPrice + orderItem.summary, 0);
    },
    init() {
        this.containerElements = document.getElementById('order');
        this.containerElements.innerHTML = '';
    },
    initHeader() {
        if (this.products.length > 0)
            if (typeof(this.products[0]) === 'object') {
                for (let val of this.header) {
                    const p = document.createElement('p');
                    p.innerText = val;
                    this.containerElements.appendChild(p);
                }
            }
    },
    render() {
        this.init();
        this.initHeader();
        if (this.products.length > 0) {
            for (const val of this.products) {
                if (typeof(val) === 'object') {
                    for (const [key, value] of Object.entries(val)) {
                        const p = document.createElement('p');
                        key === 'price' || key === 'summary' ? p.innerText = value + ' руб.' : p.innerText = value;
                        if (key === 'id') p.id = value;
                        this.containerElements.appendChild(p);
                    }
                    const button = document.createElement('a');
                    button.href = '#';
                    button.innerText = 'удалить';
                    button.onclick = (element) => {
                        this.delProduct(val);
                    };
                    this.containerElements.appendChild(button);
                    this.arrayElements.push(this.containerElements);
                }
            }
            const div = document.createElement('div');
            div.innerText = 'В корзине: ' + this.quantityOrder() + ' товаров на сумму ' + this.sumOrder() + 'руб.';
            this.containerElements.appendChild(div);
        } else {
            const div = document.createElement('div');
            div.innerText = 'Корзина пуста.';
            this.containerElements.appendChild(div);
        }
    },
};
const catalog = {
    dataProducts,
    products: [],
    containerElements: null,
    arrayElements: [],

    productCreate(product) {
        return {
            id: product.id,
            category: product.category,
            name: product.name,
            price: product.price,
            description: product.description,
        }
    },
    init() {
        if (Array.isArray(this.dataProducts)) {
            for (const val of this.dataProducts) {
                if (typeof(val) === 'object') {
                    this.products.push(this.productCreate(val));
                }
            }
            this.containerElements = document.getElementById('catalog');
        }
    },
    render() {
        this.init();
        if (this.products !== null)
            for (const val of this.products) {
                if (typeof(val) === 'object') {
                    const div = document.createElement('div');
                    for (const [key, value] of Object.entries(val)) {
                        const p = document.createElement('p');
                        key === 'price' ? p.innerText = value + 'руб.' : p.innerText = value;
                        if (key === 'id') div.id = value;
                        div.appendChild(p);
                    }
                    const quantity = document.createElement('input');
                    quantity.type = 'number';
                    quantity.min = 1;
                    quantity.value = 1;
                    div.appendChild(quantity);
                    const button = document.createElement('a');
                    button.href = '#';
                    button.onclick = (element) => {
                        order.addProduct(val, button.previousSibling.value);
                    };
                    button.innerText = 'добавить в корзину';
                    div.appendChild(button);
                    this.containerElements.appendChild(div);
                    this.arrayElements.push(div);
                }
            }
    },
};

order.render();
catalog.render();