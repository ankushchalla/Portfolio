uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uColorOffset;
uniform float uColorMultiplier;
uniform float uColorDarkener;
uniform float uColorDarkenerLimit;

varying float vElevation;

void main() {
    float mixStrength = ((vElevation + uColorOffset) * uColorMultiplier) - .2;
    vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength);
    
    gl_FragColor = vec4(color, 1.0); // rgba
}