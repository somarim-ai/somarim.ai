import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
const CameraControl = ({ target, zoom }) => {
    const { camera } = useThree();
    useFrame(() => {
        const zoomValue = 5 * zoom;
        if (target) {
            const targetPosition = new THREE.Vector3(...target);
            camera.position.lerp(targetPosition.clone().add(new THREE.Vector3(0, 0, zoomValue)), 0.05);
            camera.lookAt(targetPosition);
        }
        else {
            const defaultTarget = new THREE.Vector3(0, 0, 0);
            camera.position.lerp(defaultTarget.clone().add(new THREE.Vector3(0, 0, 15 * zoom)), 0.05);
            camera.lookAt(defaultTarget);
        }
    });
    return null;
};
export default CameraControl;
