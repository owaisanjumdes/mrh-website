"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

type Part = {
  id: number;
  name: string;
  sub: string;
  pos: [number, number, number];
};

// Hotspot anchors are in the model's centred/normalised space (~[-1, 1]).
// Tune these to land on the real components.
const PARTS: Part[] = [
  {
    id: 1,
    name: "Honeycomb grille",
    sub: "Perforated steel grille that shields the filter while maximising airflow.",
    pos: [0, 0.1, 0.26],
  },
  {
    id: 2,
    name: "Live AQI display",
    sub: "Real-time PM2.5 and AQI readout, legible from across the room.",
    pos: [0.61, -0.68, 0.33],
  },
  {
    id: 3,
    name: "MANN+HUMMEL filtration",
    sub: "German nano-fibre media, co-engineered with MANN+HUMMEL.",
    pos: [-0.4, 0.45, 0.22],
  },
  {
    id: 4,
    name: "Steel chassis",
    sub: "Powder-coated steel body built for years of institutional deployment.",
    pos: [-0.45, -0.4, 0.2],
  },
  {
    id: 5,
    name: "Control panel",
    sub: "Touch controls with scheduling and filter-life alerts.",
    pos: [0.4, 0.18, 0.24],
  },
];

export default function ProductExplorer() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const dotsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const [active, setActive] = useState<number | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth;
    let height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0.6, 0.3, 3.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    mount.appendChild(renderer.domElement);

    // Environment for realistic reflections on the metallic body.
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const key = new THREE.DirectionalLight(0xffffff, 1.6);
    key.position.set(5, 8, 6);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xffffff, 0.6);
    fill.position.set(-6, 2, -4);
    scene.add(fill);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.8;

    const loader = new GLTFLoader();
    loader.load(
      "/models/MRH__.glb",
      (gltf) => {
        const model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z) || 1;
        model.position.sub(center);
        model.scale.setScalar(2 / maxDim);
        scene.add(model);
        setReady(true);
      },
      undefined,
      (err) => console.error("GLB load failed", err),
    );

    const v = new THREE.Vector3();
    const updateDots = () => {
      for (let i = 0; i < PARTS.length; i++) {
        const el = dotsRef.current[i];
        if (!el) continue;
        v.set(PARTS[i].pos[0], PARTS[i].pos[1], PARTS[i].pos[2]).project(camera);
        const x = (v.x * 0.5 + 0.5) * width;
        const y = (-v.y * 0.5 + 0.5) * height;
        const hidden = v.z > 1;
        el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
        el.style.opacity = hidden ? "0" : "1";
        el.style.pointerEvents = hidden ? "none" : "auto";
      }
    };

    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
      updateDots();
    };
    animate();

    const onResize = () => {
      width = mount.clientWidth;
      height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    const stopRotate = () => {
      controls.autoRotate = false;
    };
    renderer.domElement.addEventListener("pointerdown", stopRotate);

    // DEV helper: click the model to log a 3D coordinate (paste these into PARTS
    // to lock each pointer onto the right component).
    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    const onPick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      ndc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      ndc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(ndc, camera);
      const hits = raycaster.intersectObjects(scene.children, true);
      if (hits.length) {
        const p = hits[0].point;
        console.log("[hotspot]", [
          +p.x.toFixed(2),
          +p.y.toFixed(2),
          +p.z.toFixed(2),
        ]);
      }
    };
    renderer.domElement.addEventListener("click", onPick);

    return () => {
      window.removeEventListener("resize", onResize);
      renderer.domElement.removeEventListener("pointerdown", stopRotate);
      renderer.domElement.removeEventListener("click", onPick);
      cancelAnimationFrame(raf);
      controls.dispose();
      pmrem.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  const activePart = PARTS.find((p) => p.id === active) || null;

  return (
    <section className="pe">
      <style>{`
        .pe {
          background: #ffffff;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          padding: clamp(56px, 8vh, 120px) clamp(20px, 6vw, 88px);
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
          text-align: center;
        }
        .pe-heading {
          margin: 0 0 8px;
          font-size: clamp(28px, 3.4vw, 44px);
          font-weight: 600;
          letter-spacing: -0.03em;
          line-height: 1.05;
          color: var(--ink);
        }
        .pe-sub {
          margin: 0 0 clamp(20px, 3vw, 36px);
          font-size: clamp(14px, 1.1vw, 16px);
          color: var(--ink-3);
        }
        .pe-stage {
          position: relative;
          max-width: 1280px;
          margin: 0 auto;
          height: clamp(520px, 80vh, 880px);
        }
        .pe-glow {
          position: absolute;
          inset: 0;
          z-index: 0;
          background: radial-gradient(circle at 50% 50%, rgba(20, 128, 66, 0.4) 0%, rgba(20, 128, 66, 0) 42%);
          pointer-events: none;
        }
        .pe-canvas { position: absolute; inset: 0; z-index: 1; }
        .pe-canvas canvas { display: block; cursor: grab; }
        .pe-canvas canvas:active { cursor: grabbing; }
        .pe-dots {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          opacity: 0;
          transition: opacity 500ms ease;
        }
        .pe-dots.is-ready { opacity: 1; }
        .pe-dot {
          position: absolute;
          top: 0;
          left: 0;
          width: 30px;
          height: 30px;
          border-radius: 9999px;
          border: 2px solid #ffffff;
          background: #148042;
          color: #ffffff;
          font-size: 13px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(11, 12, 14, 0.28);
          pointer-events: auto;
          transition: box-shadow 220ms ease;
          will-change: transform, opacity;
        }
        .pe-dot.is-active {
          box-shadow: 0 0 0 4px rgba(20, 128, 66, 0.25), 0 4px 12px rgba(11, 12, 14, 0.3);
        }
        .pe-card {
          position: absolute;
          left: clamp(12px, 2.5vw, 28px);
          bottom: clamp(12px, 2.5vw, 28px);
          width: min(320px, 78%);
          text-align: left;
          background: #ffffff;
          border: 1px solid var(--border-paper);
          border-radius: 16px;
          padding: 20px 22px;
          box-shadow: 0 22px 54px -22px rgba(11, 12, 14, 0.28);
          z-index: 3;
          animation: peCardIn 320ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        @keyframes peCardIn {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .pe-card-num {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 9999px;
          background: #148042;
          color: #ffffff;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 12px;
        }
        .pe-card-title {
          margin: 0 0 6px;
          font-size: clamp(17px, 1.4vw, 20px);
          font-weight: 600;
          color: var(--ink);
        }
        .pe-card-sub {
          margin: 0;
          font-size: clamp(13px, 1vw, 15px);
          line-height: 1.5;
          color: var(--ink-3);
        }
        .pe-card-close {
          position: absolute;
          top: 10px;
          right: 12px;
          width: 26px;
          height: 26px;
          border: none;
          background: transparent;
          color: var(--ink-3);
          font-size: 22px;
          line-height: 1;
          cursor: pointer;
        }
        .pe-card-close:hover { color: var(--ink); }
      `}</style>

      <h2 className="pe-heading">Explore the build</h2>
      <p className="pe-sub">Drag to rotate · tap a point to learn more.</p>

      <div className="pe-stage">
        <div className="pe-glow" aria-hidden />
        <div ref={mountRef} className="pe-canvas" />

        <div className={`pe-dots ${ready ? "is-ready" : ""}`}>
          {PARTS.map((p, i) => (
            <button
              key={p.id}
              ref={(el) => {
                dotsRef.current[i] = el;
              }}
              className={`pe-dot ${active === p.id ? "is-active" : ""}`}
              onClick={() => setActive((a) => (a === p.id ? null : p.id))}
              aria-label={p.name}
            >
              {p.id}
            </button>
          ))}
        </div>

        {activePart && (
          <div className="pe-card" key={activePart.id}>
            <button
              className="pe-card-close"
              onClick={() => setActive(null)}
              aria-label="Close"
            >
              ×
            </button>
            <span className="pe-card-num">{activePart.id}</span>
            <h3 className="pe-card-title">{activePart.name}</h3>
            <p className="pe-card-sub">{activePart.sub}</p>
          </div>
        )}
      </div>
    </section>
  );
}
