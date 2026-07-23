import { SUBJECTS, curriculum, shapeLessons } from "./data/curriculum.js";
import { badges } from "./data/badges.js";
import { defaultProgress, getAll, getOne, logEvent, putOne, seedDefaultStudent } from "./services/db.js";
import { registerPwa, setupInstallButton } from "./services/pwa.js";
import { awardForExam, awardForLesson, awardForQuiz, awardForWorksheet, claimDailyReward, unlockBadges } from "./services/rewards.js";
import { speak, stopSpeech } from "./services/speech.js";
import { avatars, byId, confetti, formatDate, makeQrBits, percent, shuffle } from "./services/utils.js";

const app = byId("app");
const state = {
  route: "home",
  students: [],
  student: null,
  progress: null,
  subjectId: "math",
  grade: "Basic 1",
  term: 1,
  topicIndex: 0,
  lessonIndex: 0,
  quiz: null,
  exam: null,
  worksheet: null,
  playTool: "counters",
  writingMode: "letters",
  writingTarget: "A",
  writingStrokes: [],
  play: {
    counters: 6,
    clockHour: 3,
    clockMinute: 0,
    spinnerResult: "Ready",
    boardMarks: []
  },
  installApp: null,
  startTime: Date.now()
};

init();

async function init() {
  registerPwa();
  state.installApp = setupInstallButton((canInstall) => {
    document.body.classList.toggle("can-install", canInstall);
  });
  applyPreferences();
  state.students = await seedDefaultStudent();
  state.student = state.students[0];
  state.progress = await getOne("progress", state.student.id) || defaultProgress(state.student.id);
  unlockBadges(state.progress);
  await putOne("progress", state.progress);
  render();
}

function render() {
  app.innerHTML = `
    ${header()}
    ${profileStrip()}
    ${screen()}
    ${bottomNav()}
    ${profileModal()}
    ${toastHost()}
  `;
  bindCommon();
  bindScreen();
}

function header() {
  return `
    <header class="app-header">
      <div class="brand">
        <span class="brand-mark">3D</span>
        <span>
          <span class="brand-title">3D Shapes Adventure</span>
          <span class="brand-subtitle">Ghana Basic 1-6 Learning Platform</span>
        </span>
      </div>
      <div class="header-actions">
        <button class="icon-btn" data-action="speak-screen" title="Read aloud">Read</button>
        <button class="icon-btn" data-action="open-settings" title="Settings">Set</button>
      </div>
    </header>
  `;
}

function profileStrip() {
  return `
    <section class="profile-strip" aria-label="Child profiles">
      ${state.students.map((student) => `
        <button class="profile-chip ${student.id === state.student.id ? "active" : ""}" data-student="${student.id}">
          <span>${student.avatar}</span> ${student.name}
        </button>
      `).join("")}
      <button class="profile-chip" data-action="new-profile">+ Add child</button>
    </section>
  `;
}

function screen() {
  const routes = {
    home: homeScreen,
    learn: learnScreen,
    subject: subjectScreen,
    lesson: lessonScreen,
    practice: practiceScreen,
    playroom: playroomScreen,
    quiz: quizScreen,
    exams: examsScreen,
    reading: readingScreen,
    worksheets: worksheetsScreen,
    achievements: achievementsScreen,
    parent: parentDashboard,
    teacher: teacherDashboard,
    tutor: tutorScreen,
    certificate: certificateScreen,
    settings: settingsScreen
  };
  return (routes[state.route] || homeScreen)();
}

function homeScreen() {
  return `
    <section class="hero">
      <div>
        <h1>Learn. Play. Grow.</h1>
        <p>Offline lessons, worksheets, quizzes, badges, certificates, and Ghana-focused Basic 1-6 learning for school and home.</p>
        <div class="action-row">
          <button class="primary" data-route="learn">Start Learning</button>
          <button class="primary" data-route="playroom">Open Playroom</button>
          <button class="primary" data-route="exams">Prepare for Exams</button>
          <button class="secondary" data-action="daily-reward">Daily Reward</button>
        </div>
      </div>
      <div class="mascot" aria-hidden="true">3D</div>
    </section>
    <section class="quick-stats">
      ${stat("XP", state.progress.xp)}
      ${stat("Level", state.progress.level)}
      ${stat("Coins", state.progress.coins)}
      ${stat("Streak", `${state.progress.streak} days`)}
    </section>
    <section class="panel">
      <div class="section-title">
        <h2>Learning Playroom</h2>
        <button class="primary" data-route="playroom">Open Tools</button>
      </div>
      <div class="card-grid">
        <button class="activity-card" data-route="playroom">
          <h3>Counters and Ten Frame</h3>
          <p>Touch counters to practise counting, addition, subtraction, and number bonds.</p>
        </button>
        <button class="activity-card" data-route="playroom">
          <h3>Clock, Spinner and Board</h3>
          <p>Hands-on classroom tools for time, choices, patterns, shapes, and quick revision.</p>
        </button>
      </div>
    </section>
    <section class="panel">
      <div class="section-title">
        <h2>Exam Preparation</h2>
        <button class="primary" data-route="exams">Open Exams</button>
      </div>
      <div class="card-grid">
        <button class="activity-card" data-route="exams">
          <h3>Mock Exams</h3>
          <p>Practise the selected subject, grade, and term before school exams.</p>
        </button>
        <button class="activity-card" data-route="exams">
          <h3>Final Exams</h3>
          <p>Mixed exam questions across all Basic 1 subjects with scores and teacher feedback.</p>
        </button>
      </div>
    </section>
    <section class="panel">
      <div class="section-title">
        <h2>Learning Paths</h2>
        <button class="secondary" data-route="learn">View all</button>
      </div>
      <div class="subject-grid">
        ${SUBJECTS.slice(0, 5).map(subjectCard).join("")}
      </div>
    </section>
    <section class="panel">
      <div class="section-title">
        <h2>Today</h2>
        <button class="secondary" data-route="worksheets">Worksheets</button>
      </div>
      <div class="card-grid">
        ${activityButton("Read", "Reading", "Alphabet, phonics, sight words and read-along stories.", "reading")}
        ${activityButton("Exam", "Exams", "Mock Exams and Final Exams with scores and reports.", "exams")}
        ${activityButton("3D", "3D Shapes", "Cube, cuboid, cylinder, cone, sphere and pyramid lessons.", "practice")}
        ${activityButton("Help", "AI Tutor", "A friendly offline helper for hints and explanations.", "tutor")}
        ${activityButton("Win", "Achievements", "Badges, trophies and certificates.", "achievements")}
      </div>
    </section>
  `;
}

function learnScreen() {
  return `
    <section class="panel">
      <div class="section-title">
        <div>
          <h2>Choose a Subject</h2>
          <p>Select one subject. It will open on its own page with ${state.grade} terms, topics, lessons, and quizzes.</p>
        </div>
        <select class="select" data-action="change-grade">
          ${["Basic 1", "Basic 2", "Basic 3", "Basic 4", "Basic 5", "Basic 6"].map((grade) => `<option ${grade === state.grade ? "selected" : ""}>${grade}</option>`).join("")}
        </select>
      </div>
      <div class="subject-grid">
        ${SUBJECTS.map(subjectCard).join("")}
      </div>
    </section>
  `;
}

function subjectScreen() {
  const subject = getSubject();
  const topics = getTopics();
  return `
    <section class="panel">
      <div class="section-title">
        <div>
          <h2>${subjectIcon(subject)} ${subject.name}</h2>
          <p>${state.grade}, Term ${state.term}. ${subject.fullName || subject.name}. Follow the topic map and complete each lesson.</p>
        </div>
        <button class="secondary" data-route="learn">All Subjects</button>
      </div>
      <div class="section-title">
        <div>
          <h3>Choose Term</h3>
          <p>Each topic has Understand, Examples, and Practice lessons.</p>
        </div>
        <select class="select" data-action="change-grade">
          ${["Basic 1", "Basic 2", "Basic 3", "Basic 4", "Basic 5", "Basic 6"].map((grade) => `<option ${grade === state.grade ? "selected" : ""}>${grade}</option>`).join("")}
        </select>
      </div>
      <div class="pill-row">
        ${[1, 2, 3].map((term) => `<button class="${term === state.term ? "primary" : "secondary"}" data-term="${term}">Term ${term}</button>`).join("")}
      </div>
      <div class="map-grid">
        ${topics.map((topic, index) => topicCard(topic, index)).join("")}
      </div>
    </section>
  `;
}

function lessonScreen() {
  const topic = getTopic();
  const lesson = topic.lessons[state.lessonIndex] || topic.lessons[0];
  const teaching = lesson.teaching || {};
  const done = state.progress.lessonsCompleted.includes(lesson.id);
  const totalLessons = topic.lessons.length;
  return `
    <section class="lesson-card">
      <div class="lesson-visual">${lessonBadge(lesson)}</div>
      <div class="lesson-body">
        <div class="lesson-meta">
          <span><strong>Subject</strong>${getSubject().name}</span>
          <span><strong>Class</strong>${state.grade}</span>
          <span><strong>Term</strong>Term ${state.term}</span>
          <span><strong>Topic</strong>${topic.title}</span>
          <span><strong>Lesson</strong>${state.lessonIndex + 1} of ${totalLessons}</span>
        </div>
        <h2>${lesson.title}</h2>
        <div class="pill-row">
          ${topic.lessons.map((item, index) => `<button class="${index === state.lessonIndex ? "primary" : "secondary"}" data-lesson-step="${index}">Lesson ${index + 1}: ${item.phase || "Learn"}</button>`).join("")}
        </div>
        <p>${lesson.summary}</p>
        <div class="teacher-objective">
          <strong>Today I will learn:</strong>
          <span>${teaching.objective || `I can explain ${lesson.title}.`}</span>
        </div>
        <div class="pill-row">
          ${(teaching.keyWords || lesson.points).map((word) => `<span class="pill">${word}</span>`).join("")}
        </div>
        <article class="teacher-section warmup">
          <h3>1. Warm Up</h3>
          <p>${teaching.warmUp || "Look at the picture and say what you already know."}</p>
        </article>
        <article class="teacher-section">
          <h3>2. Teacher Explains</h3>
          <p>${teaching.teacherTalk || lesson.summary}</p>
          <p>${teaching.explainMore || ""}</p>
          <div class="pill-row">
            ${lesson.examples.map((example) => `<span class="pill">${example}</span>`).join("")}
          </div>
        </article>
        <article class="teacher-section">
          <h3>Materials Needed</h3>
          <ul class="lesson-points">
            ${(teaching.materials || []).slice(0, 8).map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </article>
        <article class="teacher-section">
          <h3>3. Worked Examples</h3>
          ${renderWorkedExamples(teaching.workedExamples)}
        </article>
        <article class="teacher-section practical">
          <h3>Practical Examples</h3>
          <ul class="lesson-points">
            ${(teaching.practicalExamples || []).map((point) => `<li>${point}</li>`).join("")}
          </ul>
        </article>
        <article class="teacher-section self-study">
          <h3>Self Study Steps</h3>
          <ol class="study-steps">
            ${(teaching.selfStudySteps || []).map((point) => `<li>${point}</li>`).join("")}
          </ol>
        </article>
        <article class="teacher-section">
          <h3>4. We Do Together</h3>
          <ul class="lesson-points">
            ${(teaching.guidedPractice || [lesson.activity]).map((point) => `<li><strong>Together:</strong> ${point}</li>`).join("")}
          </ul>
        </article>
        <article class="teacher-section">
          <h3>5. You Try</h3>
          <ul class="lesson-points">
            ${(teaching.independentPractice || lesson.points).map((point) => `<li><strong>Try:</strong> ${point}</li>`).join("")}
          </ul>
        </article>
        <article class="teacher-section mistake">
          <h3>Teacher Tip</h3>
          <p>${teaching.commonMistake || "If it feels hard, use real objects and try again slowly."}</p>
        </article>
        <article class="teacher-section">
          <h3>I Can Check</h3>
          <ul class="lesson-points">
            ${(teaching.successCriteria || []).map((point) => `<li>${point}</li>`).join("")}
          </ul>
        </article>
        <article class="teacher-section">
          <h3>Quick Check</h3>
          <div class="quick-checks">
            ${(teaching.checks || []).slice(0, 5).map((check) => `
              <details>
                <summary>${check.q}</summary>
                <p><strong>Answer:</strong> ${check.a}</p>
              </details>
            `).join("")}
          </div>
        </article>
        <div class="activity-card">
          <h3>Challenge and Home Link</h3>
          <p><strong>Challenge:</strong> ${teaching.challenge || "Try one more example by yourself."}</p>
          <p>${teaching.homeLink || lesson.activity}</p>
          <p><strong>Reflection:</strong> ${teaching.reflection || "Say what you learnt today."}</p>
          <small>${teaching.syllabusLink || ""}</small>
        </div>
        <div class="action-row">
          <button class="secondary" data-route="learn">Back to Map</button>
          <button class="secondary" data-action="read-lesson">Read</button>
          <button class="primary" data-action="complete-lesson">${done ? "Completed" : "Complete Lesson"}</button>
          <button class="secondary" data-action="next-lesson">${state.lessonIndex + 1 < totalLessons ? "Next Lesson" : "Review Topic"}</button>
          <button class="primary" data-action="start-topic-quiz">20 Question Quiz</button>
        </div>
      </div>
    </section>
  `;
}

function renderWorkedExamples(examples = []) {
  if (!examples.length) return "<p>Look at the picture, listen, then try with real objects.</p>";
  return examples.map((example) => `
    <div class="worked-example">
      <h4>${example.title}</h4>
      <ol>
        ${example.steps.map((step) => `<li>${step}</li>`).join("")}
      </ol>
    </div>
  `).join("");
}

function practiceScreen() {
  return `
    <section class="panel">
      <h2>Interactive Practice</h2>
      <p>Choose a fast activity. More activities can be added from the same data model.</p>
      <div class="card-grid">
        ${activityButton("3D", "3D Shape Lessons", "Study cube, cuboid, sphere, cylinder, cone and pyramid.", "shape-lessons")}
        ${activityButton("Match", "Picture Matching", "Match real objects to the right 3D shape.", "matching")}
        ${activityButton("Memo", "Memory Game", "Flip cards and remember matching pairs.", "memory")}
        ${activityButton("Cards", "Flash Cards", "Quick subject flash cards for revision.", "flashcards")}
        ${activityButton("Write", "Writing and Tracing", "Trace letters, numbers, words, and your name.", "writing")}
      </div>
      <div id="practiceArea">${practiceActivity()}</div>
    </section>
  `;
}

function practiceActivity() {
  const mode = sessionStorage.getItem("practiceMode") || "matching";
  if (mode === "shape-lessons") {
    return `<div class="map-grid">${shapeLessons.map((lessonItem, index) => `
      <button class="subject-card" data-shape-index="${index}">
        <span class="subject-icon">${lessonBadge(lessonItem)}</span>
        <h3>${lessonItem.title}</h3>
        <p>${lessonItem.summary}</p>
      </button>`).join("")}</div>`;
  }
  if (mode === "memory") return memoryGame();
  if (mode === "flashcards") return flashCards();
  if (mode === "writing") return writingTool("practice");
  return matchingGame();
}

function playroomScreen() {
  const tools = [
    ["counters", "Counters", "Count, add, subtract, and make number bonds."],
    ["clock", "Clock", "Move the hour and minute hands to practise time."],
    ["spinner", "Spinner", "Spin for quick revision prompts and classroom turns."],
    ["board", "Pattern Board", "Tap squares to make patterns, shapes, and picture answers."],
    ["writing", "Writing", "Trace letters, numbers, sight words, and names."]
  ];
  return `
    <section class="panel">
      <div class="section-title">
        <div>
          <h2>Learning Playroom</h2>
          <p>Hands-on classroom tools inspired by playful learning sites, made offline for Ghana Basic 1 learners.</p>
        </div>
      </div>
      <div class="pill-row">
        ${tools.map(([id, title]) => `<button class="${state.playTool === id ? "primary" : "secondary"}" data-tool="${id}">${title}</button>`).join("")}
      </div>
      ${playTool()}
    </section>
  `;
}

function playTool() {
  if (state.playTool === "clock") return clockTool();
  if (state.playTool === "spinner") return spinnerTool();
  if (state.playTool === "board") return patternBoardTool();
  if (state.playTool === "writing") return writingTool("play");
  return countersTool();
}

function countersTool() {
  const counters = Array.from({ length: state.play.counters }, (_, index) => index + 1);
  return `
    <section class="manipulative-card">
      <div class="tool-header">
        <h3>Counters and Ten Frame</h3>
        <span class="tool-score">${state.play.counters}</span>
      </div>
      <p>Teacher prompt: Count each counter once. Add more. Take some away. Say how many are left.</p>
      <div class="ten-frame" aria-label="Ten frame">
        ${Array.from({ length: 10 }, (_, index) => `<button class="ten-cell ${index < state.play.counters ? "filled" : ""}" data-counter-set="${index + 1}">${index < state.play.counters ? "?" : ""}</button>`).join("")}
      </div>
      <div class="counter-pile">
        ${counters.map((number) => `<span class="counter">${number}</span>`).join("")}
      </div>
      <div class="action-row">
        <button class="secondary" data-play-action="counter-minus">Take Away 1</button>
        <button class="primary" data-play-action="counter-plus">Add 1</button>
        <button class="secondary" data-play-action="counter-reset">Reset</button>
        <button class="primary" data-action="read-playroom">Read Prompt</button>
      </div>
    </section>
  `;
}

function clockTool() {
  const hourAngle = ((state.play.clockHour % 12) * 30) + (state.play.clockMinute * 0.5);
  const minuteAngle = state.play.clockMinute * 6;
  return `
    <section class="manipulative-card">
      <div class="tool-header">
        <h3>Teaching Clock</h3>
        <span class="tool-score">${state.play.clockHour}:${String(state.play.clockMinute).padStart(2, "0")}</span>
      </div>
      <p>Teacher prompt: Move the hands. Say o'clock, half past, morning, afternoon, evening, and night.</p>
      <div class="clock-face">
        ${Array.from({ length: 12 }, (_, i) => `<span class="clock-number n${i + 1}">${i + 1}</span>`).join("")}
        <span class="clock-hand hour-hand" style="transform: rotate(${hourAngle}deg)"></span>
        <span class="clock-hand minute-hand" style="transform: rotate(${minuteAngle}deg)"></span>
        <span class="clock-dot"></span>
      </div>
      <div class="action-row">
        <button class="secondary" data-play-action="hour-minus">Hour -</button>
        <button class="primary" data-play-action="hour-plus">Hour +</button>
        <button class="secondary" data-play-action="minute-minus">Minute -</button>
        <button class="primary" data-play-action="minute-plus">Minute +</button>
      </div>
    </section>
  `;
}

function spinnerTool() {
  const prompts = ["Count 10", "Read a word", "Name a shape", "Say a Ghana flag colour", "Add 2 + 1", "Move your body"];
  return `
    <section class="manipulative-card">
      <div class="tool-header">
        <h3>Revision Spinner</h3>
        <span class="tool-score">${state.play.spinnerResult}</span>
      </div>
      <p>Teacher prompt: Spin, then let the child answer or act out the task.</p>
      <div class="spinner-wheel">${prompts.map((item) => `<span>${item}</span>`).join("")}</div>
      <div class="action-row">
        <button class="primary" data-play-action="spin">Spin</button>
        <button class="secondary" data-action="read-playroom">Read Prompt</button>
      </div>
    </section>
  `;
}

function patternBoardTool() {
  const marks = new Set(state.play.boardMarks);
  return `
    <section class="manipulative-card">
      <div class="tool-header">
        <h3>Pattern Board</h3>
        <span class="tool-score">${marks.size} marks</span>
      </div>
      <p>Teacher prompt: Tap boxes to make AB patterns, draw shapes, show answers, or create simple pictures.</p>
      <div class="pattern-board">
        ${Array.from({ length: 25 }, (_, index) => `<button class="board-cell ${marks.has(index) ? "marked" : ""}" data-board-cell="${index}">${marks.has(index) ? "?" : ""}</button>`).join("")}
      </div>
      <div class="action-row">
        <button class="secondary" data-play-action="board-pattern">Make Pattern</button>
        <button class="secondary" data-play-action="board-clear">Clear</button>
      </div>
    </section>
  `;
}

function writingTool(source = "practice") {
  const targets = writingTargets();
  const current = targets.find((item) => item.value === state.writingTarget) || targets[0];
  state.writingTarget = current.value;
  return `
    <section class="manipulative-card writing-lab">
      <div class="tool-header">
        <h3>Writing and Tracing</h3>
        <span class="tool-score">${current.label}</span>
      </div>
      <p>Trace with your finger first. Then copy it with pencil in your exercise book. Start at the dot, go slowly, and say the sound or word aloud.</p>
      <div class="pill-row">
        ${[
          ["letters", "Letters"],
          ["numbers", "Numbers"],
          ["words", "Sight Words"],
          ["name", "My Name"]
        ].map(([mode, label]) => `<button class="${state.writingMode === mode ? "primary" : "secondary"}" data-writing-mode="${mode}">${label}</button>`).join("")}
      </div>
      <div class="writing-board" aria-label="Tracing board">
        <div class="writing-lines">
          <span></span><span></span><span></span>
        </div>
        <div class="trace-text">${current.value}</div>
        <canvas class="trace-canvas" data-trace-canvas aria-label="Draw here to trace"></canvas>
        <div class="start-dot">start</div>
      </div>
      <div class="writing-prompt">
        <strong>Teacher prompt:</strong>
        <span>${current.prompt}</span>
      </div>
      <label class="writing-copy">
        <span>Type or copy what you wrote:</span>
        <input class="input" value="" placeholder="${current.value}" data-writing-input />
      </label>
      <div class="action-row">
        <button class="secondary" data-writing-action="previous">Previous</button>
        <button class="primary" data-writing-action="next">Next</button>
        <button class="secondary" data-writing-action="clear">Clear</button>
        <button class="secondary" data-writing-action="undo">Undo</button>
        <button class="secondary" data-action="read-writing">Read Prompt</button>
        <button class="primary" data-writing-action="done">I Wrote It</button>
      </div>
      ${source === "practice" ? `<p class="pill">Tip: This same writing board is also inside Playroom.</p>` : ""}
    </section>
  `;
}

function writingTargets() {
  const sets = {
    letters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => ({
      value: letter,
      label: `Letter ${letter}`,
      prompt: `Say letter ${letter}. Trace the big ${letter}. Write it three times in the air and three times in your book.`
    })),
    numbers: Array.from({ length: 20 }, (_, index) => {
      const number = String(index + 1);
      return {
        value: number,
        label: `Number ${number}`,
        prompt: `Count ${number} object${number === "1" ? "" : "s"}. Trace ${number}. Write it, then draw ${number} small circles.`
      };
    }),
    words: ["I", "am", "the", "see", "my", "we", "go", "to", "school", "Ghana", "red", "gold", "green"].map((word) => ({
      value: word,
      label: word,
      prompt: `Read the word ${word}. Trace it slowly. Copy it twice, then use it in a short sentence.`
    })),
    name: [
      {
        value: studentName() || "My Name",
        label: "My Name",
        prompt: `Trace your name. Say: My name is ${studentName() || "my name"}. Copy it neatly in your exercise book.`
      },
      {
        value: "Nkunim",
        label: "Nkunim",
        prompt: "Trace Nkunim slowly. Start each capital letter at the top and keep your letters on the line."
      }
    ]
  };
  return sets[state.writingMode] || sets.letters;
}

function matchingGame() {
  const pairs = [
    ["Dice", "Cube"], ["Matchbox", "Cuboid"], ["Ball", "Sphere"],
    ["Tin of Milk", "Cylinder"], ["Ice Cream Cone", "Cone"], ["Pyramid", "Pyramid"]
  ];
  return `
    <div class="panel">
      <h3>Picture Matching</h3>
      <p>Say the object. Then say the 3D shape it matches.</p>
      <div class="quiz-grid">
        ${pairs.map(([object, shape]) => `<button class="quiz-option" data-match="${shape}">${object} -> ${shape}</button>`).join("")}
      </div>
    </div>
  `;
}

function memoryGame() {
  const cards = shuffle(["Cube", "Cube", "Sphere", "Sphere", "Cone", "Cone", "Cylinder", "Cylinder"]);
  return `<div class="panel"><h3>Memory Game</h3><div class="quiz-grid">${cards.map((card) => `<button class="quiz-option" data-memory="${card}">Hidden ${card}</button>`).join("")}</div></div>`;
}

function flashCards() {
  const cards = flatten(getTopics().map((topic) => topic.lessons)).slice(0, 8);
  return `<div class="panel"><h3>Flash Cards</h3><div class="card-grid">${cards.map((card) => `<article class="activity-card"><h3>${lessonBadge(card)} ${card.title}</h3><p>${card.summary}</p></article>`).join("")}</div></div>`;
}

function quizScreen() {
  if (!state.quiz) startQuiz();
  const item = state.quiz.questions[state.quiz.index];
  if (!item) return quizResult();
  return `
    <section class="panel">
      <div class="section-title">
        <h2>Quiz Time</h2>
        <span class="pill">Score ${state.quiz.score}/${state.quiz.questions.length}</span>
      </div>
      <p>This quiz has ${state.quiz.questions.length} questions. Read carefully and choose the best answer.</p>
      <div class="progress-shell"><div class="progress-fill" style="width:${percent(state.quiz.index, state.quiz.questions.length)}%"></div></div>
      <h3 style="margin-top:16px;">${item.question}</h3>
      <div class="quiz-grid">
        ${item.choices.map((choice) => `<button class="quiz-option" data-answer="${choice}">${choice}</button>`).join("")}
      </div>
      <p id="quizFeedback"></p>
    </section>
  `;
}

function quizResult() {
  const score = state.quiz.score;
  const total = state.quiz.questions.length;
  const resultPercent = percent(score, total);
  return `
    <section class="panel">
      <h2>Quiz Complete</h2>
      <p>${state.student.name} scored ${score} out of ${total} (${resultPercent}%).</p>
      <div class="quick-stats">
        ${stat("XP", state.progress.xp)}
        ${stat("Coins", state.progress.coins)}
      </div>
      <div class="action-row">
        <button class="primary" data-action="save-quiz">Save Result</button>
        <button class="secondary" data-action="restart-quiz">Try Again</button>
      </div>
    </section>
  `;
}

function examsScreen() {
  if (state.exam) return examRunner();
  const latest = (state.progress.examsTaken || []).slice(-3).reverse();
  return `
    <section class="panel">
      <div class="section-title">
        <div>
          <h2>Exam Preparation</h2>
          <p>Prepare for school exams with Mock Exams and Final Exams. Questions come from the lessons, teacher checks, and topic quizzes.</p>
        </div>
      </div>
      <div class="card-grid">
        <article class="activity-card">
          <h3>Mock Exam</h3>
          <p>Practise the selected subject and term. Good for weekly, monthly, and end-of-topic preparation.</p>
          <button class="primary" data-action="start-mock-exam">Start Mock Exam</button>
        </article>
        <article class="activity-card">
          <h3>Final Exam</h3>
          <p>Mixed exam across all subjects for ${state.grade}. Good for end-of-term or end-of-year revision.</p>
          <button class="primary" data-action="start-final-exam">Start Final Exam</button>
        </article>
      </div>
      <section class="panel">
        <h3>Exam Settings</h3>
        <div class="action-row">
          <select class="select" data-action="change-grade">
            ${["Basic 1", "Basic 2", "Basic 3", "Basic 4", "Basic 5", "Basic 6"].map((grade) => `<option ${grade === state.grade ? "selected" : ""}>${grade}</option>`).join("")}
          </select>
          <select class="select" data-action="change-exam-subject">
            ${SUBJECTS.map((subject) => `<option value="${subject.id}" ${subject.id === state.subjectId ? "selected" : ""}>${subject.name}</option>`).join("")}
          </select>
        </div>
        <div class="pill-row">
          ${[1, 2, 3].map((term) => `<button class="${term === state.term ? "primary" : "secondary"}" data-term="${term}">Term ${term}</button>`).join("")}
        </div>
      </section>
      <section class="panel">
        <h3>Recent Exam Results</h3>
        ${latest.length ? latest.map(examSummary).join("") : "<p>No exams taken yet. Start with a Mock Exam.</p>"}
      </section>
    </section>
  `;
}

function examRunner() {
  const item = state.exam.questions[state.exam.index];
  if (!item) return examResult();
  return `
    <section class="panel">
      <div class="section-title">
        <div>
          <h2>${state.exam.type === "final" ? "Final Exam" : "Mock Exam"}</h2>
          <p>${state.exam.title}</p>
        </div>
        <span class="pill">Score ${state.exam.score}/${state.exam.questions.length}</span>
      </div>
      <div class="progress-shell"><div class="progress-fill" style="width:${percent(state.exam.index, state.exam.questions.length)}%"></div></div>
      <h3 style="margin-top:16px;">Question ${state.exam.index + 1}. ${item.question}</h3>
      <div class="quiz-grid">
        ${item.choices.map((choice) => `<button class="quiz-option" data-exam-answer="${choice}">${choice}</button>`).join("")}
      </div>
      <p class="pill">Subject: ${item.subjectName || getSubject().name}</p>
    </section>
  `;
}

function examResult() {
  const score = state.exam.score;
  const total = state.exam.questions.length;
  const resultPercent = percent(score, total);
  const strengths = examStrengths();
  return `
    <section class="panel">
      <h2>${state.exam.type === "final" ? "Final Exam Complete" : "Mock Exam Complete"}</h2>
      <p>${state.student.name} scored ${score} out of ${total} (${resultPercent}%).</p>
      <div class="dashboard-grid">
        ${stat("Score", `${resultPercent}%`)}
        ${stat("Correct", score)}
        ${stat("Questions", total)}
        ${stat("Type", state.exam.type === "final" ? "Final" : "Mock")}
      </div>
      <section class="activity-card">
        <h3>Teacher Feedback</h3>
        <p>${examFeedback(resultPercent)}</p>
        <p><strong>Strong areas:</strong> ${strengths.strong || "Keep practising to build strong areas."}</p>
        <p><strong>Revise:</strong> ${strengths.revise || "Review the teacher examples before the next exam."}</p>
      </section>
      <div class="action-row">
        <button class="primary" data-action="save-exam">Save Exam Result</button>
        <button class="secondary" data-action="restart-exam">Try Again</button>
      </div>
    </section>
  `;
}

function readingScreen() {
  const reading = [
    ["Alphabet", "ABC", "Say A to Z. Match letters to sounds."],
    ["Phonics", "Sound", "Blend sounds to read simple words."],
    ["Sight Words", "Words", "Read I, am, the, see, my, we."],
    ["Stories", "Story", "Read along and answer who, what, where."],
    ["Pronunciation", "Voice", "Listen, repeat, and speak clearly."],
    ["Fluency", "Speed", "Read smoothly with expression."]
  ];
  return `
    <section class="panel">
      <h2>Reading System</h2>
      <p>Alphabet, phonics, sight words, stories, read-along mode, pronunciation and fluency tracking.</p>
      <div class="card-grid">
        ${reading.map(([title, icon, text]) => `<article class="activity-card"><h3>${icon} ${title}</h3><p>${text}</p><button class="primary" data-read="${title}. ${text}">Read Along</button></article>`).join("")}
      </div>
    </section>
  `;
}

function worksheetsScreen() {
  const topic = getTopic();
  const worksheet = state.worksheet || topic.worksheet;
  return `
    <section class="panel">
      <div class="section-title">
        <div>
          <h2>Worksheet Generator</h2>
          <p>PDF-ready printable worksheets with answer sheets.</p>
        </div>
        <button class="primary" data-action="new-worksheet">New Sheet</button>
      </div>
      <div class="worksheet-page printable">
        <h2>${worksheet.title}</h2>
        <p>Name: _____________________ Date: ${formatDate()}</p>
        <p><strong>Instructions:</strong> ${worksheet.instructions}</p>
        ${worksheet.questions.map((question) => `<div class="worksheet-line">${question}</div>`).join("")}
        <h3>Answer Sheet</h3>
        ${worksheet.answers.map((answer, index) => `<div class="worksheet-line">${index + 1}. ${answer}</div>`).join("")}
      </div>
      <div class="action-row">
        <button class="primary" data-action="complete-worksheet">Mark Complete</button>
        <button class="secondary" data-action="print">Print / Save PDF</button>
      </div>
    </section>
  `;
}

function achievementsScreen() {
  const earned = new Set(state.progress.badges);
  return `
    <section class="panel">
      <h2>Achievements</h2>
      <p>${earned.size} of ${badges.length} badges earned. Keep learning to unlock more.</p>
      <div class="badge-grid">
        ${badges.map((badge) => `<article class="badge ${earned.has(badge.id) ? "earned" : ""}"><span class="badge-icon">${badge.icon}</span><h3>${badge.name}</h3><p>${badge.description}</p></article>`).join("")}
      </div>
    </section>
  `;
}

function parentDashboard() {
  const reports = subjectReports();
  const latestExam = (state.progress.examsTaken || []).slice(-1)[0];
  return `
    <section class="panel">
      <h2>Parent Dashboard</h2>
      <p>Learning reports, time, strengths, weaknesses and printable progress.</p>
      <div class="dashboard-grid">
        ${stat("Lessons", state.progress.lessonsCompleted.length)}
        ${stat("Quizzes", state.progress.quizzesTaken.length)}
        ${stat("Exams", (state.progress.examsTaken || []).length)}
        ${stat("Badges", state.progress.badges.length)}
        ${stat("Streak", `${state.progress.streak} days`)}
      </div>
      <article class="activity-card">
        <h3>Latest Exam</h3>
        <p>${latestExam ? `${latestExam.title}: ${latestExam.percent}% on ${formatDate(new Date(latestExam.at))}` : "No exam result yet."}</p>
      </article>
      <div class="report-grid">
        ${reports.map((report) => `<article class="activity-card"><h3>${subjectIcon(report)} ${report.name}</h3><p>Lessons: ${report.lessons}. Strength: ${report.strength}. Focus: ${report.focus}.</p></article>`).join("")}
      </div>
      <button class="primary" data-action="print">Print Weekly Report</button>
    </section>
  `;
}

function teacherDashboard() {
  return `
    <section class="panel">
      <h2>Teacher Dashboard</h2>
      <p>Offline class management, assignments and performance tracking for schools.</p>
      <div class="card-grid">
        <article class="activity-card"><h3>Class</h3><p>${state.students.length} learner profile${state.students.length === 1 ? "" : "s"} on this device.</p></article>
        <article class="activity-card"><h3>Assignments</h3><p>Create a local task for a subject and print it for class use.</p><button class="primary" data-action="assignment">Create Assignment</button></article>
        <article class="activity-card"><h3>Performance</h3><p>Track lessons, quizzes, badges and worksheet completion.</p></article>
        <article class="activity-card"><h3>School Mode</h3><p>Ready for future sync to a school backend when needed.</p></article>
      </div>
    </section>
  `;
}

function tutorScreen() {
  return `
    <section class="panel">
      <h2>Friendly AI Tutor</h2>
      <p>This offline child-safe tutor gives hints from the curriculum. It does not send messages to the internet.</p>
      <textarea class="textarea" id="tutorQuestion" placeholder="Ask: What is addition?"></textarea>
      <button class="primary" data-action="ask-tutor">Ask Tutor</button>
      <div id="tutorAnswer" class="activity-card" style="margin-top:12px;">Hi ${state.student.name}! Ask me about numbers, reading, science, Ghana, shapes, or worksheets.</div>
    </section>
  `;
}

function certificateScreen() {
  const certId = `${state.student.id}-${Date.now()}`;
  const qr = makeQrBits(certId);
  return `
    <section class="panel">
      <h2>Certificate Studio</h2>
      <p>Generate mastery certificates with student name, subject, score, date and QR-style verification.</p>
      <div class="certificate printable">
        <p>This certificate is proudly awarded to</p>
        <h2>${state.student.name}</h2>
        <h3>3D Shapes Adventure Champion</h3>
        <p>Subject: ${getSubject().name}</p>
        <p>Score: ${bestScore()}%</p>
        <p>Date: ${formatDate()}</p>
        <div class="qr">${qr.map((on) => `<span class="${on ? "on" : ""}"></span>`).join("")}</div>
        <p>Verification: ${certId.slice(-10).toUpperCase()}</p>
      </div>
      <div class="action-row">
        <button class="primary" data-action="save-certificate">Save Certificate</button>
        <button class="secondary" data-action="print">Print</button>
      </div>
    </section>
  `;
}

function settingsScreen() {
  return `
    <section class="panel">
      <h2>Accessibility and Settings</h2>
      <div class="settings-grid">
        ${settingButton("dark", "Dark Mode")}
        ${settingButton("contrast", "High Contrast")}
        ${settingButton("dyslexia", "Dyslexia Friendly")}
        <article class="activity-card">
          <h3>Text Size</h3>
          <div class="action-row">
            <button class="secondary" data-action="font-down">A-</button>
            <button class="secondary" data-action="font-up">A+</button>
          </div>
        </article>
        <article class="activity-card"><h3>Install App</h3><p>Add to phone, tablet, iPad or school computer.</p><button class="primary" data-action="install">Install</button></article>
        <article class="activity-card"><h3>Data</h3><p>Progress is stored offline on this device with IndexedDB.</p></article>
      </div>
    </section>
  `;
}

function bottomNav() {
  const items = [
    ["home", "H", "Home"],
    ["learn", "L", "Learn"],
    ["playroom", "P", "Play"],
    ["exams", "E", "Exams"],
    ["worksheets", "S", "Sheets"],
    ["parent", "R", "Parent"],
    ["teacher", "T", "Teacher"]
  ];
  return `<nav class="bottom-nav">${items.map(([route, icon, label]) => `<button class="nav-btn ${state.route === route ? "active" : ""}" data-route="${route}"><span>${icon}</span>${label}</button>`).join("")}</nav>`;
}
function profileModal() {
  return `
    <div class="modal" id="profileModal">
      <section class="modal-card">
        <h2>Add Child Profile</h2>
        <input class="input" id="profileName" placeholder="Child name" />
        <select class="select" id="profileGrade">${["Basic 1", "Basic 2", "Basic 3", "Basic 4", "Basic 5", "Basic 6"].map((grade) => `<option>${grade}</option>`).join("")}</select>
        <div class="avatar-grid">${avatars.map((avatar) => `<button class="avatar-option" data-avatar="${avatar}">${avatar}</button>`).join("")}</div>
        <div class="action-row">
          <button class="secondary" data-action="close-modal">Cancel</button>
          <button class="primary" data-action="save-profile">Save</button>
        </div>
      </section>
    </div>
  `;
}

function toastHost() {
  return `<div id="toastHost"></div>`;
}

function stat(label, value) {
  return `<article class="stat-card"><strong>${value}</strong>${label}</article>`;
}

function subjectCard(subject) {
  const stats = subjectLessonCount(subject.id);
  return `<button class="subject-card" data-subject="${subject.id}"><span class="subject-icon">${subjectIcon(subject)}</span><h3>${subject.name}</h3><p>${stats} lessons complete</p></button>`;
}

function subjectIcon(subject) {
  const icons = {
    math: "123",
    english: "ABC",
    science: "Lab",
    computing: "PC",
    owop: "GH",
    rme: "RME",
    creative: "Art",
    history: "His",
    pe: "PE",
    ghanaian: "Lang"
  };
  return icons[subject.id] || subject.name.slice(0, 3);
}

function lessonBadge(lesson) {
  const title = lesson.title.toLowerCase();
  if (title.includes("count")) return "123";
  if (title.includes("addition")) return "+";
  if (title.includes("subtraction")) return "-";
  if (title.includes("money")) return "GHc";
  if (title.includes("time")) return "Time";
  if (title.includes("shape") || title.includes("cube") || title.includes("sphere") || title.includes("cone")) return "3D";
  if (title.includes("alphabet")) return "ABC";
  if (title.includes("phonic")) return "Sound";
  if (title.includes("sight")) return "Words";
  if (title.includes("story")) return "Story";
  if (title.includes("plant")) return "Plant";
  if (title.includes("animal")) return "Animal";
  if (title.includes("body")) return "Body";
  if (title.includes("weather")) return "Sky";
  if (title.includes("computer")) return "PC";
  if (title.includes("ghana")) return "GH";
  if (title.includes("greeting")) return "Hello";
  return (lesson.phase || lesson.title).slice(0, 4);
}

function topicCard(topic, index) {
  const lesson = topic.lessons[0];
  const locked = index > 0 && !state.progress.lessonsCompleted.includes(getTopics()[index - 1].lessons[0].id);
  const completed = topic.lessons.filter((item) => state.progress.lessonsCompleted.includes(item.id)).length;
  const done = completed === topic.lessons.length;
  return `<button class="subject-card ${locked ? "locked" : ""}" data-topic="${index}" ${locked ? "disabled" : ""}><span class="subject-icon">${lessonBadge(lesson)}</span><h3>${topic.title}</h3><p>${done ? "Completed" : locked ? "Locked" : `${completed}/${topic.lessons.length} lessons - ${topic.summary}`}</p></button>`;
}

function activityButton(icon, title, text, routeOrMode) {
  return `<button class="activity-card" data-activity="${routeOrMode}"><h3>${icon} ${title}</h3><p>${text}</p></button>`;
}

function settingButton(key, title) {
  return `<article class="activity-card"><h3>${title}</h3><button class="primary" data-pref="${key}">Toggle</button></article>`;
}

function bindCommon() {
  document.querySelectorAll("[data-route]").forEach((button) => {
    button.addEventListener("click", () => {
      state.route = button.dataset.route;
      state.quiz = null;
      render();
    });
  });
  document.querySelectorAll("[data-student]").forEach((button) => {
    button.addEventListener("click", async () => switchStudent(button.dataset.student));
  });
  document.querySelectorAll("[data-subject]").forEach((button) => {
    button.addEventListener("click", () => {
      state.subjectId = button.dataset.subject;
      state.topicIndex = 0;
      state.route = "subject";
      render();
    });
  });
  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => handleAction(button.dataset.action));
  });
}

function bindScreen() {
  document.querySelectorAll("[data-term]").forEach((button) => {
    button.addEventListener("click", () => {
      state.term = Number(button.dataset.term);
      state.topicIndex = 0;
      render();
    });
  });
  document.querySelectorAll("[data-topic]").forEach((button) => {
    button.addEventListener("click", () => {
      state.topicIndex = Number(button.dataset.topic);
      state.lessonIndex = 0;
      state.route = "lesson";
      render();
    });
  });
  document.querySelectorAll("[data-lesson-step]").forEach((button) => {
    button.addEventListener("click", () => {
      state.lessonIndex = Number(button.dataset.lessonStep);
      render();
    });
  });
  document.querySelectorAll("[data-activity]").forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.dataset.activity;
      if (["matching", "memory", "flashcards", "shape-lessons", "writing"].includes(value)) {
        sessionStorage.setItem("practiceMode", value);
        state.route = "practice";
      } else {
        state.route = value;
      }
      render();
    });
  });
  document.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => answerQuiz(button));
  });
  document.querySelectorAll("[data-read]").forEach((button) => {
    button.addEventListener("click", () => speak(button.dataset.read));
  });
  document.querySelectorAll("[data-shape-index]").forEach((button) => {
    button.addEventListener("click", () => {
      const shape = shapeLessons[Number(button.dataset.shapeIndex)];
      speak(`${shape.title}. ${shape.summary}. ${shape.points.join(", ")}.`);
    });
  });
  const grade = document.querySelector("[data-action='change-grade']");
  if (grade) {
    grade.addEventListener("change", () => {
      state.grade = grade.value;
      state.topicIndex = 0;
      render();
    });
  }
  const examSubject = document.querySelector("[data-action='change-exam-subject']");
  if (examSubject) {
    examSubject.addEventListener("change", () => {
      state.subjectId = examSubject.value;
      state.topicIndex = 0;
      render();
    });
  }
  document.querySelectorAll("[data-exam-answer]").forEach((button) => {
    button.addEventListener("click", () => answerExam(button));
  });
  document.querySelectorAll("[data-tool]").forEach((button) => {
    button.addEventListener("click", () => {
      state.playTool = button.dataset.tool;
      render();
    });
  });
  document.querySelectorAll("[data-play-action]").forEach((button) => {
    button.addEventListener("click", () => playAction(button.dataset.playAction));
  });
  document.querySelectorAll("[data-counter-set]").forEach((button) => {
    button.addEventListener("click", () => {
      state.play.counters = Number(button.dataset.counterSet);
      render();
    });
  });
  document.querySelectorAll("[data-board-cell]").forEach((button) => {
    button.addEventListener("click", () => toggleBoardCell(Number(button.dataset.boardCell)));
  });
  document.querySelectorAll("[data-writing-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      state.writingMode = button.dataset.writingMode;
      state.writingTarget = firstWritingTarget();
      render();
    });
  });
  document.querySelectorAll("[data-writing-action]").forEach((button) => {
    button.addEventListener("click", () => writingAction(button.dataset.writingAction));
  });
  setupTraceCanvas();
}

async function handleAction(action) {
  const actions = {
    "speak-screen": () => speak(screenText()),
    "open-settings": () => { state.route = "settings"; render(); },
    "new-profile": () => byId("profileModal").classList.add("show"),
    "close-modal": () => byId("profileModal").classList.remove("show"),
    "save-profile": saveProfile,
    "complete-lesson": completeLesson,
    "next-lesson": nextLesson,
    "read-lesson": readLesson,
    "start-topic-quiz": () => { startQuiz(); state.route = "quiz"; render(); },
    "restart-quiz": () => { startQuiz(); render(); },
    "save-quiz": saveQuiz,
    "start-mock-exam": () => startExam("mock"),
    "start-final-exam": () => startExam("final"),
    "restart-exam": () => startExam((state.exam && state.exam.type) || "mock"),
    "save-exam": saveExam,
    "read-playroom": readPlayroom,
    "read-writing": readWriting,
    "daily-reward": dailyReward,
    "new-worksheet": newWorksheet,
    "complete-worksheet": completeWorksheet,
    "print": () => window.print(),
    "ask-tutor": askTutor,
    "save-certificate": saveCertificate,
    "assignment": createAssignment,
    "install": () => state.installApp && state.installApp(),
    "font-up": () => adjustFont(0.1),
    "font-down": () => adjustFont(-0.1)
  };
  if (actions[action]) await actions[action]();
}

async function saveProfile() {
  const name = byId("profileName").value.trim() || "Learner";
  const grade = byId("profileGrade").value;
  const avatar = selectedAvatar();
  const student = { id: uniqueId(), name, grade, avatar, createdAt: new Date().toISOString() };
  await putOne("students", student);
  await putOne("progress", defaultProgress(student.id));
  state.students = await getAll("students");
  state.student = student;
  state.progress = await getOne("progress", student.id);
  state.grade = grade;
  render();
}

async function switchStudent(id) {
  state.student = state.students.find((student) => student.id === id) || state.students[0];
  state.progress = await getOne("progress", state.student.id) || defaultProgress(state.student.id);
  state.grade = state.student.grade;
  render();
}

async function completeLesson() {
  const lesson = getTopic().lessons[state.lessonIndex] || getTopic().lessons[0];
  awardForLesson(state.progress, lesson);
  await putOne("progress", state.progress);
  await logEvent("lesson_completed", { studentId: state.student.id, lessonId: lesson.id });
  toast("Lesson complete! XP, coins and badges updated.");
  confetti(50);
  render();
}

function nextLesson() {
  const topic = getTopic();
  if (state.lessonIndex + 1 < topic.lessons.length) {
    state.lessonIndex += 1;
    render();
    return;
  }
  state.lessonIndex = 0;
  render();
}

function readLesson() {
  const lesson = getTopic().lessons[state.lessonIndex] || getTopic().lessons[0];
  const teaching = lesson.teaching || {};
  const examples = flatten((teaching.workedExamples || []).map((example) => [example.title].concat(example.steps || []))).join(". ");
  speak(`${getSubject().name}. ${state.grade}. Term ${state.term}. ${lesson.title}. Today's lesson. ${teaching.objective || lesson.summary}. Warm up: ${teaching.warmUp || ""}. Teacher explains: ${teaching.teacherTalk || lesson.summary}. ${teaching.explainMore || ""}. Practical examples: ${(teaching.practicalExamples || []).join(". ")}. Worked example: ${examples}. Self study steps: ${(teaching.selfStudySteps || []).join(". ")}. We do together: ${(teaching.guidedPractice || []).join(". ")}. You try: ${(teaching.independentPractice || []).join(". ")}. I can check: ${(teaching.successCriteria || []).join(". ")}. Challenge: ${teaching.challenge || ""}. Quick check: ${(teaching.checks || []).map((check) => check.q).join(". ")}`);
}

function startQuiz() {
  const questions = shuffle(getTopic().quiz)
    .slice(0, 20)
    .map((question) => ({ ...question, choices: shuffle(question.choices) }));
  state.quiz = { questions, index: 0, score: 0, answered: [] };
}

function answerQuiz(button) {
  const question = state.quiz.questions[state.quiz.index];
  const selected = button.dataset.answer;
  const correct = selected === question.answer;
  button.classList.add(correct ? "correct" : "wrong");
  if (correct) {
    state.quiz.score += 1;
    speak("Correct!");
  } else {
    speak(`Try again. The answer is ${question.answer}.`);
  }
  state.quiz.answered.push({ question: question.id, selected, correct });
  setTimeout(() => {
    state.quiz.index += 1;
    render();
  }, 800);
}

function playAction(action) {
  if (action === "counter-plus") state.play.counters = Math.min(10, state.play.counters + 1);
  if (action === "counter-minus") state.play.counters = Math.max(0, state.play.counters - 1);
  if (action === "counter-reset") state.play.counters = 0;
  if (action === "hour-plus") state.play.clockHour = state.play.clockHour === 12 ? 1 : state.play.clockHour + 1;
  if (action === "hour-minus") state.play.clockHour = state.play.clockHour === 1 ? 12 : state.play.clockHour - 1;
  if (action === "minute-plus") state.play.clockMinute = (state.play.clockMinute + 5) % 60;
  if (action === "minute-minus") state.play.clockMinute = (state.play.clockMinute + 55) % 60;
  if (action === "spin") {
    const prompts = ["Count 10", "Read a word", "Name a shape", "Say a Ghana flag colour", "Add 2 + 1", "Move your body"];
    state.play.spinnerResult = prompts[Math.floor(Math.random() * prompts.length)];
    speak(state.play.spinnerResult);
  }
  if (action === "board-clear") state.play.boardMarks = [];
  if (action === "board-pattern") state.play.boardMarks = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24];
  render();
}

function toggleBoardCell(index) {
  const marks = new Set(state.play.boardMarks);
  if (marks.has(index)) marks.delete(index);
  else marks.add(index);
  state.play.boardMarks = [...marks].sort((a, b) => a - b);
  render();
}

async function writingAction(action) {
  const targets = writingTargets();
  const index = Math.max(0, targets.findIndex((item) => item.value === state.writingTarget));
  if (action === "next") {
    state.writingTarget = targets[(index + 1) % targets.length].value;
    state.writingStrokes = [];
    render();
    return;
  }
  if (action === "previous") {
    state.writingTarget = targets[(index - 1 + targets.length) % targets.length].value;
    state.writingStrokes = [];
    render();
    return;
  }
  if (action === "clear") {
    state.writingStrokes = [];
    render();
    return;
  }
  if (action === "undo") {
    state.writingStrokes.pop();
    render();
    return;
  }
  if (action === "done") {
    state.progress.xp += 3;
    state.progress.coins += 1;
    await putOne("progress", state.progress);
    toast("Great writing practice! XP and coins added.");
    speak("Great writing practice.");
    confetti(25);
    render();
  }
}

function setupTraceCanvas() {
  const canvas = document.querySelector("[data-trace-canvas]");
  if (!canvas) return;
  const context = canvas.getContext("2d");
  let activeStroke = null;

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;
    canvas.width = Math.max(1, Math.round(rect.width * ratio));
    canvas.height = Math.max(1, Math.round(rect.height * ratio));
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    drawTraceStrokes(canvas, context);
  };

  const pointFromEvent = (event) => {
    const rect = canvas.getBoundingClientRect();
    const source = event.touches && event.touches.length ? event.touches[0] : event;
    return {
      x: source.clientX - rect.left,
      y: source.clientY - rect.top
    };
  };

  const start = (event) => {
    event.preventDefault();
    if (canvas.setPointerCapture && event.pointerId !== undefined) canvas.setPointerCapture(event.pointerId);
    activeStroke = [pointFromEvent(event)];
    state.writingStrokes.push(activeStroke);
    drawTraceStrokes(canvas, context);
  };

  const move = (event) => {
    if (!activeStroke) return;
    event.preventDefault();
    activeStroke.push(pointFromEvent(event));
    drawTraceStrokes(canvas, context);
  };

  const end = (event) => {
    if (!activeStroke) return;
    event.preventDefault();
    activeStroke = null;
    if (canvas.releasePointerCapture && event.pointerId !== undefined) canvas.releasePointerCapture(event.pointerId);
  };

  resize();
  if (window.PointerEvent) {
    canvas.addEventListener("pointerdown", start);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", end);
    canvas.addEventListener("pointercancel", end);
  } else {
    canvas.addEventListener("touchstart", start, { passive: false });
    canvas.addEventListener("touchmove", move, { passive: false });
    canvas.addEventListener("touchend", end, { passive: false });
    canvas.addEventListener("mousedown", start);
    canvas.addEventListener("mousemove", move);
    canvas.addEventListener("mouseup", end);
    canvas.addEventListener("mouseleave", end);
  }
  window.addEventListener("resize", resize, { once: true });
}

function drawTraceStrokes(canvas, context) {
  const rect = canvas.getBoundingClientRect();
  context.clearRect(0, 0, rect.width, rect.height);
  context.lineCap = "round";
  context.lineJoin = "round";
  context.lineWidth = Math.max(9, Math.min(18, rect.width / 34));
  context.strokeStyle = "#2864d9";
  state.writingStrokes.forEach((stroke) => {
    if (!stroke.length) return;
    context.beginPath();
    context.moveTo(stroke[0].x, stroke[0].y);
    stroke.slice(1).forEach((point) => context.lineTo(point.x, point.y));
    context.stroke();
  });
}

function readPlayroom() {
  const prompts = {
    counters: `Counters. There are ${state.play.counters} counters. Count each counter once. Add one or take one away.`,
    clock: `Teaching clock. The time is ${state.play.clockHour}:${String(state.play.clockMinute).padStart(2, "0")}. Say the time aloud.`,
    spinner: `Revision spinner. The task is ${state.play.spinnerResult}. Try it now.`,
    board: `Pattern board. Tap boxes to make patterns, shapes, and picture answers.`,
    writing: readWritingText()
  };
  speak(prompts[state.playTool] || "Learning Playroom.");
}

function readWriting() {
  speak(readWritingText());
}

function readWritingText() {
  const current = writingTargets().find((item) => item.value === state.writingTarget) || writingTargets()[0];
  return `Writing and tracing. ${current.label}. ${current.prompt}`;
}

async function saveQuiz() {
  const result = {
    subject: state.subjectId,
    topic: getTopic().id,
    score: state.quiz.score,
    total: state.quiz.questions.length,
    percent: percent(state.quiz.score, state.quiz.questions.length)
  };
  awardForQuiz(state.progress, result);
  await putOne("progress", state.progress);
  toast("Quiz saved. Rewards added.");
  confetti(70);
  state.quiz = null;
  state.route = "learn";
  render();
}

function startExam(type) {
  const questions = buildExamQuestions(type);
  if (!questions.length) {
    toast("No exam questions are available yet for this selection.");
    return;
  }
  state.exam = {
    id: uniqueId(),
    type,
    title: type === "final"
      ? `${state.grade} Final Exam - All Subjects`
      : `${state.grade} Term ${state.term} ${getSubject().name} Mock Exam`,
    grade: state.grade,
    term: state.term,
    subject: type === "final" ? "all" : state.subjectId,
    questions,
    index: 0,
    score: 0,
    answered: [],
    startedAt: new Date().toISOString()
  };
  state.route = "exams";
  render();
}

function buildExamQuestions(type) {
  const sourceTopics = type === "final"
    ? finalExamTopics()
    : getTopics().map((topic) => ({ subject: getSubject(), topic }));

  const questions = flatten(sourceTopics.map(({ subject, topic }) =>
    topic.quiz.map((question) => ({
      ...question,
      id: `${type}-${topic.id}-${question.id}`,
      subject: subject.id,
      subjectName: subject.name,
      topic: topic.id,
      choices: shuffle(question.choices)
    }))
  ));

  const desiredCount = type === "final" ? 30 : 20;
  return shuffle(questions).slice(0, Math.min(desiredCount, questions.length));
}

function answerExam(button) {
  const question = state.exam.questions[state.exam.index];
  const selected = button.dataset.examAnswer;
  const correct = selected === question.answer;
  button.classList.add(correct ? "correct" : "wrong");
  if (correct) {
    state.exam.score += 1;
    speak("Correct.");
  } else {
    speak(`The correct answer is ${question.answer}.`);
  }
  state.exam.answered.push({
    question: question.id,
    subject: question.subject,
    subjectName: question.subjectName,
    topic: question.topic,
    selected,
    answer: question.answer,
    correct
  });
  setTimeout(() => {
    state.exam.index += 1;
    render();
  }, 850);
}

async function saveExam() {
  const result = {
    id: state.exam.id,
    type: state.exam.type,
    title: state.exam.title,
    grade: state.exam.grade,
    term: state.exam.term,
    subject: state.exam.subject,
    score: state.exam.score,
    total: state.exam.questions.length,
    percent: percent(state.exam.score, state.exam.questions.length),
    answered: state.exam.answered,
    startedAt: state.exam.startedAt
  };
  awardForExam(state.progress, result);
  await putOne("progress", state.progress);
  await logEvent("exam_completed", { studentId: state.student.id, examId: result.id, percent: result.percent });
  toast("Exam result saved. Rewards added.");
  confetti(result.percent >= 70 ? 90 : 45);
  state.exam = null;
  state.route = "exams";
  render();
}

function examSummary(result) {
  return `
    <article class="activity-card">
      <h3>${result.type === "final" ? "Final" : "Mock"} - ${result.percent}%</h3>
      <p>${result.title}</p>
      <p>Score: ${result.score}/${result.total}. Date: ${formatDate(new Date(result.at))}</p>
    </article>
  `;
}

function examFeedback(resultPercent) {
  if (resultPercent >= 90) return "Excellent exam readiness. Keep revising with final exam practice and teach one idea to someone else.";
  if (resultPercent >= 80) return "Very good. The learner is close to mastery. Revise the few missed questions and try another mock.";
  if (resultPercent >= 60) return "Good foundation. Review teacher examples, practise worksheets, then repeat the mock exam.";
  return "Needs guided revision. Go back to the lesson cards, use real objects, and practise one subject at a time.";
}

function examStrengths() {
  const answered = (state.exam && state.exam.answered) || [];
  const bySubject = {};
  answered.forEach((item) => {
    if (!bySubject[item.subjectName || item.subject]) bySubject[item.subjectName || item.subject] = { correct: 0, total: 0 };
    bySubject[item.subjectName || item.subject].total += 1;
    if (item.correct) bySubject[item.subjectName || item.subject].correct += 1;
  });
  const rows = Object.entries(bySubject).map(([name, data]) => ({ name, percent: percent(data.correct, data.total) }));
  const strong = rows.filter((row) => row.percent >= 70).map((row) => `${row.name} (${row.percent}%)`).join(", ");
  const revise = rows.filter((row) => row.percent < 70).map((row) => `${row.name} (${row.percent}%)`).join(", ");
  return { strong, revise };
}

async function dailyReward() {
  const claimed = claimDailyReward(state.progress);
  await putOne("progress", state.progress);
  toast(claimed ? "Daily reward claimed: 10 coins, 1 gem and XP!" : "Daily reward already claimed today.");
  if (claimed) confetti(60);
  render();
}

function newWorksheet() {
  const topic = getTopic();
  state.worksheet = {
    ...topic.worksheet,
    questions: shuffle(topic.worksheet.questions),
    answers: topic.worksheet.answers
  };
  render();
}

async function completeWorksheet() {
  await awardForWorksheet(state.progress, getTopic().worksheet.title);
  await putOne("progress", state.progress);
  toast("Worksheet complete. Great practice!");
  render();
}

function askTutor() {
  const question = byId("tutorQuestion").value.toLowerCase();
  const answer = tutorAnswer(question);
  byId("tutorAnswer").textContent = answer;
  speak(answer);
}

function tutorAnswer(question) {
  if (question.includes("add")) return "Addition means putting groups together. Try 2 mangoes plus 1 mango. Count them all.";
  if (question.includes("subtract") || question.includes("minus")) return "Subtraction means taking away. Put 5 stones down, take 2 away, then count what is left.";
  if (question.includes("read") || question.includes("phonics")) return "Start with the first sound, then blend slowly. For cat, say c-a-t, cat.";
  if (question.includes("shape") || question.includes("cube")) return "A cube is a solid shape with 6 square faces, like a dice.";
  if (question.includes("ghana")) return "Ghana is our country. The flag colours are red, gold, green, with a black star.";
  return "Good question! Look at the lesson picture, say the key words, and try the activity. Ask an adult if you need help.";
}

async function saveCertificate() {
  const certificate = {
    id: uniqueId(),
    studentId: state.student.id,
    subject: state.subjectId,
    score: bestScore(),
    createdAt: new Date().toISOString()
  };
  await putOne("certificates", certificate);
  toast("Certificate saved offline.");
}

async function createAssignment() {
  const assignment = {
    id: uniqueId(),
    title: `${getSubject().name} practice`,
    subject: state.subjectId,
    grade: state.grade,
    createdAt: new Date().toISOString()
  };
  await putOne("assignments", assignment);
  toast("Assignment created on this device.");
}

function applyPreferences() {
  const prefs = JSON.parse(localStorage.getItem("platformPrefs") || "{}");
  document.body.classList.toggle("dark", !!prefs.dark);
  document.body.classList.toggle("high-contrast", !!prefs.contrast);
  document.body.classList.toggle("dyslexia", !!prefs.dyslexia);
  document.documentElement.style.setProperty("--font-scale", prefs.fontScale || 1);
}

function savePrefs(prefs) {
  localStorage.setItem("platformPrefs", JSON.stringify(prefs));
  applyPreferences();
}

function adjustFont(delta) {
  const prefs = JSON.parse(localStorage.getItem("platformPrefs") || "{}");
  prefs.fontScale = Math.min(1.4, Math.max(0.9, Number(prefs.fontScale || 1) + delta));
  savePrefs(prefs);
}

document.addEventListener("click", (event) => {
  const avatar = event.target.closest("[data-avatar]");
  if (avatar) {
    document.querySelectorAll("[data-avatar]").forEach((item) => item.classList.remove("selected"));
    avatar.classList.add("selected");
  }
  const pref = event.target.closest("[data-pref]");
  if (pref) {
    const prefs = JSON.parse(localStorage.getItem("platformPrefs") || "{}");
    prefs[pref.dataset.pref] = !prefs[pref.dataset.pref];
    savePrefs(prefs);
    render();
  }
});

function getSubject() {
  return SUBJECTS.find((subject) => subject.id === state.subjectId) || SUBJECTS[0];
}

function getGradeData() {
  return gradeDataForSubject();
}

function getTopics() {
  return topicsForTerm();
}

function getTopic() {
  return getTopics()[state.topicIndex] || getTopics()[0];
}

function subjectReports() {
  return SUBJECTS.map((subject) => {
    const lessons = subjectLessonCount(subject.id);
    return {
      ...subject,
      lessons,
      strength: lessons >= 3 ? "strong" : lessons >= 1 ? "growing" : "not started",
      focus: lessons >= 3 ? "quizzes" : "lessons"
    };
  });
}

function flatten(groups) {
  return groups.reduce((items, group) => items.concat(group || []), []);
}

function uniqueId() {
  if (window.crypto && window.crypto.randomUUID) return window.crypto.randomUUID();
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function studentName() {
  return state.student && state.student.name;
}

function screenText() {
  const element = document.querySelector("main, section");
  return element ? element.innerText : "3D Shapes Adventure";
}

function selectedAvatar() {
  const selected = document.querySelector(".avatar-option.selected");
  return selected ? selected.dataset.avatar : avatars[0];
}

function firstWritingTarget() {
  const first = writingTargets()[0];
  return first ? first.value : "A";
}

function subjectLessonCount(subjectId) {
  const stats = state.progress && state.progress.subjectStats ? state.progress.subjectStats[subjectId] : null;
  return stats ? stats.lessons || 0 : 0;
}

function gradeDataForSubject() {
  const subject = curriculum.find((item) => item.id === state.subjectId) || curriculum[0];
  return subject.grades.find((grade) => grade.grade === state.grade) || curriculum[0].grades[0];
}

function topicsForTerm() {
  const term = getGradeData().terms.find((item) => item.term === state.term);
  return term ? term.topics : [];
}

function finalExamTopics() {
  const rows = [];
  curriculum.forEach((subject) => {
    subject.grades
      .filter((grade) => grade.grade === state.grade)
      .forEach((grade) => {
        grade.terms.forEach((term) => {
          term.topics.forEach((topic) => rows.push({ subject, topic }));
        });
      });
  });
  return rows;
}

function bestScore() {
  const best = state.progress.quizzesTaken.reduce((max, quiz) => Math.max(max, quiz.percent || 0), 0);
  return best || percent(state.progress.lessonsCompleted.length, 10);
}

function toast(message) {
  const host = byId("toastHost");
  if (!host) return;
  host.innerHTML = `<div class="toast">${message}</div>`;
  setTimeout(() => { host.innerHTML = ""; }, 2600);
}

window.addEventListener("beforeunload", async () => {
  if (!state.progress) return;
  state.progress.timeSpentSeconds += Math.round((Date.now() - state.startTime) / 1000);
  await putOne("progress", state.progress);
});


