import { useState, useEffect, useCallback } from "react"
import { getLogs, updateLog, removeLog, clearSuccessfulLogs } from "../global/logging"
import { sendCustomEmail } from "../global/email"

const STATUS_CLASS = {
  success: "bg-green-100 text-green-700",
  failed: "bg-red-100 text-red-700",
  pending: "bg-yellow-100 text-yellow-600",
}

const STATUS_LABEL = { success: "Enviado", failed: "Fallido", pending: "Pendiente" }

function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${STATUS_CLASS[status] ?? "bg-gray-100 text-gray-600"}`}>
      {STATUS_LABEL[status] ?? status}
    </span>
  )
}

export function LogsView() {
  const [logs, setLogs] = useState([])
  const [retrying, setRetrying] = useState(null)

  const refresh = useCallback(() => setLogs(getLogs()), [])

  useEffect(() => {
    refresh()
    window.addEventListener("focus", refresh)
    return () => window.removeEventListener("focus", refresh)
  }, [refresh])

  async function retryEmailjs(log) {
    setRetrying(`${log.id}-emailjs`)
    try {
      await sendCustomEmail(log.payload, log.payload.judicial)
      updateLog(log.id, {
        emailjsStatus: "success",
        failedStep: null,
        retryCount: (log.retryCount || 0) + 1,
        lastRetryAt: new Date().toISOString(),
      })
    } catch (err) {
      updateLog(log.id, {
        emailjsStatus: "failed",
        errorMessage: err instanceof Error ? err.message : "Error al enviar email",
        retryCount: (log.retryCount || 0) + 1,
        lastRetryAt: new Date().toISOString(),
      })
    }
    refresh()
    setRetrying(null)
  }

  const nombre = (log) => {
    const p = log.payload
    return p?.nombrenatural ? `${p.nombrenatural} ${p.apellido ?? ""}`.trim() : (p?.compania ?? "—")
  }

  const correo = (log) => log.payload?.correo || log.payload?.correojuridico || "—"

  return (
    <div className="min-h-dvh bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.location.hash = "" }}
              className="text-sm text-orange-500 hover:text-orange-600 font-medium"
            >
              ← Volver al formulario
            </a>
            <h2 className="text-lg font-bold text-gray-800">Logs de solicitudes</h2>
            {logs.length > 0 && (
              <span className="text-xs text-gray-400">{logs.length} registro{logs.length !== 1 ? "s" : ""}</span>
            )}
          </div>
          <button
            onClick={() => { clearSuccessfulLogs(); refresh() }}
            className="text-xs text-gray-500 hover:text-red-500 border border-gray-200 hover:border-red-200 rounded-lg px-3 py-1.5 transition-colors"
          >
            Limpiar exitosos
          </button>
        </div>

        {logs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
            <p className="text-gray-400 text-sm">No hay registros de envío.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {logs.map((log) => (
              <div key={log.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800">{nombre(log)}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{correo(log)}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {new Date(log.timestamp).toLocaleString("es-PA")}
                      {log.retryCount > 0 && (
                        <span className="ml-2 text-orange-500">· {log.retryCount} reintento{log.retryCount > 1 ? "s" : ""}</span>
                      )}
                    </p>
                    {log.errorMessage && (
                      <p className="text-xs text-red-500 mt-1 line-clamp-2">{log.errorMessage}</p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3 shrink-0">
                    <div className="flex flex-col items-start gap-1">
                      <span className="text-xs text-gray-400">EmailJS</span>
                      <StatusBadge status={log.emailjsStatus} />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 shrink-0">
                    {log.emailjsStatus === "failed" && (
                      <button
                        onClick={() => retryEmailjs(log)}
                        disabled={retrying === `${log.id}-emailjs`}
                        className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 rounded-lg px-3 py-1.5 transition-colors disabled:opacity-50"
                      >
                        {retrying === `${log.id}-emailjs` ? "Enviando..." : "Reenviar Email"}
                      </button>
                    )}
                    <button
                      onClick={() => { removeLog(log.id); refresh() }}
                      className="text-xs text-gray-400 hover:text-red-500 border border-gray-200 hover:border-red-200 rounded-lg px-3 py-1.5 transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
