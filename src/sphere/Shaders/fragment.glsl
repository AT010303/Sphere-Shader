varying vec2 vUv;
varying vec3 vNormal;
varying float vperlinStrength;
varying vec3 vColor;

void main() {

    
    gl_FragColor = vec4(vColor, 1.0);

    // float temp = vperlinStrength + 0.5;
    // temp *= 0.5;
    // gl_FragColor = vec4(vec3(temp), 1.0);
}