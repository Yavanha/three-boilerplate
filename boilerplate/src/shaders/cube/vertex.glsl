
uniform float uTime;
uniform float uRadius;

#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

varying vec3 vPos;

void main() {
    float breath = 0.25 * sin(uTime * 0.25);
    float noise =snoise3(normal + sin(uTime * 0.2)) * 0.2;
    float elevation = (abs(breath) )  + noise * 0.2;
    vec3 pos = (normal + elevation) * uRadius;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

    vPos = pos;

}