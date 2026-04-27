import { useState } from "react";
import { BotonUpload } from "./botonupload";
import { uploadAndConvertFile } from "../global/config";

export const FileUpload = ({ register, persona }) => {
    const [file1URL, setFile1URL] = useState("");
    const [file2URL, setFile2URL] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange1 = async (event) => {
        const file = event.target.files[0];
        setIsUploading(true);
        const downloadURL = await uploadAndConvertFile(file);
        setIsUploading(false);
        if (downloadURL) {
            setFile1URL(downloadURL);
            register("file1", { value: downloadURL });
        }
    };

    const handleFileChange2 = async (event) => {
        const file = event.target.files[0];
        setIsUploading(true);
        const downloadURL = await uploadAndConvertFile(file);
        setIsUploading(false);
        if (downloadURL) {
            setFile2URL(downloadURL);
            register("file2", { value: downloadURL });
        }
    };

    return (
        <section>
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-3">Documentos Requeridos</p>
            <div className="h-px bg-orange-100 mb-4" />

            <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50/50 p-4 mb-4">
                <label htmlFor="file1" className="block text-xs font-medium text-gray-600 mb-2" required>
                    Adjuntar Cédula o Pasaporte
                    <span className="text-red-500">*</span>
                </label>
                <BotonUpload handleFileChange={handleFileChange1} required />
                {isUploading && (
                    <div className="flex items-center gap-2 mt-2">
                        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-sm text-blue-600">Subiendo archivo...</p>
                    </div>
                )}
                {file1URL && <p className="mt-2 text-sm text-green-600 flex items-center gap-1">&#10003; Archivo subido exitosamente</p>}
            </div>

            {persona === "juridica" && (
                <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50/50 p-4">
                    <label htmlFor="file2" required className="block text-xs font-medium text-gray-600 mb-2">
                        Adjuntar aviso de operaciones
                        <span className="text-red-500">*</span>
                    </label>
                    <BotonUpload handleFileChange={handleFileChange2} required />
                    {isUploading && (
                        <div className="flex items-center gap-2 mt-2">
                            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-sm text-blue-600">Subiendo archivo...</p>
                        </div>
                    )}
                    {file2URL && <p className="mt-2 text-sm text-green-600 flex items-center gap-1">&#10003; Archivo subido exitosamente</p>}
                </div>
            )}
        </section>
    );
};
