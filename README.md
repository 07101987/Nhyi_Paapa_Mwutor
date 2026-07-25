# Owrafix Learning App

An offline-first Ghana-focused educational platform for Basic 1 to Basic 6 learners. It combines 3D shape learning, Ghana curriculum lessons, profiles, rewards, dashboards, worksheets, certificates, and PWA install support.

## Features

- Student profiles with avatars, grades, learning history, XP, coins, gems, levels, streaks, and badges
- Ghana Basic 1-6 learning paths for Mathematics, English, Science, Computing, OWOP, RME, Creative Arts, History, PE, and Ghanaian Language
- Structured terms, topics, lessons, activities, quizzes, and worksheets
- 3D shape lessons, picture matching, memory games, and flash cards
- Reading system for alphabet, phonics, sight words, stories, pronunciation, and fluency
- Mathematics, science, and subject-specific curriculum data
- Parent dashboard with progress analytics, strengths, weaknesses, and printable reports
- Teacher dashboard with local class profile visibility and assignment creation
- Dynamic worksheet generator with answer sheets and print/PDF-ready layout
- Certificate studio with student name, subject, date, score, and QR-style verification
- Offline AI tutor-style helper using safe local curriculum explanations
- Accessibility: dark mode, high contrast, dyslexia-friendly mode, adjustable text size, read-aloud support
- Installable PWA with service worker caching and IndexedDB offline data storage

## Project Structure

```text
.
├── index.html
├── manifest.webmanifest
├── sw.js
├── css/
│   └── styles.css
├── js/
│   ├── app.js
│   ├── data/
│   │   ├── badges.js
│   │   └── curriculum.js
│   └── services/
│       ├── db.js
│       ├── pwa.js
│       ├── rewards.js
│       ├── speech.js
│       └── utils.js
├── icons/
│   ├── icon-180.png
│   ├── icon-192.png
│   └── icon-512.png
├── assets/
│   ├── certificates/
│   ├── mascot/
│   ├── sounds/
│   └── worksheets/
└── docs/
    └── DEPLOYMENT.md
```

## Data Models

The app is designed around these entities:

- `Student`: id, name, avatar, grade, createdAt
- `Progress`: XP, coins, gems, level, streak, lessons completed, quizzes, worksheets, subject stats, badges
- `Subject`: id, name, icon, colour, grades
- `Grade`: Basic 1 to Basic 6
- `Term`: Term 1, Term 2, Term 3
- `Topic`: id, title, summary, visual, lessons, quiz, worksheet
- `Lesson`: id, subject, term, level, title, visual, summary, points, examples, activity
- `Quiz`: randomized questions, choices, answers, score
- `Worksheet`: title, instructions, random questions, answer sheet
- `Certificate`: id, student, subject, score, date, verification code
- `Achievement`: id, type, subject, target, icon, description

## Local Use

Open `index.html` in a modern browser. For full PWA install and service-worker offline caching, serve the folder through a local or hosted web server instead of opening with `file://`.

## GitHub Pages

Upload all files to your repository root, then enable GitHub Pages from the repository settings. The app should open at:

```text
https://YOUR_USERNAME.github.io/YOUR_REPOSITORY/
```

## Scaling to Basic 2-6

The curriculum is generated from `js/data/curriculum.js`. To add richer content:

1. Add more lessons to the subject arrays.
2. Add grade-specific summaries or activities.
3. Add more quiz questions per topic.
4. Add worksheets and answer sheets per topic.
5. Add Ghanaian language variants as separate lesson data.

## Notes

The AI tutor is currently a safe offline tutor helper, not a cloud AI chatbot. It gives child-safe hints from local curriculum rules and does not transmit data.

