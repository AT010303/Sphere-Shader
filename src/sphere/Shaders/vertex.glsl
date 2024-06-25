uniform float uTime;
uniform float uDistortionFrequency;
uniform float uDistortionStrength;
uniform float uDisplacementFrequency;
uniform float uDisplacementStrength;
uniform float uTimeFrequency;

varying vec2 vUv;
varying vec3 vNormal;
varying float vperlinStrength;
varying vec3 vColor;

#include "./partials/perlin4d.glsl"
#include "./partials/perlin3d.glsl"

vec4 getDisplacedPosition(vec3 _position) {
    vec3 displacementPosition = _position;
    displacementPosition += perlin4d(vec4(displacementPosition * uDistortionFrequency, uTime * uTimeFrequency)) * uDistortionStrength;

    float perlinStrength = perlin4d(vec4(displacementPosition * uDisplacementFrequency, uTime * uTimeFrequency));

    vec3 displacedPosition = _position;
    displacedPosition += normalize(_position) * perlinStrength * uDisplacementStrength;

    return vec4(displacedPosition, perlinStrength);
}

void main() {

    // Displace the position
    vec4 displacedPosition = getDisplacedPosition(position);

    vec4 viewPosition = viewMatrix * vec4(displacedPosition.xyz, 1.0);
    gl_Position = projectionMatrix * viewPosition;

    //color
    vec3 uLightAcolor = vec3(1.0, 0.2, 0.5);
    vec3 uLightAPosition = vec3(1.0, 1.0, 0.0);
    float lightAIntensity = max(0.0, -dot(normal, normalize(-uLightAPosition)));

    vec3 uLightBcolor = vec3(0.45, 0.86, 0.97);
    vec3 uLightBPosition = vec3(-1.0, -0.5, 0.0);
    float lightBIntensity = max(0.0, -dot(normal, normalize(-uLightBPosition)));

    vec3 color = vec3(0.065);
    color = mix(color, uLightAcolor, lightAIntensity);
    color = mix(color, uLightBcolor, lightBIntensity);

    vUv = uv;
    vNormal = normal;
    vperlinStrength = displacedPosition.a;
    vColor = color;
}