(() => {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || !window.THREE) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let renderer;
  let scene;
  let camera;
  let frame = 0;
  let animationId = 0;
  let targetX = 0;
  let targetY = 0;
  const objects = [];

  try {
    renderer = new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'low-power'});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5));
    renderer.setClearColor(0x000000,0);
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(38,1,.1,100);
    camera.position.z=7.5;
    scene.add(new THREE.AmbientLight(0xffffff,1.8));
    const keyLight=new THREE.DirectionalLight(0xffffff,2.4);
    keyLight.position.set(-3,4,6);
    scene.add(keyLight);
    const blueLight=new THREE.PointLight(0x58a2ff,2.1,12);
    blueLight.position.set(2,1,4);
    scene.add(blueLight);
    const greenLight=new THREE.PointLight(0x62e4a9,1.8,10);
    greenLight.position.set(-3,-2,3);
    scene.add(greenLight);
    const glass=new THREE.MeshPhysicalMaterial({color:0xbde1ff,metalness:.06,roughness:.12,transmission:.45,transparent:true,opacity:.72,thickness:.8,clearcoat:1});
    const green=new THREE.MeshPhysicalMaterial({color:0x75ddb1,metalness:.08,roughness:.22,transmission:.2,transparent:true,opacity:.9,clearcoat:.8});
    const cobalt=new THREE.MeshStandardMaterial({color:0x3478f6,metalness:.18,roughness:.28});
    const add=(geometry,material,x,y,z,scale,speed)=>{
      const mesh=new THREE.Mesh(geometry,material);
      mesh.position.set(x,y,z);mesh.scale.setScalar(scale);mesh.userData={originY:y,speed};
      scene.add(mesh);objects.push(mesh);
    };
    add(new THREE.SphereGeometry(.66,28,22),glass,-1.45,.68,.1,.92,.65);
    add(new THREE.SphereGeometry(.42,24,18),green,1.32,-.95,.3,.95,.82);
    add(new THREE.IcosahedronGeometry(.55,1),cobalt,1.42,.83,-.2,.68,.72);
    add(new THREE.OctahedronGeometry(.46,1),glass,-1.16,-1.25,.25,.63,.9);
    add(new THREE.TorusGeometry(.42,.11,12,30),green,.15,1.55,-.7,.66,.54);
    const particleGeometry=new THREE.BufferGeometry();
    const particleCount=110;
    const positions=new Float32Array(particleCount*3);
    const origins=new Float32Array(particleCount*3);
    const colors=new Float32Array(particleCount*3);
    const phases=new Float32Array(particleCount);
    const drift=new Float32Array(particleCount);
    const palette=[new THREE.Color(0xc5f4ff),new THREE.Color(0x8edcff),new THREE.Color(0x9bffe0)];
    for(let i=0;i<particleCount;i++){
      const offset=i*3;
      positions[offset]=(Math.random()-.5)*5.1;
      positions[offset+1]=(Math.random()-.5)*4.1;
      positions[offset+2]=-1.35-Math.random()*1.2;
      origins[offset]=positions[offset];
      origins[offset+1]=positions[offset+1];
      origins[offset+2]=positions[offset+2];
      const color=palette[Math.random()<.62?0:Math.random()<.72?1:2];
      colors[offset]=color.r;
      colors[offset+1]=color.g;
      colors[offset+2]=color.b;
      phases[i]=Math.random()*Math.PI*2;
      drift[i]=.65+Math.random()*.75;
    }
    particleGeometry.setAttribute('position',new THREE.BufferAttribute(positions,3));
    particleGeometry.setAttribute('color',new THREE.BufferAttribute(colors,3));
    const starCanvas=document.createElement('canvas');
    starCanvas.width=starCanvas.height=64;
    const starContext=starCanvas.getContext('2d');
    const starGlow=starContext.createRadialGradient(32,32,0,32,32,32);
    starGlow.addColorStop(0,'rgba(255,255,255,1)');
    starGlow.addColorStop(.12,'rgba(235,251,255,.95)');
    starGlow.addColorStop(.42,'rgba(165,229,255,.35)');
    starGlow.addColorStop(1,'rgba(132,220,255,0)');
    starContext.fillStyle=starGlow;
    starContext.fillRect(0,0,64,64);
    const starTexture=new THREE.CanvasTexture(starCanvas);
    const starMaterial=new THREE.PointsMaterial({size:.09,map:starTexture,vertexColors:true,transparent:true,opacity:.8,alphaTest:.015,depthWrite:false,blending:THREE.AdditiveBlending});
    const particles=new THREE.Points(particleGeometry,starMaterial);
    particles.renderOrder=1;
    scene.add(particles);
    const resize=()=>{
      const rect=canvas.getBoundingClientRect();
      const width=Math.max(1,rect.width);const height=Math.max(1,rect.height);
      renderer.setSize(width,height,false);
      camera.aspect=width/height;
      camera.updateProjectionMatrix();
    };
    const observer=new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    const render=()=>{
      if(document.hidden||reducedMotion.matches)return;
      animationId=requestAnimationFrame(render);
      frame+=.008;
      camera.position.x+=(targetX-camera.position.x)*.025;
      camera.position.y+=(targetY-camera.position.y)*.025;
      camera.lookAt(0,0,0);
      objects.forEach(mesh=>{
        mesh.position.y=mesh.userData.originY+Math.sin(frame*mesh.userData.speed+mesh.position.x)*.09;
        mesh.rotation.x+=.0018*mesh.userData.speed;
        mesh.rotation.y+=.0025*mesh.userData.speed;
      });
      for(let i=0;i<particleCount;i++){
        const offset=i*3;
        const phase=frame*drift[i]+phases[i];
        positions[offset]=origins[offset]+Math.sin(phase*.45)*.045;
        positions[offset+1]=origins[offset+1]+Math.cos(phase*.38)*.065;
      }
      particleGeometry.attributes.position.needsUpdate=true;
      particles.rotation.y=Math.sin(frame*.08)*.025;
      starMaterial.opacity=.68+Math.sin(frame*2.2)*.12;
      renderer.render(scene,camera);
    };
    const start=()=>{if(!animationId&&!document.hidden&&!reducedMotion.matches)render();};
    const stop=()=>{if(animationId){cancelAnimationFrame(animationId);animationId=0;}};
    document.addEventListener('visibilitychange',()=>document.hidden?stop():start());
    reducedMotion.addEventListener?.('change',()=>reducedMotion.matches?stop():start());
    window.addEventListener('pointermove',event=>{
      if(event.pointerType==='touch')return;
      const rect=canvas.getBoundingClientRect();
      const relativeX=Math.max(-1,Math.min(1,(event.clientX-rect.left)/rect.width-.5));
      const relativeY=Math.max(-1,Math.min(1,(event.clientY-rect.top)/rect.height-.5));
      targetX=relativeX*.35;
      targetY=-relativeY*.28;
    },{passive:true});
    window.addEventListener('pagehide',()=>{
      stop();observer.disconnect();
      scene.traverse(object=>{
        if(object.geometry)object.geometry.dispose();
        if(object.material){const materials=Array.isArray(object.material)?object.material:[object.material];materials.forEach(material=>material.dispose());}
      });
      starTexture.dispose();
      renderer.dispose();
    },{once:true});
    start();
  } catch(error) {
    console.warn('La scène 3D est indisponible, l’illustration CSS de secours reste affichée.',error);
    if(renderer)renderer.dispose();
  }
})();
