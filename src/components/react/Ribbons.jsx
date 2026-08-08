import { useEffect, useRef } from 'react';
import { Color, Polyline, Renderer, Transform, Vec3 } from 'ogl';
import './Ribbons.css';

export default function Ribbons({
  colors = ['#aab99d'],
  baseSpring = 0.16,
  baseFriction = 0.58,
  baseThickness = 7.5,
  offsetFactor = 0,
  maxAge = 76,
  pointCount = 9,
  speedMultiplier = 0.42,
  maxSegmentLength = 0.015,
  enableFade = true,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio || 1, 2), alpha: true });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    container.appendChild(gl.canvas);

    const scene = new Transform();
    const lines = [];
    const vertex = `
      precision highp float;
      attribute vec3 position; attribute vec3 next; attribute vec3 prev;
      attribute vec2 uv; attribute float side;
      uniform vec2 uResolution; uniform float uDPR; uniform float uThickness;
      varying vec2 vUV;
      void main() {
        vUV = uv;
        vec4 current = vec4(position, 1.0);
        vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
        vec2 tangent = normalize(next.xy * aspect - prev.xy * aspect);
        vec2 normal = vec2(-tangent.y, tangent.x) / aspect;
        float leafProfile = pow(max(0.0, sin(3.14159265 * uv.y)), .72);
        normal *= leafProfile;
        normal *= smoothstep(0.0, 0.02, length(next.xy * aspect - prev.xy * aspect));
        normal *= (1.0 / (uResolution.y / uDPR)) * uThickness;
        current.xy -= normal * side;
        gl_Position = current;
      }
    `;
    const fragment = `
      precision highp float;
      uniform vec3 uColor; uniform float uOpacity; uniform float uEnableFade;
      varying vec2 vUV;
      void main() {
        float spindle = smoothstep(0.0, .08, vUV.y) * (1.0 - smoothstep(.92, 1.0, vUV.y));
        float trail = mix(1.0, spindle, uEnableFade);
        gl_FragColor = vec4(uColor, uOpacity * trail * .9);
      }
    `;

    const center = (colors.length - 1) / 2;
    colors.forEach((color, index) => {
      const points = Array.from({ length: pointCount }, () => new Vec3());
      const polyline = new Polyline(gl, {
        points,
        vertex,
        fragment,
        uniforms: {
          uColor: { value: new Color(color) },
          uThickness: { value: baseThickness + (index - center) * 2 },
          uOpacity: { value: 1 },
          uEnableFade: { value: enableFade ? 1 : 0 },
        },
      });
      polyline.mesh.setParent(scene);
      lines.push({
        points,
        polyline,
        spring: baseSpring + index * 0.004,
        friction: baseFriction - index * 0.012,
        velocity: new Vec3(),
        offset: new Vec3((index - center) * offsetFactor, (index - center) * 0.018, 0),
      });
    });

    const resize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
      lines.forEach(({ polyline }) => polyline.resize());
    };
    const mouse = new Vec3();
    const move = (event) => {
      const point = event.touches?.[0] || event;
      mouse.set((point.clientX / window.innerWidth) * 2 - 1, (point.clientY / window.innerHeight) * -2 + 1, 0);
    };
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('touchmove', move, { passive: true });

    const force = new Vec3();
    let frameId;
    let previous = performance.now();
    const update = (now) => {
      frameId = requestAnimationFrame(update);
      const dt = Math.min(now - previous, 32);
      previous = now;
      lines.forEach((line) => {
        force.copy(mouse).add(line.offset).sub(line.points[0]).multiply(line.spring);
        line.velocity.add(force).multiply(line.friction);
        line.points[0].add(line.velocity);
        const segmentDelay = maxAge / Math.max(1, line.points.length - 1);
        // A value near 1 makes every point collapse onto the cursor in the
        // same frame, leaving a zero-length polyline. Keep enough separation
        // between segments for a visible, fluid ribbon at 60–120 Hz.
        const alpha = Math.min(0.32, (dt * speedMultiplier) / segmentDelay);
        for (let i = 1; i < line.points.length; i += 1) {
          const point = line.points[i];
          const leader = line.points[i - 1];
          point.lerp(leader, alpha);

          // Keep fast cursor movement from stretching the leaf into a ribbon.
          const dx = point.x - leader.x;
          const dy = point.y - leader.y;
          const distance = Math.hypot(dx, dy);
          if (distance > maxSegmentLength) {
            const scale = maxSegmentLength / distance;
            point.set(leader.x + dx * scale, leader.y + dy * scale, 0);
          }
        }
        line.polyline.updateGeometry();
      });
      renderer.render({ scene });
    };
    frameId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('touchmove', move);
      gl.canvas.remove();
    };
  }, [colors, baseSpring, baseFriction, baseThickness, offsetFactor, maxAge, pointCount, speedMultiplier, maxSegmentLength, enableFade]);

  return <div ref={containerRef} className="ribbons-container" aria-hidden="true" />;
}
