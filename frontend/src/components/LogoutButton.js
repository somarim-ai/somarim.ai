import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { Text } from '@react-three/drei';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
export default function LogoutButton(props) {
    const handleLogout = async () => {
        try {
            await signOut(auth);
        }
        catch (error) {
            console.error('Error signing out: ', error);
        }
    };
    return (_jsx(Text, { position: props.position, fontSize: 0.5, color: "white", anchorX: "center", anchorY: "middle", onClick: handleLogout, children: "Logout" }));
}
