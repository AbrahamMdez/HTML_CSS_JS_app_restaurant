'use strcit'

const items = document.querySelector('#items');
const templateCard = document.querySelector('#template-card').content;
const fragment = document.createDocumentFragment();

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});

const fetchData = async () => {
    try{
        const res = await fetch('api.json')
        const data = await res.json();
        console.log(data)
    } catch (error) {
        console.log(error)
    }
};

const printCard = data => {
    data.forEach(element => {
        templateCard.querySelector('h3').textContent = element.name;

        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone)
    })

    items.appendChild(fragment);
};