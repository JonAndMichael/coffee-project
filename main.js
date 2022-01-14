
"use strict"

function buildCoffees(coffees) {
    for(let i = 1; i <= localStorage.coffeeCount; i++ )
    {
        let coffee = localStorage.getItem("" + i).split(',');
        let tempCoffee = {
            id: i,
            name: coffee[0],
            roast: coffee[1]
        }
        coffees.push(tempCoffee);
    }
    console.log(coffees);
}

function renderCoffee(coffee) {
    var html = '<div class="d-inline-block col-6 my-2">';
    html += '<h1 class="d-inline-block">' + coffee.name + '</h1>';
    html += '<p class="d-inline-block text-secondary fs-4 px-2">' + coffee.roast + '</p>';
    html += '</div>';
    return html;
}

function renderCoffees(coffees) {
    var html = '';
    for(var i =0; i < coffees.length; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    var selectedRoast = roastSelectionSearch.value;
    var filteredCoffees = [];
    if(selectedRoast === 'all') {
        coffees.forEach(function (coffee) { filteredCoffees.push(coffee); });
    } else {
        coffees.forEach(function (coffee) {
            if (coffee.roast === selectedRoast) {
                filteredCoffees.push(coffee);
            }
        });
    }
    tbody.innerHTML = renderCoffees(filteredCoffees);
}

function searchCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    var filteredCoffees = [];
    coffees.forEach(function (coffee) {
        if (coffee.name.toLowerCase().includes(coffeeNameField.value.toLowerCase())) {
            filteredCoffees.push(coffee);
        }
    });
    tbody.innerHTML = renderCoffees(filteredCoffees);
}

function addCoffee(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    let tempCoffee = {
        id: (coffees.length + 1),
        name: coffeeAddNameField.value,
        roast: roastSelectionAdd.value
    }
    coffees.push(tempCoffee);

    var filteredCoffees = [];
    coffees.forEach(function (coffee) { filteredCoffees.push(coffee); });
    tbody.innerHTML = renderCoffees(filteredCoffees);

    localStorage.coffeeCount = coffees.length;
    console.log(localStorage.coffeeCount);
    coffees.forEach(function (coffee, idx) {
        localStorage.setItem("" + (idx +1), coffee.name + "," + coffee.roast);
    });


}

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [];

var tbody = document.querySelector('#coffees');
var submitSearchButton = document.querySelector('#submit-search');
var roastSelectionSearch = document.querySelector('#roast-selection-search');
var coffeeNameField = document.querySelector('#search');
var submitAddButton =  document.querySelector('#submit-add');
var coffeeAddNameField = document.querySelector('#name');
var roastSelectionAdd = document.querySelector('#roast-selection-add');

buildCoffees(coffees)
tbody.innerHTML = renderCoffees(coffees);

submitSearchButton.addEventListener('click', searchCoffees);
coffeeNameField.addEventListener('keyup', searchCoffees);
roastSelectionSearch.addEventListener("change", updateCoffees);
submitAddButton.addEventListener('click', addCoffee);