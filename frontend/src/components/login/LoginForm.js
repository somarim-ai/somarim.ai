import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import CognitionScene from './CognitionScene';
const LoginForm = () => {
    const handleLogin = () => {
        // This is where the login logic will go.
        // For now, we will just redirect to the main page.
        window.location.href = '/';
    };
    return (_jsxs("div", { style: {
            "alignItems": "center",
            "backgroundColor": "#000",
            "display": "flex",
            "fontFamily": "'Orbitron', sans-serif",
            "height": "100vh",
            "justifyContent": "center",
            "margin": 0,
            "overflow": "hidden",
            "textAlign": "center"
        }, children: [_jsx(CognitionScene, {}), _jsxs("div", { style: {
                    "animation": "fadeIn 2s ease-in-out",
                    "backdropFilter": "blur(10px)",
                    "backgroundColor": "rgba(17, 24, 39, 0.5)",
                    "border": "1px solid #00aaff",
                    "borderRadius": "20px",
                    "boxShadow": "0 0 40px #00aaff",
                    "color": "white",
                    "maxWidth": "800px",
                    "padding": "60px",
                    "position": "relative",
                    "zIndex": 1
                }, children: [_jsx("h1", { style: {
                            "animation": "slideInFromTop 1s ease-out",
                            "color": "#00aaff",
                            "fontSize": "4em",
                            "fontWeight": "bold",
                            "letterSpacing": "4px",
                            "marginBottom": "20px",
                            "textShadow": "0 0 20px #00aaff",
                            "textTransform": "uppercase"
                        }, children: "OMARIM SOE" }), _jsx("p", { style: {
                            "animation": "slideInFromBottom 1s ease-out",
                            "color": "#9ca3af",
                            "fontSize": "1.5em",
                            "lineHeight": 1.6,
                            "marginBottom": "40px"
                        }, children: "The Sentient Operating Environment for Global Consciousness." }), _jsx("button", { onClick: handleLogin, style: {
                            "animation": "pulse 2s infinite",
                            "backgroundColor": "#00aaff",
                            "border": "none",
                            "borderRadius": "10px",
                            "boxShadow": "0 0 20px #00aaff",
                            "color": "white",
                            "cursor": "pointer",
                            "fontSize": "1.2em",
                            "padding": "15px 30px",
                            "transition": "all 0.3s ease"
                        }, children: "Enter the SOE" })] }), _jsx("style", { children: `
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideInFromTop {
          from { transform: translateY(-50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes slideInFromBottom {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      ` })] }));
};
export default LoginForm;
