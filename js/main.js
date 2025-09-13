// Build a simple slot machine with minimum 5 items per reel and 3 reels - user should be able to bet min or max and have their total update

//starting balance = $1000

const max_bet = document.querySelector('#max_bet');
const min_bet = document.querySelector('#min_bet');
max_bet.addEventListener('click', () => spinner(50));
min_bet.addEventListener('click', () => spinner(5));

var winAudio = new Audio('assets/winSound.mp3');
var noBalanceAudio = new Audio('assets/noBalance.mp3');

const win = document.querySelector('#win');

function spinner(bet) {
    let balance = Number(document.querySelector('#balance').innerText);

    //Check if enough balance
    if (balance < bet) {
        win.innerText = 'NOT ENOUGH BALANCE';
        win.style.color = 'red';
        noBalanceAudio.play();
        setTimeout(() => {
            win.innerText = '';
        }, 2000);
        return;
    }

    // sub from balance
    balance = balance - bet;
    win.innerText = '-' + bet;
    win.style.color = 'red';
    const loss = document.querySelector('#loss')
    loss.innerHTML = Number(loss.innerHTML) + bet;

    //Spin, get reels in a [] and check if they align
    const reel = document.querySelectorAll(".reel");
    let reelsAlign = [];

    reel.forEach(reel => {
        let item = spin();
        reelsAlign.push(item);
        reel.innerText = item;
    });

    // Do the reels line up
    bet = allReelsAlign(reelsAlign, bet);

    //Payout
    if (bet != false) {
        balance = balance + bet;
        win.style.color = 'green';
        document.querySelector('#win').innerText = '+' + bet;
        winAudio.play();
        const lastWin = document.querySelector('#lastWin')
        lastWin.innerHTML = Number(lastWin.innerHTML) + bet;

        setTimeout(() => {
            document.querySelector('#win').innerText = '';
        }, 1500);
    }

    document.querySelector('#balance').innerText = balance;
    // Reset the animation
    win.style.animation = "none";
    win.offsetHeight;// A fix, not sure why but it works
    win.style.animation = "upYouGo 1s linear forwards";
}

function allReelsAlign(arr, bet) {
    if (arr.every(item => item === arr[0])) {
        if (arr[0] === '🧞‍♀️') bet *= 20;
        if (arr[0] === '🦄') bet *= 10;
        if (arr[0] === '🦧') bet *= 6;
        if (arr[0] === '🐸') bet *= 3;
        if (arr[0] === '🗿') bet *= 2;
        return bet;
    }
    else return false;
}

//spin => random
function spin() {
    const random = Math.floor(Math.random() * 100 + 1);
    if (random >= 95) // 5/100 chance to appear
        return '🧞‍♀️'; //20× bet 
    if (random <= 94 && random >= 85)
        return '🦄'; //10× bet
    if (random <= 84 && random >= 65)
        return '🦧'; //6× bet
    if (random <= 64 && random >= 40)
        return '🐸'; //3× bet
    if (random <= 39 && random >= 1) // ~40/100 chance to appear
        return '🗿'; //2× bet
}




