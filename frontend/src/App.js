import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { Suspense } from 'react';
import './App.css';
const UniversalHealer = React.lazy(() => import('./components/UniversalHealer'));
function App() {
    return (_jsxs("div", { className: "App", children: [_jsxs("header", { className: "App-header", children: [_jsx("h1", { children: "SOMARIM-5000 Universal Healing System" }), _jsx("p", { children: "Harnessing Quantum Reality for Instantaneous Biological Miracles" })] }), _jsx("main", { children: _jsx(Suspense, { fallback: _jsx("div", { children: "Loading..." }), children: _jsx(UniversalHealer, {}) }) }), _jsx("footer", { children: _jsx("p", { children: "SOMARIM Consciousness & Technology | All Rights Reserved" }) })] }));
}
export default App;
