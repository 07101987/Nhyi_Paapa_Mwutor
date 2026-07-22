export const avatars = ["🧒🏾", "👧🏾", "👦🏾", "🧑🏾", "👩🏾‍🎓", "👨🏾‍🎓", "🦸🏾", "🧑🏾‍🚀"];

export function byId(id) {
  return document.getElementById(id);
}

export function formatDate(date = new Date()) {
  return new Intl.DateTimeFormat("en-GH", { dateStyle: "medium" }).format(date);
}

export function percent(value, total) {
  if (!total) return 0;
  return Math.round((value / total) * 100);
}

export function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

export function confetti(amount = 60) {
  const colors = ["#ef3340", "#fcd116", "#009739", "#2864d9", "#7c4dff"];
  for (let i = 0; i < amount; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = `${Math.random() * 0.4}s`;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 2200);
  }
}

export function makeQrBits(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i += 1) hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
  return Array.from({ length: 81 }, (_, index) => ((hash >> (index % 24)) + index) % 3 === 0);
}
