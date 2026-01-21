import React from "react";
export default function ViewToggle({mode,setMode}){
return(
<div style={{display:"flex",gap:8}}>
<button onClick={()=>setMode("kanban")} style={{background:mode==="kanban"?"#2563eb":"#d1d5db",color:mode==="kanban"?"white":"black",padding:"6px 12px",borderRadius:6,border:"none",cursor:"pointer"}}>View Kanban</button>
<button onClick={()=>setMode("list")} style={{background:mode==="list"?"#2563eb":"#d1d5db",color:mode==="list"?"white":"black",padding:"6px 12px",borderRadius:6,border:"none",cursor:"pointer"}}>View List</button>
</div>
);
}
