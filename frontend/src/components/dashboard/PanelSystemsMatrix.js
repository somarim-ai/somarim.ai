import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
export default function PanelSystemsMatrix({ position }) {
    return (_jsx("group", { position: position, children: _jsxs("mesh", { children: [_jsx("boxGeometry", { args: [2, 1, 0.5] }), _jsx("meshStandardMaterial", { color: "orange", emissive: "darkorange" })] }) }));
}
