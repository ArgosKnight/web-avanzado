import { personalInfo } from "../../../libs/data";

export const metadata = {
  title: "Contacto",
  description: "Ponte en contacto conmigo para consultas o proyectos.",
};

export default function ContactPage() {
  return (
    <section className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Contacto</h1>

      <p className="text-gray-700 mb-8 max-w-xl">
        Si deseas comunicarte conmigo para proyectos, consultas o colaboración,
        puedes escribirme directamente a mi correo o usar cualquiera de mis redes:
      </p>

      <ul className="text-lg space-y-4">
        <li>
          ✉️ <strong>Email:</strong>{" "}
          <a href={`mailto:${personalInfo.email}`} className="text-blue-600 underline">
            {personalInfo.email}
          </a>
        </li>

        <li>
          🐙 <strong>GitHub:</strong>{" "}
          <a href={personalInfo.github} className="text-blue-600 underline" target="_blank">
            {personalInfo.github}
          </a>
        </li>

        <li>
          💼 <strong>LinkedIn:</strong>{" "}
          <a href={personalInfo.linkedin} className="text-blue-600 underline" target="_blank">
            {personalInfo.linkedin}
          </a>
        </li>
      </ul>
    </section>
  );
}
