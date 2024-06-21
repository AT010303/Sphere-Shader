import { CameraControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Perf } from 'r3f-perf';

import Sphere from './sphere/Sphere';

const Experience = () => {
    return (
        <>
            <Canvas>
            <color attach="background" args={['#111111']} />
                <Perf position={'top-left'} />
                <CameraControls />
                <ambientLight intensity={1} />
                <directionalLight position={[5, 5, 5]} />
                <Sphere />
            </Canvas>
        </>
    );
};

export default Experience;
