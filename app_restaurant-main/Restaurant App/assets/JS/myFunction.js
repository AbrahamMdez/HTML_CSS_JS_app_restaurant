'use strict'

const items = document.querySelector('#items');
const templateCard = document.querySelector('#template-products').content;
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
        console.log(error)
    }
}

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

    items.appendChild(fragment)
};

const addBox = e => {
    /* console.log(e.target);
    Esto lo que nos hace es dar un valor booleano, si estamos pulsando el boton con la clase 
    que le indiquemos, nos dirá true o false
    console.log(e.target.classList.contains('btn-add-buy')); */
    if (e.target.classList.contains('btn-add-buy')) {
        /* El parentElement, no coge lo que este envolviendo a lo que estamos seleccionnando,
        osea a su padre con todos sus hijos
        console.log(e.target.parentElement); */
        setBox(e.target.parentElement);
    }
    /* Este metodo stopPropagation, lo que hace es detener otro evento que se pueda estar haciendo
    en donde estamos actuando, este metodo detiene cualquier evento que no queramos que este 
    sucediendo en este momento que no sea el que queramos */
    e.stopPropagation();
    
}

const setBox = obj => {
    console.log(obj);
    const product = {
        id: obj.querySelector('.btn-add-buy').dataset.id,
        title: obj.querySelector('h3').textContent,
        amounth: 1
    }

    if (box.hasOwnProperty(product.id)) {
        product.amounth = box[product.id].amounth + 1;
    }

    box[product.id] = {...product}
    console.log(box)
}