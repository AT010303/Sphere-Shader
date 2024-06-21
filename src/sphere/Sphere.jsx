import { shaderMaterial } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

import fragmentShader from './Shaders/fragment.glsl';
import vertexShader from './Shaders/vertex.glsl';

const SphereMat = shaderMaterial(
  {
    uTime: 0
  },
  vertexShader,
  fragmentShader,
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

    return (
        <group>
            <mesh>
                <sphereGeometry args={[1, 512, 512]} />
                <sphereMat ref={ref} key={SphereMat.key}/>
            </mesh>
        </group>
    );
};

export default Sphere;
