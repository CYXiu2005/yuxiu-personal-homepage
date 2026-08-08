import { useEffect, useRef } from 'react';
import { Renderer, Program, Triangle, Mesh } from 'ogl';
import './SideRays.css';

const hexToRgb = (hex) => {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return match ? [1, 2, 3].map((i) => parseInt(match[i], 16) / 255) : [1, 1, 1];
};
const originToFlip = (origin) => origin === 'top-left' ? [1, 0] : origin === 'bottom-right' ? [0, 1] : origin === 'bottom-left' ? [1, 1] : [0, 0];

export default function SideRays({ speed=1, rayColor1='#ffaa6e', rayColor2='#96c8ff', intensity=1,
  spread=1, origin='top-right', tilt=0, saturation=1, blend=.78, falloff=2, opacity=1, className='' }) {
  const containerRef = useRef(null);
  useEffect(() => {
    const container = containerRef.current; if (!container) return undefined;
    const renderer = new Renderer({ dpr:Math.min(devicePixelRatio || 1,2), alpha:true });
    const gl = renderer.gl;
    gl.clearColor(0,0,0,0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA,gl.ONE);
    gl.canvas.style.width='100%'; gl.canvas.style.height='100%'; container.appendChild(gl.canvas);
    const vertex = `attribute vec2 position;void main(){gl_Position=vec4(position,0.,1.);}`;
    const fragment = `precision highp float;uniform float iTime;uniform vec2 iResolution;uniform float iSpeed;uniform vec3 iRayColor1;uniform vec3 iRayColor2;uniform float iIntensity;uniform float iSpread;uniform float iFlipX;uniform float iFlipY;uniform float iTilt;uniform float iSaturation;uniform float iBlend;uniform float iFalloff;uniform float iOpacity;
    float rayStrength(vec2 source,vec2 direction,vec2 coord,float a,float b,float speed){vec2 delta=coord-source;float angle=dot(normalize(delta),direction);float broad=clamp((.44+.16*sin(angle*a+iTime*speed))+(.3+.19*cos(-angle*b+iTime*speed)),0.,1.);return pow(broad,1.08)*clamp((iResolution.x-length(delta))/iResolution.x,.48,1.);}
    void main(){vec2 frag=gl_FragCoord.xy;if(iFlipX>.5)frag.x=iResolution.x-frag.x;if(iFlipY>.5)frag.y=iResolution.y-frag.y;vec2 coord=vec2(frag.x,iResolution.y-frag.y);vec2 source=vec2(iResolution.x*1.1,-.5*iResolution.y);float r=iTilt*3.14159265/180.;float cs=cos(r),sn=sin(r);vec2 rel=coord-source;vec2 tilted=vec2(rel.x*cs-rel.y*sn,rel.x*sn+rel.y*cs)+source;tilted+=vec2(sin(coord.y*.004+iTime*.22)*1.6,cos(coord.x*.003-iTime*.18)*1.1);float halfSpread=iSpread*.275;vec2 d1=normalize(vec2(cos(.785398+halfSpread),sin(.785398+halfSpread)));vec2 d2=normalize(vec2(cos(.785398-halfSpread),sin(.785398-halfSpread)));vec4 a=vec4(iRayColor1,1.)*rayStrength(source,d1,tilted,3.9,2.25,iSpeed);vec4 b=vec4(iRayColor2,1.)*rayStrength(source,d2,tilted,3.15,1.8,iSpeed*.2);vec4 color=a*(1.-iBlend)*.9+b*iBlend*.9;float distanceToLight=length(frag-vec2(source.x,iResolution.y-source.y))/iResolution.y;color.rgb*=iIntensity*.4/pow(max(distanceToLight,.001),iFalloff);float gray=dot(color.rgb,vec3(.299,.587,.114));color.rgb=mix(vec3(gray),color.rgb,iSaturation);color.a=max(color.r,max(color.g,color.b))*iOpacity;gl_FragColor=color;}`;
    const [flipX,flipY]=originToFlip(origin);
    const uniforms={iTime:{value:0},iResolution:{value:[1,1]},iSpeed:{value:speed},iRayColor1:{value:hexToRgb(rayColor1)},iRayColor2:{value:hexToRgb(rayColor2)},iIntensity:{value:intensity},iSpread:{value:spread},iFlipX:{value:flipX},iFlipY:{value:flipY},iTilt:{value:tilt},iSaturation:{value:saturation},iBlend:{value:blend},iFalloff:{value:falloff},iOpacity:{value:opacity}};
    const mesh=new Mesh(gl,{geometry:new Triangle(gl),program:new Program(gl,{vertex,fragment,uniforms})});
    const resize=()=>{const {clientWidth:w,clientHeight:h}=container;renderer.setSize(w,h);uniforms.iResolution.value=[w*renderer.dpr,h*renderer.dpr];};
    let frame; const loop=(time)=>{uniforms.iTime.value=time*.001;renderer.render({scene:mesh});frame=requestAnimationFrame(loop);};
    resize(); addEventListener('resize',resize); frame=requestAnimationFrame(loop);
    return()=>{cancelAnimationFrame(frame);removeEventListener('resize',resize);gl.canvas.remove();};
  },[speed,rayColor1,rayColor2,intensity,spread,origin,tilt,saturation,blend,falloff,opacity]);
  return <div ref={containerRef} className={`side-rays-container ${className}`.trim()} />;
}
