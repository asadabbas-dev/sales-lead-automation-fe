uniform vec3 uColor1;
uniform vec3 uColor2;
uniform float uTime;
uniform float uDensity;

varying vec2 vUv;
varying float vDepth;

void main() {
  float fog = exp(-uDensity * vDepth);
  fog = 1.0 - fog;
  vec3 fogColor = mix(uColor1, uColor2, vUv.y + sin(uTime * 0.5) * 0.1);
  gl_FragColor = vec4(fogColor, fog * 0.6);
}
