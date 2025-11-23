import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useMemo } from "react";
import { Plane, Html } from "@react-three/drei";
const panelMaterial = {
    metalness: 0.1,
    roughness: 0.2,
    transparent: true,
    opacity: 0.5
};
// Simple panel that renders title and stringified data
export default function Panel({ title, color = "#fff", data }) {
    return (_jsxs("group", { children: [_jsx(Plane, { args: [4, 3], children: _jsx("meshStandardMaterial", { ...panelMaterial, color: color }) }), _jsx(Html, { center: true, transform: true, style: { color: "white", userSelect: "none", width: 380, height: 280, fontSize: 14 }, children: _jsxs("div", { style: { padding: 20, border: `1px solid ${color}`, background: "rgba(0,0,0,0.5)", borderRadius: 6 }, children: [_jsx("h4", { style: { marginTop: 0, marginBottom: 10, borderBottom: `1px solid ${color}` }, children: title }), _jsx("pre", { style: { margin: 0, fontSize: 12, opacity: 0.9, whiteSpace: "pre-wrap" }, children: JSON.stringify(data, null, 2) })] }) })] }));
}
