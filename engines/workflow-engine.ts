
// ===== BLOQUE =====
— Vista Document Engine
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


// ===== BLOQUE =====
— Actualización tarjetas
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


// ===== BLOQUE =====
— Protección de interfaz principal
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


// ===== BLOQUE =====
— Conexión Metrics Engine → Funnel
engines/metricsEngineConnector.ts
import { fetchCampaignMetrics } from "../integrations/funnelSIAE";

export async function loadMetrics() {

  const metrics = await fetchCampaignMetrics();

  return metrics;

}


// ===== BLOQUE =====
— Panel automatización
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


// ===== BLOQUE =====
— Motor de KPIs visuales
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


// ===== BLOQUE =====
— Componente gráfico KPIs
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


// ===== BLOQUE =====
— Vista KPIs sistema comercial
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


// ===== BLOQUE =====
— Motor reglas comerciales
engines/commercialRules.ts
export interface CommercialRule {

  name:string
  condition:(data:any)=>boolean
  action:(data:any)=>void

}

export const rules:CommercialRule[]=[]


// ===== BLOQUE =====
— Registro reglas ejemplo
engines/registerRules.ts
import { rules } from "./commercialRules"

rules.push({

  name:"Costo Alto",

  condition:(data)=> data.cost > 25,

  action:(data)=>{
    console.log("Sugerencia: optimizar anuncio")
  }

})


// ===== BLOQUE =====
— Evaluador de reglas
engines/ruleEngine.ts
import { rules } from "./commercialRules"

export function evaluateRules(data:any){

  rules.forEach(rule=>{

    if(rule.condition(data)){

      rule.action(data)

    }

  })

}


// ===== BLOQUE =====
— Vista Document Engine
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


// ===== BLOQUE =====
— Metrics Engine real
engines/metricsEngineReal.ts
import { fetchFunnelSIAEReal } from "@/integrations/funnelSIAEReal"
import { evaluateRules } from "./ruleEngine"

export async function loadMetricsReal(){
  const data = await fetchFunnelSIAEReal()
  evaluateRules(data)
  return data
}


// ===== BLOQUE =====
— Vista KPIs real
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

