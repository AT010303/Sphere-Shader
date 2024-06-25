import { CameraControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Perf } from 'r3f-perf';

import Sphere from './sphere/Sphere';

const Experience = () => {
    return (
        <>
            <Canvas camera={{
                fov: 25,
                position: [0, 0, 7]
            
            }}>
                <color attach="background" args={['#111111']} />
                <Perf position={'top-left'} />
                <CameraControls />
                <Sphere />
            </Canvas>
        </>
    );
};

export default Experience;
