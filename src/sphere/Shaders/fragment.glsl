varying vec2 vUv;
varying vec3 vNormal;
varying float vperlinStrength;

void main() {
    float temp = vperlinStrength + 0.05;
    temp *= 2.0;
    gl_FragColor = vec4(vec3(temp), 1.0);
}