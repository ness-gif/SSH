data_reaction;

document.addEventListener('keydown', event => {
    if (event.key == 'Enter' && container_html[1].style.display != 'none') execute();
});

button_html.addEventListener('click', execute);

function execute() {
    if (reaction_type_html.value == '反応しない') return;
    let type = reaction_type_html.value;
    let reactant = [];
    let amount = [];
    let digits = [];
    let unit = [];
    if (!(reactant_html.length == amount_html.length && amount_html.length == unit_html.length)) {
        console.error('Error! 1');
        return;
    }

    for (let i = 0; i < reactant_html.length; i++) {
        if (reactant_html[i].value == '' || isNaN(Number(amount_html[i].value))) {
            continue;
        };
        reactant.push({name: reactant_html[i].value});
        amount.push(Number(amount_html[i].value));
        digits.push(amount_html[i].value);
        unit.push(unit_html[i].value);
    }

    // 有効数字を調べる
    let significantDigits = digits.map(e => {
        let alt = e.replace('.', '').split('');
        while(alt[0] == 0) alt.shift();
        return alt.length;
    });
    let significantDigit = min(significantDigits);

    // gをmolに変換する
    for (let i = 0; i < unit.length; i++) {
        if (unit[i] == 'g') {
            reactant[i].molecule = amount[i] / data_molecule[reactant[i].name];
        } else if (unit[i] == 'mol') {
            reactant[i].molecule = amount[i];
        } else {
            console.error('Error! 2: Units are required to be g or mol.');
            return;
        }
    }

    let result = simulate(reactant, significantDigit, type);

    output(result);
}

function simulate(reactant, digit, type) {
    let reactant_copy = reactant;
    let reaction = data_reaction[type].find(elem =>
        elem.reactant.length == reactant.length
        && elem.reactant.every(e => reactant.some(x => x.name == e.name))
    );

    if (reaction == undefined) return {product: [], remainder: reactant};

    let devided = [];
    for (let i = 0; i < reactant.length; i++) {
        let ing = reaction.reactant.find(e => e.name == reactant[i].name);
        devided.push(reactant[i].molecule / ing.ratio);
    }
    let std = devided[0];
    let std_num = 0; // 何番目の反応物が基準かを表す変数。使うかもしれないから残しておきます
    for (let i = 1; i < devided.length; i++) {
        if (devided[i] < std) {
            std = devided[i];
            std_num = i;
        }
    }

    let significantDigit = digit;
    if (digit == 'auto') {
        let result_molecule = [];
        reaction.product.forEach(e => {
            result_molecule.push((std * e.ratio).toPrecision(8));
        });
        for (let i = 0; i < reactant.length; i++) {
            result_molecule.push(reactant[i].molecule.toPrecision(8));
            let ing = reaction.reactant.find(e => e.name == reactant[i].name);
            if (reactant[i].molecule - std * ing.ratio > 1.0e-8) {
                result_molecule.push((std * ing.ratio).toPrecision(8));
            }
        }
        let significantDigits = result_molecule.map(e => {
            let alt = String(Number(e)).replace('.', '').split('');
            while(alt[0] == 0) alt.shift();
            return alt.length;
        });
        significantDigit = max(significantDigits);
        // console.log(result_molecule);
        reactant_copy = reactant.map(e => {
            let alt = e;
            alt.molecule = Number(alt.molecule).toPrecision(significantDigit);
            return alt;
        });
    }
    let result_product = [];
    let result_remainder = [];
    reaction.product.forEach(e => {
        result_product.push({name: e.name, molecule: (std * e.ratio).toPrecision(significantDigit)});
    });
    for (let i = 0; i < reactant.length; i++) {
        let ing = reaction.reactant.find(e => e.name == reactant[i].name);
        if (reactant[i].molecule - std * ing.ratio > 1.0e-10) {
            result_remainder.push({name: reactant[i].name, molecule: (reactant[i].molecule - std * ing.ratio).toPrecision(significantDigit)});
        }
    }

    return {type: type, reactant: reactant_copy, product: result_product, remainder: result_remainder, digit: significantDigit, standard: std};
}


function output(result) {
    output_html.innerHTML = '<div class="label_result">〈結果〉</div>';
    let product = result.product;
    let remainder = result.remainder;
    let tf = Boolean(remainder.length);
    if (product.length == 0) {
        let tail_none = document.createElement('div');
        tail_none.classList.add('tail_none');
        tail_none.innerHTML = '反応しない';
        output_html.appendChild(tail_none);
        return;
    }
    for (let i = 0; i < product.length; i++) {
        let doc = document.createElement('div');
        doc.classList.add('result_product');
        doc.innerHTML = `${data_text[product[i].name]} が ${product[i].molecule}mol`;
        output_html.appendChild(doc);
    }
    let tail_product = document.createElement('div');
    tail_product.classList.add('tail_product');
    tail_product.innerHTML = tf ? '生成され、': '生成される';
    output_html.appendChild(tail_product);
    if (!tf) return;
    for (let i = 0; i < remainder.length; i++) {
        let doc = document.createElement('div');
        doc.classList.add('result_remainder');
        doc.innerHTML = `${data_text[remainder[i].name]}が${remainder[i].molecule}mol`;
        output_html.appendChild(doc);
    }
    let tail_remainder = document.createElement('div');
    tail_remainder.classList.add('tail_remainder');
    tail_remainder.innerHTML = '余る';
    output_html.appendChild(tail_remainder);
}

let current_form = 1;
append_html.addEventListener('click', append);

function append() {
    let zenkaku_number = String(current_form).replace(/[0-9]/g, s => {return String.fromCharCode(s.charCodeAt(0) + 0xFEE0)});
    let doc = document.createElement('div');
    doc.classList.add(`input${current_form}`);
    doc.innerHTML = `
        <span>反応物${zenkaku_number}：</span>
        <select name="reactant${current_form}" id="reactant${current_form}" class="reactant">
            <option value="" selected>--</option>
        </select>
        <input type="number" name="mol${current_form}" id="mol${current_form}" value="1" class="amount" step="0.1" min="0.1" placeholder="数値を入力" required>
        <select name="unit${current_form}" id="unit${current_form}" class="unit">
            <option value="g">g</option>
            <option value="mol" selected>mol</option>
        </select>
    `;
    input_html.appendChild(doc);
    define();
    register();
    current_form++;
}

window.onload = () => {
    for (let i = 0; i < form_number; i++) append();
}