
// ===== BLOQUE =====
— Estructura del proyecto SOE soe-system │ ├ app │ ├ login │ ├ core │ └ implementations │ ├ components │ ├ core │ ├ registry │ ├ engines │ ├ auth │ ├ database │ └ config


// ===== BLOQUE =====
— Motor de propagación fractal Archivo: core/fractalPropagation.ts import { registry } from "../registry/systemRegistry"; export function propagate(sourceId: string, payload: any) { const links = registry.links.filter(l => l.source === sourceId); links.forEach(link => { const target = registry.cells.find(c => c.id === link.target); if (target) { target.config = { ...target.config, ...payload }; } }); }


// ===== BLOQUE =====
— Sistema de usuarios Archivo: auth/users.ts export type Role = "CORE" | "OPERADOR" | "CLIENTE"; export interface User { id: string; email: string; password: string; role: Role; } export const users: User[] = [ { id: "core", email: "core@soe.system", password: "admin", role: "CORE" } ];


// ===== BLOQUE =====
— Núcleo SOE Archivo: core/soeCore.ts import "../engines/enginesRegistry"; import "../implementations/implementationsRegistry"; import "../implementations/laPrietitaPillars"; import "../registry/links"; export function initSOE() { return { status: "SOE INITIALIZED" }; }


// ===== BLOQUE =====
— Entrada del sistema
app/core/page.ts
import { initSOE } from "../../core/soeCore";

export default function core() {
  const system = initSOE();

  return system;

}


// ===== BLOQUE =====
— Interfaz SOE Core
app/page.tsx
import SystemCard from "../components/SystemCard";

export default function Home() {
  return (
    <div className="container">
      <div className="title">
        SOE — Sistema Operativo Empresarial
      </div>

      <div className="subtitle">
        Centro Maestro · Gestión SOE · Art-Talo Systems
      </div>

      <div className="cards">
        <SystemCard
          title="Document Engine"
          description="Manual técnico y documentos vivos del sistema."
        />

        <SystemCard
          title="Implementaciones"
          description="Empresas integradas al ecosistema SOE."
        />

        <SystemCard
          title="Control del sistema"
          description="Accesos · Contexto · Evolución"
        />
      </div>
    </div>
  );
}


// ===== BLOQUE =====
— Protección por sesión
core/authGuard.ts
import { getSession } from "../auth/session";

export function requireSession() {
  const session = getSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  return session;
}


// ===== BLOQUE =====
— Control por rol
core/roleGuard.ts
import { Role } from "../auth/users";

export function requireRole(userRole: Role, required: Role) {

  if (userRole !== required) {
    throw new Error("Insufficient permissions");
  }

}


// ===== BLOQUE =====
— Dashboard CORE del sistema
app/core/dashboard/page.tsx
import { registry } from "../../../registry/systemRegistry";

export default function CoreDashboard() {

  const engines = registry.cells.filter(
    c => c.type === "engine"
  );

  const implementations = registry.cells.filter(
    c => c.type === "implementation"
  );

  return (
    <div className="container">

      <h2>SOE CORE</h2>

      <h3>Motores del sistema</h3>

      {engines.map(e => (
        <div key={e.id}>{e.name}</div>
      ))}

      <h3>Implementaciones</h3>

      {implementations.map(i => (
        <div key={i.id}>{i.name}</div>
      ))}

    </div>
  );
}


// ===== BLOQUE =====
— Propagación fractal avanzada
core/fractalAdvanced.ts
import { registry } from "../registry/systemRegistry";

export function propagateFractal(source:string,payload:any){

  const targets = registry.links
    .filter(l => l.source === source)
    .map(l => l.target);

  targets.forEach(t => {

    const cell = registry.cells.find(c => c.id === t);

    if(cell){

      cell.config = {
        ...cell.config,
        ...payload
      };

    }

  });

}


// ===== BLOQUE =====
— Propagación fractal entre empresas
core/propagateCompanies.ts
import { registry } from "../registry/systemRegistry"

export function propagateToCompanies(source:string,payload:any){

  const companies = registry.cells
    .filter(c=>c.type==="implementation")

  companies.forEach(c=>{

    const cell = registry.cells.find(x=>x.id===source)

    if(cell){

      c.config={
        ...c.config,
        ...payload
      }

    }

  })

}


// ===== BLOQUE =====
— Control acceso por rol
core/roleRouting.ts
import { Role } from "../auth/users"

export function roleHome(role:Role){

  if(role==="CORE") return "/core/dashboard"
  if(role==="OPERADOR") return "/operator"
  if(role==="CLIENTE") return "/client"

  return "/"

}


// ===== BLOQUE =====
— Componente navegación del sistema
components/Navigation.tsx
import Link from "next/link"

export default function Navigation(){

  return(

    <div style={{marginBottom:"30px"}}>

      <Link href="/">SOE Core</Link> |{" "}
      <Link href="/implementations">Implementaciones</Link> |{" "}
      <Link href="/metrics">KPIs</Link> |{" "}
      <Link href="/automation">Automatización</Link> |{" "}
      <Link href="/document-engine/manual">Document Engine</Link>

    </div>

  )

}


// ===== BLOQUE =====
— Gestión de usuarios
core/userManager.ts
import { users, User } from "../auth/users"

export function createUser(user:User){

 users.push(user)

}

export function listUsers(){

 return users

}


// ===== BLOQUE =====
— Vista gestión usuarios
app/system-control/users/page.tsx
import { listUsers } from "../../../core/userManager"

export default function Users(){

 const users = listUsers()

 return(

  <div className="container">

   <h2>Usuarios del sistema</h2>

   {users.map(u=>(
    <div key={u.id}>
     {u.email} ({u.role})
    </div>
   ))}

  </div>

 )

}


// ===== BLOQUE =====
— Gestión de empresas
core/companyManager.ts
import { registry } from "../registry/systemRegistry"

export function createCompany(id:string,name:string){

 registry.cells.push({
  id,
  type:"implementation",
  name
 })

}

export function listCompanies(){

 return registry.cells.filter(c=>c.type==="implementation")

}


// ===== BLOQUE =====
— Vista gestión empresas
app/system-control/companies/page.tsx
import { listCompanies } from "../../../core/companyManager"

export default function Companies(){

 const companies = listCompanies()

 return(

  <div className="container">

   <h2>Empresas</h2>

   {companies.map(c=>(
    <div key={c.id}>
     {c.name}
    </div>
   ))}

  </div>

 )

}


// ===== BLOQUE =====
— Control fractal desde interfaz
core/fractalController.ts
import { propagateFractal } from "./fractalAdvanced"

export function updateCell(source:string,data:any){

 propagateFractal(source,data)

}


// ===== BLOQUE =====
— Vista control fractal
app/system-control/fractal/page.tsx
"use client"

import { updateCell } from "../../../core/fractalController"

export default function FractalControl(){

 function trigger(){

  updateCell("document_engine",{version:"updated"})

 }

 return(

  <div className="container">

   <h2>Control Fractal</h2>

   <button onClick={trigger}>
    Propagar cambio
   </button>

  </div>

 )

}


// ===== BLOQUE =====
— Configuración engines
core/engineManager.ts
import { registry } from "../registry/systemRegistry"

export function listEngines(){

 return registry.cells.filter(c=>c.type==="engine")

}


// ===== BLOQUE =====
— Vista configuración engines
app/system-control/engines/page.tsx
import { listEngines } from "../../../core/engineManager"

export default function Engines(){

 const engines = listEngines()

 return(

  <div className="container">

   <h2>Engines del sistema</h2>

   {engines.map(e=>(
    <div key={e.id}>
     {e.name}
    </div>
   ))}

  </div>

 )

}


// ===== BLOQUE =====
— Sistema de logs
core/logger.ts
import { save } from "../database/store"

export function log(event:string,data:any){

 save("logs",{

  id:Date.now(),
  event,
  data,
  date:new Date()

 })

}


// ===== BLOQUE =====
— Auditoría del sistema
core/audit.ts
import { log } from "./logger"

export function audit(action:string,user:string,target:string){

 log("audit",{

  action,
  user,
  target

 })

}


// ===== BLOQUE =====
— Registro acciones usuario
core/userActions.ts
import { audit } from "./audit"

export function registerUserAction(user:string,action:string,target:string){

 audit(action,user,target)

}


// ===== BLOQUE =====
— Persistencia empresas
core/companyPersistence.ts
import { save } from "../database/store"
import { listCompanies } from "./companyManager"

export function persistCompanies(){

 const companies=listCompanies()

 companies.forEach(c=>{

  save("cells",c)

 })

}


// ===== BLOQUE =====
— Configuración fractal avanzada
core/fractalConfig.ts
export interface FractalConfig{

 mode:"all"|"selected"|"none"
 targets?:string[]

}


// ===== BLOQUE =====
— Motor configuración fractal
core/fractalEngine.ts
import { propagateFractal } from "./fractalAdvanced"

export function runFractal(source:string,data:any){

 propagateFractal(source,data)

}


// ===== BLOQUE =====
— Registro auditoría en acciones críticas
core/criticalActions.ts
import { audit } from "./audit"

export function criticalUpdate(user:string,target:string){

 audit("critical_update",user,target)

}


// ===== BLOQUE =====
— Inicialización completa SOE
core/bootstrap.ts
import { persistRegistry } from "../registry/persistRegistry"
import { persistUsers } from "../auth/userPersistence"
import { persistCompanies } from "./companyPersistence"

export function bootstrap(){

 persistRegistry()

 persistUsers()

 persistCompanies()

 return "SOE BOOTSTRAP COMPLETE"

}


// ===== BLOQUE =====
— Arranque sistema
app/init/page.tsx
import { bootstrap } from "../../core/bootstrap"

export default function Init(){

 const status=bootstrap()

 return(

  <div className="container">

   <h2>Inicialización sistema</h2>

   {status}

  </div>

 )

}


// ===== BLOQUE =====
— Motor de eventos del sistema
core/eventBus.ts
type Handler = (payload:any)=>void

const listeners: Record<string, Handler[]> = {}

export function on(event:string, handler:Handler){
  if(!listeners[event]) listeners[event] = []
  listeners[event].push(handler)
}

export function emit(event:string, payload:any){
  if(!listeners[event]) return
  listeners[event].forEach(handler => handler(payload))
}


// ===== BLOQUE =====
— Conexión propagación ↔ eventos
core/fractalEvents.ts
import { emit } from "./eventBus"
import { propagateFractal } from "./fractalAdvanced"

export function propagateWithEvent(source:string, payload:any){
  propagateFractal(source, payload)
  emit("fractal.propagated", { source, payload })
}


// ===== BLOQUE =====
— Listener de auditoría automática
core/auditListeners.ts
import { on } from "./eventBus"
import { insertLog } from "@/database/logsRepository"

on("fractal.propagated", async (payload) => {
  await insertLog("fractal.propagated", payload)
})


// ===== BLOQUE =====
— Bootstrap persistente real
core/bootstrapPersistent.ts
import { registry } from "@/registry/systemRegistry"
import { insertCell } from "@/database/cellsRepository"
import { insertLink } from "@/database/linksRepository"

export async function bootstrapPersistent(){

  for(const cell of registry.cells){
    await insertCell(cell)
  }

  for(const link of registry.links){
    await insertLink(link)
  }

  return "SOE PERSISTENT READY"
}


// ===== BLOQUE =====
— Inicialización persistente
app/init/persistent/page.tsx
import { bootstrapPersistent } from "@/core/bootstrapPersistent"

export default async function InitPersistent(){

  const status = await bootstrapPersistent()

  return (
    <div className="container">
      <h2>Inicialización persistente</h2>
      <div>{status}</div>
    </div>
  )
}


// ===== BLOQUE =====
— CORE definitivo base
app/core/page.tsx
import Link from "next/link"

export default function CorePage(){
  return (
    <div className="container">
      <div className="title">SOE — Sistema Operativo Empresarial</div>
      <div className="subtitle">Centro Maestro · Gestión SOE · Art-Talo Systems</div>

      <div className="cards">
        <Link href="/document-engine/manual" className="card">
          <h3>Document Engine</h3>
          <p>Manual técnico y documentos vivos del sistema.</p>
        </Link>

        <Link href="/implementations" className="card">
          <h3>Implementaciones</h3>
          <p>Empresas integradas al ecosistema SOE.</p>
        </Link>

        <Link href="/system-control/fractal" className="card">
          <h3>Control del sistema</h3>
          <p>Accesos · Contexto · Evolución</p>
        </Link>
      </div>
    </div>
  )
}


// ===== BLOQUE =====
— Redirección principal al CORE
app/page.tsx
import { redirect } from "next/navigation"

export default function Home(){
  redirect("/core")
}

