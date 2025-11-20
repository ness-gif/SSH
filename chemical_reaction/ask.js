let list = {};
let asking = false;
let question_type_number = 0;
let explanations = [
    {existRemain: false}
];

function box(text, num, option, group) {
    return `<input type="text" class="reply_box" data-material="${text}" data-num="${num}" data-option="${option}" data-group="${group}">`;
}

function value(text, num, option) {
    return num == undefined ? list[text] : list[text][num][option];
}

// const question_template = [
//     '{}{}gが{}と反応し、{}が{}gできた。このときの{}',
// ];

let questions = [ // 反応の種類追加により要修正
    () => {
        let explanation = explanations[0];
        let text = '';
        let reactant = [];
        for (let i = 0; i < list.reactant.length; i++) {
            reactant.push(data_text[value('reactant', i, 'name')] + ' ' + value('reactant', i , 'molecule') + 'mol');
        }
        text = text + reactant.join('、') + 'を反応させると';
        let product = [];
        for (let i = 0; i < list.product.length; i++) {
            product.push(box('product', i, 'name', 1) + 'が' + box('product', i, 'molecule', 1) + 'mol');
        }
        text = text + product.join('、');
        if (list.remainder.length > 0) {
            explanation.existRemain = true;
            let remainder = [];
            for (let i = 0; i < list.remainder.length; i++) {
                remainder.push(box('remainder', i, 'name', 2) + 'が' + box('remainder', i, 'molecule', 2));
            }
            text = text + '生成され、' + remainder.join('、') + 'mol余る。';
        } else {
            explanation.existRemain = false;
            text = text + '生成される。'
        }
        return text;
    }
];

function ask() {
    asking = true;
    hint_text_html.classList.remove('visible');
    let type = randomChoice(Object.keys(data_reaction));
    let reaction = JSON.parse(JSON.stringify(randomChoice(data_reaction[type])));
    const constant_reaction = JSON.parse(JSON.stringify(reaction));
    let hint_text = generateHint(constant_reaction, false);
    hint_text_html.innerHTML = hint_text;
    let significantDigit = Math.floor(Math.random() * 2) + 1;
    let digit = Math.floor(Math.random() * 4) - 2;

    let std = Math.floor((Math.random() * 9 + 1) * 10 ** (significantDigit - 1)) / 10 ** (significantDigit - 1) * 10 ** digit;
    let reactant = [];
    let min_reactant_index = Math.floor(Math.random() * reaction.reactant.length);
    for (let i = 0; i < reaction.reactant.length; i++) {
        if (i != min_reactant_index) {
            reaction.reactant[i].ratio += Math.floor(Math.random() * 3);
        };
        reactant.push({name: reaction.reactant[i].name, molecule: std * reaction.reactant[i].ratio});
    }
    let max = 0;
    reactant.forEach(e => {
        let surplus = Math.floor(Math.log10(e.molecule)) - digit;
        if (surplus > max) {
            max = surplus;
        }
    });
    significantDigit += max;
    // console.log(reactant);
    let result = simulate(reactant, 'auto', type);

    for (let i = 0; i < reactant.length; i++) {
        reactant[i].molecule = Number(reactant[i].molecule).toPrecision(result.digit);
    }

    list = result;
    // list.type = result.type;
    // list.digit = result.digit;
    // list.reactant = result.reactant;
    // list.product = result.product;
    // list.remainder = result.remainder;
    // console.log(list);

    question_type_number = randInt(0, questions.length - 1);
    question_html.innerHTML = questions[question_type_number]();
    let explanation_text = generateExplanation(constant_reaction, list);
    key_content_html.innerHTML = explanation_text;
    // document.querySelector('.reply_box').focus();
    check_html.style.display = 'block';
    key_html.style.display = 'none';
    key_content_html.classList.remove('visible');
    next_html.style.display = 'none';
}

function isOne(num) {
    if (num == 1) {
        return '';
    } else {
        return String(num);
    }
}
function generateHint(reaction, ifExplanation) {
    let text = '';
    let reactant = reaction.reactant;
    let product = reaction.product;
    let reactant_text = '';
    reactant_text += isOne(reactant[0].ratio);
    reactant_text += data_text[reactant[0].name];
    for (let i = 1; i < reactant.length; i++) {
        reactant_text += ' + ';
        reactant_text += isOne(reactant[i].ratio);
        reactant_text += data_text[reactant[i].name];
    }
    text += reactant_text;
    if (ifExplanation) text += '<wbr>';
    text += ' → '
    let product_text = '';
    product_text += isOne(product[0].ratio);
    product_text += data_text[product[0].name];
    for (let i = 1; i < product.length; i++) {
        product_text += ' + ';
        product_text += isOne(product[i].ratio);
        product_text += data_text[product[i].name];
    }
    text += product_text;
    return text;
}

function generateExplanation(reaction, list) {
    let text = '';
    if (question_type_number == 0) {
        let text_standarts = '';
        if (reaction.reactant.length > 1) {
            text_standarts += `<div>${generateHint(reaction, true)}</div>`;
            let ratios = [];
            for (let i = 0; i < reaction.reactant.length; i++) {
                let r1 = reaction.reactant[i];
                let r2 = list.reactant[i];
                for (let i = 0; i < list.reactant.length; i++) {
                    if (list.reactant[i].name == r1.name) {
                        r2 = list.reactant[i];
                        break;
                    }
                }
                text_standarts += `<div>${data_text[r1.name]}について、<wbr>${r2.molecule} ÷ ${r1.ratio} = ${(Number(r2.molecule) / r1.ratio).toPrecision(list.digit)}</div>`;
                ratios.push(Number(r2.molecule) / r1.ratio);
            }
            let minimum_reactant_num = 0;
            for (let i = 1; i < ratios.length; i++) {
                if (ratios[i] < ratios[minimum_reactant_num]) {
                    minimum_reactant_num = i;
                }
            }
            text_standarts += `<div>${ratios[minimum_reactant_num].toPrecision(list.digit)} が最も小さいから、<wbr>${data_text[reaction.reactant[minimum_reactant_num].name]}を<wbr>基準とする。</div>`
        }

        let columns_number = reaction.reactant.length + reaction.product.length + 1;

        let row1 = '';
        for (let i = 0; i < reaction.reactant.length; i++) {
            row1 += `<td>${reaction.reactant[i].ratio}${data_text[reaction.reactant[i].name]}</td>`;
        }
        row1 += '<td>→</td>';
        for (let i = 0; i < reaction.product.length; i++) {
            row1 += `<td>${reaction.product[i].ratio}${data_text[reaction.product[i].name]}</td>`;
        }

        let row2 = '';
        for (let i = 0; i < list.reactant.length; i++) {
            row2 += `<td>${list.reactant[i].molecule}mol</td>`;
        }
        row2 += '<td></td>';
        for (let i = 0; i < list.product.length; i++) {
            row2 += `<td>${(0).toPrecision(list.digit)}mol</td>`;
        }

        let row3 = '';
        for (let i = 0; i < reaction.reactant.length; i++) {
            row3 += `<td class="include_arrow"><div class="arrow_container"><div class="arrowDown"></div></div><div class="molecule_value">-${(list.standard * reaction.reactant[i].ratio).toPrecision(list.digit)}</div></td>`;
        }
        row3 += '<td></td>';
        for (let i = 0; i < reaction.product.length; i++) {
            row3 += `<td class="include_arrow"><div class="arrow_container"><div class="arrowDown"></div></div><div class="molecule_value">+${(list.standard * reaction.product[i].ratio).toPrecision(list.digit)}</div></td>`;
        }

        let row4 = '';
        for (let i = 0; i < list.reactant.length; i++) {
            let alt = Number(list.reactant[i].molecule) - list.standard * reaction.reactant[i].ratio;
            if (alt < 0.0001) alt = 0;
            row4 += `<td>${(alt).toPrecision(list.digit)}mol</td>`;
        }
        row4 += '<td></td>';
        for (let i = 0; i < list.product.length; i++) {
            row4 += `<td>${list.product[i].molecule}mol</td>`;
        }

        let text_result = '';
        text_result += ` <wbr>${data_text[list.product[0].name]} が <wbr>${list.product[0].molecule}mol `;
        for (let i = 1; i < list.product.length; i++) {
            text_result += `、 <wbr>${data_text[list.product[i].name]} が <wbr>${list.product[i].molecule}mol `;
        }
        if (list.remainder.length > 0) {
            text_result += '生成され、';
            text_result += ` <wbr>${data_text[list.remainder[0].name]} が <wbr>${list.remainder[0].molecule}mol <wbr>`;
            for (let i = 1; i < list.remainder.length; i++) {
                text_result += `、 <wbr>${data_text[list.remainder[i].name]} が <wbr>${list.remainder[i].molecule}mol <wbr>`
            }
            text_result += `余る。`;
        } else {
            text_result += '生成される。';
        }

        text = `
            ${text_standarts}
            <table>
                <tbody>
                    <tr>
                        ${row1}
                    </tr>
                    <tr>
                        ${row2}
                    </tr>
                    <tr>
                        ${row3}
                    </tr>
                    <tr>
                        ${row4}
                    </tr>
                </tbody>
            </table>
            <div>よって${text_result}</div>
        `;
    }
    return text;
}

function check() {
    let replies_html = document.querySelectorAll('.reply_box');
    let group = {single: []};
    let correct = true;

    replies_html.forEach(element => {
        if (!Object.keys(group).includes(element.dataset.group)) {
            group[element.dataset.group] = [];
        }
        group[element.dataset.group].push(element);
    });

    if (group.single.length > 0) {
        group.single.forEach(element => {
            let reply = element.value;
            let answer = list[element.dataset.material][element.dataset.num][element.dataset.option];
            if (reply == answer) {
                element.classList.remove('wrong');
                element.classList.add('correct');
            } else {
                element.classList.remove('correct');
                element.classList.add('wrong');
                correct = false;
            }
        });
    }

    Object.keys(group).forEach(e1 => {
        if (e1 != 'single') {
            let alt = {};
            let shaped_group = [];
            let shaped_group_html = [];
            let answer_group = [];
            group[e1].forEach(e2 => {
                let set_name = e2.dataset.material + String(e2.dataset.num);
                if (!Object.keys(alt).includes(set_name)) {
                    alt[set_name] = [];
                    answer_group.push(list[e2.dataset.material][e2.dataset.num]);
                }
                alt[set_name].push(e2);
            });
            Object.keys(alt).forEach(e2 => {
                let alt2 = {};
                let alt3 = {};
                alt[e2].forEach(e3 => {
                    alt2[e3.dataset.option] = e3.value;
                    alt3[e3.dataset.option] = e3;
                });
                shaped_group.push(alt2);
                shaped_group_html.push(alt3);
            });
            answer_group.forEach(e2 => {
                let tf = shaped_group.some(e3 => Object.keys(e3).every(e4 => e3[e4] == e2[e4]));
                if (!tf) correct = false;
            });
            let answer_copy = JSON.parse(JSON.stringify(answer_group));
            shaped_group_html.forEach(e2 => {
                let alt = answer_copy.find(e3 => e3.name == e2.name.value);
                if (alt == undefined) {
                    Object.keys(e2).forEach(e3 => {
                        e2[e3].classList.remove('correct');
                        e2[e3].classList.add('wrong');
                    });
                } else {
                    e2.name.classList.remove('wrong');
                    e2.name.classList.add('correct');
                    Object.keys(e2).forEach(e3 => {
                        let isCorrect = e2[e3].value == alt[e3];
                        e2[e3].classList.remove(isCorrect ? 'wrong' : 'correct');
                        e2[e3].classList.add(isCorrect ? 'correct' : 'wrong');
                    });
                    let index = answer_copy.indexOf(alt);
                    answer_copy.splice(index, 1);
                }
            });
            // 間違いと正解にタグ付けする
            // 判定方法
        }
    });

    if (correct) asking = false;

    replies_html.forEach(e => {e.blur()});
    setTimeout(() => {
        alert(correct ? 'correct' : 'wrong');
        // check_html.style.display = 'none';
        key_html.style.display = 'grid';
        next_html.style.display = 'block';
    }, 10);
}

next_html.addEventListener('click', ask);

document.addEventListener('keydown', event => {
    if (event.key == 'Enter' && container_html[2].style.display != 'none') asking ? check() : ask();
});

