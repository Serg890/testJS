let form = document.forms['form1'];
let centsNominal;
let sum = 0;
let price = 0;
let dolars = 0;
let cents = 0;
let result = 0;
let cents50;
let cents25;
let cents10;
let cents5;
let cents1;

form.returnBtn.onclick = function () {
    sum = +form.sum.value;
    price = +form.price.value;
    result = sum - price;
    result = result.toFixed(2)

    dolars = Math.trunc(result);
    cents = result.split(".")[1].substr(0, 2);
    form.result.value = `${dolars} $ ${cents} ¢`;
    centsNominal = cents;
    form.nominals.value = `${dolars} $`

    while (centsNominal != 0) {
        if ((centsNominal / 50) >= 1) {
            cents50 = 50;
            centsNominal -= 50;
            form.nominals.value += ` ${cents50} ¢`;
        } else if ((centsNominal / 25) >= 1) {
            cents25 = 25;
            centsNominal -= 25;
            form.nominals.value += ` ${cents25} ¢`;
        } else if ((centsNominal / 10) >= 1) {
            cents10 = 10;
            centsNominal -= 10;
            form.nominals.value += ` ${cents10} ¢`;
        } else if ((centsNominal / 5) >= 1) {
            cents5 = 5;
            centsNominal -= 5;
            form.nominals.value += ` ${cents5} ¢`;
        } else {
            cents1 = 1;
            centsNominal -= 1;
            form.nominals.value += ` ${cents1} ¢`;
        }
    }
}

// --------------------------------------------------

let container = document.querySelector('.container');
let modalBtn = document.querySelector('.modalBtn');
let div = document.createElement('div');

modalBtn.onclick = function () {
    container.append(div);
    div.className = 'modal'
    document.querySelector('.modal').append(document.createElement('div'));
    document.querySelector('.modal').firstChild.className = 'modalBody';
    document.querySelector('.modalBody').append(document.createElement('button'));
    document.querySelector('.modalBody').firstChild.className = 'closeModal';
    document.querySelector('.closeModal').textContent = 'Close';

    document.querySelector('.closeModal').onclick = function () {
        document.querySelector('.modal').remove();
    }
}

// -------------------------------------------------

let f1 = document.forms['f1'];
let getId = x => document.getElementById(x);
let musUser = [];
let getIndex;
let count = 1;
let regExp = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{3,5})$/;

f1.addBtn.onclick = function () {
    let fName = f1.fName.value;
    let lName = f1.lName.value;
    let email = f1.email.value;
    let user = new User(fName, lName, email);
    f1.reset()

    if (fName === '') {
        alert('Введіть Ваше імя')
    } else if (lName === '') {
        alert('Введіть Ваше прізвище')
    } else if (email === '') {
        alert('Введіть e-mail');
    } else if (regExp.test(email) === true) {
        musUser.push(user);
        render();
    } else {
        alert('Неправильний формат e-mail')
    };
}

function User(fn, ln, em) {
    this.fName = fn;
    this.lName = ln;
    this.email = em;
}

function render() {
    let pushStr = '';
    let data = new Date();
    let hour = data.getHours();
    let minutes = data.getMinutes();
    let mounth = data.getMonth();
    let day = data.getDate();
    if (mounth < 10) mounth = '0' + (mounth);
    if (day < 10) day = '0' + day;
    if (hour < 10) hour = '0' + hour;
    if (minutes < 10) minutes = '0' + minutes;

    musUser.forEach(function (item, index) {
        pushStr += '<tr>';
        pushStr += `<th>${index+1}</th>`
        pushStr += `<td>${day}.${mounth+1}.${data.getFullYear()} ${hour}:${minutes}</td>`
        for (key in item) {
            pushStr += `<td>${item[key]}</td>`
        }
        pushStr += `<td><button  class="edit" id="item${count}" onclick="edit(${index})">Edit</button></td>`
        pushStr += `<td><button  class="delete" id="item${count}" onclick="deletee(${index})">Delete</button></td>`
        pushStr += '</tr>';
    })


    getId('tbody').innerHTML = pushStr;
}

function deletee(index) {
    musUser.splice(index, 1);
    render();
}

function edit(ind) {
    f1.fName.value = musUser[ind].fName;
    f1.lName.value = musUser[ind].lName;
    f1.email.value = musUser[ind].email;
    f1.saveBtn.style.display = 'block';
    f1.addBtn.style.display = 'none';
    getIndex = ind;
}


function save() {
    if (regExp.test(f1.email.value) === true) {
        let user = {
            fName: f1.fName.value,
            lName: f1.lName.value,
            email: f1.email.value,
        };
        musUser.splice(getIndex, 1, user);
        render();
        f1.reset();
        f1.saveBtn.style.display = 'none';
        f1.addBtn.style.display = 'block';
    } else {
        alert('Неправильний формат e-mail');
    }

}