import { useState } from "react"
import { getLogs, clearSuccessfulLogs, updateLog } from "../global/form-logs"
import { sendToCRMTracker } from "../global/api"
import { sendCustomEmail } from "../global/email"

const withRetry = async (fn, maxAttempts = 3) => {
  const delays = [0, 1500, 3000]
  let lastError = ''
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    if (delays[attempt - 1] > 0) await new Promise(r => setTimeout(r, delays[attempt - 1]))
    try {
      await fn()
      return { ok: true, attempts: attempt }
    } catch (e) {
      lastError = e?.message ?? 'Error desconocido'
      console.warn(`[CRM] Reintento ${attempt}/${maxAttempts} fallido:`, lastError)
    }
  }
  return { ok: false, attempts: maxAttempts, error: lastError }
}

const StatusBadge = ({ status, label }) => {
  const styles = {
    success: 'bg-green-100 text-green-700 border-green-200',
    failed: 'bg-red-100 text-red-700 border-red-200',
    pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  }
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${styles[status] ?? styles.pending}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === 'success' ? 'bg-green-500' : status === 'failed' ? 'bg-red-500' : 'bg-yellow-500'}`} />
      {label}: {status}
    </span>
  )
}

export const LogsView = ({ onClose }) => {
  const [logs, setLogs] = useState(() => getLogs())
  const [retrying, setRetrying] = useState({})

  const refresh = () => setLogs(getLogs())

  const handleRetryCRM = async (log) => {
    setRetrying(prev => ({ ...prev, [log.id]: 'crm' }))
    const result = await withRetry(() => sendToCRMTracker(log.payload))
    updateLog(log.id, 'crmStatus', result.ok ? 'success' : 'failed')
    setRetrying(prev => ({ ...prev, [log.id]: null }))
    refresh()
  }

  const handleRetryEmail = async (log) => {
    setRetrying(prev => ({ ...prev, [log.id]: 'email' }))
    try {
      await sendCustomEmail(log.payload, log.payload?.judicial ?? 'no')
      updateLog(log.id, 'emailjsStatus', 'success')
    } catch {
      updateLog(log.id, 'emailjsStatus', 'failed')
    }
    setRetrying(prev => ({ ...prev, [log.id]: null }))
    refresh()
  }

  const handleClearSuccessful = () => {
    clearSuccessfulLogs()
    refresh()
  }

  const formatDate = (iso) => {
    try {
      return new Date(iso).toLocaleString('es-PA')
    } catch {
      return iso
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overflow-y-auto pt-8 pb-8 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-base font-bold text-gray-900">Logs de envíos</h2>
            <p className="text-xs text-gray-500 mt-0.5">{logs.length} registro{logs.length !== 1 ? 's' : ''}</p>
          </div>
          <div className="flex items-center gap-2">
            {logs.some(l => l.emailjsStatus === 'success' && l.crmStatus === 'success') && (
              <button
                onClick={handleClearSuccessful}
                className="text-xs text-gray-500 hover:text-gray-700 border border-gray-200 hover:border-gray-300 px-3 py-1.5 rounded-lg transition-colors"
              >
                Limpiar exitosos
              </button>
            )}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Cerrar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="divide-y divide-gray-50 max-h-[60vh] overflow-y-auto">
          {logs.length === 0 ? (
            <div className="py-12 text-center text-gray-400 text-sm">
              No hay registros guardados
            </div>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="px-6 py-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {log.payload?.nombrenatural
                        ? `${log.payload.nombrenatural} ${log.payload.apellido ?? ''}`.trim()
                        : log.payload?.compania ?? 'Sin nombre'}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{formatDate(log.timestamp)}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      <StatusBadge status={log.emailjsStatus} label="Email" />
                      <StatusBadge status={log.crmStatus} label="CRM" />
                    </div>
                  </div>

                  <div className="flex gap-2 flex-shrink-0">
                    {log.emailjsStatus === 'failed' && (
                      <button
                        onClick={() => handleRetryEmail(log)}
                        disabled={!!retrying[log.id]}
                        className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {retrying[log.id] === 'email' ? (
                          <span className="flex items-center gap-1">
                            <span className="w-3 h-3 border border-blue-500 border-t-transparent rounded-full animate-spin" />
                            Enviando...
                          </span>
                        ) : 'Reenviar Email'}
                      </button>
                    )}
                    {log.crmStatus !== 'success' && (
                      <button
                        onClick={() => handleRetryCRM(log)}
                        disabled={!!retrying[log.id]}
                        className="text-xs bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {retrying[log.id] === 'crm' ? (
                          <span className="flex items-center gap-1">
                            <span className="w-3 h-3 border border-orange-500 border-t-transparent rounded-full animate-spin" />
                            Reintentando...
                          </span>
                        ) : 'Reenviar CRM'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
