import React, { useMemo } from "react";
import { Plane, Html } from "@react-three/drei";

const panelMaterial = {
  metalness: 0.1,
  roughness: 0.2,
  transparent: true,
  opacity: 0.5
}

// Simple panel that renders title and stringified data
export default function Panel({ title, color="#fff", data }){
  return (
    <group>
      <Plane args={[4,3]}>
        <meshStandardMaterial {...panelMaterial} color={color} />
      </Plane>
      <Html center transform style={{color:"white",userSelect:"none",width:380,height:280,fontSize:14}}>
        <div style={{padding:20,border:`1px solid ${color}`,background:"rgba(0,0,0,0.5)",borderRadius:6}}>
          <h4 style={{marginTop:0,marginBottom:10,borderBottom:`1px solid ${color}`}}>{title}</h4>
          <pre style={{margin:0,fontSize:12,opacity:0.9,whiteSpace:"pre-wrap"}}>
            {JSON.stringify(data,null,2)}
          </pre>
        </div>
      </Html>
    </group>
  );
}