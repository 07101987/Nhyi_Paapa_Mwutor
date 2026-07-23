import { badges } from "../data/badges.js";

export function awardForLesson(progress, lesson) {
  const alreadyDone = progress.lessonsCompleted.includes(lesson.id);
  if (!alreadyDone) {
    progress.lessonsCompleted.push(lesson.id);
    progress.xp += 20;
    progress.coins += 5;
    progress.gems += progress.lessonsCompleted.length % 5 === 0 ? 1 : 0;
  }
  updateLevel(progress);
  updateStreak(progress);
  updateSubjectStats(progress, lesson.subject, alreadyDone ? 0 : 1);
  return unlockBadges(progress);
}

export function awardForQuiz(progress, quizResult) {
  progress.quizzesTaken.push({ ...quizResult, at: new Date().toISOString() });
  progress.xp += 15 + quizResult.score * 5;
  progress.coins += Math.max(2, quizResult.score);
  if (quizResult.percent >= 80) progress.gems += 2;
  updateLevel(progress);
  updateStreak(progress);
  return unlockBadges(progress);
}

export function awardForExam(progress, examResult) {
  if (!progress.examsTaken) progress.examsTaken = [];
  progress.examsTaken.push({ ...examResult, at: new Date().toISOString() });
  progress.xp += 30 + Math.round(examResult.percent / 2);
  progress.coins += Math.max(10, Math.round(examResult.percent / 5));
  if (examResult.percent >= 80) progress.gems += examResult.type === "final" ? 5 : 3;
  updateLevel(progress);
  updateStreak(progress);
  return unlockBadges(progress);
}

export function awardForWorksheet(progress, worksheetId) {
  progress.worksheetsCompleted.push({ id: worksheetId, at: new Date().toISOString() });
  progress.xp += 10;
  progress.coins += 3;
  updateLevel(progress);
  updateStreak(progress);
  return unlockBadges(progress);
}

export function claimDailyReward(progress) {
  const today = new Date().toISOString().slice(0, 10);
  if (progress.dailyRewardClaimed === today) return false;
  progress.dailyRewardClaimed = today;
  progress.coins += 10;
  progress.gems += 1;
  progress.xp += 15;
  updateLevel(progress);
  updateStreak(progress);
  return true;
}

export function unlockBadges(progress) {
  const earned = new Set(progress.badges || []);
  const subjectCounts = progress.subjectStats || {};
  const quizCount = progress.quizzesTaken.length;
  const examCount = (progress.examsTaken || []).length;
  const worksheetCount = progress.worksheetsCompleted.length;
  badges.forEach((badge) => {
    if (earned.has(badge.id)) return;
    const subjectLessons = subjectCounts[badge.subject] ? subjectCounts[badge.subject].lessons || 0 : 0;
    if (badge.type === "subject" && subjectLessons >= badge.target) earned.add(badge.id);
    if (badge.type === "level" && progress.level >= badge.target) earned.add(badge.id);
    if (badge.type === "quiz" && quizCount >= badge.target) earned.add(badge.id);
    if (badge.type === "exam" && examCount >= badge.target) earned.add(badge.id);
    if (badge.type === "streak" && progress.streak >= badge.target) earned.add(badge.id);
    const englishLessons = subjectCounts.english ? subjectCounts.english.lessons || 0 : 0;
    if (badge.type === "reading" && englishLessons >= badge.target) earned.add(badge.id);
    if (badge.type === "worksheet" && worksheetCount >= badge.target) earned.add(badge.id);
  });
  progress.badges = [...earned];
  return progress.badges;
}

function updateLevel(progress) {
  progress.level = Math.min(100, Math.max(1, Math.floor(progress.xp / 100) + 1));
}

function updateStreak(progress) {
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (progress.lastActiveDate === today) return;
  progress.streak = progress.lastActiveDate === yesterday ? progress.streak + 1 : 1;
  progress.lastActiveDate = today;
}

function updateSubjectStats(progress, subject, lessonIncrement) {
  if (!subject) return;
  if (!progress.subjectStats[subject]) progress.subjectStats[subject] = { lessons: 0, quizScore: 0, time: 0 };
  progress.subjectStats[subject].lessons += lessonIncrement;
}
