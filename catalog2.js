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

function renderProduct(product, buttonText = 'Добавить') {
    return `
    <div class="catalog__item">
        <div class="productPhoto">
        <img src="images/min/${product.id}-1-min.jpg" data-max_image_url="images/max/${product.id}-1-max.jpg" alt="Картинка1">
        </div>
        <p>Артикул: ${product.id}</p>
        <p>Наименование: ${product.name}</p>
        <p>Цена: ${product.price}</p>
        ${(product.quant? `<p class="catalog__hide">Кол-во: ${product.quant}</p>`: '')}
        <p>Описание: ${product.description}</p> 
        <a class="catalog__item__add" data-id-product=${product.id} href="#">${buttonText}</a>                                   
    </div>
    `;

};
const order = {
    orderProducts: [],
    orderContainer: null,
    buttonDelProduct: null,

    init() {
        this.orderContainer = document.getElementById('order');
        this.orderContainer.addEventListener('click', function(event) {
            this.delProduct(event.target.dataset.idProduct);
        }.bind(this));
        this.render();
    },
    render() {
        if (!this.orderProducts.length) return this.orderContainer.textContent = 'Корзина пуста.';
        this.orderContainer.innerHTML = '';
        this.orderProducts.forEach(element => {
            this.orderContainer.insertAdjacentHTML('beforeend', renderProduct(element, 'Удалить'));
        });
        this.orderContainer.insertAdjacentHTML('beforeend', `В корзине: ${this.sumOrder().quant} товаров на сумму ${this.sumOrder().summary} руб.`);
    },
    sumOrder() {
        if (this.orderProducts.length)
            return {quant: this.orderProducts.reduce((totalQuant, orderItem) => totalQuant + orderItem.quant, 0),
                    summary: this.orderProducts.reduce((totalPrice, orderItem) => totalPrice + orderItem.price * orderItem.quant, 0)};
    },
    addProduct(product) {
        if (!this.orderProducts.length || !this.orderProducts.includes(product)) {
            product.quant = 1;
            this.orderProducts.push(product);
        } else
            this.orderProducts[this.orderProducts.indexOf(product)].quant++;
        this.render();
    },
    delProduct(idProduct) {
        this.orderProducts.find(function (item, index) {
            if(+item.id === +idProduct && +item.quant === 1) this.orderProducts.splice(index, 1);
            if(+item.id === +idProduct && +item.quant > 1) this.orderProducts[index].quant--;
        }.bind(this));
        this.render();
    },
};

const catalog = {
    dataProducts,
    catalogContainer: null,
    buttonAddProduct: null,

    init() {
        this.catalogContainer = document.getElementById('catalog');
        this.catalogContainer.addEventListener('click', function(event) {
            this.addProductToOrder(event);
        }.bind(this));
        this.render();
        order.init();
    },
    render() {
        if (!dataProducts.length) return this.catalogContainer.textContent = 'Каталог пуст.';;
        dataProducts.forEach(element => {
            this.catalogContainer.insertAdjacentHTML('beforeend', renderProduct(element));
        });
    },
    addProductToOrder(event) {
        if (event.target.tagName !== 'A') return;
        order.addProduct(this.dataProducts.find((item) => {
            return item.id === +event.target.dataset.idProduct;
        }));
    },


};

const productPhotos = {
    settings: {
        previewProduct: '.catalog',
        openedImageWrapperClass: 'productPhotoWrapper',
        openedImageClass: 'productPhotoWrapper__image',
        openedImageScreenClass: 'productPhotoWrapper__screen',
        openedImageCloseBtnClass: 'productPhotoWrapper__close',
        openedImageCloseBtnSrc: 'images/close.jpg',
    },
    init() {
        document.querySelector(this.settings.previewProduct)
            .addEventListener('click', (event) => {
                this.containerClickHandler(event.target);
            });
    },
    containerClickHandler(element) {
        if (element.tagName !== 'IMG') return;
        this.showImage(element.dataset.max_image_url);
    },

    showImage(url) {
        this.getScreenContainer().querySelector(`.${this.settings.openedImageClass}`).src = url;
    },

    getScreenContainer() {
        const galleryWrapperElement = document
            .querySelector(`.${this.settings.openedImageWrapperClass}`);

        if (galleryWrapperElement) return galleryWrapperElement;

        return this.createScreenContainer();
    },
    createScreenContainer() {
        const galleryWrapperElement = document.createElement('div');
        galleryWrapperElement.classList.add(this.settings.openedImageWrapperClass);

        const galleryScreenElement = document.createElement('div');
        galleryScreenElement.classList.add(this.settings.openedImageScreenClass);
        galleryWrapperElement.appendChild(galleryScreenElement);

        const closeImageElement = new Image();
        closeImageElement.classList.add(this.settings.openedImageCloseBtnClass);
        closeImageElement.src = this.settings.openedImageCloseBtnSrc;
        closeImageElement.addEventListener('click', () => this.close());
        galleryWrapperElement.appendChild(closeImageElement);

        const image = new Image();
        image.classList.add(this.settings.openedImageClass);
        galleryWrapperElement.appendChild(image);

        document.body.appendChild(galleryWrapperElement);

        return galleryWrapperElement;
    },

    close() {
        document.querySelector(`.${this.settings.openedImageWrapperClass}`).remove();
    },
};
catalog.init();
productPhotos.init();