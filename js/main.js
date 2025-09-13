// Build a simple slot machine with minimum 5 items per reel and 3 reels - user should be able to bet min or max and have their total update

//starting balance = $1000

const max_bet = document.querySelector('#max_bet');
const min_bet = document.querySelector('#min_bet');
max_bet.addEventListener('click', () => spinner(50));
min_bet.addEventListener('click', () => spinner(5));



function spinner(bet) {
    let balance = Number(document.querySelector('#balance').innerText);

    //Check if enough balance
    if (balance < bet) {
        const win = document.querySelector('#win');
        win.innerText = 'NO BALANCE';
        win.style.color = 'red';
        setTimeout(() => document.querySelector('#win').innerText = '', 1000);
        return;
    }

    // sub from balance
    balance = balance - bet;

    //Spin, get reels in a [] and check if they align
    const reel = document.querySelectorAll(".reel");
    let reelsAlign = [];

    reel.forEach(reel => {
        let item = spin();
        reelsAlign.push(item);
        reel.innerText = item;
        reel.classList.add('.reel');
    });

    // Do the reels line up
    bet = allReelsAlign(reelsAlign, bet);

    //Payout
    if (bet != false) {
        
        console.log('balance before = '+ balance);
        balance = balance + bet;
        console.log('bet = '+bet);
        console.log('balance after = '+ balance);

        document.querySelector('#win').innerText = 'WIN! +' + bet;
        setTimeout(() => {
            document.querySelector('#win').innerText = '';
        }, 1000);
    }

    document.querySelector('#balance').innerText = balance;
}

function allReelsAlign(arr, bet) {
    if (arr.every(item => item === arr[0])) {
        if (arr[0] === 'star') bet *= 20;
        if (arr[0] === 'moon') bet *= 10;
        if (arr[0] === 'leaf') bet *= 6;
        if (arr[0] === 'mouse') bet *= 3;
        if (arr[0] === 'spaghetti') bet *= 2;
        return bet;
    }
    else return false;
}

//spin => random
function spin() {
    const random = Math.floor(Math.random() * 100 + 1);
    if (random >= 95) // 5/100 chance to appear
        return 'star'; //20× bet 
    if (random <= 94 && random >= 85)
        return 'moon'; //10× bet
    if (random <= 84 && random >= 65)
        return 'leaf'; //6× bet
    if (random <= 64 && random >= 40)
        return 'mouse'; //3× bet
    if (random <= 39 && random >= 1) // ~40/100 chance to appear
        return 'Spaghetti'; //2× bet
}




