/* ==================================================
   SCREEN NAVIGATION
================================================== */

function nextScreen(currentId, nextId) {

    const current =
        document.getElementById(currentId);

    const next =
        document.getElementById(nextId);

    if (!current || !next) {
        console.error(
            "Screen missing:",
            currentId,
            nextId
        );
        return;
    }

    current.classList.remove("active");

    setTimeout(() => {

        next.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }, 250);
}



/* ==================================================
   FLOATING HEARTS
================================================== */

const hearts =
    document.getElementById("hearts");

const heartTypes = [
    "❤️",
    "💗",
    "💕",
    "💖",
    "🌸",
    "✨"
];

function createHeart() {

    if (!hearts) {
        return;
    }

    const heart =
        document.createElement("div");

    heart.className =
        "floating-heart";

    heart.textContent =
        heartTypes[
            Math.floor(
                Math.random() *
                heartTypes.length
            )
        ];

    heart.style.left =
        Math.random() * 100 + "%";

    heart.style.fontSize =
        14 + Math.random() * 15 + "px";

    heart.style.animationDuration =
        7 + Math.random() * 7 + "s";

    hearts.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 15000);
}

setInterval(createHeart, 1000);



/* ==================================================
   QUIZ
================================================== */

let questionNumber = 1;

let wrongAttempts = 0;


const correctButton =
    document.getElementById(
        "correct-button"
    );

const wrongButton =
    document.getElementById(
        "wrong-button"
    );

const questionText =
    document.getElementById(
        "question-text"
    );

const questionTitle =
    document.getElementById(
        "quiz-title"
    );

const questionNumberText =
    document.getElementById(
        "question-number"
    );

const quizMessage =
    document.getElementById(
        "quiz-message"
    );



/* ==================================================
   FUNNY HINGLISH MESSAGES
================================================== */

const funnyMessages = [

    "Arre guys 😭 ye answer nahi hai 😂",

    "Guys please 😭 sahi option choose karo.",

    "Vanshikaaa 😂 tumhe pata hai answer kya hai.",

    "Arre guys, cheating nahi chalegi 😭",

    "Ye button tumse door bhaag raha hai 😂",

    "Guys seriously? 👀",

    "Itni bhi kya zid hai guys 😭😂",

    "NOPE. Ye wala option allowed nahi hai 😭",

    "Guys mujhe sab pata hai 👀😂",

    "Bas karo guys 😭",

    "ARMAAN choose karo guys 😂",

    "Nice try 😂 but NO.",

    "Wrong answer se itna pyaar kyun hai? 😭",

    "Guys... tumhe answer already pata hai 😂",

    "Main ye option click nahi hone dunga 😭❤️"

];



/* ==================================================
   RUNAWAY BUTTON
================================================== */

function moveWrongButton(event) {

    if (event) {

        event.preventDefault();
        event.stopPropagation();

    }


    wrongAttempts++;


    const messageIndex =
        (wrongAttempts - 1)
        % funnyMessages.length;


    quizMessage.textContent =
        funnyMessages[messageIndex];


    /*
        Move it anywhere on screen.
    */

    const padding = 20;

    const maxX =
        window.innerWidth -
        wrongButton.offsetWidth -
        padding;

    const maxY =
        window.innerHeight -
        wrongButton.offsetHeight -
        padding;


    const randomX =
        padding +
        Math.random() *
        Math.max(
            maxX - padding,
            1
        );


    const randomY =
        padding +
        Math.random() *
        Math.max(
            maxY - padding,
            1
        );


    wrongButton.style.position =
        "fixed";

    wrongButton.style.left =
        randomX + "px";

    wrongButton.style.top =
        randomY + "px";

    wrongButton.style.zIndex =
        "99999";

}



/* ==================================================
   IMPORTANT:
   WRONG ANSWER CAN NEVER BE SELECTED
================================================== */


/*
    Desktop:
    As soon as the mouse reaches the button,
    it escapes.
*/

wrongButton.addEventListener(
    "pointerenter",
    moveWrongButton
);


/*
    Phone:
    As soon as her finger touches it,
    it escapes.
*/

wrongButton.addEventListener(
    "pointerdown",
    moveWrongButton
);


/*
    Extra protection:
    Even if a click somehow happens,
    prevent the answer.
*/

wrongButton.addEventListener(
    "click",
    function(event) {

        event.preventDefault();

        event.stopPropagation();

        moveWrongButton(event);

        return false;

    }
);



/* ==================================================
   CORRECT ANSWER
================================================== */

correctButton.addEventListener(
    "click",
    function() {

        /*
            QUESTION 1
        */

        if (questionNumber === 1) {

            quizMessage.textContent =
                "Haan guys 😌❤️ finally sahi answer.";

            setTimeout(
                showSecondQuestion,
                1400
            );

        }


        /*
            QUESTION 2
        */

        else if (questionNumber === 2) {

            quizMessage.textContent =
                "Obviously guys ❤️ ye toh obvious tha.";

            setTimeout(
                finishQuiz,
                1400
            );

        }

    }
);



/* ==================================================
   SHOW QUESTION 2
================================================== */

function showSecondQuestion() {

    questionNumber = 2;

    wrongAttempts = 0;


    questionNumberText.textContent =
        "2";


    questionTitle.textContent =
        "Okay guys... ek aur question 👀";


    questionText.textContent =
        "Who loves you the most? ❤️";


    correctButton.textContent =
        "ARMAAN ❤️";


    wrongButton.textContent =
        "KOI AUR 🥺";


    /*
        Put wrong button back
        beside the correct answer.
    */

    wrongButton.style.position =
        "relative";

    wrongButton.style.left =
        "0";

    wrongButton.style.top =
        "0";

    wrongButton.style.zIndex =
        "10";


    quizMessage.textContent = "";

}



/* ==================================================
   FINISH QUIZ
================================================== */

function finishQuiz() {

    nextScreen(
        "quiz",
        "passed"
    );

}