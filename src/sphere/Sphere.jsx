import { shaderMaterial } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import { useEffect, useRef } from 'react';
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
        uTimeFrequency: 0.1,
        uLightAColor: new THREE.Color('#ff0000'),
        uLightAPosition: new THREE.Vector3(1.0, 1.0, 0.0),
        uLightAIntensity: 1.0,
        uLightBColor: new THREE.Color('#0000ff'),
        uLightBPosition: new THREE.Vector3(-1.0, -1.0, 0.0),
        uLightBIntensity: 1.0
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
    const sphereRef = useRef();

    // ref.current.computeTangents();

    useFrame((state) => {
        ref.current.uTime = state.clock.elapsedTime;
    });

    useEffect(() => {
        if (sphereRef.current) {
            sphereRef.current.computeTangents();
            console.log(sphereRef.current);
        }
    }, [sphereRef]);

    console.log(ref.current);

    const sphereControls = useControls('sphere', {
        DistortionFrequency: { value: 2.0, min: 0.0, max: 10.0 },
        DistortionStrength: { value: 1.0, min: 0.0, max: 10.0 },
        DisplacementFrequency: { value: 2.0, min: 0.0, max: 10.0 },
        DisplacementStrength: { value: 0.2, min: 0.0, max: 3.0, step: 0.1 },
        TimeFrequency: { value: 0.1, min: 0.0, max: 1.0, step: 0.01 },
        uLightAPosition: { value: [1.0, 1.0, 0.0], label: 'Light A Position' },
        uLightAIntensity: { value: 1.0, min: 0.0, max: 10.0 },
        uLightBPosition: { value: [-1.0, -1.0, 0.0], label: 'Light B Position' },
        uLightBIntensity: { value: 1.0, min: 0.0, max: 10.0 },
    },
    
    );

    return (
        <group>
            <mesh>
                <sphereGeometry ref={sphereRef} args={[1, 512, 512]} />
                <sphereMat
                    ref={ref}
                    key={SphereMat.key}
                    uDistortionFrequency={sphereControls.DistortionFrequency}
                    uDistortionStrength={sphereControls.DistortionStrength}
                    uDisplacementFrequency={sphereControls.DisplacementFrequency}
                    uDisplacementStrength={sphereControls.DisplacementStrength}
                    uTimeFrequency={sphereControls.TimeFrequency}
                    
                    uLightAPosition={new THREE.Vector3(...sphereControls.uLightAPosition)}
                    uLightAIntensity={sphereControls.uLightAIntensity}
                    
                    uLightBPosition={new THREE.Vector3(...sphereControls.uLightBPosition)}
                    uLightBIntensity={sphereControls.uLightBIntensity}
                    
                />
            </mesh>
        </group>
    );
};

export default Sphere;
