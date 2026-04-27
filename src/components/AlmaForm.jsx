import { useState } from "react"
import { useForm } from "react-hook-form"
import { sendCustomEmail } from "../global/email"
import { sendToCRMTracker } from "../global/api"
import { saveLog, updateLog } from "../global/form-logs"
import { Completed } from "./completed"
import { BrandsInfo } from "./BrandsInfo"
import { PersonalInfo } from "./PersonalInfo"
import { AuthorizedPersons } from "./AuthorizedPersons"
import { StorageUsage } from "./StorageUsage"
import { FileUpload } from "./FileUpload"
import { JudicialProcess } from "./JudicialProcess"
import { LogsView } from "./LogsView"

// Reintenta fn hasta 3 veces con delays 0 / 1500 / 3000ms
const withRetry = async (fn, maxAttempts = 3) => {
  const delays = [0, 1500, 3000]
  let lastError = ''
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    if (delays[attempt - 1] > 0) await new Promise(r => setTimeout(r, delays[attempt - 1]))
    try {
      const result = await fn()
      if (result === null) throw new Error('CRM retornó null')
      return { ok: true, attempts: attempt }
    } catch (e) {
      lastError = e?.message ?? 'Error desconocido'
      console.warn(`[CRM] Reintento ${attempt}/${maxAttempts} fallido:`, lastError)
    }
  }
  return { ok: false, attempts: maxAttempts, error: lastError }
}

export const AlmaForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()
  const [persona, setPersona] = useState("natural")
  const [judicial, setJudicial] = useState("no")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showLogs, setShowLogs] = useState(false)

  const onSubmit = async (data) => {
    setIsLoading(true)

    const logId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    saveLog(logId, { ...data, judicial })

    // 1. EmailJS — destino principal
    try {
      await new Promise((resolve) => {
        sendCustomEmail(data, judicial)
        setTimeout(resolve, 200)
      })
      updateLog(logId, 'emailjsStatus', 'success')
    } catch {
      updateLog(logId, 'emailjsStatus', 'failed')
    }

    // 2. CRM — con retry automático (no bloquea si falla)
    const crmResult = await withRetry(() => sendToCRMTracker(data))
    updateLog(logId, 'crmStatus', crmResult.ok ? 'success' : 'failed')

    setIsLoading(false)
    setIsSubmitted(true)
  }

  return (
    <>
      {isSubmitted ? (
        <Completed />
      ) : (
        <section className="flex flex-col items-center justify-center">
          <form onSubmit={handleSubmit(onSubmit)} className="border mt-5 mx-auto">
            <h2 className="text-md font-bold mb-4 text-start mt-5">Los campos con (*) son obligatorios</h2>

            <BrandsInfo register={register} errors={errors} setValue={setValue} />

            <hr className="my-5" />

            <StorageUsage register={register} />

            <hr className="my-5" />

            <PersonalInfo register={register} errors={errors} persona={persona} setPersona={setPersona} />

            <hr className="my-5" />

            <AuthorizedPersons register={register} errors={errors} />

            <hr className="my-5" />

            <FileUpload register={register} persona={persona} />

            <JudicialProcess register={register} judicial={judicial} setJudicial={setJudicial} />

            <section>
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white text-2xl px-2 py-2 rounded-md my-5 w-64 lg:96 transition-colors flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : 'Enviar'}
                </button>
              </div>
            </section>
          </form>
        </section>
      )}

      {/* Botón flotante para ver logs */}
      <button
        onClick={() => setShowLogs(true)}
        className="fixed bottom-5 right-5 bg-gray-800 hover:bg-gray-900 text-white text-xs font-medium px-3 py-2 rounded-full shadow-lg transition-colors z-40"
        title="Ver logs de envíos"
      >
        Ver Logs
      </button>

      {showLogs && <LogsView onClose={() => setShowLogs(false)} />}
    </>
  )
}
