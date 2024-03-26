const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const restartButton = document.getElementById("restart-btn");
const resultDiv = document.getElementById("result");
const startButton = document.getElementById("start-btn"); // Ensure this button exists in your HTML

let shuffledQuestions, currentQuestionIndex, score;

document.addEventListener('DOMContentLoaded', () => {
    // Hide question container initially in case CSS didn't catch it
    questionContainer.style.display = "none";
    initLeafTrail();

    startButton.addEventListener('click', startQuiz);
});

function initLeafTrail() {
    // Your leaf trail initialization code remains the same
}


function initLeafTrail() {
    const leaves = [];
    const numberOfLeaves = 5; // Adjust the number of leaves in the trail

    for (let i = 0; i < numberOfLeaves; i++) {
        let leaf = document.createElement('div');
        leaf.style.position = 'absolute';
        leaf.style.width = '24px'; // Adjust based on your leaf image size
        leaf.style.height = '24px'; // Adjust based on your leaf image size
        leaf.style.backgroundImage = "url('cursor.png')";
        leaf.style.pointerEvents = 'none';
        leaf.style.zIndex = '1000';
        leaf.style.opacity = '0';
        leaf.style.transition = 'opacity 0.5s, transform 0.5s';

        const rotation = Math.random() * 135 - 45;
        leaf.style.transform = `rotate(${rotation}deg)`;

        document.body.appendChild(leaf);
        leaves.push(leaf);
    }

    document.addEventListener('mousemove', (e) => {
        leaves.forEach((leaf, i) => {
            setTimeout(() => {
                leaf.style.left = `${e.pageX + i * 2}px`;
                leaf.style.top = `${e.pageY + i * 2}px`;
                leaf.style.opacity = '1';
                setTimeout(() => {
                    leaf.style.opacity = '0';
                }, 2000);
            }, i * 50);
        });
    });
}

function startQuiz() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    questionContainer.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn', 'answer-btn'); // Use 'btn' for styling
        button.addEventListener('click', () => selectAnswer(answer.value));
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(value) {
    score += value;
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
        setNextQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    questionContainer.classList.add('hide');
    resultDiv.classList.remove('hide');
    resultDiv.innerText = `Your final score is: ${score}`;
    restartButton.classList.remove('hide');
}

restartButton.addEventListener('click', () => window.location.reload()); // Restart the quiz

const questions = [
    {
      question: "When spotting a new leaf, you...",
      answers: [
        { text: "Scream \"IT'S ALIVE!\" at a volume that scares your neighbors.", value: 1 },
        { text: "Perform a ceremonial dance around your plant shrine.", value: 2 },
        { text: "Name it and update your plant baby photo album.", value: 3 },
        { text: "Wonder if you're actually witnessing a rare botanical phenomenon.", value: 4 },
      ],
    },
    {
        question: "Your plant watering schedule is...",
        answers: [
          { text: "Whenever I spill my drink close enough to the pot.", value: 1 },
          { text: "Coordinated with lunar phases, as advised by my plant psychic.", value: 2 },
          { text: "An Excel spreadsheet with reminders, alarms, and a backup choir to sing to them.", value: 3 },
          { text: "Water? You mean plants need water?", value: 4 },
        ],
      },
      {
        question: "When someone says \"You have too many plants,\" you...",
        answers: [
          { text: "Laugh hysterically until they slowly back away.", value: 1 },
          { text: "Start an impromptu TED Talk on the benefits of living in a personal oxygen bubble.", value: 2 },
          { text: "Show them your plant waiting list. It's important they understand the seriousness.", value: 3 },
          { text: "Whisper, \"The plants hear everything,\" and watch them nervously glance around.", value: 4 },
        ],
      },
       {
    question: "How do you react to someone saying, 'It's just a plant'?",
    answers: [
      { text: "Shrug and agree, secretly plotting to adopt more plant babies.", value: 1 },
      { text: "Launch into a passionate monologue about the emotional and environmental benefits of plants.", value: 2 },
      { text: "Instantly freeze them out of your social circle. Who needs that negativity?", value: 3 },
      { text: "Consider it a personal challenge to convert them into a plant lover.", value: 4 },
    ],
  },
  {
    question: "What's your first thought when you see a rare plant at the store?",
    answers: [
      { text: "Do I need another plant? Yes, yes I do.", value: 4 },
      { text: "Where on Earth will I put it? but you know you'll find space.", value: 3 },
      { text: "How many hours of overtime will I need to work to afford this?", value: 2 },
      { text: "Pretty, but my plant family is big enough.", value: 1 },
    ],
  },
  {
    question: "Your watering can is...",
    answers: [
      { text: "A meticulously chosen vessel that complements your decor.", value: 3 },
      { text: "Whatever's handy, sometimes just a drinking glass.", value: 1 },
      { text: "Equipped with precise measurements for each plant's needs.", value: 4 },
      { text: "A beloved tool, slightly battered but full of character.", value: 2 },
    ],
  },
  {
    question: "The phrase 'too many plants'...",
    answers: [
      { text: "Makes you laugh. As if there's such a thing!", value: 4 },
      { text: "Is something only non-plant people say.", value: 3 },
      { text: "Is a challenge rather than a statement.", value: 2 },
      { text: "Reminds you to check if any friends need a plant.", value: 1 },
    ],
  },
  {
    question: "How do you plan a vacation?",
    answers: [
      { text: "Find plant-sitters who can follow your ten-page care guide.", value: 4 },
      { text: "Briefly consider the needs of your plants, then go anyway.", value: 2 },
      { text: "Choose locations known for their botanical gardens or nurseries.", value: 3 },
      { text: "Vacation? There's no time for that in the planting season.", value: 1 },
    ],
  },
  ];
  

