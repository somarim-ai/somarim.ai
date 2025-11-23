import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const PanelQuantum = (props) => {
    return (_jsx("group", { ...props, children: _jsxs("mesh", { children: [_jsx("circleGeometry", { args: [1, 32] }), _jsx("meshStandardMaterial", { color: "cyan", emissive: "cyan" })] }) }));
};
export default PanelQuantum;
