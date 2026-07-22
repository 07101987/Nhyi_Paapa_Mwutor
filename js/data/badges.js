const tiers = [
  { key: "bronze", icon: "🥉", label: "Bronze", target: 1 },
  { key: "silver", icon: "🥈", label: "Silver", target: 3 },
  { key: "gold", icon: "🥇", label: "Gold", target: 6 },
  { key: "diamond", icon: "💎", label: "Diamond", target: 10 }
];

const subjects = [
  ["math", "Mathematics", "🔢"],
  ["english", "English", "📚"],
  ["science", "Science", "🔬"],
  ["computing", "Computing", "💻"],
  ["owop", "OWOP", "🌍"],
  ["rme", "RME", "🙏"],
  ["creative", "Creative Arts", "🎨"],
  ["history", "History", "🏛️"],
  ["pe", "Physical Education", "🏃"],
  ["ghanaian", "Ghanaian Language", "🗣️"]
];

export const badges = [
  ...subjects.flatMap(([id, name, icon]) =>
    tiers.map((tier) => ({
      id: `${id}-${tier.key}`,
      name: `${name} ${tier.label}`,
      icon,
      type: "subject",
      subject: id,
      target: tier.target,
      description: `Complete ${tier.target} ${name} lesson${tier.target > 1 ? "s" : ""}.`
    }))
  ),
  ...Array.from({ length: 60 }, (_, index) => ({
    id: `level-${index + 1}`,
    name: `Level ${index + 1} Star`,
    icon: index % 5 === 0 ? "🌟" : "⭐",
    type: "level",
    target: index + 1,
    description: `Reach level ${index + 1}.`
  })),
  { id: "first-quiz", name: "First Quiz", icon: "🎯", type: "quiz", target: 1, description: "Finish your first quiz." },
  { id: "quiz-master", name: "Quiz Master", icon: "🏆", type: "quiz", target: 10, description: "Finish 10 quizzes." },
  { id: "first-mock", name: "Mock Exam Ready", icon: "🧪", type: "exam", target: 1, description: "Finish your first mock exam." },
  { id: "exam-champion", name: "Exam Champion", icon: "🎓", type: "exam", target: 5, description: "Finish 5 exams." },
  { id: "streak-3", name: "3 Day Streak", icon: "🔥", type: "streak", target: 3, description: "Learn for 3 days in a row." },
  { id: "streak-7", name: "7 Day Streak", icon: "🔥", type: "streak", target: 7, description: "Learn for 7 days in a row." },
  { id: "reader", name: "Reading Friend", icon: "📖", type: "reading", target: 5, description: "Complete 5 reading lessons." },
  { id: "worksheet-hero", name: "Worksheet Hero", icon: "📝", type: "worksheet", target: 5, description: "Print or complete 5 worksheets." }
];
