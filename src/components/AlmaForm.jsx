import { useState } from "react"
import { useForm } from "react-hook-form"
import { sendCustomEmail } from "../global/email"
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
      await sendCustomEmail(data, judicial)
      setIsSubmitted(true)
    } catch (error) {
      const mensaje = error instanceof Error ? error.message : "Error al enviar email"
      console.error("Error en EmailJS:", mensaje)
      setSubmitError(mensaje)
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
    </>
  )
}
