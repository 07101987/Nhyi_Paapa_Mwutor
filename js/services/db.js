const DB_NAME = "shapes_adventure_platform";
const DB_VERSION = 1;
const STORES = ["students", "progress", "events", "certificates", "assignments", "settings"];

let dbPromise;

export function openDb() {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      STORES.forEach((store) => {
        if (!db.objectStoreNames.contains(store)) {
          db.createObjectStore(store, { keyPath: "id" });
        }
      });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  return dbPromise;
}

export async function getAll(store) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const request = db.transaction(store, "readonly").objectStore(store).getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}

export async function getOne(store, id) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const request = db.transaction(store, "readonly").objectStore(store).get(id);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
}

export async function putOne(store, value) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const request = db.transaction(store, "readwrite").objectStore(store).put(value);
    request.onsuccess = () => resolve(value);
    request.onerror = () => reject(request.error);
  });
}

export async function deleteOne(store, id) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const request = db.transaction(store, "readwrite").objectStore(store).delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function seedDefaultStudent() {
  const students = await getAll("students");
  if (students.length) return students;
  const student = {
    id: crypto.randomUUID(),
    name: "My Child",
    avatar: "🧒🏾",
    grade: "Basic 1",
    createdAt: new Date().toISOString()
  };
  await putOne("students", student);
  await putOne("progress", defaultProgress(student.id));
  return [student];
}

export function defaultProgress(studentId) {
  return {
    id: studentId,
    studentId,
    xp: 0,
    coins: 0,
    gems: 0,
    level: 1,
    streak: 0,
    lastActiveDate: "",
    lessonsCompleted: [],
    quizzesTaken: [],
    examsTaken: [],
    worksheetsCompleted: [],
    timeSpentSeconds: 0,
    subjectStats: {},
    badges: [],
    dailyRewardClaimed: ""
  };
}

export async function logEvent(type, payload = {}) {
  const event = {
    id: crypto.randomUUID(),
    type,
    payload,
    createdAt: new Date().toISOString()
  };
  await putOne("events", event);
  return event;
}
