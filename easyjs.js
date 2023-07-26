const cards = document.querySelectorAll(".card");

for(let index=0; index<cards.length; index++){
    cards[index].addEventListener("click", flip);
}

let firstCard;
let secondCard;
let reward = 0;
let currentFlipCount=0;
let correctlyFlipped = [];

moves=24;
document.querySelector(".move").innerText = moves;

function flip(){
    this.classList.add("flip");
    console.log(this);

    currentFlipCount++;
    if(currentFlipCount==1){
        firstCard = this;
        firstCard.removeEventListener("click", flip);
    }
    else{
        secondCard = this;
        cards.forEach((card) => card.removeEventListener("click", flip));
        console.log(firstCard);
        console.log(secondCard);
        check();
    }

    if(!moves || correctlyFlipped.length==16){
        cards.forEach((card) => card.removeEventListener("click", flip));
        if(correctlyFlipped.length==16){
            setTimeout(function() {
                window.location.href = "win.html";
            }, 1000);
        }
        else{
            setTimeout(function() {
                window.location.href = "lose.html";
            }, 1000);
        }
    }
}

function check(){
    (firstCard.dataset.image === secondCard.dataset.image)? success(): failure();
}

function success(){
    correctlyFlipped.push(firstCard.id);
    correctlyFlipped.push(secondCard.id);

    reset();

    for(let index=0; index<cards.length; index++){
        if(!correctlyFlipped.includes(cards[index].id)){
            cards[index].addEventListener("click", flip);
        }
    }

    reward++;
    document.querySelector(".score").innerText = reward;
}

function failure(){
    moves--;
    document.querySelector(".move").innerText = moves;
    setTimeout(() => {

        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        for(let index=0; index<cards.length; index++){
            if(!correctlyFlipped.includes(cards[index].id)){
                cards[index].addEventListener("click", flip);
            }
        }
        reset(); 
    }, "800");
}

function reset(){
    firstCard = null;
    secondCard = null;
    currentFlipCount=0;
}

function shuffle(){
    cards.forEach((card) => {
        var index = Math.floor(Math.random() * 16);
        card.style.order = index;
    })
}
shuffle();
