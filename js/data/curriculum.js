export const GRADES = ["Basic 1", "Basic 2", "Basic 3", "Basic 4", "Basic 5", "Basic 6"];

export const SUBJECTS = [
  { id: "math", name: "Mathematics", icon: "🔢", color: "#2864d9" },
  { id: "english", name: "English Language", icon: "📚", color: "#ef3340" },
  { id: "science", name: "Science", icon: "🔬", color: "#009739" },
  { id: "computing", name: "Computing", icon: "💻", color: "#7c4dff" },
  { id: "owop", name: "OWOP", fullName: "Our World and Our People", icon: "🌍", color: "#35c7ff" },
  { id: "rme", name: "RME", fullName: "Religious and Moral Education", icon: "🙏", color: "#f59f00" },
  { id: "creative", name: "Creative Arts", icon: "🎨", color: "#e83e8c" },
  { id: "history", name: "History", icon: "🏛️", color: "#795548" },
  { id: "pe", name: "Physical Education", icon: "🏃", color: "#00a86b" },
  { id: "ghanaian", name: "Ghanaian Language", icon: "🗣️", color: "#ff6b35" }
];

const baseLessons = {
  math: [
    lesson("math-counting", "Counting 1 to 20", "🧮", "Numbers help us know how many things we have.", ["Count objects one by one", "Read numbers from 1 to 20", "Write numbers neatly"], ["Bottle tops", "Fingers", "Classroom chairs"], "Count 10 bottle tops. Touch each one as you say the number."),
    lesson("math-addition", "Addition", "➕", "Addition means putting groups together to find how many in all.", ["Use objects to add", "Read plus signs", "Solve small sums"], ["2 mangoes + 1 mango", "3 pencils + 2 pencils"], "Put 3 beans down. Add 2 more. Count all the beans."),
    lesson("math-subtraction", "Subtraction", "➖", "Subtraction means taking away from a group.", ["Take away objects", "Read minus signs", "Find what is left"], ["5 sweets take away 2", "7 balls take away 1"], "Place 6 stones down. Take 2 away. Count what is left."),
    lesson("math-money", "Ghana Money", "₵", "Money helps us buy and sell things in Ghana.", ["Name coins and notes", "Compare more and less money", "Pretend to buy safely"], ["Ghana cedi", "Pesewas", "Market"], "Pretend to buy an orange. Count the coins with an adult."),
    lesson("math-time", "Time", "🕘", "Time tells us when things happen.", ["Morning and afternoon", "Today and tomorrow", "Read simple clock times"], ["Wake up time", "School time", "Bedtime"], "Say three things you do in the morning."),
    lesson("math-geometry", "2D and 3D Shapes", "🔷", "Shapes are all around us. Some are flat and some are solid.", ["Name circles and squares", "Name cubes and spheres", "Sort objects by shape"], ["Ball", "Dice", "Book"], "Find one circle, one square, and one cube at home.")
  ],
  english: [
    lesson("eng-alphabet", "Alphabet", "🔤", "Letters are the building blocks of words.", ["Say letter names", "Say letter sounds", "Match letters to pictures"], ["A for apple", "B for ball", "C for cup"], "Sing the alphabet song slowly."),
    lesson("eng-phonics", "Phonics", "🗣️", "Phonics helps us hear sounds in words.", ["Hear beginning sounds", "Blend sounds", "Read simple words"], ["b-a-t makes bat", "c-a-t makes cat"], "Say the first sound in sun, mat, cup, and ball."),
    lesson("eng-sight", "Sight Words", "👀", "Sight words are words we read quickly.", ["Read common words", "Use words in sentences", "Point to words in a story"], ["I", "am", "the", "see", "my"], "Read: I am Sam. I see my bag."),
    lesson("eng-writing", "Handwriting", "✍️", "Good handwriting helps others read our ideas.", ["Hold pencil well", "Trace letters", "Write simple sentences"], ["My name is Ama.", "I see a dog."], "Write your name three times."),
    lesson("eng-story", "Story Time", "📖", "Stories help us listen, imagine, and speak.", ["Listen carefully", "Answer who and what", "Retell the story"], ["Anansi stories", "Family stories"], "Tell what happened first, next, and last in a short story.")
  ],
  science: [
    lesson("sci-plants", "Plants", "🌱", "Plants are living things. They need water, air, sunlight, and soil.", ["Name plant parts", "Care for plants", "Observe growth"], ["Leaves", "Roots", "Flowers"], "Look at a plant and point to the leaves."),
    lesson("sci-animals", "Animals", "🐘", "Animals are living things that move, eat, and grow.", ["Name common animals", "Group animals", "Care for animals"], ["Goat", "Hen", "Fish"], "Name three animals you see in Ghana."),
    lesson("sci-body", "Human Body", "🙋", "Our body has many parts that help us move and learn.", ["Name body parts", "Keep clean", "Eat healthy food"], ["Eyes", "Hands", "Legs"], "Point to your head, shoulders, knees, and toes."),
    lesson("sci-weather", "Weather", "☀️", "Weather tells us how the sky and air feel today.", ["Sunny", "Rainy", "Windy"], ["Umbrella", "Sun hat", "Clouds"], "Look outside and say today's weather."),
    lesson("sci-solar", "Sun, Moon and Stars", "🌙", "We see the sun in the day and the moon and stars at night.", ["Day and night", "Sun safety", "Observe the sky"], ["Sun", "Moon", "Stars"], "Say one thing you do in the day and one at night.")
  ],
  computing: [
    lesson("comp-parts", "Parts of a Computer", "🖥️", "Computers help us learn, draw, type, and solve problems.", ["Name the screen", "Name the keyboard", "Use a mouse or touch"], ["Tablet", "Laptop", "Keyboard"], "Point to the screen and keyboard."),
    lesson("comp-safety", "Technology Safety", "🛡️", "We use devices safely and ask adults for help.", ["Take screen breaks", "Do not share private information", "Care for devices"], ["Password", "Adult help", "Clean hands"], "Say one rule for using a tablet safely."),
    lesson("comp-drawing", "Digital Drawing", "🎨", "We can use technology to draw and create.", ["Choose colours", "Draw shapes", "Save with help"], ["Circle", "Square", "House"], "Draw a circle and colour it.")
  ],
  owop: [
    lesson("owop-myself", "Myself", "😊", "Every child is special and has a name, family, and home.", ["Say your name", "Name family members", "Know your school"], ["Name", "Age", "Class"], "Say your full name and your class."),
    lesson("owop-community", "My Community", "🏘️", "A community is where people live, work, help, and learn together.", ["Name community helpers", "Follow rules", "Keep places clean"], ["Teacher", "Nurse", "Farmer"], "Name two people who help in your community."),
    lesson("owop-ghana", "Our Nation Ghana", "🇬🇭", "Ghana is our country. We show respect and care for it.", ["Know the flag", "Respect leaders", "Be a good citizen"], ["Red", "Gold", "Green", "Black star"], "Say the colours of the Ghana flag.")
  ],
  rme: [
    lesson("rme-creation", "God and Creation", "🌈", "Many people believe God created the world and we should care for it.", ["Be thankful", "Care for plants", "Care for people"], ["Water", "Trees", "Family"], "Say one thing you are thankful for."),
    lesson("rme-manners", "Good Manners", "🤝", "Good manners help us live peacefully with others.", ["Greet elders", "Say please", "Say thank you"], ["Good morning", "Please", "Thank you"], "Greet someone politely today."),
    lesson("rme-values", "Good Values", "💛", "Values guide us to make good choices.", ["Tell the truth", "Share", "Help others"], ["Honesty", "Kindness", "Respect"], "Name one kind thing you can do.")
  ],
  creative: [
    lesson("art-lines", "Lines and Colours", "🖍️", "Artists use lines and colours to make pictures.", ["Draw straight lines", "Draw curved lines", "Choose colours"], ["Red", "Yellow", "Green"], "Draw your home using lines."),
    lesson("art-music", "Music and Rhythm", "🥁", "Music has sounds, beats, and rhythm.", ["Sing", "Clap beats", "Listen carefully"], ["Drum", "Bell", "Song"], "Clap: clap, clap, pause."),
    lesson("art-drama", "Drama and Dance", "🎭", "Drama and dance help us tell stories with our body and voice.", ["Move safely", "Act a story", "Use expression"], ["Smile", "Jump", "Freeze"], "Act like you are going to school.")
  ],
  history: [
    lesson("hist-me", "My History", "🧒", "History tells us about the past.", ["Say your birthday", "Talk about family", "Use yesterday and today"], ["Baby photo", "Family story"], "Ask an adult about when you were a baby."),
    lesson("hist-symbols", "Ghana Symbols", "⭐", "National symbols help us know and love Ghana.", ["Flag", "Coat of arms", "National anthem"], ["Black star", "Eagle", "Shield"], "Draw the Ghana flag."),
    lesson("hist-heroes", "Ghanaian Heroes", "🏅", "Heroes are people who helped Ghana and others.", ["Listen to stories", "Respect leaders", "Learn from courage"], ["Kwame Nkrumah", "Yaa Asantewaa"], "Say one good thing a hero can do.")
  ],
  pe: [
    lesson("pe-move", "Moving My Body", "🏃", "Exercise helps our bodies grow strong.", ["Run safely", "Jump", "Hop"], ["Playground", "Field", "Home"], "Do five safe jumps."),
    lesson("pe-ball", "Ball Skills", "⚽", "Ball games help our hands, eyes, and feet work together.", ["Throw", "Catch", "Kick"], ["Football", "Soft ball"], "Throw and catch a soft ball five times."),
    lesson("pe-team", "Fair Play", "🤝", "Fair play means following rules and respecting others.", ["Take turns", "Share", "Encourage friends"], ["Team", "Rules", "Respect"], "Say 'well done' to someone.")
  ],
  ghanaian: [
    lesson("ghan-greetings", "Greetings", "👋", "Greetings show respect in Ghanaian languages.", ["Greet in the morning", "Greet elders", "Respond politely"], ["Maakye", "Good morning", "Medase"], "Practise a greeting with an adult."),
    lesson("ghan-family", "Family Words", "👨‍👩‍👧", "Local language helps us talk about people at home.", ["Mother", "Father", "Sibling"], ["Maame", "Paapa", "Nua"], "Name three family members in a Ghanaian language."),
    lesson("ghan-songs", "Songs and Rhymes", "🎶", "Songs help us remember language and culture.", ["Sing", "Clap", "Repeat words"], ["Local rhyme", "Festival song"], "Sing one short local song.")
  ]
};

export const shapeLessons = [
  lesson("shape-cube", "Cube", "🎲", "A cube has six square faces. All sides are the same size.", ["6 faces", "12 edges", "8 corners"], ["Dice", "Block", "Gift box"], "Find a cube at home."),
  lesson("shape-cuboid", "Cuboid", "📦", "A cuboid is like a stretched cube. Its faces are rectangles.", ["6 faces", "12 edges", "8 corners"], ["Matchbox", "Book", "Brick"], "Find a box and touch its faces."),
  lesson("shape-cylinder", "Cylinder", "🥫", "A cylinder has two flat circle faces and one curved surface.", ["3 surfaces", "2 edges", "0 corners"], ["Tin of milk", "Can", "Drum"], "Roll a safe can gently."),
  lesson("shape-cone", "Cone", "🍦", "A cone has a circle face and one point.", ["2 surfaces", "1 edge", "1 point"], ["Ice cream cone", "Party hat", "Traffic cone"], "Point to the top of a cone."),
  lesson("shape-sphere", "Sphere", "⚽", "A sphere is round like a ball. It has no corners.", ["1 curved surface", "0 edges", "0 corners"], ["Ball", "Orange", "Watermelon"], "Roll a ball and say sphere."),
  lesson("shape-pyramid", "Pyramid", "🔺", "A pyramid has a base and triangle faces that meet at a point.", ["5 faces", "8 edges", "5 corners"], ["Egyptian pyramid", "Tent roof"], "Draw a triangle face.")
];

function buildTopics(subject, gradeIndex, term) {
  const seed = baseLessons[subject.id] || [];
  return seed.map((item, index) => ({
    id: `${subject.id}-b${gradeIndex + 1}-t${term}-${index + 1}`,
    title: term === 1 ? item.title : `${item.title} Practice ${term}`,
    visual: item.visual,
    summary: gradeIndex === 0 ? item.summary : `${item.summary} In ${GRADES[gradeIndex]}, we use bigger examples and more practice.`,
    lessons: makeLessonSequence(subject, item, gradeIndex, term),
    quiz: makeTopicQuiz(subject, item, gradeIndex),
    worksheet: makeWorksheet(subject, item, gradeIndex)
  }));
}

function lesson(id, title, visual, summary, points, examples, activity) {
  return { id, title, visual, summary, points, examples, activity };
}

function makeLessonSequence(subject, item, gradeIndex, term) {
  const baseTeaching = makeTeacherLesson(subject, item, gradeIndex, term);
  const phases = [
    {
      id: "understand",
      title: item.title,
      label: "Understand",
      summary: item.summary,
      objective: baseTeaching.objective,
      warmUp: baseTeaching.warmUp,
      teacherTalk: baseTeaching.teacherTalk,
      guidedPractice: baseTeaching.guidedPractice,
      independentPractice: baseTeaching.independentPractice
    },
    {
      id: "examples",
      title: `${item.title}: Examples`,
      label: "Examples",
      summary: `Learn ${item.title.toLowerCase()} with clear teacher examples from home, school, and Ghanaian daily life.`,
      objective: `I can follow worked examples for ${item.title.toLowerCase()} and explain each step.`,
      warmUp: `Review the key words: ${baseTeaching.keyWords.slice(0, 4).join(", ")}.`,
      teacherTalk: `A good learner does not only remember the answer. A good learner explains the steps. Watch the examples, say each step aloud, then try a similar one.`,
      guidedPractice: [
        ...(baseTeaching.guidedPractice || []),
        `Teacher asks: Why is this example connected to ${item.title}?`,
        "Child answers in a full sentence."
      ],
      independentPractice: [
        `Child chooses one new real-life example of ${item.title}.`,
        "Child explains it using at least two key words.",
        "Child draws or acts out the example."
      ]
    },
    {
      id: "mastery",
      title: `${item.title}: Practice`,
      label: "Practice",
      summary: `Practise ${item.title.toLowerCase()} until the child can answer, explain, and use it alone.`,
      objective: `I can answer questions about ${item.title.toLowerCase()} without help and correct my mistakes.`,
      warmUp: "Start with one quick oral question from the last lesson.",
      teacherTalk: `Now we practise like exam preparation. Read carefully, use real objects or drawings, answer, then check. Mistakes are part of learning when we correct them.`,
      guidedPractice: [
        `Do two practice questions about ${item.title} together.`,
        "Teacher asks the child to explain the answer.",
        "Teacher corrects gently and repeats the key idea."
      ],
      independentPractice: [
        ...(baseTeaching.independentPractice || []),
        `Child answers three quick questions about ${item.title}.`,
        "Child teaches the idea back to an adult."
      ]
    }
  ];

  return phases.map((phase) => ({
    ...item,
    id: `${item.id}-b${gradeIndex + 1}-t${term}-${phase.id}`,
    title: phase.title,
    summary: phase.summary,
    phase: phase.label,
    level: gradeIndex + 1,
    term,
    subject: subject.id,
    teaching: {
      ...baseTeaching,
      objective: phase.objective,
      warmUp: phase.warmUp,
      teacherTalk: phase.teacherTalk,
      guidedPractice: phase.guidedPractice,
      independentPractice: phase.independentPractice
    }
  }));
}

function makeTopicQuiz(subject, item, gradeIndex) {
  const teaching = makeTeacherLesson(subject, item, gradeIndex, 1);
  const checks = teaching.checks || [];
  const options = [item.title, ...SUBJECTS.filter((entry) => entry.id !== subject.id).slice(0, 3).map((entry) => entry.name)];
  const baseQuestions = [
    {
      id: `${item.id}-q1-b${gradeIndex + 1}`,
      question: `Which lesson are we learning?`,
      answer: item.title,
      choices: makeChoices(item.title, options)
    },
    {
      id: `${item.id}-q2-b${gradeIndex + 1}`,
      question: `Which example belongs to ${item.title}?`,
      answer: item.examples[0],
      choices: makeChoices(item.examples[0], ["Moon car", "Invisible box", "Flying chair"])
    },
    ...checks.map((check, index) => ({
      id: `${item.id}-teacher-check-${index + 1}-b${gradeIndex + 1}`,
      question: check.q,
      answer: check.a,
      choices: makeChoices(check.a, check.choices || genericWrongAnswers(check.a))
    }))
  ];
  return expandTopicQuestions(subject, item, teaching, gradeIndex, baseQuestions);
}

function expandTopicQuestions(subject, item, teaching, gradeIndex, baseQuestions) {
  const questions = [...baseQuestions];
  const add = (id, question, answer, distractors) => {
    if (!answer) return;
    questions.push({
      id: `${item.id}-${id}-b${gradeIndex + 1}`,
      question,
      answer: String(answer),
      choices: makeChoices(String(answer), distractors)
    });
  };

  item.points.forEach((point, index) => {
    add(`point-${index + 1}`, `Which statement is true for ${item.title}?`, point, genericDistractors(subject, item));
    add(`point-meaning-${index + 1}`, `In this lesson, what should the learner practise?`, point, ["Run outside without listening", "Close the book", "Skip the example"]);
  });

  item.examples.forEach((example, index) => {
    add(`example-${index + 1}`, `Which real-life example helps us learn ${item.title}?`, example, genericDistractors(subject, item));
    add(`example-use-${index + 1}`, `Where can a child find or use ${example}?`, "home or school", ["under the sea only", "inside the sun", "nowhere"]);
  });

  (teaching.keyWords || []).slice(0, 6).forEach((word, index) => {
    add(`keyword-${index + 1}`, `Which key word belongs to ${item.title}?`, word, genericDistractors(subject, item));
  });

  (teaching.guidedPractice || []).slice(0, 4).forEach((task, index) => {
    add(`guided-${index + 1}`, `Which activity should teacher and child do together?`, task, ["Ignore the lesson", "Guess without checking", "Stop learning"]);
  });

  (teaching.independentPractice || []).slice(0, 4).forEach((task, index) => {
    add(`independent-${index + 1}`, `Which activity can the child try alone?`, task, ["Wait without trying", "Hide the materials", "Only press buttons"]);
  });

  add("objective", `What is the main goal of ${item.title}?`, teaching.objective, genericDistractors(subject, item));
  add("mistake", `What teacher tip helps with ${item.title}?`, teaching.commonMistake, genericDistractors(subject, item));
  add("home-link", `What is a good home practice for ${item.title}?`, teaching.homeLink, genericDistractors(subject, item));
  add("subject", `Which subject does ${item.title} belong to?`, subject.name, SUBJECTS.filter((entry) => entry.id !== subject.id).map((entry) => entry.name));

  return questions.slice(0, 36);
}

function makeChoices(answer, distractors = []) {
  const choices = [String(answer), ...distractors.map(String)].filter(Boolean);
  const unique = [...new Set(choices)];
  while (unique.length < 4) {
    unique.push(genericWrongAnswers(answer)[unique.length % genericWrongAnswers(answer).length] || `Choice ${unique.length + 1}`);
  }
  return shuffle(unique.slice(0, 4));
}

function genericDistractors(subject, item) {
  return [
    "A different topic",
    "Play only with no learning",
    "Do not listen to the teacher",
    ...SUBJECTS.filter((entry) => entry.id !== subject.id).map((entry) => entry.name),
    ...item.examples.slice(1)
  ];
}

function makeWorksheet(subject, item, gradeIndex) {
  const teaching = makeTeacherLesson(subject, item, gradeIndex, 1);
  return {
    title: `${item.title} Worksheet`,
    instructions: "Read each question. Write or say your answer.",
    questions: [
      `1. Draw or point to: ${item.examples[0] || item.title}`,
      `2. Say one thing about ${item.title}.`,
      `3. Complete: I can learn ${item.title} in ${subject.name}.`,
      `4. Guided practice: ${teaching.guidedPractice?.[0] || item.activity}`,
      `5. Independent practice: ${teaching.independentPractice?.[0] || item.activity}`,
      `6. Quick check: ${teaching.checks?.[0]?.q || "What did you learn today?"}`
    ],
    answers: [
      "Drawing or pointing answer",
      item.summary,
      subject.name,
      teaching.guidedPractice?.[0] || item.activity,
      teaching.independentPractice?.[0] || item.activity,
      teaching.checks?.[0]?.a || "Parent observation"
    ],
    level: gradeIndex + 1
  };
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function genericWrongAnswers(answer) {
  if (/^\d+$/.test(String(answer))) return ["0", "1", "10"].filter((item) => item !== String(answer));
  return ["Not yet", "A different answer", "I do not know"].filter((item) => item !== answer);
}

function makeTeacherLesson(subject, item, gradeIndex, term) {
  const key = `${subject.id}:${item.title}`;
  const template = subjectTemplates[subject.id]?.(item) || {};
  const specific = { ...template, ...(teacherLessons[key] || {}) };
  const levelNote = gradeIndex === 0
    ? "Basic 1 focus: use real objects, oral language, pictures, tracing, and short answers."
    : `Basic ${gradeIndex + 1} focus: revise the idea, then use bigger examples and more independent work.`;

  return {
    objective: specific.objective || `By the end of this lesson, the learner can explain ${item.title.toLowerCase()} and give one example from daily life.`,
    keyWords: specific.keyWords || [item.title, ...item.points.slice(0, 3)],
    warmUp: specific.warmUp || `Look around the room. Find something connected to ${item.title.toLowerCase()} and say its name.`,
    teacherTalk: specific.teacherTalk || `${item.summary} We learn it with our eyes, our hands, and our voice. First we look at examples, then we practise together, then the learner tries alone.`,
    workedExamples: specific.workedExamples || [
      {
        title: "Teacher example",
        steps: [`Show ${item.examples[0] || item.title}.`, `Say: This is connected to ${item.title}.`, `Ask the learner to repeat the key word.`]
      }
    ],
    guidedPractice: specific.guidedPractice || [`Do this together: ${item.activity}`, "Let the child answer aloud before writing."],
    independentPractice: specific.independentPractice || [`Now the child tries alone: ${item.activity}`, `Ask the child to give a new example of ${item.title}.`],
    commonMistake: specific.commonMistake || `Some children repeat the word without understanding it. Ask them to point, touch, draw, or act it out.`,
    materials: specific.materials || lessonMaterials(subject, item),
    explainMore: specific.explainMore || deepExplanation(subject, item, gradeIndex),
    practicalExamples: specific.practicalExamples || practicalExamples(subject, item),
    selfStudySteps: specific.selfStudySteps || selfStudySteps(subject, item),
    successCriteria: specific.successCriteria || successCriteria(subject, item),
    challenge: specific.challenge || challengeTask(subject, item),
    reflection: specific.reflection || `Say one thing you understand about ${item.title}, one example you can find around you, and one question you still have.`,
    checks: specific.checks || [
      { q: `What are we learning today?`, a: item.title, choices: [subject.name, "Play time", "Lunch"] },
      { q: `Name one example of ${item.title}.`, a: item.examples[0] || item.title, choices: ["Moon car", "Invisible box", "Flying chair"] }
    ],
    homeLink: specific.homeLink || `At home, ask the child to show one example of ${item.title.toLowerCase()} and explain it in one sentence.`,
    levelNote,
    syllabusLink: `${subject.name}, ${item.title}, ${GRADES[gradeIndex]}, Term ${term}`
  };
}

function lessonMaterials(subject, item) {
  const shared = ["pencil", "exercise book", "one quiet place to learn"];
  const materials = {
    math: ["bottle tops or stones", "fingers", "number cards", "small objects to count"],
    english: ["letter cards", "picture cards", "reader or story book", "pencil for tracing"],
    science: ["safe real object to observe", "drawing paper", "water or leaves when needed"],
    computing: ["phone, tablet, or keyboard with adult permission", "paper keyboard drawing"],
    owop: ["family photo or drawing", "school/community examples", "Ghana flag picture when needed"],
    rme: ["short everyday story", "role-play situation", "kindness action chart"],
    creative: ["crayons", "paper", "safe local materials", "clapping rhythm"],
    history: ["family story", "old and new object", "Ghana symbol picture"],
    pe: ["open safe space", "soft ball or rolled socks", "water for rest"],
    ghanaian: ["family member or adult speaker", "local song or greeting", "word cards"]
  };
  return [...(materials[subject.id] || []), ...shared, ...item.examples.slice(0, 2)];
}

function deepExplanation(subject, item, gradeIndex) {
  const level = GRADES[gradeIndex];
  return `${item.title} is part of ${subject.name} for ${level}. First, learn the meaning in simple words. Next, look at real examples from home, school, the market, the community, or Ghanaian daily life. Then practise by saying, touching, drawing, acting, counting, reading, or writing. A child has really learnt ${item.title.toLowerCase()} when they can explain it without copying, give their own example, and answer a new question about it.`;
}

function practicalExamples(subject, item) {
  return [
    `Home example: use ${item.examples[0] || item.title.toLowerCase()} or something similar at home to explain the lesson.`,
    `School example: connect the lesson to the classroom, exercise book, friends, teacher, or school compound.`,
    `Ghana example: talk about how this appears in Ghanaian homes, markets, churches, mosques, farms, festivals, transport, or community life.`,
    `Picture example: draw a simple picture that shows ${item.title.toLowerCase()}, then explain the drawing aloud.`
  ];
}

function selfStudySteps(subject, item) {
  return [
    `Read the lesson title aloud: ${item.title}.`,
    `Say the meaning in your own words: ${item.summary}`,
    `Look at the examples: ${item.examples.join(", ")}.`,
    "Point to, draw, count, act, read, or write one example by yourself.",
    "Cover the answer, ask yourself a quick-check question, then open it to check.",
    "Teach the idea to an adult or sibling in one full sentence."
  ];
}

function successCriteria(subject, item) {
  return [
    `I can say what ${item.title} means.`,
    `I can give two real examples of ${item.title}.`,
    "I can answer quick-check questions without guessing.",
    "I can correct one mistake after checking my work."
  ];
}

function challengeTask(subject, item) {
  const challenges = {
    math: `Make your own ${item.title.toLowerCase()} question with bottle tops, stones, or fingers. Solve it and explain the answer.`,
    english: `Use ${item.examples[0] || item.title} in a clear sentence, then read the sentence aloud three times.`,
    science: `Observe one real object connected to ${item.title.toLowerCase()}. Draw it and say two facts about it.`,
    computing: `Explain one safe way to use technology while learning ${item.title.toLowerCase()}.`,
    owop: `Tell one real story from home, school, or community that connects to ${item.title.toLowerCase()}.`,
    rme: `Act out one good choice connected to ${item.title.toLowerCase()}, then say why it is good.`,
    creative: `Create a drawing, rhythm, song, or movement that shows ${item.title.toLowerCase()}.`,
    history: `Ask an adult one question about the past connected to ${item.title.toLowerCase()}.`,
    pe: `Practise the movement safely five times, rest, then explain one safety rule.`,
    ghanaian: `Say one word or greeting connected to ${item.title.toLowerCase()} to an adult and ask for correction.`
  };
  return challenges[subject.id] || `Create one new example of ${item.title.toLowerCase()} and explain it.`;
}

const teacherLessons = {
  "math:Counting 1 to 20": {
    objective: "The learner can count objects from 1 to 20, touching one object for each number, without skipping or counting twice.",
    keyWords: ["count", "number", "one more", "how many", "altogether"],
    warmUp: "Teacher says: Clap with me. Clap 1, clap 2, clap 3. Now count your fingers from 1 to 10.",
    teacherTalk: "Counting means saying numbers in order to find how many things are in a group. We count one object one time. In Ghana, we can count bottle tops, mangoes, pencils, stones, or chairs.",
    workedExamples: [
      { title: "Count bottle tops", steps: ["Put 5 bottle tops on the table.", "Touch the first one and say 1.", "Touch the next one and say 2.", "Continue until 5.", "Say: There are 5 bottle tops."] },
      { title: "Count pupils", steps: ["Point to each child once.", "Say the numbers slowly.", "Stop when every child has been counted.", "Say the total aloud."] }
    ],
    guidedPractice: ["Count 8 pencils together. Move each pencil as it is counted.", "Count 12 claps together. Clap once for each number."],
    independentPractice: ["Child counts 10 bottle tops alone.", "Child draws 6 circles and counts them.", "Child says which group has more: 7 stones or 4 stones."],
    commonMistake: "Children may touch one object twice or skip an object. Fix it by moving each counted object to a new place.",
    checks: [
      { q: "What number comes after 9?", a: "10", choices: ["7", "8", "11"] },
      { q: "If you count 5 mangoes, how many mangoes are there?", a: "5", choices: ["2", "10", "20"] },
      { q: "When counting objects, how many times do we count each object?", a: "one time", choices: ["two times", "many times", "no time"] }
    ],
    homeLink: "At home, count spoons, slippers, or oranges. Touch each object once."
  },
  "math:Addition": {
    objective: "The learner can add two small groups using objects and say the total.",
    keyWords: ["add", "plus", "altogether", "total", "more"],
    warmUp: "Show 2 fingers on one hand and 1 finger on the other hand. Ask: How many fingers altogether?",
    teacherTalk: "Addition means putting groups together. The plus sign means add. We can add with fingers, stones, bottle tops, beans, pencils, or mangoes.",
    workedExamples: [
      { title: "2 mangoes plus 1 mango", steps: ["Draw 2 mangoes.", "Draw 1 more mango.", "Count all the mangoes: 1, 2, 3.", "Say: 2 plus 1 equals 3."] },
      { title: "3 pencils plus 2 pencils", steps: ["Put 3 pencils in one group.", "Put 2 pencils in another group.", "Push the groups together.", "Count all: 1, 2, 3, 4, 5."] }
    ],
    guidedPractice: ["Use 4 bottle tops and add 1 more. Count all.", "Use 2 stones and add 3 stones. Count all."],
    independentPractice: ["Solve 1 + 2 with fingers.", "Solve 3 + 3 with bottle tops.", "Draw 4 balls and 2 balls. Count all."],
    commonMistake: "Some children count only the second group. Remind them: addition asks for all the objects together.",
    checks: [
      { q: "What does plus mean?", a: "add", choices: ["take away", "hide", "sleep"] },
      { q: "2 + 1 equals what?", a: "3", choices: ["1", "2", "4"] },
      { q: "When we add, do we get more or less?", a: "more", choices: ["less", "nothing", "same always"] }
    ],
    homeLink: "At home, add cups, spoons, or toys in two small groups."
  },
  "math:Subtraction": {
    objective: "The learner can take away from a small group and say how many are left.",
    keyWords: ["subtract", "minus", "take away", "left", "remain"],
    warmUp: "Hold up 5 fingers. Fold down 2 fingers. Ask: How many fingers are still up?",
    teacherTalk: "Subtraction means taking away. The minus sign tells us to remove some. After removing, we count what is left.",
    workedExamples: [
      { title: "5 sweets take away 2", steps: ["Put 5 counters down.", "Take away 2 counters.", "Count what remains: 1, 2, 3.", "Say: 5 minus 2 equals 3."] },
      { title: "7 balls take away 1", steps: ["Draw 7 balls.", "Cross out 1 ball.", "Count the balls not crossed out.", "Say the answer."] }
    ],
    guidedPractice: ["Use 6 beans. Take away 1. Count what is left.", "Use 4 pencils. Take away 2. Count what is left."],
    independentPractice: ["Solve 3 - 1.", "Solve 5 - 3.", "Draw 6 oranges and cross out 2."],
    commonMistake: "Some children count the objects taken away instead of the objects left. Ask: What remains?",
    checks: [
      { q: "What does minus mean?", a: "take away", choices: ["add", "join", "make bigger"] },
      { q: "5 - 2 equals what?", a: "3", choices: ["2", "5", "7"] },
      { q: "After subtraction, do we count what is left or what is gone?", a: "what is left", choices: ["what is gone", "the table", "nothing"] }
    ]
  },
  "english:Alphabet": {
    objective: "The learner can say letter names, identify letters, and connect some letters to beginning sounds.",
    keyWords: ["letter", "sound", "alphabet", "capital letter", "small letter"],
    warmUp: "Sing the alphabet song slowly. Stop at A, B, and C and let the child repeat.",
    teacherTalk: "The alphabet has letters. Letters help us build words. Each letter has a name and a sound. A can start apple, B can start ball, and C can start cup.",
    workedExamples: [
      { title: "Letter A", steps: ["Show A and a.", "Say the name: A.", "Say the sound: /a/ as in apple.", "Child traces A in the air."] },
      { title: "Letter B", steps: ["Show B and b.", "Say B.", "Say /b/ as in ball.", "Child finds something beginning with /b/."] }
    ],
    guidedPractice: ["Point to A, B, C on a page and say them together.", "Match A to apple, B to ball, C to cup."],
    independentPractice: ["Child traces A, B, C.", "Child says one word beginning with B.", "Child circles letter A in a short line of letters."],
    commonMistake: "Children may know the letter name but not the sound. Always practise name and sound together.",
    checks: [
      { q: "What letter starts apple?", a: "A", choices: ["B", "C", "D"] },
      { q: "What letter starts ball?", a: "B", choices: ["A", "C", "E"] },
      { q: "Letters help us make what?", a: "words", choices: ["shoes", "rain", "chairs"] }
    ]
  },
  "english:Phonics": {
    objective: "The learner can hear beginning sounds and blend simple sounds into words.",
    keyWords: ["sound", "blend", "beginning sound", "word"],
    warmUp: "Say: sun, soap, six. Ask: What sound do you hear first?",
    teacherTalk: "Phonics is learning the sounds in words. When we blend sounds, we put them together. /c/ /a/ /t/ becomes cat.",
    workedExamples: [
      { title: "Blend cat", steps: ["Say /c/.", "Say /a/.", "Say /t/.", "Slide the sounds together: cat."] },
      { title: "Blend mat", steps: ["Say /m/.", "Say /a/.", "Say /t/.", "Blend: mat."] }
    ],
    guidedPractice: ["Blend s-a-t together.", "Say the first sound in cup, ball, sun, fish."],
    independentPractice: ["Child blends c-a-t.", "Child blends b-a-t.", "Child names a word that begins with /m/."],
    commonMistake: "Some children say letter names instead of sounds. Use short sounds: /b/, not bee.",
    checks: [
      { q: "What word do /c/ /a/ /t/ make?", a: "cat", choices: ["cup", "mat", "sun"] },
      { q: "What is the first sound in ball?", a: "/b/", choices: ["/s/", "/m/", "/t/"] },
      { q: "Blending means what?", a: "putting sounds together", choices: ["jumping", "taking away", "colouring"] }
    ]
  },
  "science:Plants": {
    objective: "The learner can name parts of a plant and say what plants need to grow.",
    keyWords: ["plant", "root", "stem", "leaf", "water", "sunlight"],
    warmUp: "Show a real leaf or plant. Ask: Is this living or non-living?",
    teacherTalk: "A plant is a living thing. Many plants have roots, stems, leaves, flowers, and fruits. Plants need water, air, sunlight, and soil to grow.",
    workedExamples: [
      { title: "Look at a plant", steps: ["Point to the roots if visible.", "Point to the stem.", "Point to the leaves.", "Say what each part is called."] },
      { title: "What plants need", steps: ["Show dry soil and wet soil.", "Ask which one helps a plant.", "Talk about sunlight and air."] }
    ],
    guidedPractice: ["Together, draw a plant and label leaf, stem, root.", "Together, say three things plants need."],
    independentPractice: ["Child points to a leaf.", "Child draws a simple plant.", "Child says: Plants need water."],
    commonMistake: "Children may call every part a leaf. Use pointing and repeated names: root, stem, leaf.",
    checks: [
      { q: "What part of a plant is usually green and flat?", a: "leaf", choices: ["stone", "shoe", "cup"] },
      { q: "Name one thing plants need.", a: "water", choices: ["phone", "salt only", "plastic"] },
      { q: "Is a plant living?", a: "yes", choices: ["no", "only at night", "never"] }
    ]
  },
  "owop:Myself": {
    objective: "The learner can introduce themself and talk about their family, school, and home.",
    keyWords: ["name", "age", "family", "home", "school"],
    warmUp: "Teacher says: My name is ____. What is your name?",
    teacherTalk: "Every child is special. We all have names. We belong to families, homes, schools, and communities. Knowing yourself helps you speak confidently.",
    workedExamples: [
      { title: "Introduce yourself", steps: ["Say: My name is Kofi.", "Say: I am in Basic 1.", "Say: I live with my family.", "Child repeats using their own name."] }
    ],
    guidedPractice: ["Say your name, age, class, and school with help.", "Name two people in your family."],
    independentPractice: ["Child says: My name is ___.", "Child draws themself.", "Child names one thing they like."],
    commonMistake: "Some children answer with one word only. Model a full sentence: My name is Ama.",
    checks: [
      { q: "What do you say when someone asks your name?", a: "My name is...", choices: ["I sleep", "It is raining", "I run"] },
      { q: "Where do children learn with teachers?", a: "school", choices: ["sky", "river", "shoe"] },
      { q: "People at home are called what?", a: "family", choices: ["stones", "clouds", "cars"] }
    ]
  },
  "computing:Parts of a Computer": {
    objective: "The learner can name common computer parts and say what they do.",
    keyWords: ["computer", "screen", "keyboard", "mouse", "tablet"],
    warmUp: "Point to a phone, tablet, or laptop. Ask: What do we use this for?",
    teacherTalk: "A computer helps us learn, type, draw, watch lessons, and solve problems. A screen shows pictures and words. A keyboard helps us type. A mouse or touchpad helps us click.",
    workedExamples: [
      { title: "Name the parts", steps: ["Point to the screen.", "Point to the keyboard.", "Point to the mouse or touchpad.", "Say what each one does."] }
    ],
    guidedPractice: ["Touch the screen carefully.", "Press one letter key with help.", "Move the pointer with the mouse or touchpad."],
    independentPractice: ["Child points to the screen.", "Child says one safety rule.", "Child draws a computer."],
    commonMistake: "Children may call every device a phone. Teach device names: phone, tablet, laptop, desktop.",
    checks: [
      { q: "Which part shows pictures and words?", a: "screen", choices: ["shoe", "spoon", "stone"] },
      { q: "Which part helps us type letters?", a: "keyboard", choices: ["cup", "leaf", "ball"] },
      { q: "Should we ask an adult before using a device?", a: "yes", choices: ["no", "never", "only in rain"] }
    ]
  }
};

const subjectTemplates = {
  math: (item) => ({
    warmUp: `Use fingers, bottle tops, or stones to show ${item.title.toLowerCase()}. Ask: What do you notice?`,
    teacherTalk: `${item.summary} In Mathematics, we learn by touching objects, counting carefully, drawing pictures, and saying the answer in a full sentence.`,
    workedExamples: [
      { title: "Use real objects", steps: [`Put objects on the table for ${item.title}.`, "Move or touch each object carefully.", "Say what is happening.", "Write or say the answer."] },
      { title: "Draw it", steps: ["Draw small circles for the objects.", "Count or compare the circles.", "Say the answer aloud."] }
    ],
    guidedPractice: [`Do one ${item.title.toLowerCase()} question together with bottle tops.`, "Ask the learner to explain each step."],
    independentPractice: [`Give the learner one new ${item.title.toLowerCase()} question.`, "Let the learner solve, then explain the answer."],
    commonMistake: "Children may rush to answer without counting. Slow down, touch each object, and check again."
  }),
  english: (item) => ({
    warmUp: `Say the lesson title: ${item.title}. Clap the syllables or sounds you hear.`,
    teacherTalk: `${item.summary} In English, we listen first, say the word, read it, then write or use it in a sentence.`,
    workedExamples: [
      { title: "Listen and say", steps: ["Teacher says the word slowly.", "Child repeats clearly.", "Teacher uses it in a short sentence.", "Child tries a sentence."] },
      { title: "Read and write", steps: ["Point to the word or letter.", "Read it aloud.", "Trace or copy it.", "Read it again."] }
    ],
    guidedPractice: [`Read or say ${item.examples[0] || item.title} together.`, "Use the word in a short sentence."],
    independentPractice: ["Child says the word alone.", "Child copies or traces it.", "Child gives one example."],
    commonMistake: "Children may memorise without understanding. Ask them to use the word in a sentence or point to a picture."
  }),
  science: (item) => ({
    warmUp: `Observe something real connected to ${item.title.toLowerCase()}. Ask: What can you see?`,
    teacherTalk: `${item.summary} In Science, we observe, ask questions, touch safely, compare, and explain what we find.`,
    workedExamples: [
      { title: "Observe", steps: ["Look carefully.", "Name what you see.", "Say its colour, size, or use.", "Ask one question about it."] },
      { title: "Explain", steps: ["Use the lesson key words.", "Give one example from home or school.", "Say why it is important."] }
    ],
    guidedPractice: [`Observe ${item.examples[0] || item.title} together.`, "Name two things you notice."],
    independentPractice: ["Child draws what they observed.", "Child says one fact.", "Child asks one question."],
    commonMistake: "Children may guess instead of observing. Bring them back to what they can see, touch safely, hear, or compare."
  }),
  computing: (item) => ({
    warmUp: "Look at a phone, tablet, laptop, or desktop computer. Name what you can see.",
    teacherTalk: `${item.summary} In Computing, we learn what technology is, how to use it safely, and how it helps us learn.`,
    workedExamples: [
      { title: "Point and name", steps: ["Point to the device.", "Name the part or tool.", "Say what it does.", "Say one safety rule."] }
    ],
    guidedPractice: [`Practise ${item.title.toLowerCase()} with an adult nearby.`, "Say what you did and why it was safe."],
    independentPractice: ["Child points to a device part.", "Child says one use.", "Child says one safety rule."],
    commonMistake: "Children may tap randomly. Teach: look first, ask permission, then tap carefully."
  }),
  owop: (item) => ({
    warmUp: "Talk about home, school, family, community, or Ghana. Let the child answer from real life.",
    teacherTalk: `${item.summary} OWOP helps us understand ourselves, people around us, our environment, our values, and Ghana.`,
    workedExamples: [
      { title: "Connect to real life", steps: ["Teacher gives a Ghanaian example.", "Child gives a home or school example.", "Together, say why it matters."] }
    ],
    guidedPractice: [`Talk together about ${item.examples[0] || item.title}.`, "Use a full sentence."],
    independentPractice: ["Child draws an example.", "Child explains the drawing.", "Child says one good action to take."],
    commonMistake: "Children may give very short answers. Model: I can help my community by keeping it clean."
  }),
  rme: (item) => ({
    warmUp: "Ask: What good thing did you do today?",
    teacherTalk: `${item.summary} RME helps us learn respect, truthfulness, kindness, thankfulness, and peaceful living.`,
    workedExamples: [
      { title: "Good choice", steps: ["Tell a short everyday story.", "Ask what choice is good.", "Explain why the choice helps others."] }
    ],
    guidedPractice: [`Act out ${item.examples[0] || item.title} together.`, "Say the good value shown."],
    independentPractice: ["Child names one good value.", "Child says how to practise it today."],
    commonMistake: "Children may say the right word but not practise it. Ask for one real action they will do."
  }),
  creative: (item) => ({
    warmUp: "Look, listen, move, or draw for one minute. Ask: What can we create today?",
    teacherTalk: `${item.summary} Creative Arts helps us express ideas through drawing, colour, rhythm, movement, drama, and local culture.`,
    workedExamples: [
      { title: "Create step by step", steps: ["Teacher demonstrates one small step.", "Child copies the step.", "Teacher adds a second step.", "Child creates their own version."] }
    ],
    guidedPractice: [`Create ${item.examples[0] || item.title} together.`, "Talk about colour, sound, movement, or feeling."],
    independentPractice: ["Child creates alone.", "Child explains their work.", "Child appreciates another person's work."],
    commonMistake: "Children may fear mistakes. Remind them that art and performance improve with practice."
  }),
  history: (item) => ({
    warmUp: "Ask: Did this happen today, yesterday, or long ago?",
    teacherTalk: `${item.summary} History helps us learn about the past, family stories, Ghanaian symbols, leaders, heroes, and changes over time.`,
    workedExamples: [
      { title: "Past and present", steps: ["Show or describe something old.", "Show or describe something new.", "Say what changed.", "Say what stayed the same."] }
    ],
    guidedPractice: [`Talk together about ${item.examples[0] || item.title}.`, "Put events in order: first, next, last."],
    independentPractice: ["Child tells one family story.", "Child draws a Ghana symbol or past event."],
    commonMistake: "Children may mix past and present. Use words like yesterday, today, before, after, long ago."
  }),
  pe: (item) => ({
    warmUp: "Stretch gently, stand safely, and make space before moving.",
    teacherTalk: `${item.summary} Physical Education helps our body become strong, safe, balanced, and ready to learn.`,
    workedExamples: [
      { title: "Safe movement", steps: ["Teacher shows the movement slowly.", "Child copies slowly.", "Teacher checks space and balance.", "Child repeats with confidence."] }
    ],
    guidedPractice: [`Practise ${item.examples[0] || item.title} together safely.`, "Rest and drink water when needed."],
    independentPractice: ["Child repeats the movement five times.", "Child says one safety rule."],
    commonMistake: "Children may rush or bump into things. Teach slow first, then faster only when safe."
  }),
  ghanaian: (item) => ({
    warmUp: "Say a familiar greeting or song in the local language.",
    teacherTalk: `${item.summary} Ghanaian Language helps us greet, sing, tell stories, respect elders, and understand culture.`,
    workedExamples: [
      { title: "Listen and repeat", steps: ["Teacher says the word.", "Child repeats.", "Teacher uses it in a short phrase.", "Child tries with a family member."] }
    ],
    guidedPractice: [`Practise ${item.examples[0] || item.title} together.`, "Repeat with clear voice and respect."],
    independentPractice: ["Child says the word alone.", "Child uses it at home.", "Child teaches it to someone else."],
    commonMistake: "Children may feel shy speaking local language. Praise every attempt and repeat gently."
  })
};

export const curriculum = SUBJECTS.map((subject) => ({
  ...subject,
  grades: GRADES.map((grade, gradeIndex) => ({
    grade,
    terms: [1, 2, 3].map((term) => ({
      term,
      topics: buildTopics(subject, gradeIndex, term)
    }))
  }))
}));
