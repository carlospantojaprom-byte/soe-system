
// ===== BLOQUE =====
— Componente de tarjeta del sistema

components/SystemCard.tsx
import React from "react";

interface CardProps {
  title: string;
  description: string;
}

export default function SystemCard({ title, description }: CardProps) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}


// ===== BLOQUE =====
— Control del sistema
app/system-control/page.tsx
export default function SystemControl() {
  return (
    <div className="container">

      <h2>Control del sistema</h2>

      <p>
        Gestión de accesos, contexto y evolución del sistema.
      </p>

    </div>
  );
}


// ===== BLOQUE =====
— Conexión navegación
components/SystemCard.tsx

actualizado:

import Link from "next/link";

interface CardProps {
  title: string;
  description: string;
  link: string;
}

export default function SystemCard({ title, description, link }: CardProps) {
  return (
    <Link href={link}>
      <div className="card">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </Link>
  );
}


// ===== BLOQUE =====
— Logs visibles desde interfaz
app/system-control/logs/page.tsx
import { get } from "../../../database/store"

export default function Logs(){

 const logs=get("logs")

 return(

  <div className="container">

   <h2>Logs del sistema</h2>

   {logs.map((l:any)=>(
    <div key={l.id}>
     {l.event}
    </div>
   ))}

  </div>

 )

}

