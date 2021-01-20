'use strict'

const items = document.getElementById('items');

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
    const templateCard = document.getElementById('template-card');
    const fragment = document.createDocumentFragment();
    console.log(templateCard)
    data.forEach ( product => {
        console.log(product)
        templateCard.querySelector('h3').textContent = product.name;

        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    })

    items.appendChild(fragment)
};