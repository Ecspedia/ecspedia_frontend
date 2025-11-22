import Link from "next/link";

export interface BotonHeaderProps {
  texto: string;
  ruta: string;
}

export function BotonHeader({ texto, ruta }: BotonHeaderProps) {
  return (
    <Link
      href={ruta}
      className="inline-flex items-center px-3 py-2 rounded-md text-sm font-bold text-primary hover:text-primary-inverse transition"
    >
      {texto}
    </Link>
  );
}
