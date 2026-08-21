const STORAGE_KEY = "loom-ai-conversations";

export function loadChats() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveChats(chats) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(chats)
  );
}

export function deleteChat(chatId) {
  const chats = loadChats().filter(
    c => c.id !== chatId
  );

  saveChats(chats);

  return chats;
}