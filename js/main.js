'use strict';
const products = [
    { id: 1, title: 'Notebook', price: 20000 },
    { id: 2, title: 'Mouse', price: 1500 },
    { id: 3, title: 'Keyboard', price: 5000 },
    { id: 4, title: 'Gamepad', price: 4500 },
];

const renderProduct = (title, price = 0) => {
        return `<div class="product-item">
                <h3>${title}</h3>
                <p>${price}</p>
                <button class="by-btn">Добавить в корзину</button>
              </div>`;
    }
    // 2 задача - попытка упростить функцию через insertAdjacentHTML
const renderProducts = (list = [{ title: 'Продуктов нет.', price: '---' }, ]) => {
    for (let item of list) {
        document.querySelector('.products').insertAdjacentHTML('beforeEnd', renderProduct(item.title, item.price));
    }
}

/* 2 задача
    const renderProducts = (list = [{ title: 'Продуктов нет.', price: '---' }, ]) => {
    const productListHTML = list.map((item) => renderProduct(item.title, item.price));
    //console.log(productListHTML);
    // запятая выводится, т.к. массив при присвоении свойству innerHTML 
    // раскладывается как строка с элементами через запятую, 
    // для преобразования массива в строку используем join с установкой разделителя - пробел
    document.querySelector('.products').innerHTML = productListHTML.join(' ');
} */



renderProducts(products);