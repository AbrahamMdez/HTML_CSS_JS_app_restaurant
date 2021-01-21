'use strict'

const items = document.querySelector('#items');
const templateCard = document.querySelector('#template-products').content;
const templateBox = document.querySelector('#template-box').content;
const cards = document.querySelector('#box-added');
const price = document.querySelector('#footer-price');
const fragment = document.createDocumentFragment();
let box = {};

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});

items.addEventListener('click', e => {
    addBox(e);
});

const fetchData = async () => {
    try{
        const res = await fetch('../assets/JS/api.json');
        const data = await res.json();
        pintData(data)
    } catch (error) {
        console.log(error);
    };
};

const pintData = data => {
    data.forEach ( product => {
        templateCard.querySelector('h3').textContent = product.name;
        templateCard.querySelector('p').textContent = product.precio;
        templateCard.querySelector('h5').textContent = product.description;
        templateCard.querySelector('img').setAttribute("src", product.url);
        templateCard.querySelector('.btn-add-buy').dataset.id = product.id;

        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    });

    items.appendChild(fragment);
};

const addBox = e => {
    /* console.log(e.target);
    Esto lo que nos hace es dar un valor booleano, si estamos pulsando el boton con la clase 
    que le indiquemos, nos dirá true o false
    console.log(e.target.classList.contains('btn-add-buy')); */
    if (e.target.classList.contains('btn-add-buy')) {
        /* El parentElement, nos coge lo que este envolviendo a lo que estamos seleccionnando,
        osea a su padre con todos sus hijos
        console.log(e.target.parentElement); */
        setBox(e.target.parentElement);
    }
    /* Este metodo stopPropagation, lo que hace es detener otro evento que se pueda estar haciendo
    en donde estamos actuando, este metodo detiene cualquier evento que no queramos que este 
    sucediendo en este momento que no sea el que queramos */
    e.stopPropagation();
    
};

const setBox = obj => {
    /* console.log(obj); */
    const product = {
        id: obj.querySelector('.btn-add-buy').dataset.id,
        title: obj.querySelector('h3').textContent,
        amounth: 1
    }

    if (box.hasOwnProperty(product.id)) {
        product.amounth = box[product.id].amounth + 1;
    }

    box[product.id] = {...product};
    addItemsBox();
};

const addItemsBox = () => {
    console.log(box);
    cards.innerHTML = "";
    Object.values(box).forEach( product => {
        templateBox.querySelector('th').textContent = product.id;
        /* Aqui, como al td que queremos ir hay DOMSettableTokenList, le decimos que selecionamos a todos y vaya a la posicion 0 */
        templateBox.querySelectorAll('td')[0].textContent = product.title;
        templateBox.querySelectorAll('td')[1].textContent = product.amounth;
        templateBox.querySelectorAll('td')[2].textContent = product.amounth * product.precio;
        const clone = templateBox.cloneNode(true);
        fragment.appendChild(clone);
    });
    cards.appendChild(fragment);

    showPriceTotal();
};

/* const showPriceTotal = () => {
    if (Object.keys(box).length === 0) {
        price.innerHTML = `
        <th>Carrito Vacio</th>
        `
    }

    //Aqui estamos usando el metodo reductor, que va acompañado del metodo reductor, este metodo recibe una cantidad y
    //mediante una funcion coge la cantidad acumulada y la suma a la cantidad
    const nCantidad = Objetc.values(box).reduce((acc, { amounth }) => acc + amounth, 0);
    const nPrice = Objetc.values(box).reduce((acc, { amounth, price }) => acc + amounth * price, 0);
    console.log(nCantidad);
    console.log(nPrice);
}; */