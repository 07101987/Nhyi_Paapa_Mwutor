export function speak(text, options = {}) {
  if (!("speechSynthesis" in window) || !text) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(String(text).replace(/\s+/g, " ").trim());
  utterance.rate = options.rate || 0.9;
  utterance.pitch = options.pitch || 1.08;
  utterance.volume = options.volume || 1;
  window.speechSynthesis.speak(utterance);
}

export function stopSpeech() {
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
}
