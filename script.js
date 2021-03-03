'use strict';
// ################# 1 task
function convertNumToObj(number) {
    const obj = {
        units: 0,
        decade: 0,
        hundreds: 0,
    };
    let num = parseInt(number);
    if(num > 999 || isNaN(num)) {
        console.log('Значение не является числом или превышает 999.'); 
        return {};
    }
    if(num > 99) obj.hundreds = Math.floor(num / 100); 
    if(num > 9) obj.decade = Math.floor(num / 10) - obj.hundreds * 10;   
    obj.units = num - obj.decade * 10 - obj.hundreds * 100;
    return obj;
}

// ################### 2 task 
// создаем объекты товаров
const notebook = {
    name: 'Toshiba',
    price: 20000,
    quant: 0,
};
const monitor = {
    name: 'Samsung',
    price: 8000,
    quant: 0,    
};
const keyboard = {
    name: 'lg',
    price: 750,
    quant: 0,    
};
// при добавлении в корзину указываем кол-во
notebook.quant = 5;
monitor.quant = 4;
keyboard.quant = 4;
// массив корзины (из объектов товаров)
const order = [
    notebook,
    monitor,
    keyboard,    
];

function countBasketPrice(arr) {
    let sumOrder = 0;
    for (let val of arr) {
            sumOrder += val.price * val.quant;
    }
    return sumOrder;
}
console.log(countBasketPrice(order));

// #################### 3 task - 2 функции, возвращающие объект товар и объект корзина, с методами подсчета суммарной стоимости товаров (от кол-ва) и корзины.
// корзин может быть множество (от пользователей сайта), также в корзине необходимы методы добавления, удаления товаров, плюс изменения кол-ва (не реализовал)
// плюс наверно методы записи/чтения в/из БД (если например заказ не оформлен и пользователь покинул сайт) для истории.
// в продукте можно еще добавить свойства - характеристики, фото, рейтинг...

function productCreate(id, category, name, price, description = 'не заполнено') {
    if( id === 'undefined' || name === 'undefined'  || price === undefined ) return null; 
    const obj = {
        id: id,
        name: name,
        category: category,
        price: price,
        description: description,
        quant: 1,
        sum() {
            return this.quant * this.price;
        }
    };
    return obj;
}
function orderCreate(id, user) {
    if( id === 'undefined' || user === 'undefined' ) return null; 
    const obj = {
        id,
        user,
        productsOrder: [],
        addProduct(product, quant) {
            if(product === null) return;
            product.quant = quant;
            this.productsOrder.push( product );        
        },
        delProduct(numProduct, count = 1) {
            // удаление товара(ов) из корзины
            this.productsOrder.splice(numProduct - 1, count);
        },
        sumOrder() {
            let summary = 0;
            for (let val of this.productsOrder) {
                summary += val.sum();          
            };
            return summary;
        },        
    };
    return obj;
}
const order1 = orderCreate(1, 'Jhon'); 
const order2 = orderCreate(2, 'Peter');  

const notebook = productCreate(1, 'notebooks', 'Toshiba', 20000);
const monitor = productCreate(2, 'monitors', 'Samsung', 8000, '17,5 дюймов');
const monitor1 = productCreate(3, 'monitors', 'Samsung', 7800, '15 дюймов');
const keyboard = productCreate(4, 'accessories', 'lg', 750);
order1.addProduct(notebook, 10);
order1.addProduct(monitor, 5);
order1.addProduct(monitor1, 5);
order1.addProduct(keyboard, 4);
order2.addProduct(notebook, 3);
order2.addProduct(monitor1, 1);
order2.addProduct(keyboard, 2);
console.log(order1.productsOrder);
console.log(order1.sumOrder());
console.log(order2.productsOrder);
console.log(order2.sumOrder());
