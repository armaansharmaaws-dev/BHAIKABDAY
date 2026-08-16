/* ==================================================
   SCREEN NAVIGATION
================================================== */
function nextScreen(currentId, nextId) {
    const current = document.getElementById(currentId);
    const next = document.getElementById(nextId);

    if (!current || !next) {
        console.error("Screen missing:", currentId, nextId);
        return;
    }

    current.classList.remove("active");
    next.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
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

const q1WrongMessages = [
    "Arre arre 😂 itna easy question hai, phir bhi galat option?",
    "Aapko answer pata hai... bas attitude mein click kar rahi ho 😭😂",
    "Nice try 👀 lekin button bhi aapse bach gaya 😂",
    "haar maan lo 😭😂",
    "Aapko kya laga, ye button pakad mein aa jayega? 😂",
    "Wrong option ke peeche itna pyaar kyun hai? 👀😂",
    "Aap answer dene aayi ho ya button pakadne? 😭😂",
    "Button: 'Mujhe nahi pakad sakti' 😂",
    "Thoda dimag lagaiye madam 😭😂❤️",
    "Aapko bas ek kaam karna hai... sahi answer choose karna 😂",
    "Ye option aapko choose nahi karne wala... dekha? Bhaag gaya 😂",
    "Aapki determination ko salute hai 🫡😂",
    "Itni baar try? Aap haar nahi maanengi, hai na? 😭😂",
    "Aap aur ye button... kya hi love story chal rahi hai 😂",
    "Wrong answer ki taraf itna attraction kyun? 👀😂",
    "Okay okay 😂 ab toh maan jaiye ki ye answer nahi hai."
];

const q2KoiAurMessages = [
    "Koi aur? 😭 Aap seriously mera dil todne wali ho kya?",
    "Aapko bhi pata hai answer kya hai... bas maan nahi rahe 😂❤️",
    "Koi aur ka option dekh ke hi dil dukhi ho gaya 🥺😂",
    "Aap itna bhi confuse mat ho... mera dil already answer jaanta hai 😭❤️",
    "Koi aur? 🥺 Ye dekh ke toh button bhi bhaag gaya 😂",
    "Aapko ek simple sa answer dena tha... itna emotional damage kyun 😭😂",
    "Please aisa mat kijiye... mera dil bohot sensitive hai 🥺❤️",
    "Aapko sach mein lagta hai koi aur? 😭 Ye toh personal ho gaya 😂",
    "Koi aur choose karne ki koshish? 👀 Main ye accept nahi karunga 😭❤️",
    "Aapko pata hai correct answer kya hai... bas thoda drama chal raha hai 😂",
    "Nahi nahi... aap ye option choose nahi kar sakte 😭😂",
    "Mera dil keh raha hai aap jaan-boojh ke mujhe pareshan kar rahi ho 🥺❤️",
    "Aapka ye answer dekh kar system bhi emotional ho gaya 😭😂",
    "Koi aur? 🥺 Aapko mujh par thoda toh taras kijiye ❤️",
    "Itna ignore bhi mat kijiye... dil hai, WiFi router nahi 😭😂❤️",
    "Last warning 😭❤️ Aapko pata hai dil ka correct answer kya hai."
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


    /* =========================
       QUESTION 1 MESSAGE
    ========================= */

    if (questionNumber === 1) {

        const messageIndex =
            (wrongAttempts - 1) %
            q1WrongMessages.length;

        quizMessage.textContent =
            q1WrongMessages[messageIndex];

    }


    /* =========================
       QUESTION 2 MESSAGE
    ========================= */

    else if (questionNumber === 2) {

        const messageIndex =
            (wrongAttempts - 1) %
            q2KoiAurMessages.length;

        quizMessage.textContent =
            q2KoiAurMessages[messageIndex];

    }


    /* =========================
       MOVE BUTTON
    ========================= */

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
        "moon"
    );

}
function toggleMusic() {
    const music = document.getElementById("bgMusic");
    const button = document.getElementById("musicToggle");

    if (music.paused) {
        music.play();
        button.textContent = "🎵";
        button.setAttribute("aria-label", "Pause music");
    } else {
        music.pause();
        button.textContent = "💗";
        button.setAttribute("aria-label", "Play music");
    }
}