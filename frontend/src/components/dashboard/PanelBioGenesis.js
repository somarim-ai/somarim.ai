import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
export default function PanelBioGenesis({ position }) {
    return (_jsx("group", { position: position, children: _jsxs("mesh", { children: [_jsx("cylinderGeometry", { args: [1, 1, 0.5, 6] }), _jsx("meshStandardMaterial", { color: "lime", emissive: "green" })] }) }));
}
