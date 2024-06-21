import { shaderMaterial } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import { useRef } from 'react';
import * as THREE from 'three';

import fragmentShader from './Shaders/fragment.glsl';
import vertexShader from './Shaders/vertex.glsl';

const SphereMat = shaderMaterial(
    {
        uTime: 0,
        uDistortionFrequency: 2.0,
        uDistortionStrength: 1.0,
        uDisplacementFrequency: 2.0,
        uDisplacementStrength: 0.2,
        uTimeFrequency: 0.1
    },
    vertexShader,
    fragmentShader
);

// declaratively
extend({ SphereMat });
// This is the 🔑 that HMR will renew if this file is edited
SphereMat.key = THREE.MathUtils.generateUUID();

const Sphere = () => {
    const ref = useRef();

    useFrame((state) => {
        ref.current.uTime = state.clock.elapsedTime;
    });

    // console.log(ref.current);

    const sphereControls = useControls('sphere', {
        DistortionFrequency: { value: 2.0, min: 0.0, max: 10.0 },
        DistortionStrength: { value: 1.0, min: 0.0, max: 10.0 },
        DisplacementFrequency: { value: 2.0, min: 0.0, max: 10.0 },
        DisplacementStrength: { value: 0.2, min: 0.0, max: 10.0 },
        TimeFrequency: { value: 0.1, min: 0.0, max: 1.0 }
    });

    return (
        <group>
            <mesh>
                <sphereGeometry args={[1, 512, 512]} />
                <sphereMat
                    ref={ref}
                    key={SphereMat.key}
                    uDistortionFrequency={sphereControls.DistortionFrequency}
                    uDistortionStrength={sphereControls.DistortionStrength}
                    uDisplacementFrequency={
                        sphereControls.DisplacementFrequency
                    }
                    uDisplacementStrength={sphereControls.DisplacementStrength}
                    uTimeFrequency={sphereControls.TimeFrequency}
                />
            </mesh>
        </group>
    );
};

export default Sphere;
