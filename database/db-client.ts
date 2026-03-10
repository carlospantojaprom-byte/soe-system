
//BLOCK_BLOQUE 1 — Estructura del proyecto SOE soe-system │ ├ app │ ├ login │ ├ core │ └ implementations │ ├ components │ ├ core │ ├ registry │ ├ engines │ ├ auth │ ├ database │ └ config  

BLOQUE 2 — Registro fractal del sistema Archivo: registry/systemRegistry.ts export type CellType = | "engine" | "implementation" | "pillar" | "module" | "node" | "document" | "automation" | "metric"; export interface Cell { id: string; type: CellType; name: string; parent?: string; config?: any; } export interface Link { source: string; target: string; rule?: string; } export const registry = { cells: [] as Cell[], links: [] as Link[] };

BLOQUE 3 — Motor de propagación fractal Archivo: core/fractalPropagation.ts import { registry } from "../registry/systemRegistry"; export function propagate(sourceId: string, payload: any) { const links = registry.links.filter(l => l.source === sourceId); links.forEach(link => { const target = registry.cells.find(c => c.id === link.target); if (target) { target.config = { ...target.config, ...payload }; } }); } 

BLOQUE 4 — Registro de engines Archivo: engines/enginesRegistry.ts import { registry } from "../registry/systemRegistry"; registry.cells.push( { id: "document_engine", type: "engine", name: "Document Engine" }, { id: "metrics_engine", type: "engine", name: "Metrics Engine" }, { id: "automation_engine", type: "engine", name: "Automation Engine" } ); 

BLOQUE 5 — Registro de implementaciones Archivo: implementations/implementationsRegistry.ts import { registry } from "../registry/systemRegistry"; registry.cells.push({ id: "lp", type: "implementation", name: "La Prietita" }); 

BLOQUE 6 — Registro de pilares Archivo: implementations/laPrietitaPillars.ts import { registry } from "../registry/systemRegistry"; registry.cells.push( { id: "lp_pillar_commercial", type: "pillar", name: "Pilar Comercial", parent: "lp" }, { id: "lp_pillar_operational", type: "pillar", name: "Pilar Operativo", parent: "lp" }, { id: "lp_pillar_financial", type: "pillar", name: "Pilar Financiero", parent: "lp" } ); 

BLOQUE 7 — Sistema de usuarios Archivo: auth/users.ts export type Role = "CORE" | "OPERADOR" | "CLIENTE"; export interface User { id: string; email: string; password: string; role: Role; } export const users: User[] = [ { id: "core", email: "core@soe.system", password: "admin", role: "CORE" } ]; 

BLOQUE 8 — Login básico Archivo: auth/login.ts import { users } from "./users"; export function login(email: string, password: string) { const user = users.find( u => u.email === email && u.password === password ); if (!user) { throw new Error("Invalid credentials"); } return user; } 

BLOQUE 9 — Conexión engines → implementaciones Archivo: registry/links.ts import { registry } from "./systemRegistry"; registry.links.push( { source: "document_engine", target: "lp" }, { source: "metrics_engine", target: "lp" }, { source: "automation_engine", target: "lp" } ); 

BLOQUE 10 — Núcleo SOE Archivo: core/soeCore.ts import "../engines/enginesRegistry"; import "../implementations/implementationsRegistry"; import "../implementations/laPrietitaPillars"; import "../registry/links"; export function initSOE() { return { status: "SOE INITIALIZED" }; }

BLOQUE 11 — Entrada del sistema
app/core/page.ts
import { initSOE } from "../../core/soeCore";

export default function core() {
  const system = initSOE();

  return system;

}BLOQUE 12 — Componente de tarjeta del sistema

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

BLOQUE 13 — Estilos globales del sistema
styles/globals.css
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background: #f4f6f9;
}

.container {
  max-width: 1200px;
  margin: auto;
  padding: 40px;
}

.title {
  font-size: 32px;
  font-weight: bold;
}

.subtitle {
  color: #666;
  margin-bottom: 40px;
}

.cards {
  display: flex;
  gap: 20px;
}

.card {
  background: white;
  padding: 24px;
  border-radius: 8px;
  width: 260px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}

BLOQUE 14 — Layout base del sistema
app/layout.tsx
import "../styles/globals.css";

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}

BLOQUE 15 — Interfaz SOE Core
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

BLOQUE 16 — Vista de Implementaciones
app/implementations/page.tsx
import { registry } from "../../registry/systemRegistry";

export default function Implementations() {

  const implementations = registry.cells.filter(
    c => c.type === "implementation"
  );

  return (
    <div className="container">

      <h2>Implementaciones</h2>

      {implementations.map(i => (
        <div key={i.id}>
          {i.name}
        </div>
      ))}

    </div>
  );
}
BLOQUE 17 — Vista de pilares de empresa
app/implementations/[id]/page.tsx
import { registry } from "../../../registry/systemRegistry";

export default function Implementation({ params }: any) {

  const pillars = registry.cells.filter(
    c => c.parent === params.id
  );

  return (
    <div className="container">

      <h2>Pilares</h2>

      {pillars.map(p => (
        <div key={p.id}>
          {p.name}
        </div>
      ))}

    </div>
  );
}

BLOQUE 18 — Vista Document Engine
app/document-engine/page.tsx
export default function DocumentEngine() {
  return (
    <div className="container">

      <h2>Document Engine</h2>

      <p>
        Manual técnico y documentos vivos del sistema.
      </p>

    </div>
  );
}

BLOQUE 19 — Control del sistema
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

BLOQUE 20 — Conexión navegación
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

BLOQUE 21 — Actualización tarjetas
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
          link="/document-engine"
        />

        <SystemCard
          title="Implementaciones"
          description="Empresas integradas al ecosistema SOE."
          link="/implementations"
        />

        <SystemCard
          title="Control del sistema"
          description="Accesos · Contexto · Evolución"
          link="/system-control"
        />

      </div>

    </div>
  );
}

BLOQUE 22 — Sistema de sesión
auth/session.ts
import { User } from "./users";

let activeSession: User | null = null;

export function setSession(user: User) {
  activeSession = user;
}

export function getSession() {
  return activeSession;
}

export function logout() {
  activeSession = null;
}

BLOQUE 23 — Login handler
auth/authService.ts
import { login } from "./login";
import { setSession } from "./session";

export function authenticate(email: string, password: string) {
  const user = login(email, password);
  setSession(user);
  return user;
}

BLOQUE 24 — Página de login
app/login/page.tsx
"use client";

import { useState } from "react";
import { authenticate } from "../../auth/authService";

export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    try {
      authenticate(email, password);
      window.location.href = "/";
    } catch {
      alert("Credenciales inválidas");
    }
  }

  return (
    <div className="container">

      <h2>Login SOE</h2>

      <input
        placeholder="email"
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="password"
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>
        Ingresar
      </button>

    </div>
  );
}

BLOQUE 25 — Protección por sesión
core/authGuard.ts
import { getSession } from "../auth/session";

export function requireSession() {
  const session = getSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  return session;
}

BLOQUE 26 — Control por rol
core/roleGuard.ts
import { Role } from "../auth/users";

export function requireRole(userRole: Role, required: Role) {

  if (userRole !== required) {
    throw new Error("Insufficient permissions");
  }

}

BLOQUE 27 — Protección de interfaz principal
app/page.tsx

(agregado control)

import SystemCard from "../components/SystemCard";
import { getSession } from "../auth/session";

export default function Home() {

  const session = getSession();

  if (!session) {
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    return null;
  }

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
          link="/document-engine"
        />

        <SystemCard
          title="Implementaciones"
          description="Empresas integradas al ecosistema SOE."
          link="/implementations"
        />

        <SystemCard
          title="Control del sistema"
          description="Accesos · Contexto · Evolución"
          link="/system-control"
        />

      </div>

    </div>
  );
}

BLOQUE 28 — Registro Metrics Engine
engines/metricsEngine.ts
import { registry } from "../registry/systemRegistry";

registry.cells.push({
  id: "metrics_engine_kpi",
  type: "metric",
  name: "Campaign KPIs"
});

BLOQUE 29 — Panel de métricas
app/metrics/page.tsx
export default function Metrics() {

  const data = [
    { name: "Resultados", value: 43 },
    { name: "CTR", value: 3.1 },
    { name: "Costo Resultado", value: 22 },
    { name: "Impresiones", value: 18000 }
  ];

  return (
    <div className="container">

      <h2>KPIs del sistema comercial</h2>

      {data.map(metric => (
        <div key={metric.name}>
          {metric.name}: {metric.value}
        </div>
      ))}

    </div>
  );
}

BLOQUE 30 — Integración Funnel SIAE
integrations/funnelSIAE.ts
export async function fetchCampaignMetrics() {

  // placeholder para conexión real a Funnel SIAE

  return {
    results: 43,
    ctr: 3.1,
    cost: 22,
    impressions: 18000
  };

}

BLOQUE 31 — Conexión Metrics Engine → Funnel
engines/metricsEngineConnector.ts
import { fetchCampaignMetrics } from "../integrations/funnelSIAE";

export async function loadMetrics() {

  const metrics = await fetchCampaignMetrics();

  return metrics;

}

BLOQUE 32 — Registro automatización
engines/automationEngine.ts
import { registry } from "../registry/systemRegistry";

registry.cells.push({
  id: "automation_engine_rules",
  type: "automation",
  name: "Automation Rules"
});

BLOQUE 33 — Panel automatización
app/automation/page.tsx
export default function Automation() {

  return (
    <div className="container">

      <h2>Automation Engine</h2>

      <p>
        Gestión de reglas automatizadas del sistema.
      </p>

    </div>
  );
}

BLOQUE 34 — Dashboard CORE del sistema
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

BLOQUE 35 — Vista empresa
app/company/[id]/page.tsx
import { registry } from "../../../registry/systemRegistry";

export default function CompanyView({ params }: any) {

  const pillars = registry.cells.filter(
    c => c.parent === params.id
  );

  return (
    <div className="container">

      <h2>Empresa</h2>

      {pillars.map(p => (
        <div key={p.id}>{p.name}</div>
      ))}

    </div>
  );
}

BLOQUE 36 — Flujo comercial visual
components/CommercialFlow.tsx
export default function CommercialFlow() {

  const flow = [
    "Funnel SIAE",
    "Meta Ads",
    "Nodo Disparador",
    "ManyChat",
    "Cotizadores",
    "AT-Nexus"
  ];

  return (
    <div>

      <h3>Flujo Comercial</h3>

      {flow.map((f,i) => (
        <div key={i}>
          {f}
        </div>
      ))}

    </div>
  );
}

BLOQUE 37 — Nodo disparador de intención
nodes/intentTrigger.ts
export function intentTrigger(data:any){

  return {
    captured:true,
    payload:data
  };

}

BLOQUE 38 — Conexión ManyChat
integrations/manychat.ts
export async function sendToManyChat(lead:any){

  return {
    status:"sent",
    lead
  };

}

BLOQUE 39 — Conexión AT-NEXUS
integrations/atNexus.ts
export function sendToATNexus(data:any){

  return {
    stored:true,
    data
  };

}

BLOQUE 40 — Propagación fractal avanzada
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

BLOQUE 41 — Dashboard empresa
app/company/[id]/dashboard/page.tsx
import CommercialFlow from "../../../../components/CommercialFlow";

export default function CompanyDashboard(){

  return(

    <div className="container">

      <h2>Dashboard Comercial</h2>

      <CommercialFlow/>

    </div>

  );

}

BLOQUE 42 — Registro nodo disparador en registry
nodes/registerNodes.ts
import { registry } from "../registry/systemRegistry";

registry.cells.push({

  id:"intent_trigger",
  type:"node",
  name:"Nodo Disparador de Intención"

});

BLOQUE 43 — Registro conexión flujo comercial
registry/commercialLinks.ts
import { registry } from "./systemRegistry";

registry.links.push(

  {
    source:"intent_trigger",
    target:"automation_engine_rules"
  },

  {
    source:"intent_trigger",
    target:"metrics_engine_kpi"
  }

);

BLOQUE 44 — Motor de KPIs visuales
engines/kpiEngine.ts
export interface KPI {
  name: string
  value: number
}

export function buildKPI(data:any):KPI[] {

  return [
    { name:"Resultados", value:data.results },
    { name:"CTR", value:data.ctr },
    { name:"Costo Resultado", value:data.cost },
    { name:"Impresiones", value:data.impressions }
  ]

}

BLOQUE 45 — Componente gráfico KPIs
components/KPIChart.tsx
"use client"

import { KPI } from "../engines/kpiEngine"

export default function KPIChart({ data }: { data: KPI[] }) {

  return (

    <div>

      <h3>KPIs Campañas</h3>

      {data.map(k => (

        <div key={k.name}>
          {k.name} : {k.value}
        </div>

      ))}

    </div>

  )

}

BLOQUE 46 — Vista KPIs sistema comercial
app/company/[id]/metrics/page.tsx
import KPIChart from "../../../../components/KPIChart"
import { buildKPI } from "../../../../engines/kpiEngine"
import { loadMetrics } from "../../../../engines/metricsEngineConnector"

export default async function Metrics() {

  const raw = await loadMetrics()

  const kpis = buildKPI(raw)

  return (

    <div className="container">

      <h2>Métricas Comerciales</h2>

      <KPIChart data={kpis} />

    </div>

  )

}

BLOQUE 47 — Motor reglas comerciales
engines/commercialRules.ts
export interface CommercialRule {

  name:string
  condition:(data:any)=>boolean
  action:(data:any)=>void

}

export const rules:CommercialRule[]=[]

BLOQUE 48 — Registro reglas ejemplo
engines/registerRules.ts
import { rules } from "./commercialRules"

rules.push({

  name:"Costo Alto",

  condition:(data)=> data.cost > 25,

  action:(data)=>{
    console.log("Sugerencia: optimizar anuncio")
  }

})

BLOQUE 49 — Evaluador de reglas
engines/ruleEngine.ts
import { rules } from "./commercialRules"

export function evaluateRules(data:any){

  rules.forEach(rule=>{

    if(rule.condition(data)){

      rule.action(data)

    }

  })

}

BLOQUE 50 — Document Engine conectado al manual
engines/documentEngine.ts
export interface DocumentNode {

  id:string
  title:string
  path:string

}

export const documents:DocumentNode[]=[
  {
    id:"manual_soe",
    title:"Manual Técnico SOE",
    path:"/docs/manual"
  }
]

BLOQUE 51 — Vista Document Engine
app/document-engine/manual/page.tsx
import { documents } from "../../../engines/documentEngine"

export default function Manual(){

  return(

    <div className="container">

      <h2>Document Engine</h2>

      {documents.map(d=>(
        <div key={d.id}>
          {d.title}
        </div>
      ))}

    </div>

  )

}

BLOQUE 52 — Propagación fractal entre empresas
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

BLOQUE 53 — Panel operador
app/operator/page.tsx
export default function OperatorPanel(){

  return(

    <div className="container">

      <h2>Panel Operador</h2>

      <p>Gestión operativa del sistema</p>

    </div>

  )

}

BLOQUE 54 — Panel cliente
app/client/page.tsx
export default function ClientPanel(){

  return(

    <div className="container">

      <h2>Panel Cliente</h2>

      <p>Vista asignada al cliente</p>

    </div>

  )

}

BLOQUE 55 — Control acceso por rol
core/roleRouting.ts
import { Role } from "../auth/users"

export function roleHome(role:Role){

  if(role==="CORE") return "/core/dashboard"
  if(role==="OPERADOR") return "/operator"
  if(role==="CLIENTE") return "/client"

  return "/"

}

BLOQUE 56 — Inicialización completa del sistema
core/initSystem.ts
import "../engines/enginesRegistry"
import "../engines/metricsEngine"
import "../engines/automationEngine"
import "../engines/registerRules"

import "../implementations/implementationsRegistry"
import "../implementations/laPrietitaPillars"

import "../nodes/registerNodes"
import "../registry/commercialLinks"

export function initSystem(){

  return "SOE READY"

}

BLOQUE 57 — Componente navegación del sistema
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

BLOQUE 58 — Integración navegación en layout
app/layout.tsx

Actualización

import "../styles/globals.css"
import Navigation from "../components/Navigation"

export default function RootLayout({
 children
}:{children:React.ReactNode}){

 return(

  <html lang="es">

   <body>

    <Navigation/>

    {children}

   </body>

  </html>

 )

}

BLOQUE 59 — Gestión de usuarios
core/userManager.ts
import { users, User } from "../auth/users"

export function createUser(user:User){

 users.push(user)

}

export function listUsers(){

 return users

}

BLOQUE 60 — Vista gestión usuarios
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

BLOQUE 61 — Gestión de empresas
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

BLOQUE 62 — Vista gestión empresas
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

BLOQUE 63 — Control fractal desde interfaz
core/fractalController.ts
import { propagateFractal } from "./fractalAdvanced"

export function updateCell(source:string,data:any){

 propagateFractal(source,data)

}

BLOQUE 64 — Vista control fractal
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

BLOQUE 65 — Configuración engines
core/engineManager.ts
import { registry } from "../registry/systemRegistry"

export function listEngines(){

 return registry.cells.filter(c=>c.type==="engine")

}

BLOQUE 66 — Vista configuración engines
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

BLOQUE 67 — Dashboard visual avanzado
components/KPIDashboard.tsx
"use client"

export default function KPIDashboard(){

 const data=[

  {name:"Resultados",value:43},
  {name:"CTR",value:3.1},
  {name:"Costo",value:22}

 ]

 return(

  <div>

   <h3>Dashboard KPIs</h3>

   {data.map(d=>(
    <div key={d.name}>
     {d.name}: {d.value}
    </div>
   ))}

  </div>

 )

}

BLOQUE 68 — Dashboard empresa integrado
app/company/[id]/dashboard/page.tsx

Actualización

import CommercialFlow from "../../../../components/CommercialFlow"
import KPIDashboard from "../../../../components/KPIDashboard"

export default function CompanyDashboard(){

 return(

  <div className="container">

   <h2>Dashboard Comercial</h2>

   <KPIDashboard/>

   <CommercialFlow/>

  </div>

 )

}

BLOQUE 69 — Persistencia básica del sistema
database/store.ts
const db:any = {
 users:[],
 cells:[],
 logs:[]
}

export function save(collection:string,data:any){

 if(!db[collection]) db[collection]=[]

 db[collection].push(data)

}

export function get(collection:string){

 return db[collection] || []

}

export function update(collection:string,id:string,data:any){

 const item=db[collection].find((x:any)=>x.id===id)

 if(item){

  Object.assign(item,data)

 }

}

BLOQUE 70 — Persistencia registry
registry/persistRegistry.ts
import { save } from "../database/store"
import { registry } from "./systemRegistry"

export function persistRegistry(){

 registry.cells.forEach(c=>{

  save("cells",c)

 })

}

BLOQUE 71 — Sistema de logs
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

BLOQUE 72 — Auditoría del sistema
core/audit.ts
import { log } from "./logger"

export function audit(action:string,user:string,target:string){

 log("audit",{

  action,
  user,
  target

 })

}

BLOQUE 73 — Registro acciones usuario
core/userActions.ts
import { audit } from "./audit"

export function registerUserAction(user:string,action:string,target:string){

 audit(action,user,target)

}

BLOQUE 74 — Persistencia usuarios
auth/userPersistence.ts
import { save } from "../database/store"
import { users } from "./users"

export function persistUsers(){

 users.forEach(u=>{

  save("users",u)

 })

}

BLOQUE 75 — Persistencia empresas
core/companyPersistence.ts
import { save } from "../database/store"
import { listCompanies } from "./companyManager"

export function persistCompanies(){

 const companies=listCompanies()

 companies.forEach(c=>{

  save("cells",c)

 })

}

BLOQUE 76 — Logs visibles desde interfaz
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

BLOQUE 77 — Configuración fractal avanzada
core/fractalConfig.ts
export interface FractalConfig{

 mode:"all"|"selected"|"none"
 targets?:string[]

}

BLOQUE 78 — Motor configuración fractal
core/fractalEngine.ts
import { propagateFractal } from "./fractalAdvanced"

export function runFractal(source:string,data:any){

 propagateFractal(source,data)

}

BLOQUE 79 — Registro auditoría en acciones críticas
core/criticalActions.ts
import { audit } from "./audit"

export function criticalUpdate(user:string,target:string){

 audit("critical_update",user,target)

}

BLOQUE 80 — Inicialización completa SOE
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

BLOQUE 81 — Arranque sistema
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

BLOQUE 82 — Cliente PostgreSQL / Supabase
database/client.ts
import { createClient } from "@supabase/supabase-js"

export const db = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

BLOQUE 83 — Persistencia real de cells
database/cellsRepository.ts
import { db } from "./client"

export async function insertCell(cell:any){
  return db.from("cells").insert(cell)
}

export async function updateCell(id:string,data:any){
  return db.from("cells").update(data).eq("id",id)
}

export async function listCells(){
  return db.from("cells").select("*")
}

BLOQUE 84 — Persistencia real de links
database/linksRepository.ts
import { db } from "./client"

export async function insertLink(link:any){
  return db.from("links").insert(link)
}

export async function listLinks(){
  return db.from("links").select("*")
}

BLOQUE 85 — Persistencia real de usuarios
database/usersRepository.ts
import { db } from "./client"

export async function insertUser(user:any){
  return db.from("users").insert(user)
}

export async function listUsers(){
  return db.from("users").select("*")
}

BLOQUE 86 — SQL base del sistema
database/schema.sql
create table if not exists users (
  id text primary key,
  email text unique not null,
  role text not null,
  access_scope jsonb,
  created_at timestamp default now()
);

create table if not exists cells (
  id text primary key,
  type text not null,
  name text not null,
  parent text,
  origin text,
  config jsonb,
  state text default 'activo',
  created_at timestamp default now()
);

create table if not exists links (
  id bigserial primary key,
  source text not null,
  target text not null,
  rule text,
  created_at timestamp default now()
);

create table if not exists logs (
  id bigserial primary key,
  event text not null,
  payload jsonb,
  created_at timestamp default now()
);

BLOQUE 87 — API cells
app/api/cells/route.ts
import { NextResponse } from "next/server"
import { listCells, insertCell } from "@/database/cellsRepository"

export async function GET(){
  const { data, error } = await listCells()
  if(error) return NextResponse.json({ error }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req:Request){
  const body = await req.json()
  const { data, error } = await insertCell(body)
  if(error) return NextResponse.json({ error }, { status: 500 })
  return NextResponse.json(data)
}

BLOQUE 88 — API links
app/api/links/route.ts
import { NextResponse } from "next/server"
import { listLinks, insertLink } from "@/database/linksRepository"

export async function GET(){
  const { data, error } = await listLinks()
  if(error) return NextResponse.json({ error }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req:Request){
  const body = await req.json()
  const { data, error } = await insertLink(body)
  if(error) return NextResponse.json({ error }, { status: 500 })
  return NextResponse.json(data)
}

BLOQUE 89 — API users
app/api/users/route.ts
import { NextResponse } from "next/server"
import { listUsers, insertUser } from "@/database/usersRepository"

export async function GET(){
  const { data, error } = await listUsers()
  if(error) return NextResponse.json({ error }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req:Request){
  const body = await req.json()
  const { data, error } = await insertUser(body)
  if(error) return NextResponse.json({ error }, { status: 500 })
  return NextResponse.json(data)
}

BLOQUE 90 — Motor de eventos del sistema
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

BLOQUE 91 — Conexión propagación ↔ eventos
core/fractalEvents.ts
import { emit } from "./eventBus"
import { propagateFractal } from "./fractalAdvanced"

export function propagateWithEvent(source:string, payload:any){
  propagateFractal(source, payload)
  emit("fractal.propagated", { source, payload })
}

BLOQUE 92 — Logger persistente
database/logsRepository.ts
import { db } from "./client"

export async function insertLog(event:string,payload:any){
  return db.from("logs").insert({
    event,
    payload
  })
}

export async function listLogs(){
  return db.from("logs").select("*").order("created_at", { ascending:false })
}

BLOQUE 93 — Listener de auditoría automática
core/auditListeners.ts
import { on } from "./eventBus"
import { insertLog } from "@/database/logsRepository"

on("fractal.propagated", async (payload) => {
  await insertLog("fractal.propagated", payload)
})

BLOQUE 94 — Bootstrap persistente real
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

BLOQUE 95 — Inicialización persistente
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

BLOQUE 96 — Integración real de métricas Funnel SIAE
integrations/funnelSIAEReal.ts
export async function fetchFunnelSIAEReal(){
  const res = await fetch(process.env.NEXT_PUBLIC_FUNNEL_SIAE_URL!)
  if(!res.ok) throw new Error("Funnel SIAE unavailable")
  return res.json()
}

BLOQUE 97 — Metrics Engine real
engines/metricsEngineReal.ts
import { fetchFunnelSIAEReal } from "@/integrations/funnelSIAEReal"
import { evaluateRules } from "./ruleEngine"

export async function loadMetricsReal(){
  const data = await fetchFunnelSIAEReal()
  evaluateRules(data)
  return data
}

BLOQUE 98 — Vista KPIs real
app/company/[id]/metrics-real/page.tsx
import KPIChart from "@/components/KPIChart"
import { buildKPI } from "@/engines/kpiEngine"
import { loadMetricsReal } from "@/engines/metricsEngineReal"

export default async function MetricsReal(){

  const raw = await loadMetricsReal()
  const kpis = buildKPI(raw)

  return (
    <div className="container">
      <h2>Métricas Comerciales Reales</h2>
      <KPIChart data={kpis} />
    </div>
  )
}

BLOQUE 99 — CORE definitivo base
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

BLOQUE 100 — Redirección principal al CORE
app/page.tsx
import { redirect } from "next/navigation"

export default function Home(){
  redirect("/core")
}


// ===== BLOQUE =====
— Persistencia básica del sistema
database/store.ts
const db:any = {
 users:[],
 cells:[],
 logs:[]
}

export function save(collection:string,data:any){

 if(!db[collection]) db[collection]=[]

 db[collection].push(data)

}

export function get(collection:string){

 return db[collection] || []

}

export function update(collection:string,id:string,data:any){

 const item=db[collection].find((x:any)=>x.id===id)

 if(item){

  Object.assign(item,data)

 }

}


// ===== BLOQUE =====
— Cliente PostgreSQL / Supabase
database/client.ts
import { createClient } from "@supabase/supabase-js"

export const db = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)


// ===== BLOQUE =====
— Persistencia real de cells
database/cellsRepository.ts
import { db } from "./client"

export async function insertCell(cell:any){
  return db.from("cells").insert(cell)
}

export async function updateCell(id:string,data:any){
  return db.from("cells").update(data).eq("id",id)
}

export async function listCells(){
  return db.from("cells").select("*")
}


// ===== BLOQUE =====
— Persistencia real de links
database/linksRepository.ts
import { db } from "./client"

export async function insertLink(link:any){
  return db.from("links").insert(link)
}

export async function listLinks(){
  return db.from("links").select("*")
}


// ===== BLOQUE =====
— Persistencia real de usuarios
database/usersRepository.ts
import { db } from "./client"

export async function insertUser(user:any){
  return db.from("users").insert(user)
}

export async function listUsers(){
  return db.from("users").select("*")
}


// ===== BLOQUE =====
— Logger persistente
database/logsRepository.ts
import { db } from "./client"

export async function insertLog(event:string,payload:any){
  return db.from("logs").insert({
    event,
    payload
  })
}

export async function listLogs(){
  return db.from("logs").select("*").order("created_at", { ascending:false })
}

