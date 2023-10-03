let menus = [
    {
        'dish': 'Bacon Cheeseburger',
        'description': 'mit Speck, Heumilchkäse und Essiggurken',
        'price': 12.00
    },

    {
        'dish': 'Blue Cheeseburger',
        'description': 'mit Blauschimmelkäse und Rucola',
        'price': 10.90
    },

    {
        'dish': 'Italy Burger',
        'description': 'mit Tomaten, Mozzarella, Rucola und Basilikumpesto',
        'price': 9.80
    },

    {
        'dish': 'Chilli Cheeseburger',
        'description': 'mit hausgemachter Chilli Cheesesauce und frischen Jalapenos',
        'price': 12.50
    },

    {
        'dish': 'Wheat Beer Onion Burger',
        'description': 'mit geschmolzene Weißbierzwiebeln, knusprigem Speck und Cheddar',
        'price': 11.95
    },

    {
        'dish': 'Pulled Pork Burger',
        'description': 'mit Pulled Pork, Cheddar und Barbequesauce',
        'price': 10.50
    },

    {
        'dish': 'Bison Burger',
        'description': 'mit Bisonfleisch-Patty, knusprigem Speck,und Stout Steaksauce',
        'price': 15.50
    },
];

let shoppingBasket = [];
let prices = [];
let totalPrice = 0;
let menuCounts = {};

function mainMenu() {
    document.getElementById('menu').innerHTML = '';

    for (let i = 0; i < menus.length; i++) {
        const menu = menus[i];

        document.getElementById('menu').innerHTML += `
        <div class="menuBox">
            <div><h4>${menu['dish']}</h4></div>
            <img onclick="addToBasket('${menu['dish']}', ${menu['price']})" class="plusIcon" src="img/plus.png" alt="plus">
            <div><em>${menu['description']}</em></div><br>
            <div class="price"><p><strong>${menu['price'].toFixed(2).replace('.',',')}€</strong></p></div>
        </div>
    `;
    }
}


function addToBasket(dish, price) {
    if (!menuCounts[dish]) {
        menuCounts[dish] = 0;
    }
    menuCounts[dish]++;
    totalPrice += price;

    const basket = document.getElementById('warenkorb');
    const items = basket.getElementsByClassName('basket-item');
    let itemExists = false;

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const dishName = item.getElementsByTagName('p')[0].textContent;
        if (dishName === dish) {
            item.getElementsByTagName('p')[1].textContent = `${price.toFixed(2).replace('.',',')}€ x ${menuCounts[dish]}`;
            itemExists = true;
            break;
        }
    }

    if (!itemExists) {
        shoppingBasket.push(dish);
        prices.push(price);

        const item = document.createElement('div');
        item.classList.add('basket-item');
        item.innerHTML = `
    <p>${dish}</p>
    <p>${price.toFixed(2)}€ x ${menuCounts[dish]}</p>
    <img onclick="addToBasket('${dish}', ${price})" class="plusIconBasket" src="img/plus.png" alt="plus">
    <img onclick="reduceInBasket('${dish}', ${price})" class="plusIconBasket" src="img/minus.png" alt="minus">
    `;
        basket.appendChild(item);
    }
    updateTotalPrice();
}


function reduceInBasket(dish, price) {
    if (menuCounts[dish] && menuCounts[dish] > 0) {
        menuCounts[dish]--;
        totalPrice -= price;

        const basket = document.getElementById('warenkorb');
        const items = basket.getElementsByClassName('basket-item');

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const dishName = item.getElementsByTagName('p')[0].textContent;

            if (dishName === dish) {
                const itemCount = menuCounts[dish];
                if (itemCount === 0) {
                    basket.removeChild(item);
                } else {
                    item.getElementsByTagName('p')[1].textContent = `${price.toFixed(2).replace('.',',')}€ x ${itemCount}`;
                }
                break;
            }
        }

        updateTotalPrice();
    }
}


function countMenuItemsInBasket() {
    const menuCounts = {};
    for (let i = 0; i < shoppingBasket.length; i++) {
        const dish = shoppingBasket[i];
        if (menuCounts[dish]) {
            menuCounts[dish]++;
        } else {
            menuCounts[dish] = 1;
        }
    }

    const basket = document.getElementById('warenkorb');
    const items = basket.getElementsByClassName('basket-item');
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const dishName = item.getElementsByTagName('p')[0].textContent;
        if (menuCounts[dishName]) {
            item.getElementsByTagName('p')[1].textContent = `${prices[i].toFixed(2).replace('.',',')}€ x ${menuCounts[dishName]}`;
        }
    }
}


function updateBasket() {
    const basket = document.getElementById('warenkorb');
    basket.innerHTML = '<h3>Warenkorb</h3>';
    for (const dish in menuCounts) {
        basket.innerHTML += `
            <div class="basket-item">
                <p>${dish}</p>
                <p>${prices[i].toFixed(2).replace('.',',')}€ x ${menuCounts[dish]}</p>
                <img onclick="addToBasket('${dish}', ${price})" class="plusIconBasket" src="img/plus.png" alt="plus">
                <img onclick="removeFromBasket('${dish}', ${prices[i]})" class="plusIconBasket" src="img/minus.png" alt="minus">
            </div>
        `;
    }
    updateTotalPrice();
}

mainMenu();
updateBasket();


function updateTotalPrice() {
    const totalElement = document.getElementById('totalPrice');
    totalElement.innerText = `Bezahlen: ${totalPrice.toFixed(2).replace('.',',')}€`;
}


function reloadPage() {
    location.reload();
}

function warnung() {
    alert("Diese Seite ist bereits in deutscher Sprache");
}

function warnung2() {
    alert("Coming soon");
}