'use strict';
/* 1. Дан большой текст, в котором для оформления прямой речи используются одинарные кавычки. 
Придумать шаблон, который заменяет одинарные кавычки на двойные. */
const text = `Дан большой текст, в котором 'для оформления прямой речи используются' одинарные кавычки. 
Придумать шаблон, 'который заменяет одинарные' кавычки на двойные.`;
console.log(text.replace(/\'/g, `"`));

/* 2. Улучшить шаблон так, чтобы в конструкциях типа aren't 
одинарная кавычка не заменялась на двойную. */
const newtext = `Дан большой текст, в котором 'для оформления прямой aren't речи используются' одинарные кавычки. 
Придумать шаблон, 'который заменяет одинарные' aren't кавычки на двойные.`;
console.log(newtext.replace(/\s\'/g, ` "`).replace(/\'\s/g, `" `));

/* 
3. Создать форму обратной связи с полями: Имя, Телефон, E-mail, текст, кнопка Отправить. 
При нажатии на кнопку Отправить произвести валидацию полей следующим образом:
a. Имя содержит только буквы.
b. Телефон имеет вид +7(000)000-0000.
c. E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.
d. Текст произвольный.
e. Если одно из полей не прошло валидацию, необходимо выделить это поле красной рамкой 
и сообщить пользователю об ошибке. 
*/

class FeedBack {
    constructor(container = 'div.fb') {
        document.querySelector(container).insertAdjacentHTML('beforeend', this.render());
        this._init();
    }
    _init() {
        document.querySelector('input.feedback__button').disabled = true;
        document.querySelector('form.feedback').addEventListener('focusout', (e) => {
            let regexp = /.*/;
            switch (e.target.id) {
                case 'fb-name':
                    regexp = /^([a-zа-я]+)$/;
                    break;
                case 'fb-phone':
                    regexp = /^(\+[7]\(\d{3}\)\d{3}\-\d{4})$/;
                    break;
                case 'fb-email':
                    regexp = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/;
                    break;
            }
            if (e.target.id !== 'fb-text' && e.target.type !== 'button')
                (!this._validate(e.target, regexp)) ?
                    (e.target.classList.add('warning'), e.target.nextElementSibling.hidden = false, e.target.nextElementSibling.dataset.check = false) :
                    (e.target.classList.remove('warning'), e.target.nextElementSibling.hidden = true, e.target.nextElementSibling.dataset.check = true);
            if (document.querySelectorAll('[hidden]').length === 3 && document.querySelectorAll('[data-check]').length === 3)
                document.querySelector('input.feedback__button').disabled = false;
        });
        document.querySelector('#fb-phone').addEventListener('keydown', (e) => {
            if (e.keyCode === 8 || e.keyCode === 9 || e.keyCode === 46) return;
            e.preventDefault();
            if (e.target.value === '') e.target.value = '+7(';
            if (e.target.value.length === 6) e.target.value += ')';
            if (e.target.value.length === 10) e.target.value += '-';
            if (e.target.value.length === 15) return;
            if (+e.key >= 0 && +e.key < 10) e.target.value += e.key;
        });
    }
    _validate(el, regExp) {
        return regExp.test(el.value);
    }
    render() {
        return `<form class="feedback" action="">
                <label for="fb-name">Имя:</label>
                <input id="fb-name" type="text" size="40">
                <span class="spanWarning" hidden>Введите правильные данные</span>
                <label for="fb-phone">Телефон:</label>
                <input id="fb-phone" type="text" placeholder="+7(000)000-0000">
                <span class="spanWarning" hidden>Введите правильные данные</span>
                <label for="fb-email">E-mail:</label>
                <input id="fb-email" type="email" placeholder="example@example.com">
                <span class="spanWarning" hidden>Введите правильные данные</span>  
                <label for="fb-text">Сообщение:</label>
                <input id="fb-text" type="text" placeholder="..." size="255"> 
                <input class="feedback__button" type="button" value="Отправить" onclick="alert('Сообщение отправлено.')">                                               
                </form>`;
    }
}

new FeedBack();
