const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const resultDiv = document.getElementById("result");


let shuffledQuestions, currentQuestionIndex, score;

document.addEventListener('DOMContentLoaded', () => {
  initLeafTrail();
  startQuiz();
});

function initLeafTrail() {
  const leaves = [];
  const numberOfLeaves = 5;

  for (let i = 0; i < numberOfLeaves; i++) {
    const leaf = document.createElement('div');
    leaf.style.position = 'absolute';
    leaf.style.width = '24px';
    leaf.style.height = '24px';
    leaf.style.backgroundImage = "url('images/cursor.png')";
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
        setTimeout(() => leaf.style.opacity = '0', 2000);
      }, i * 50);
    });
  });
}

function startQuiz() {

  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  score = 0;


  document.querySelector('.quiz-container').style.display = 'flex';
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
    button.classList.add('btn', 'answer-btn');
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

  if (score <= 8) {
    window.location.href = 'result1.html'; // Low score range
  } else if (score <= 16) {
    window.location.href = 'result2.html'; // Medium score range
  } else if (score <= 24) {
    window.location.href = 'result3.html'; // High score range
  } else {
    window.location.href = 'result4.html'; // Very high score range
  }
}


const questions = [
  {
    question: "Do you own any plants?",
    answers: [
      { text: "Do 5$ plastic plants from target count.", value: 1 },
      { text: "Yes! It's by the window.", value: 2 },
      { text: "What's a plant?", value: 0 },
      { text: "I live in a jungle.", value: 3 },
    ],
  },
  {
    question: "How often do you water your plants?",
    answers: [
      { text: "Does spilling my drink on them count?", value: 1 },
      { text: "IDK google said bi-weekly so...", value: 2 },
      { text: "An Excel spreadsheet with reminders, alarms, and a backup choir to sing to them.", value: 3 },
      { text: "Water? Plants need water?", value: 0 },
    ],
  },
  {
    question: "Someone says \"You have too many plants,\" ",
    answers: [
      { text: "I only have like 3 and 1 is dead.", value: 1 },
      { text: "No one has ever said that to me.", value: 0 },
      { text: "Show them your plant waiting list. It's important they understand the seriousness.", value: 2 },
      { text: "Whisper, \"Shhh...The plants hear everything,\" and watch them nervously glance around.", value: 3 },
    ],
  },
  {
    question: "How do you react to someone saying, 'They're just a plants'?",
    answers: [
      { text: "Shrug and agree, secretly plotting to adopt more plant babies.", value: 1 },
      { text: "Kick the person out for their blasphemous words.", value: 3 },
      { text: "I'm too busy thinking about my cat.", value: 0 },
      { text: "Launch into a passionate monologue about the emotional and environmental benefits of plants.", value: 2 },
    ],
  },
  {
    question: "What's your first thought when you see a rare plant at the store?",
    answers: [
      { text: "I'm already at the checkout counter.", value: 3 },
      { text: "Start planning where to put it in your room.", value: 2 },
      { text: "Will I be able to keep this one alive?", value: 1 },
      { text: "Oh cool.", value: 0 },
    ],
  },
  {
    question: "Your watering can is...",
    answers: [
      { text: "A meticulously chosen vessel that complements your decor.", value: 3 },
      { text: "I just hope the humidity will keep them alive.", value: 0 },
      { text: "A glass of water that I was drinking earlier.", value: 1 },
      { text: "A cute spray bottle.", value: 2 },
    ],
  },
  {
    question: "If your plants could talk, what would they say about you?",
    answers: [
      { text: "\"We are pleased with this shrine you have built, mortal.\"", value: 2 },
      { text: "\"We need more water.\"", value: 1 },
      { text: "\"Thank you for the daily serenades, even if off-key.\"", value: 3 },
      { text: "\"SAVE ME FROM THIS MONSTER!\"", value: 0 },
    ],
  },
  {
    question: "How do you plan a vacation?",
    answers: [
      { text: "Find dedicated plant-sitters who can follow your ten-page care guide.", value: 3 },
      { text: "Whoops, I forgot about them!", value: 0 },
      { text: "I'll water them before I leave. Maybe.", value: 1 },
      { text: "Ask a friend to check on them occasionally", value: 2 },
    ],
  },
];


