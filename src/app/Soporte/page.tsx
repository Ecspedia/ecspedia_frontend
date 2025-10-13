import { HeaderNav } from "@/components/ui/Header";

export default function ExpediaHeader() {

  return (
    <>
      <HeaderNav />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Soporte</h1>
        <div className="bg-blue-50 p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">
            ¿Necesitas ayuda? Nuestro equipo de soporte está disponible para ayudarte
          </h2>
          <ul className="list-disc pl-5 text-blue-800 space-y-1">
            <h3>Puedes contactarnos a través del formulario de contacto, correo electrónico o chat en vivo.</h3>
            <li>Preguntas frecuentes</li>
            <li>Guías de usuario</li>
            <li>Contacto directo con soporte</li>

          </ul>
        </div>
      </div>

    </>
  );
}