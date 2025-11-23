import { jsx as _jsx } from "react/jsx-runtime";
import { Canvas } from '@react-three/fiber';
const BackgroundScene = () => {
    return (_jsx(Canvas, { children: _jsx("color", { attach: "background", args: ['#000000'] }) }));
};
export default BackgroundScene;
