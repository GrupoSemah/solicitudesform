import { useState, useEffect } from "react"
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
    watch,
    formState: { errors },
  } = useForm({ mode: 'onBlur', shouldUnregister: true })
  const [persona, setPersona] = useState("natural")
  const [judicial, setJudicial] = useState("no")
  // Array que preserva el orden en que el usuario marca P4 (tipoBienes)
  // El índice 0 es siempre el primero seleccionado vigente — es el que llega al backend
  const [tipoBienesOrden, setTipoBienesOrden] = useState([])

  // Observar los campos que disparan reglas dinámicas
  const p1 = watch("razonprincipal")
  const p3 = watch("tipoUso")
  const p5 = watch("tiempodesocupar")

  // Registrar tipoBienes manualmente para que RHF lo valide:
  // el valor real se setea con setValue desde handleTipoBienesChange
  register("tipoBienes", {
    validate: (value) =>
      (Array.isArray(value) && value.length > 0) || "Debe seleccionar al menos una opción",
  })

  // Reglas R1–R3: P1 controla qué opciones de P2 (procedenciaBienes) se deshabilitan
  const disabledP2 = (() => {
    if (p1 === "a" || p1 === "b") return ["c", "d"]
    if (p1 === "c") return ["d"]
    if (p1 === "d") return ["a", "b"]
    return []
  })()

  // Reglas R4–R5: P3 controla qué opciones de P4 (tipoBienes) se deshabilitan
  const disabledP4 = (() => {
    if (p3 === "a") return ["d"]
    if (p3 === "b") return ["b", "f"]
    return []
  })()

  // Reglas R6 y R7: P5 controla qué opciones de P6 (mesesContrato) se deshabilitan
  // R6: "Entre 1 y 6 meses" (a) → deshabilita "12 meses"
  // R7: "Más de 12 meses"   (c) → deshabilita "1 mes"
  const disabledP6 = p5 === "a" ? ["12 meses"] : p5 === "c" ? ["1 mes"] : []

  // Limpiar P2 si la opción seleccionada queda deshabilitada por un cambio en P1
  useEffect(() => {
    const current = watch("procedenciaBienes")
    if (current && disabledP2.includes(current)) {
      setValue("procedenciaBienes", "")
    }
  }, [p1]) // eslint-disable-line react-hooks/exhaustive-deps

  // Limpiar P4: si alguna opción marcada queda deshabilitada por un cambio en P3,
  // filtrarla del array de orden para que no llegue al backend
  useEffect(() => {
    if (disabledP4.length === 0) return
    setTipoBienesOrden((prev) => {
      const siguiente = prev.filter((v) => !disabledP4.includes(v))
      if (siguiente.length !== prev.length) {
        // Sincronizar react-hook-form con el nuevo array filtrado
        setValue("tipoBienes", siguiente.length > 0 ? siguiente : undefined)
      }
      return siguiente
    })
  }, [p3]) // eslint-disable-line react-hooks/exhaustive-deps

  // Sincroniza el estado local tipoBienesOrden con react-hook-form
  // Se llama desde StorageUsage cada vez que el usuario marca/desmarca una opción
  const handleTipoBienesChange = (nuevoOrden) => {
    setTipoBienesOrden(nuevoOrden)
    // Registrar en RHF: valor válido si hay al menos un elemento, undefined si está vacío
    // La validación custom (validate) en register se encarga del mensaje de error
    setValue("tipoBienes", nuevoOrden.length > 0 ? nuevoOrden : undefined, { shouldValidate: true })
  }

  // Limpiar P6 si la opción seleccionada queda deshabilitada por un cambio en P5
  useEffect(() => {
    const current = watch("mesesContrato")
    if (current && disabledP6.includes(current)) {
      setValue("mesesContrato", "")
    }
  }, [p5]) // eslint-disable-line react-hooks/exhaustive-deps
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
              <BrandsInfo register={register} errors={errors} setValue={setValue} disabledP6={disabledP6} />
            </div>

            <div className="px-6 sm:px-8 py-6 border-b border-gray-100">
              <StorageUsage
                register={register}
                errors={errors}
                disabledP2={disabledP2}
                disabledP4={disabledP4}
                tipoBienesOrden={tipoBienesOrden}
                onTipoBienesChange={handleTipoBienesChange}
              />
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
