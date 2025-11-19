const sub_num = "₀₁₂₃₄₅₆₇₈₉";
const data_text = {};
let list_item = [];
let list_reactant = [];

const data_reaction = {};
let splitted = reaction_text.split('\n');
for (let i = 0; i < splitted.length; i++) {
    let counter = 0;
    let array = splitted[i].split('\t');
    let type = array[array.length - 1];
    let alt = {reactant: [], product: [], type: type};
    if (!Object.keys(data_reaction).includes(type)) {
        data_reaction[type] = [];
    }
    while (array[counter] != '') {
        if (!list_item.includes(array[counter])) list_item.push(array[counter]);
        if (!list_reactant.includes(array[counter])) list_reactant.push(array[counter]);
        alt.reactant.push({name: array[counter], ratio: Number(array[counter + 1])});
        counter += 2;
    }
    while (array[counter] == '') counter++;
    while (array[counter] != '') {
        if (!list_item.includes(array[counter])) list_item.push(array[counter]);
        alt.product.push({name: array[counter], ratio: Number(array[counter + 1])});
        counter += 2;
    }
    data_reaction[type].push(alt);
}

list_item = list_item.sort();
list_reactant = list_reactant.sort();

for (let i = 0; i < list_item.length; i++) {
    let copied = list_item[i].split('').join('');
    let tf = list_item[i].match(/\[(.*?)\]/);
    if (tf ? !isNaN(Number(tf[1])) : false) {
        data_text[list_item[i]] = copied;
        continue;
    }
    for (let j = 0; j < 10; j++) {
        copied = copied.replaceAll(String(j), sub_num[j]);
    }
    data_text[list_item[i]] = copied;
}

function register() {
    reactant_html.forEach(elem => {
        list_reactant.forEach(e => {
            let alt = document.createElement('option');
            alt.value = e;
            alt.innerHTML = data_text[e];
            elem.appendChild(alt);
        });
        elem.addEventListener('change', addType);
    });
}
register();
addType();

function addType() {
    let reactant = [];
    for (let i = 0; i < reactant_html.length; i++) {
        if (reactant_html[i].value == '') {
            continue;
        };
        reactant.push({name: reactant_html[i].value});
    }
    let reaction_list = [];
    Object.keys(data_reaction).forEach(element => {
        let alt = data_reaction[element].filter(elem =>
            elem.reactant.length == reactant.length
            && elem.reactant.every(e => reactant.some(x => x.name == e.name))
        );
        alt.forEach(elem => reaction_list.push(elem));
    });
    reaction_type_html.innerHTML = '';
    if (reaction_list.length > 0) {
        reaction_list.forEach(element => {
            let alt = document.createElement('option');
            alt.value = element.type;
            alt.innerHTML = element.type;
            reaction_type_html.appendChild(alt);
        });
    } else {
        let alt = document.createElement('option');
        alt.value = '反応しない';
        alt.innerHTML = '反応しない';
        reaction_type_html.appendChild(alt);
    }
}