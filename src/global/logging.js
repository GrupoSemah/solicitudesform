const STORAGE_KEY = 'amd_form_logs_solicitud';

function setLogs(logs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
}

export function getLogs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// Guarda al inicio del array (más reciente primero)
export function saveLog(log) {
  const logs = getLogs();
  logs.unshift(log);
  setLogs(logs);
}

export function updateLog(id, updates) {
  const logs = getLogs();
  const idx = logs.findIndex((l) => l.id === id);
  if (idx !== -1) {
    logs[idx] = { ...logs[idx], ...updates };
    setLogs(logs);
  }
}

export function removeLog(id) {
  setLogs(getLogs().filter((l) => l.id !== id));
}

export function clearSuccessfulLogs() {
  setLogs(
    getLogs().filter(
      (l) => !(l.backendStatus === 'success' && l.emailjsStatus === 'success')
    )
  );
}
