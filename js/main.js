// Build a simple slot machine with minimum 5 items per reel and 3 reels - user should be able to bet min or max and have their total update

//starting balance = $100
const balance = document.querySelector('#balance')
//max bet = $10
//min bet = $1
// sub from balance
//spin => random
//payout
//update balance



function spin() {
    const items = ['star', 'moon', 'nose', 'mouse', 'leaf']
    const random = Math.floor(Math.random() * 100 +1);
    if (random >= 95)
        return 'star'; //20× bet 
    if (random <= 94 && random >= 85)
        return 'moon'; //10× bet
    if (random <= 84 && random >= 65)
        return 'leaf'; //6× bet
    if (random <= 64 && random >= 40)
        return 'leaf'; //3× bet
    if (random <= 39 && random >= 1)
        return 'Spaghetti'; //2× bet
}
console.log(spin());