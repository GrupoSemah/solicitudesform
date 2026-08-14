const STORAGE_KEY = 'alma-solicitudes-logs'

export const getLogs = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

const saveLogs = (logs) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs))
  } catch {
    console.warn('[form-logs] No se pudo guardar en localStorage')
  }
}

export const saveLog = (id, data, emailjsStatus = 'pending', crmStatus = 'pending') => {
  const logs = getLogs()
  logs.unshift({
    id,
    timestamp: new Date().toISOString(),
    formType: 'solicitud',
    payload: data,
    emailjsStatus,
    crmStatus,
  })
  saveLogs(logs)
}

export const updateLog = (id, field, status) => {
  const logs = getLogs()
  const index = logs.findIndex((log) => log.id === id)
  if (index === -1) return
  logs[index] = { ...logs[index], [field]: status }
  saveLogs(logs)
}

export const clearSuccessfulLogs = () => {
  const logs = getLogs()
  const remaining = logs.filter(
    (log) => !(log.emailjsStatus === 'success' && log.crmStatus === 'success')
  )
  saveLogs(remaining)
}
