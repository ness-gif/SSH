let original_data;
let data;
let questions;
let constant_questions;
let ifShuffle = false;
let selected;
let selected_number = 0;
let number = 0;
let question;
let answering = false;
let answerWait = false;
const choices_number = 4;
let correct_number = 0;
let mistakes = [];

function randInt(num1, num2) {
    let alt = Math.abs(num1 - num2) + 1;
    let r = Math.floor(Math.random() * alt);
    return r + Math.min(num1, num2);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // 0〜iのランダムな整数
    [array[i], array[j]] = [array[j], array[i]];   // 要素を入れ替え
  }
  return array;
}

window.onload = () => {
    load();
}

function load() {
    try {
        original_data = JSON.parse(localStorage['memorization']);
    } catch {
        original_data = {
            biology1: {
                sections: [
                    {
                        title: '１．植生と生態系',
                        begin: 0,
                        end: 12,
                        number: 13,
                        accuracy: undefined,
                        best_rate: 0
                    },
                    {
                        title: '２．植生の遷移',
                        begin: 13,
                        end: 27,
                        number: 15,
                        accuracy: undefined,
                        best_rate: 0
                    },
                    {
                        title: '３．地球上の植生分布ー１',
                        begin: 28,
                        end: 44,
                        number: 17,
                        accuracy: undefined,
                        best_rate: 0
                    },
                    {
                        title: '４．地球上の植生分布ー２',
                        begin: 45,
                        end: 52,
                        number: 8,
                        accuracy: undefined,
                        best_rate: 0
                    },
                    {
                        title: '５．＋αー１',
                        begin: 53,
                        end: 66,
                        number: 14,
                        accuracy: undefined,
                        best_rate: 0
                    },
                    {
                        title: '６．＋αー２',
                        begin: 67,
                        end: 79,
                        number: 13,
                        accuracy: undefined,
                        best_rate: 0
                    },
                    {
                        title: '全範囲',
                        begin: 0,
                        end: 79,
                        number: 80,
                        accuracy: undefined,
                        best_rate: 0
                    }
                ]
            },
            worldHistory1: {
                sections: [
                    {
                        title: '2年2学期期末考査範囲 1-10',
                        begin: 0,
                        end: 9,
                        number: 10,
                        accuracy: undefined,
                        best_rate: 0
                    },
                    {
                        title: '2年2学期期末考査範囲 11-20',
                        begin: 10,
                        end: 19,
                        number: 10,
                        accuracy: undefined,
                        best_rate: 0
                    },
                    {
                        title: '2年2学期期末考査範囲 21-30',
                        begin: 20,
                        end: 29,
                        number: 10,
                        accuracy: undefined,
                        best_rate: 0
                    },
                    {
                        title: '2年2学期期末考査範囲 31-40',
                        begin: 30,
                        end: 39,
                        number: 10,
                        accuracy: undefined,
                        best_rate: 0
                    },
                    {
                        title: '2年2学期期末考査範囲 41-50',
                        begin: 40,
                        end: 49,
                        number: 10,
                        accuracy: undefined,
                        best_rate: 0
                    },
                    {
                        title: '2年2学期期末考査範囲 51-60',
                        begin: 50,
                        end: 59,
                        number: 10,
                        accuracy: undefined,
                        best_rate: 0
                    },
                    {
                        title: '2年2学期期末考査範囲 61-70',
                        begin: 60,
                        end: 69,
                        number: 10,
                        accuracy: undefined,
                        best_rate: 0
                    },
                    {
                        title: '2年2学期期末考査範囲 71-80',
                        begin: 70,
                        end: 79,
                        number: 10,
                        accuracy: undefined,
                        best_rate: 0
                    },
                    {
                        title: '2年2学期期末考査範囲 81-90',
                        begin: 80,
                        end: 89,
                        number: 10,
                        accuracy: undefined,
                        best_rate: 0
                    },
                    {
                        title: '2年2学期期末考査範囲 91-100',
                        begin: 90,
                        end: 99,
                        number: 10,
                        accuracy: undefined,
                        best_rate: 0
                    },
                    {
                        title: '2年2学期期末考査範囲 全範囲',
                        begin: 0,
                        end: 99,
                        number: 100,
                        accuracy: undefined,
                        best_rate: 0
                    }
                ]
            },
            japaneseHistory1: {
                sections: [
                    {
                        title: '2年2学期期末考査範囲 前半',
                        begin: 0,
                        end: 9,
                        number: 10,
                        accuracy: undefined,
                        best_rate: 0
                    },
                    {
                        title: '2年2学期期末考査範囲 後半',
                        begin: 10,
                        end: 18,
                        number: 9,
                        accuracy: undefined,
                        best_rate: 0
                    },
                    {
                        title: '2年2学期期末考査範囲 全範囲',
                        begin: 0,
                        end: 18,
                        number: 19,
                        accuracy: undefined,
                        best_rate: 0
                    }
                ]
            }
        }
    }
    data = original_data[genre];
    let text = '';
    for (let i = 0; i < data.sections.length; i++) {
        let alt = data.sections[i].accuracy;
        text += `
            <div id="section${i + 1}" class="section" onclick="start(${i})" style="
                background: ${
                    alt == undefined ? 
                        'var(--lighterdark)' :
                        data.sections[i].accuracy == 100 ? 
                            'var(--perfection)' :
                            `linear-gradient(to right, var(--progress) 0%, var(--progress) ${alt}%, var(--lighterdark) ${alt}%, var(--lighterdark) 100%)`
                }
            ">
                <div class="section_title">${data.sections[i].title}</div>
                <div class="accuracy">正答率　${alt == undefined ? '-' : alt}%</div>
            </div>
        `;
    }
    sections_html.innerHTML = text;
}

function start(num) {
    selected_number = num;
    correct_number = 0;
    mistakes = [];
    selected = data['sections'][num];
    questions = questions_template[genre].slice(selected['begin'], selected['end'] + 1);
    constant_questions = questions_template[genre].slice(selected['begin'], selected['end'] + 1);
    select_html.style.display = 'none';
    ask_html.style.display = 'grid';
    number = 0; // 問題数
    answering = true;
    ask();
}

function ask() {
    answerWait = false;
    number++;
    let randNums = [];
    if (ifShuffle) {
        let r = Math.floor(Math.random() * questions.length);
        question = questions.splice(r, 1)[0];
        let answer_id;
        for (let i = 0; i < constant_questions.length; i++) {
            if (question.number == constant_questions[i].number) {
                randNums.push(i);
                break;
            }
        }
    } else {
        question = questions.shift();
        randNums.push(number - 1);
    }
    for (let i = 0; i < choices_number - 1; i++) {
        let r = 0;
        do {
            r = randInt(0, constant_questions.length - 1);
        } while(randNums.includes(r))
        randNums.push(r);
    }
    randNums = shuffle(randNums);
    for (let i = 0; i < randNums.length; i++) {
        choice_html[i].classList.remove('selected');
        choice_html[i].classList.remove('correct');
        let a = randNums[i];
        choice_html[i].innerHTML = constant_questions[a].answer;
        choice_html[i].setAttribute('data-answer', constant_questions[a].answer);
    }
    circle_html.style.display = 'none';
    circle_html.classList.remove('appear');
    cross_html.style.display = 'none';
    cross_html.classList.remove('appear');
    
    text_html.innerHTML = selected['title'];
    progress_html.innerHTML = `${number} / ${selected['number']}`
    question_html.innerHTML = `${question['number']}. ${question['question']}`;
}

function answer(num) {
    if (answerWait) return;
    answerWait = true;
    choice_html[num].classList.add('selected');
    let input = choice_html[num].getAttribute('data-answer');
    let correct;
    let end = questions.length == 0;
    if (question['answer'] == input) {
        correct_number++;
        circle_html.style.display = 'block';
        setTimeout(() => {
            circle_html.classList.add('appear');
        }, 1);
        let timeoutId = setTimeout(end ? result : ask, 600);
    } else {
        for (let i = 0; i < choices_number; i++) {
            if (choice_html[i].getAttribute('data-answer') == question['answer']) {
                choice_html[i].classList.add('correct');
                break;
            }
        }
        mistakes.push(question);
        cross_html.style.display = 'block';
        setTimeout(() => {
            cross_html.classList.add('appear');
        }, 1);
        let timeoutId = setTimeout(end ? result : ask, 2100);
    }
}

function quit() {
    ask_html.style.display = 'none';
    select_html.style.display = 'grid';
    answering = false;
}

function result() {
    let correct_rate = Math.floor(correct_number / selected['number'] * 100);
    correct_number_html.innerHTML = `${correct_number}問 / ${selected['number']}問`;
    correct_rate_html.innerHTML = correct_rate;
    if (correct_rate > selected['best_rate']) {
        data['sections'][selected_number]['best_rate'] = correct_rate;
        best_rate_html.innerHTML = correct_rate;
    } else {
        best_rate_html.innerHTML = selected['best_rate'];
    }
    data['sections'][selected_number]['accuracy'] = correct_rate;
    original_data[genre] = data;
    localStorage['memorization'] = JSON.stringify(original_data);
    if (correct_rate == 100) {
        to_mistakes_html.style.display = 'none';
    } else {
        to_mistakes_html.style.display = 'block';
    }
    ask_html.style.display = 'none';
    result_html.style.display = 'grid';
}

function restart() {
    result_html.style.display = 'none';
    start(selected_number);
}

function to_mistakes() {
    mistakes_html.innerHTML = '<div class="eraser" onclick="erase_mistakes()">✕</div>';
    for (let i = 0; i < mistakes.length; i++) {
        let q = mistakes[i];
        let box = document.createElement('div');
        box.classList.add('box');
        let n = document.createElement('div');
        n.classList.add('number');
        n.innerHTML = q['number'];
        box.appendChild(n);
        let ques = document.createElement('div');
        ques.classList.add('question');
        ques.innerHTML = q['question'];
        box.appendChild(ques);
        let ans = document.createElement('div');
        ans.classList.add('answer');
        ans.innerHTML = q['answer'][0];
        box.appendChild(ans);
        mistakes_html.appendChild(box);
    }
    mistakes_html.style.display = 'grid';
}

function erase_mistakes() {
    mistakes_html.style.display = 'none';
}

function to_home() {
    load();
    ask_html.style.display = 'none';
    result_html.style.display = 'none';
    select_html.style.display = 'grid';
}

function to_list() {
    list_html.style.display = 'grid';
}

function erase_list() {
    list_html.style.display = 'none';
}

function shuffle_switch() {
    ifShuffle = !ifShuffle;
    if (ifShuffle) {
        shuffle_switch_html.classList.add('on');
        shuffle_html.innerHTML = 'オン';
    } else {
        shuffle_switch_html.classList.remove('on');
        shuffle_html.innerHTML = 'オフ';
    }
}

// document.addEventListener('keydown', event => {
//     if (event.key == 'Enter' && answering) {
//         event.preventDefault();
//         answer();
//     }
// });

for (let i = 0; i < questions_template[genre].length; i++) {
    let q = questions_template[genre][i];
    let box = document.createElement('div');
    box.classList.add('box');
    let n = document.createElement('div');
    n.classList.add('number');
    n.innerHTML = q['number'];
    box.appendChild(n);
    let ques = document.createElement('div');
    ques.classList.add('question');
    ques.innerHTML = q['question'];
    box.appendChild(ques);
    let ans = document.createElement('div');
    ans.classList.add('answer');
    ans.innerHTML = q['answer'];
    box.appendChild(ans);
    list_html.appendChild(box);
}