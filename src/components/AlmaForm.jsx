import { useState } from "react"
import { useForm } from "react-hook-form"
import { sendCustomEmail } from "../global/email"
import { sendToCRMTracker } from "../global/api"
import { Completed } from "./completed"
import { BrandsInfo } from "./BrandsInfo"
import { PersonalInfo } from "./PersonalInfo"
import { AuthorizedPersons } from "./AuthorizedPersons"
import { StorageUsage } from "./StorageUsage"
import { FileUpload } from "./FileUpload"
import { JudicialProcess } from "./JudicialProcess"

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

    try {
      // 1. Primero registrar en el CRM (incluir persona del estado React, no del form)
      await sendToCRMTracker({ ...data, persona })

      // 2. Solo si el CRM acepta, enviar notificación por email
      await sendCustomEmail(data, judicial)

      // 3. Todo OK → mostrar pantalla de éxito
      setIsSubmitted(true)
    } catch (error) {
      const mensaje = error instanceof Error ? error.message : "Error desconocido"
      console.error("❌ Error al enviar solicitud:", mensaje)
      setSubmitError(mensaje)
    } finally {
      setIsLoading(false)
    }
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

            <StorageUsage register={register} errors={errors} />

            <hr className="my-5" />

            <PersonalInfo
              register={register}
              errors={errors}
              persona={persona}
              setPersona={handlePersonaChange}
            />

            <hr className="my-5" />

            <AuthorizedPersons register={register} errors={errors} />

            <hr className="my-5" />

            <FileUpload register={register} persona={persona} />

            <JudicialProcess register={register} judicial={judicial} setJudicial={setJudicial} />

            {/* Mensaje de error al enviar */}
            {submitError && (
              <div className="mx-4 mb-4 p-4 bg-red-50 border border-red-300 rounded-md">
                <p className="text-red-700 text-sm font-medium whitespace-pre-line">⚠️ {submitError}</p>
              </div>
            )}

            <section>
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-orange-600 text-white text-2xl px-2 py-2 rounded-md my-5 w-64 lg:96 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Enviando..." : "Enviar"}
                </button>
              </div>
            </section>
          </form>
        </section>
      )}
    </>
  )
}
