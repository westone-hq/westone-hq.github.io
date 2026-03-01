import { useEffect, useRef } from 'react';

// WebGL 셰이더 기반 뉴럴 노이즈 배경 — fbm(fractal Brownian motion)으로 보라색 유기체 노이즈 렌더링
const NeuralNoise = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // WebGL2 우선, 없으면 WebGL1 폴백
    const gl = (canvas.getContext('webgl2') || canvas.getContext('webgl')) as WebGLRenderingContext | null;
    if (!gl) return;

    // 버텍스 셰이더 — 화면 전체를 덮는 쿼드
    const vsSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // 프래그먼트 셰이더 — fbm 기반 노이즈 패턴 + 비네팅
    const fsSource = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;

      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }

      float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        f = f * f * (3.0 - 2.0 * f);
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }

      float fbm(vec2 st) {
        float value = 0.0;
        float amplitude = 0.5;
        for (int i = 0; i < 5; i++) {
          value += amplitude * noise(st);
          st *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }

      void main() {
        vec2 st = gl_FragCoord.xy / resolution.xy;
        st.x *= resolution.x / resolution.y;
        vec2 pos = st * 2.0;
        float t = time * 0.05;
        vec2 q = vec2(
          fbm(pos + vec2(0.0, 0.0) + t),
          fbm(pos + vec2(5.2, 1.3) + t)
        );
        vec2 r = vec2(
          fbm(pos + 4.0 * q + vec2(1.7, 9.2) + 0.15 * t),
          fbm(pos + 4.0 * q + vec2(8.3, 2.8) + 0.126 * t)
        );
        float pattern = fbm(pos + 4.0 * r);
        vec3 color = vec3(0.0);
        float intensity = 1.0 - smoothstep(0.2, 0.9, pattern);
        intensity = pow(intensity, 4.0);
        vec3 c1 = vec3(0.4, 0.0, 0.6);
        vec3 c2 = vec3(0.6, 0.1, 0.8);
        color = mix(color, c1, r.x * intensity * 1.5);
        color = mix(color, c2, r.y * intensity * 1.5);
        vec2 uv = gl_FragCoord.xy / resolution.xy;
        float vig = 1.0 - length(uv - 0.5) * 1.0;
        color *= clamp(vig, 0.0, 1.0);
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const compileShader = (source: string, type: number) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(vsSource, gl.VERTEX_SHADER);
    const fs = compileShader(fsSource, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const resolutionLocation = gl.getUniformLocation(program, 'resolution');
    const timeLocation = gl.getUniformLocation(program, 'time');

    // devicePixelRatio 반영 — Retina/4K 디스플레이 선명도 보장
    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = Math.floor(canvas.clientWidth * dpr);
      const h = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    // ResizeObserver로 캔버스 크기 변경 감지
    const ro = new ResizeObserver(updateCanvasSize);
    ro.observe(canvas);
    updateCanvasSize();

    let animationFrameId: number;

    const render = (now: number) => {
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, now * 0.001);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      ro.disconnect();
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 bg-black"
    />
  );
};

export default NeuralNoise;
