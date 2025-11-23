import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
const RegisterForm = ({ onSwitchToLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            onSwitchToLogin();
        }
        catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            }
            else {
                setError('An unknown error occurred.');
            }
        }
        finally {
            setLoading(false);
        }
    };
    const handleSwitchToLogin = (e) => {
        e.preventDefault();
        onSwitchToLogin();
    };
    return (_jsx("div", { style: styles.registerFormContainer, children: _jsxs("form", { onSubmit: handleRegister, style: styles.form, children: [_jsx("h2", { children: "Create Account" }), _jsx("div", { style: styles.inputGroup, children: _jsx("input", { type: "email", placeholder: "Email", value: email, onChange: (e) => setEmail(e.target.value), required: true, style: styles.input }) }), _jsx("div", { style: styles.inputGroup, children: _jsx("input", { type: "password", placeholder: "Password", value: password, onChange: (e) => setPassword(e.target.value), required: true, style: styles.input }) }), _jsx("div", { style: styles.inputGroup, children: _jsx("input", { type: "password", placeholder: "Confirm Password", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), required: true, style: styles.input }) }), _jsx("button", { type: "submit", style: styles.registerButton, disabled: loading, children: loading ? 'Creating Account...' : 'Create Account' }), error && _jsx("p", { style: styles.errorMessage, children: error }), _jsx("div", { style: styles.links, children: _jsx("a", { href: "#", onClick: handleSwitchToLogin, children: "Back to Login" }) })] }) }));
};
const styles = {
    registerFormContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1,
        color: 'white',
        textAlign: 'center',
        backgroundColor: 'rgba(0, 0, 17, 0.8)',
        padding: '40px',
        borderRadius: '10px',
        border: '1px solid rgba(0, 255, 255, 0.3)',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    inputGroup: {
        position: 'relative',
        width: '100%',
        marginBottom: '20px',
    },
    input: {
        width: 'calc(100% - 20px)',
        padding: '10px',
        border: '1px solid #0ff',
        borderRadius: '5px',
        backgroundColor: 'transparent',
        color: 'white',
    },
    registerButton: {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#0ff',
        color: '#000011',
        cursor: 'pointer',
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    errorMessage: {
        color: 'red',
        marginTop: '10px',
    },
    links: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        marginTop: '20px',
    },
};
export default RegisterForm;
