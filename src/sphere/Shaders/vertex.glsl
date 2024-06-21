uniform float uTime;
uniform float uDistortionFrequency;
uniform float uDistortionStrength;
uniform float uDisplacementFrequency;
uniform float uDisplacementStrength;
uniform float uTimeFrequency;

varying vec2 vUv;
varying vec3 vNormal;
varying float vperlinStrength;

#include "./partials/perlin4d.glsl"
#include "./partials/perlin3d.glsl"

void main() {

    // float uDistortionFrequency = 2.0;
    // float uDistortionStrength = 1.0;
    // float uDisplacementFrequency = 2.0;
    // float uDisplacementStrength = 0.2;
    // float uTimeFrequency = 0.1;

    

    vec3 displacementPosition = position;
    displacementPosition += perlin4d(vec4(displacementPosition * uDistortionFrequency, uTime * uTimeFrequency)) * uDistortionStrength;
   
    float perlinStrength = perlin4d(vec4(displacementPosition * uDisplacementFrequency, uTime * uTimeFrequency )) * uDisplacementStrength;

    vec3 newPosition = position;
    newPosition += normal * perlinStrength;

    vec4 viewPosition = viewMatrix * vec4(newPosition, 1.0);
    gl_Position = projectionMatrix * viewPosition;

    vUv = uv;
    vNormal = normal;
    vperlinStrength = perlinStrength;
}