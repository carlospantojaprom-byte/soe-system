
// ===== BLOQUE =====
— Registro de engines Archivo: engines/enginesRegistry.ts import { registry } from "../registry/systemRegistry"; registry.cells.push( { id: "document_engine", type: "engine", name: "Document Engine" }, { id: "metrics_engine", type: "engine", name: "Metrics Engine" }, { id: "automation_engine", type: "engine", name: "Automation Engine" } );


// ===== BLOQUE =====
— Registro de implementaciones Archivo: implementations/implementationsRegistry.ts import { registry } from "../registry/systemRegistry"; registry.cells.push({ id: "lp", type: "implementation", name: "La Prietita" });


// ===== BLOQUE =====
— Registro de pilares Archivo: implementations/laPrietitaPillars.ts import { registry } from "../registry/systemRegistry"; registry.cells.push( { id: "lp_pillar_commercial", type: "pillar", name: "Pilar Comercial", parent: "lp" }, { id: "lp_pillar_operational", type: "pillar", name: "Pilar Operativo", parent: "lp" }, { id: "lp_pillar_financial", type: "pillar", name: "Pilar Financiero", parent: "lp" } );


// ===== BLOQUE =====
— Conexión engines → implementaciones Archivo: registry/links.ts import { registry } from "./systemRegistry"; registry.links.push( { source: "document_engine", target: "lp" }, { source: "metrics_engine", target: "lp" }, { source: "automation_engine", target: "lp" } );


// ===== BLOQUE =====
— Vista de Implementaciones
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


// ===== BLOQUE =====
— Vista de pilares de empresa
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


// ===== BLOQUE =====
— Registro Metrics Engine
engines/metricsEngine.ts
import { registry } from "../registry/systemRegistry";

registry.cells.push({
  id: "metrics_engine_kpi",
  type: "metric",
  name: "Campaign KPIs"
});


// ===== BLOQUE =====
— Registro automatización
engines/automationEngine.ts
import { registry } from "../registry/systemRegistry";

registry.cells.push({
  id: "automation_engine_rules",
  type: "automation",
  name: "Automation Rules"
});


// ===== BLOQUE =====
— Vista empresa
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


// ===== BLOQUE =====
— Registro conexión flujo comercial
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


// ===== BLOQUE =====
— Persistencia registry
registry/persistRegistry.ts
import { save } from "../database/store"
import { registry } from "./systemRegistry"

export function persistRegistry(){

 registry.cells.forEach(c=>{

  save("cells",c)

 })

}

