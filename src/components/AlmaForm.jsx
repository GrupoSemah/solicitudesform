import { useState } from "react"
import { useForm } from "react-hook-form"
import { sendCustomEmail } from "../global/email"
import { sendToCRMTracker } from "../global/api"
import { saveLog, updateLog } from "../global/logging"
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
  } = useForm({ mode: 'onBlur', shouldUnregister: true })
  const [persona, setPersona] = useState("natural")
  const [judicial, setJudicial] = useState("no")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [showLogs, setShowLogs] = useState(false)

  // Al cambiar de tipo de persona, limpia los campos del tipo anterior
  // para evitar que datos residuales pasen la validación del backend
  const handlePersonaChange = (tipo) => {
    if (tipo === "juridica") {
      setValue("correo", "")
      setValue("confirmeemail", "")
      setValue("nombrenatural", "")
      setValue("apellido", "")
      setValue("cedula", "")
    } else {
      setValue("correojuridico", "")
      setValue("confirmeemailjuridico", "")
      setValue("compania", "")
      setValue("ruc", "")
      setValue("dv", "")
      setValue("representante", "")
      setValue("cedularepresentante", "")
    }
    setPersona(tipo)
  }

  const onSubmit = async (data) => {
    setIsLoading(true)
    setSubmitError(null)

    const id = Date.now().toString()
    const payload = { ...data, persona }

    saveLog({
      id,
      timestamp: new Date().toISOString(),
      formType: 'solicitud',
      payload,
      backendStatus: 'pending',
      emailjsStatus: 'pending',
      failedStep: null,
      retryCount: 0,
      errorMessage: null,
    })

    let backendOk = false

    try {
      await sendToCRMTracker(payload)
      updateLog(id, { backendStatus: 'success' })
      backendOk = true
    } catch (error) {
      const mensaje = error instanceof Error ? error.message : "Error desconocido"
      console.error("❌ Error al registrar en CRM:", mensaje)
      updateLog(id, { backendStatus: 'failed', failedStep: 'backend', errorMessage: mensaje })
      setSubmitError(mensaje)
    }

    try {
      await sendCustomEmail(data, judicial)
      updateLog(id, { emailjsStatus: 'success' })
    } catch (error) {
      const mensaje = error instanceof Error ? error.message : "Error al enviar email"
      console.error("❌ Error en EmailJS:", mensaje)
      updateLog(id, {
        emailjsStatus: 'failed',
        failedStep: backendOk ? 'emailjs' : 'both',
        errorMessage: mensaje,
      })
    }

    if (backendOk) {
      setIsSubmitted(true)
    }

    setIsLoading(false)
  }

  return (
    <>
      {isSubmitted ? (
        <Completed />
      ) : (
        <div className="min-h-dvh bg-gray-50 py-8 px-4">
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-3xl mx-auto">
            <div className="px-6 sm:px-8 py-5 border-b border-gray-100">
              <p className="text-xs font-medium text-gray-500">Los campos con <span className="text-red-500 font-semibold">(*)</span> son obligatorios</p>
            </div>

            <div className="px-6 sm:px-8 py-6 border-b border-gray-100">
              <BrandsInfo register={register} errors={errors} setValue={setValue} />
            </div>

            <div className="px-6 sm:px-8 py-6 border-b border-gray-100">
              <StorageUsage register={register} errors={errors} />
            </div>

            <div className="px-6 sm:px-8 py-6 border-b border-gray-100">
              <PersonalInfo
                register={register}
                errors={errors}
                persona={persona}
                setPersona={handlePersonaChange}
              />
            </div>

            <div className="px-6 sm:px-8 py-6 border-b border-gray-100">
              <AuthorizedPersons register={register} errors={errors} />
            </div>

            <div className="px-6 sm:px-8 py-6 border-b border-gray-100">
              <FileUpload register={register} persona={persona} />
            </div>

            <div className="px-6 sm:px-8 py-6 border-b border-gray-100">
              <JudicialProcess register={register} judicial={judicial} setJudicial={setJudicial} />
            </div>

            {/* Mensaje de error al enviar */}
            {submitError && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 mx-6 mb-4">
                <p className="text-red-500 text-sm font-medium whitespace-pre-line">{submitError}</p>
              </div>
            )}

            <div className="px-6 sm:px-8 py-6 bg-gray-50/80 flex justify-center">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto min-w-[200px] bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {isLoading ? "Enviando..." : "Enviar"}
              </button>
            </div>
          </form>
        </div>
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
