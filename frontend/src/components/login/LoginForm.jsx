
import React, { useState } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export default function LoginForm({ onSwitchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.loginFormContainer}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2>OMARIM SOE</h2>
        <p>Connect to the AI Core</p>

        <div style={styles.inputGroup}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <span onClick={() => setShowPassword(!showPassword)} style={styles.showHide}>👁</span>
        </div>

        <button type="submit" style={styles.loginButton} disabled={loading}>
          {loading ? 'Connecting...' : 'Login'}
        </button>

        {error && <p style={styles.errorMessage}>{error}</p>}

        <div style={styles.links}>
          <a href="#" onClick={onSwitchToRegister}>Create account</a>
        </div>

        <div style={styles.divider}></div>

        <button type="button" onClick={handleGoogleLogin} style={styles.googleButton}>Login with Google</button>
        <button type="button" style={styles.magicLinkButton}>Login with Magic Link</button>
        <button type="button" style={styles.voiceAuthButton}>Voice Authentication</button>

      </form>
    </div>
  );
}

const styles = {
  loginFormContainer: {
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
  showHide: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
  },
  loginButton: {
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
  divider: {
    height: '1px',
    width: '100%',
    backgroundColor: 'rgba(0, 255, 255, 0.3)',
    margin: '20px 0',
  },
  googleButton: {
    backgroundColor: '#db4437',
    border: '1px solid #db4437',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '10px',
    width: '100%',
  },
  magicLinkButton: {
    backgroundColor: 'transparent',
    border: '1px solid #0ff',
    color: '#0ff',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '10px',
    width: '100%',
  },
    voiceAuthButton: {
    backgroundColor: 'transparent',
    border: '1px solid #90f',
    color: '#90f',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
  },
};
