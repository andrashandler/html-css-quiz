/* ALPINE JS */
const quizApp = () => {
  return {
    name: "",
    showQuiz: false,
    showResult: false,
    showAnswer: false,
    currentQuestion: 0,
    selectedAnswer: null,
    score: 0,
    questions: [],
    cheer: null,

    correctCheers: [
      { emoji: "🎉", text: "Zseni vagy, nem is kérdés!" },
      { emoji: "😎", text: "Látszik, hogy készültél!" },
      { emoji: "🔥", text: "Ez pipa, mehet a következő!" },
      { emoji: "🕶️", text: "Ez már túl könnyű neked!" },
      { emoji: "🚀", text: "Okosabb vagy, mint a Google!" },
    ],

    wrongCheers: [
      { emoji: "🤷‍♂️", text: "Majd legközelebb!" },
      { emoji: "🐌", text: "Ez most kicsúszott a kezedből!" },
      { emoji: "🙈", text: "Hoppá, ezt benézted!" },
      { emoji: "💡", text: "Legalább most már tudod!" },
      { emoji: "📚", text: "Tanulópont, nem hibapont!" },
    ],

    // Computed properties
    get currentQuestionObject() {
      return this.questions[this.currentQuestion] ?? null;
    },
    get totalQuestions() {
      return this.questions.length ?? 0;
    },
    get scorePercentage() {
      return this.totalQuestions ? (this.score / this.totalQuestions) * 100 : 0;
    },
    get isQuizCompleted() {
      return this.currentQuestion >= this.totalQuestions;
    },
    get progress() {
      return this.totalQuestions
        ? ((this.currentQuestion + 1) / this.totalQuestions) * 100
        : 0;
    },
    get isCorrect() {
      return this.selectedAnswer === this.currentQuestionObject.answer;
    },

    getRandom(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },

    // Fetch questions from the server
    async init() {
      const response = await fetch("quiz.json");
      this.questions = await response.json();
    },

    startQuiz() {
      if (this.name) {
        this.currentQuestion = 0;
        this.score = 0;
        this.showQuiz = true;
      } else {
        alert("Kérlek add meg a neved, hogy elkezdhessük a játékot!");
      }
    },

    checkAnswer(selectedIndex) {
      this.selectedAnswer = selectedIndex;
      this.isCorrect && this.score++;
      const cheers = this.isCorrect ? this.correctCheers : this.wrongCheers;
      this.cheer = this.getRandom(cheers);
      this.showAnswer = true;
      document.querySelectorAll("pre code").forEach((block) => {
        // Remove existing highlight
        block.removeAttribute("data-highlighted");
      });
      setTimeout(function () {
        // Highlight the code block
        hljs.highlightAll();
      }, 100);
    },

    nextQuestion() {
      this.showAnswer = false;
      this.selectedAnswer = null;
      this.cheer = null;
      if (this.currentQuestion < this.questions.length - 1) {
        this.currentQuestion++;
      } else {
        alert("Kész! A pontszámod: " + this.score);
        this.showAnswer = false;
        this.selectedAnswer = null;
        this.cheer = null;
        this.name = "";
        this.showQuiz = false;
        this.showResult = false;

        this.selectedQiestion = false;
        this.currentQuestion = 0;
        this.score = 0;
      }
    },
  };
};
