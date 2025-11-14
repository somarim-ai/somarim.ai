
import React from 'react';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';

export default function DashboardShell({ loggedIn }) {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (!loggedIn) {
    return null;
  }

  return (
    <div style={styles.dashboardContainer}>
      <div style={styles.header}>
        <h1>Welcome to the Dashboard</h1>
        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
      </div>
      <div style={styles.content}>
        <p>This is your dashboard. You can add your components and content here.</p>
      </div>
    </div>
  );
}

const styles = {
  dashboardContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    color: 'white',
    textAlign: 'center',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  content: {
    backgroundColor: 'rgba(0, 0, 17, 0.8)',
    padding: '40px',
    borderRadius: '10px',
    border: '1px solid rgba(0, 255, 255, 0.3)',
  },
  logoutButton: {
    padding: '10px 20px',
    backgroundColor: '#FF0000',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  }
};
