uniform float uTime;
uniform float uDistortionFrequency;
uniform float uDistortionStrength;
uniform float uDisplacementFrequency;
uniform float uDisplacementStrength;
uniform float uTimeFrequency;

uniform vec3 uLightAColor;
uniform vec3 uLightAPosition;
uniform float uLightAIntensity;

uniform vec3 uLightBColor;
uniform vec3 uLightBPosition;
uniform float uLightBIntensity;

varying vec2 vUv;
varying vec3 vNormal;
varying float vperlinStrength;
varying vec3 vColor;

#define PI 3.1415926535897932384626433832795

attribute vec4 tangent;

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


    // bi tangent
    
    float neighbourTangentDistance = (2.0 * PI) / 512.0 ;
    float neighbourBiTangentDistance =  PI / 512.0 ;

    vec3 biTangent = cross(normal, tangent.xyz);

    vec3 tangentNeighbour = position + tangent.xyz * neighbourTangentDistance;
    tangentNeighbour = getDisplacedPosition(tangentNeighbour).xyz;
    vec3 biTangentNeighbour = position + biTangent.xyz * neighbourBiTangentDistance;
    biTangentNeighbour = getDisplacedPosition(biTangentNeighbour).xyz;
    
    vec3 computingNormal = cross(tangentNeighbour, biTangentNeighbour);
    
    computingNormal = normalize(computingNormal);

    //color
    float lightAIntensity = max(0.0, -dot(normal, normalize(-uLightAPosition))) * uLightAIntensity;

    float lightBIntensity = max(0.0, -dot(normal, normalize(-uLightBPosition))) * uLightBIntensity;

    vec3 color = vec3(0.065);
    color = mix(color, uLightAColor, lightAIntensity);
    color = mix(color, uLightBColor, lightBIntensity);

    vUv = uv;
    vNormal = normal;
    vperlinStrength = displacedPosition.a;
    vColor = color;
}