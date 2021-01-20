'use strict'

const items = document.querySelector('#items');
const templateCard = document.querySelector('#template-products').content;
const fragment = document.createDocumentFragment();

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
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

        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    });

    items.appendChild(fragment)
};