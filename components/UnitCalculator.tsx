"use client";

// MRH Unit Calculator — ported from mrh-unit-calculator.html. Design converted to
// light mode with the site font (Inter Tight) and green accent; the original
// vanilla-JS behavior (segmented controls, sliders, live 3D room, drag-to-rotate)
// runs imperatively against the section ref inside the effect below.
import { useEffect, useRef } from "react";

export default function UnitCalculator() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cleanups: Array<() => void> = [];
    const on = (
      target: EventTarget,
      type: string,
      handler: EventListenerOrEventListenerObject,
      opts?: AddEventListenerOptions
    ) => {
      target.addEventListener(type, handler, opts);
      cleanups.push(() => target.removeEventListener(type, handler, opts));
    };

    const q = <T extends Element = Element>(sel: string) =>
      root.querySelector<T>(sel);
    const qq = <T extends Element = Element>(sel: string) =>
      Array.from(root.querySelectorAll<T>(sel));

    const CONFIG = {
      ACH: 5,
      CFM_TABLE: {
        AirFINEry: { Low: 1810, Medium: 2475, High: 2980, Turbo: 3600 },
        PureAir: { Low: 706, Medium: 1059, High: 1667, Turbo: 2000 },
      } as Record<string, Record<string, number>>,
      LIMITS: {
        length: { min: 10, max: 500 },
        width: { min: 10, max: 500 },
        height: { min: 6, max: 60 },
      } as Record<string, { min: number; max: number }>,
      MAX_UNIT_MARKS: 24,
    };

    const state: Record<string, string | number> = {
      product: "AirFINEry",
      mode: "Low",
      length: 100,
      width: 50,
      height: 10,
    };

    const out = {
      volume: q('[data-out="volume"]'),
      units: q('[data-out="units"]'),
      unitsWord: q('[data-out="unitsWord"]'),
      required: q('[data-out="required"]'),
      unitCfm: q('[data-out="unitCfm"]'),
      unitCfmChip: q('[data-out="unitCfmChip"]'),
      delivered: q('[data-out="delivered"]'),
      headroom: q('[data-out="headroom"]'),
      productLabel: q('[data-out="productLabel"]'),
      modeLabel: q('[data-out="modeLabel"]'),
    };

    const roomEl = q<HTMLElement>("[data-room]");
    const unitsLayer = q<HTMLElement>("[data-units-layer]");
    const flowLayer = q<HTMLElement>("[data-flow]");
    const covFill = q<HTMLElement>("[data-coverage-fill]");
    const covNeed = q<HTMLElement>("[data-coverage-need]");
    if (!roomEl || !unitsLayer || !flowLayer || !covFill || !covNeed) return;

    const nf = new Intl.NumberFormat("en-US");

    function compute(s: typeof state) {
      const volume = (s.length as number) * (s.width as number) * (s.height as number);
      const requiredCFM = (volume * CONFIG.ACH) / 60;
      const unitCFM = CONFIG.CFM_TABLE[s.product as string][s.mode as string];
      const units = Math.max(1, Math.ceil(requiredCFM / unitCFM));
      const delivered = units * unitCFM;
      const headroom = requiredCFM > 0 ? ((delivered - requiredCFM) / requiredCFM) * 100 : 0;
      return { volume, requiredCFM, unitCFM, units, delivered, headroom };
    }

    let lastUnits: number | null = null;
    let unitsTimer = 0;
    function setUnits(n: number) {
      if (n === lastUnits) return;
      lastUnits = n;
      out.units?.classList.add("is-swapping");
      unitsTimer = window.setTimeout(() => {
        if (out.units) out.units.textContent = String(n);
        if (out.unitsWord) out.unitsWord.textContent = n === 1 ? "unit" : "units";
        out.units?.classList.remove("is-swapping");
      }, 130);
    }

    const rot = { x: -18, y: -32 };

    function setFace(el: HTMLElement | null, fw: number, fh: number, transform: string) {
      if (!el) return;
      el.style.width = fw + "px";
      el.style.height = fh + "px";
      el.style.marginLeft = -fw / 2 + "px";
      el.style.marginTop = -fh / 2 + "px";
      el.style.transform = transform;
    }

    function drawUnits(count: number, w: number, d: number, h: number) {
      const shown = Math.min(count, CONFIG.MAX_UNIT_MARKS);
      unitsLayer!.innerHTML = "";
      unitsLayer!.style.transform = `rotateX(90deg) translateZ(${-h / 2 + 3}px)`;
      const cols = Math.ceil(Math.sqrt(shown * (w / d)));
      const rows = Math.ceil(shown / cols);
      for (let i = 0; i < shown; i++) {
        const c = i % cols;
        const rw = Math.floor(i / cols);
        const x = ((c + 0.5) / cols - 0.5) * w * 0.82;
        const y = ((rw + 0.5) / rows - 0.5) * d * 0.82;
        const mark = document.createElement("span");
        mark.className = "unit-mark";
        mark.style.left = x + "px";
        mark.style.top = y + "px";
        mark.style.animationDelay = i * 32 + "ms";
        unitsLayer!.appendChild(mark);
      }
    }

    let flowDrawn = false;
    function drawFlow(h: number) {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (flowDrawn) {
        flowLayer!.querySelectorAll<HTMLElement>(".mote").forEach((m) => {
          m.style.setProperty("--rise", -h * 0.9 + "px");
        });
        return;
      }
      for (let i = 0; i < 14; i++) {
        const m = document.createElement("span");
        m.className = "mote";
        m.style.left = Math.random() * 150 - 75 + "px";
        m.style.top = h / 2 + "px";
        m.style.setProperty("--rise", -h * 0.9 + "px");
        m.style.animationDuration = 3.4 + Math.random() * 3.4 + "s";
        m.style.animationDelay = Math.random() * 4 + "s";
        m.style.transform = `translateZ(${Math.random() * 120 - 60}px)`;
        flowLayer!.appendChild(m);
      }
      flowDrawn = true;
    }

    function drawRoom(r: ReturnType<typeof compute>) {
      const L = state.length as number;
      const W = state.width as number;
      const H = state.height as number;
      const SCREEN_MAX = window.innerWidth < 560 ? 150 : 190;
      const scale = SCREEN_MAX / Math.max(L, W, H);
      const w = Math.max(26, L * scale);
      const d = Math.max(26, W * scale);
      const h = Math.max(16, H * scale);
      const face = (cls: string) => roomEl!.querySelector<HTMLElement>(".room__face--" + cls);
      setFace(face("floor"), w, d, `rotateX(90deg) translateZ(${-h / 2}px)`);
      setFace(face("ceiling"), w, d, `rotateX(90deg) translateZ(${h / 2}px)`);
      setFace(face("back"), w, h, `translateZ(${-d / 2}px)`);
      setFace(face("left"), d, h, `rotateY(90deg) translateZ(${-w / 2}px)`);
      setFace(face("right"), d, h, `rotateY(90deg) translateZ(${w / 2}px)`);
      roomEl!.style.transform = `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`;
      drawUnits(r.units, w, d, h);
      drawFlow(h);
    }

    function render() {
      const r = compute(state);
      if (out.volume) out.volume.textContent = nf.format(r.volume);
      if (out.required) out.required.textContent = nf.format(Math.round(r.requiredCFM));
      if (out.unitCfm) out.unitCfm.textContent = nf.format(r.unitCFM);
      if (out.unitCfmChip) out.unitCfmChip.textContent = nf.format(r.unitCFM) + " CFM / unit";
      if (out.delivered) out.delivered.textContent = nf.format(r.delivered);
      if (out.headroom) out.headroom.textContent = String(Math.round(r.headroom));
      if (out.productLabel) out.productLabel.textContent = state.product as string;
      if (out.modeLabel) out.modeLabel.textContent = state.mode as string;
      setUnits(r.units);
      const ceiling = Math.max(r.delivered, r.requiredCFM) * 1.06;
      covFill!.style.width = ((r.delivered / ceiling) * 100).toFixed(2) + "%";
      covNeed!.style.left = ((r.requiredCFM / ceiling) * 100).toFixed(2) + "%";
      drawRoom(r);
    }

    // Segmented controls
    qq<HTMLElement>("[data-segmented]").forEach((group) => {
      const key = group.dataset.segmented as string;
      const thumb = group.querySelector<HTMLElement>(".segmented__thumb");
      const opts = Array.from(group.querySelectorAll<HTMLElement>(".segmented__opt"));
      function moveThumb() {
        const active = group.querySelector<HTMLElement>(".is-active");
        if (!active || !thumb) return;
        thumb.style.width = active.offsetWidth + "px";
        thumb.style.transform = `translateX(${active.offsetLeft - 3}px)`;
      }
      function select(btn: HTMLElement) {
        opts.forEach((o) => {
          const isOn = o === btn;
          o.classList.toggle("is-active", isOn);
          o.setAttribute("aria-checked", String(isOn));
        });
        state[key] = btn.dataset.value as string;
        moveThumb();
        render();
      }
      opts.forEach((btn) => {
        btn.addEventListener("click", () => select(btn));
        btn.addEventListener("keydown", (e) => {
          const i = opts.indexOf(btn);
          if (e.key === "ArrowRight" || e.key === "ArrowDown") {
            e.preventDefault();
            const next = opts[(i + 1) % opts.length];
            next.focus();
            select(next);
          }
          if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
            e.preventDefault();
            const prev = opts[(i - 1 + opts.length) % opts.length];
            prev.focus();
            select(prev);
          }
        });
      });
      requestAnimationFrame(moveThumb);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(moveThumb);
      on(window, "resize", moveThumb);
    });

    // Dimension inputs (number <-> slider)
    qq<HTMLElement>(".dim").forEach((dim) => {
      const key = dim.dataset.dim as string;
      const num = dim.querySelector<HTMLInputElement>(".dim__input")!;
      const slider = dim.querySelector<HTMLInputElement>(".slider")!;
      const hint = dim.querySelector<HTMLElement>(".dim__hint")!;
      const { min, max } = CONFIG.LIMITS[key];
      function paintSlider() {
        const pct = ((Number(slider.value) - min) / (max - min)) * 100;
        slider.style.setProperty("--fill", pct + "%");
      }
      slider.addEventListener("input", () => {
        state[key] = Number(slider.value);
        num.value = slider.value;
        dim.classList.remove("is-invalid");
        hint.hidden = true;
        paintSlider();
        render();
      });
      num.addEventListener("input", () => {
        const v = Number(num.value);
        if (num.value === "" || Number.isNaN(v) || v < min || v > max) {
          dim.classList.add("is-invalid");
          hint.hidden = false;
          return;
        }
        dim.classList.remove("is-invalid");
        hint.hidden = true;
        state[key] = v;
        slider.value = String(v);
        paintSlider();
        render();
      });
      num.addEventListener("blur", () => {
        let v = Number(num.value);
        if (num.value === "" || Number.isNaN(v)) v = state[key] as number;
        v = Math.min(max, Math.max(min, Math.round(v)));
        num.value = String(v);
        slider.value = String(v);
        state[key] = v;
        dim.classList.remove("is-invalid");
        hint.hidden = true;
        paintSlider();
        render();
      });
      paintSlider();
    });

    // Drag to rotate the room
    const stage = q<HTMLElement>("[data-stage]");
    if (stage) {
      let dragging = false;
      let sx = 0;
      let sy = 0;
      let rx = rot.x;
      let ry = rot.y;
      const down = (e: MouseEvent | TouchEvent) => {
        dragging = true;
        roomEl.classList.add("is-dragging");
        const p = "touches" in e ? e.touches[0] : e;
        sx = p.clientX;
        sy = p.clientY;
        rx = rot.x;
        ry = rot.y;
      };
      const move = (e: MouseEvent | TouchEvent) => {
        if (!dragging) return;
        const p = "touches" in e ? e.touches[0] : e;
        rot.y = ry + (p.clientX - sx) * 0.42;
        rot.x = Math.max(-72, Math.min(28, rx - (p.clientY - sy) * 0.32));
        roomEl.style.transform = `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`;
      };
      const up = () => {
        dragging = false;
        roomEl.classList.remove("is-dragging");
      };
      stage.addEventListener("mousedown", down as EventListener);
      on(window, "mousemove", move as EventListener);
      on(window, "mouseup", up);
      stage.addEventListener("touchstart", down as EventListener, { passive: true });
      on(window, "touchmove", move as EventListener, { passive: true });
      on(window, "touchend", up);
    }

    let rt = 0;
    const onResize = () => {
      window.clearTimeout(rt);
      rt = window.setTimeout(render, 120);
    };
    on(window, "resize", onResize);

    render();

    return () => {
      cleanups.forEach((fn) => fn());
      window.clearTimeout(unitsTimer);
      window.clearTimeout(rt);
      if (unitsLayer) unitsLayer.innerHTML = "";
      if (flowLayer) flowLayer.innerHTML = "";
    };
  }, []);

  return (
    <section className="mrh-calc" id="unit-calculator" ref={rootRef}>
      <style>{CALC_CSS}</style>

      <div className="mrh-calc__atmosphere" aria-hidden>
        <span className="mrh-calc__orb mrh-calc__orb--a" />
        <span className="mrh-calc__orb mrh-calc__orb--b" />
        <span className="mrh-calc__orb mrh-calc__orb--c" />
        <span className="mrh-calc__grid" />
      </div>

      <div className="mrh-calc__inner">
        <header className="mrh-calc__head">
          <p className="mrh-calc__eyebrow">Unit Calculator</p>
          <h2 className="mrh-calc__title">
            How many units<br />does your space need?
          </h2>
          <p className="mrh-calc__lede">
            Enter your dimensions. We size the system to five complete air changes
            every hour, the standard our engineers design to.
          </p>
        </header>

        <div className="mrh-calc__grid-layout">
          {/* Controls */}
          <div className="glass mrh-calc__panel mrh-calc__panel--controls">
            <fieldset className="field">
              <legend className="field__label">Product</legend>
              <div className="segmented" role="radiogroup" aria-label="Product" data-segmented="product">
                <span className="segmented__thumb" aria-hidden />
                <button type="button" className="segmented__opt is-active" role="radio" aria-checked="true" data-value="AirFINEry">AirFINEry</button>
                <button type="button" className="segmented__opt" role="radio" aria-checked="false" data-value="PureAir">PureAir</button>
              </div>
            </fieldset>

            <fieldset className="field">
              <legend className="field__label">
                Dimensions
                <span className="field__unit">feet</span>
              </legend>
              <div className="dims">
                <div className="dim" data-dim="length">
                  <div className="dim__row">
                    <label className="dim__name" htmlFor="dim-length">Length</label>
                    <div className="dim__entry">
                      <input className="dim__input" id="dim-length" type="number" inputMode="numeric" min={10} max={500} step={1} defaultValue={100} aria-describedby="dim-length-hint" />
                      <span className="dim__suffix">ft</span>
                    </div>
                  </div>
                  <input className="slider" type="range" min={10} max={500} step={1} defaultValue={100} aria-label="Length in feet" tabIndex={-1} />
                  <span className="dim__hint" id="dim-length-hint" hidden>10–500 ft</span>
                </div>

                <div className="dim" data-dim="width">
                  <div className="dim__row">
                    <label className="dim__name" htmlFor="dim-width">Width</label>
                    <div className="dim__entry">
                      <input className="dim__input" id="dim-width" type="number" inputMode="numeric" min={10} max={500} step={1} defaultValue={50} aria-describedby="dim-width-hint" />
                      <span className="dim__suffix">ft</span>
                    </div>
                  </div>
                  <input className="slider" type="range" min={10} max={500} step={1} defaultValue={50} aria-label="Width in feet" tabIndex={-1} />
                  <span className="dim__hint" id="dim-width-hint" hidden>10–500 ft</span>
                </div>

                <div className="dim" data-dim="height">
                  <div className="dim__row">
                    <label className="dim__name" htmlFor="dim-height">Height</label>
                    <div className="dim__entry">
                      <input className="dim__input" id="dim-height" type="number" inputMode="numeric" min={6} max={60} step={1} defaultValue={10} aria-describedby="dim-height-hint" />
                      <span className="dim__suffix">ft</span>
                    </div>
                  </div>
                  <input className="slider" type="range" min={6} max={60} step={1} defaultValue={10} aria-label="Height in feet" tabIndex={-1} />
                  <span className="dim__hint" id="dim-height-hint" hidden>6–60 ft</span>
                </div>
              </div>

              <div className="volume-readout">
                <span className="volume-readout__label">Volume</span>
                <span className="volume-readout__value"><output data-out="volume">50,000</output> ft³</span>
              </div>
            </fieldset>

            <fieldset className="field field--last">
              <legend className="field__label">
                Operating mode
                <span className="field__unit" data-out="unitCfmChip">1,810 CFM / unit</span>
              </legend>
              <div className="segmented segmented--quad" role="radiogroup" aria-label="Operating mode" data-segmented="mode">
                <span className="segmented__thumb" aria-hidden />
                <button type="button" className="segmented__opt is-active" role="radio" aria-checked="true" data-value="Low">Low</button>
                <button type="button" className="segmented__opt" role="radio" aria-checked="false" data-value="Medium">Medium</button>
                <button type="button" className="segmented__opt" role="radio" aria-checked="false" data-value="High">High</button>
                <button type="button" className="segmented__opt" role="radio" aria-checked="false" data-value="Turbo">Turbo</button>
              </div>
              <p className="field__note">
                Higher modes move more air, so fewer units cover the same space.
              </p>
            </fieldset>
          </div>

          {/* Outcome */}
          <div className="glass mrh-calc__panel mrh-calc__panel--result">
            <div className="stage" data-stage>
              <div className="stage__scene">
                <div className="room" data-room>
                  <div className="room__face room__face--floor" />
                  <div className="room__face room__face--ceiling" />
                  <div className="room__face room__face--back" />
                  <div className="room__face room__face--left" />
                  <div className="room__face room__face--right" />
                  <div className="room__units" data-units-layer />
                  <div className="room__flow" data-flow />
                </div>
              </div>
              <p className="stage__caption">Drag to rotate</p>
            </div>

            <div className="answer">
              <p className="answer__label">Units recommended</p>
              <div className="answer__value">
                <output className="answer__number" data-out="units" aria-live="polite">3</output>
                <span className="answer__suffix" data-out="unitsWord">units</span>
              </div>
              <p className="answer__product">
                <span data-out="productLabel">AirFINEry</span>
                <span className="answer__dot" aria-hidden>·</span>
                <span data-out="modeLabel">Low</span>
              </p>
            </div>

            <dl className="metrics">
              <div className="metric">
                <dt className="metric__key">Air changes / hour</dt>
                <dd className="metric__val">5</dd>
              </div>
              <div className="metric">
                <dt className="metric__key">Airflow required</dt>
                <dd className="metric__val"><output data-out="required">4,167</output> <i>CFM</i></dd>
              </div>
              <div className="metric">
                <dt className="metric__key">Airflow per unit</dt>
                <dd className="metric__val"><output data-out="unitCfm">1,810</output> <i>CFM</i></dd>
              </div>
              <div className="metric metric--accent">
                <dt className="metric__key">Airflow delivered</dt>
                <dd className="metric__val"><output data-out="delivered">5,430</output> <i>CFM</i></dd>
              </div>
            </dl>

            <div className="coverage">
              <div className="coverage__track">
                <span className="coverage__need" data-coverage-need />
                <span className="coverage__fill" data-coverage-fill />
              </div>
              <p className="coverage__note">
                <output data-out="headroom">30</output>% headroom above requirement
              </p>
            </div>

            <div className="mrh-calc__cta">
              <a className="btn" href="/contact">
                Get a detailed assessment
                <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden>
                  <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <p className="mrh-calc__disclaimer">
                Indicative sizing based on volume and air changes. A site survey
                confirms final placement, filtration grade and unit count.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const CALC_CSS = `
  .mrh-calc {
    --c-bg:        #f5f5f7;
    --c-ink:       #1d1d1f;
    --c-ink-dim:   #6e6e73;
    --c-ink-faint: #86868b;
    --c-air:       #1a8f3c;
    --c-air-deep:  #148042;
    --c-mint:      #30d158;
    --glass-bg:    #ffffff;
    --glass-line:  rgba(0,0,0,0.09);
    --f-display: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
    --f-text:    var(--font-sans), ui-sans-serif, system-ui, sans-serif;
    --ease:     cubic-bezier(0.32, 0.72, 0, 1);
    --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    isolation: isolate;
    overflow: hidden;
    width: 100vw;
    margin-left: calc(50% - 50vw);
    margin-right: calc(50% - 50vw);
    padding: clamp(64px, 8vw, 120px) clamp(20px, 6vw, 88px) clamp(72px, 9vw, 140px);
    background: var(--c-bg);
    color: var(--c-ink);
    font-family: var(--f-text);
    -webkit-font-smoothing: antialiased;
  }
  .mrh-calc *, .mrh-calc *::before, .mrh-calc *::after { box-sizing: border-box; }

  .mrh-calc__atmosphere { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
  .mrh-calc__orb { position: absolute; border-radius: 50%; filter: blur(90px); opacity: 0.5; }
  .mrh-calc__orb--a { width: 46vw; height: 46vw; top: -14vw; left: -8vw; background: radial-gradient(circle, rgba(48,209,88,0.20) 0%, transparent 68%); animation: mrhc-drift-a 26s var(--ease) infinite alternate; }
  .mrh-calc__orb--b { width: 40vw; height: 40vw; bottom: -14vw; right: -6vw; background: radial-gradient(circle, rgba(20,128,66,0.16) 0%, transparent 68%); animation: mrhc-drift-b 32s var(--ease) infinite alternate; }
  .mrh-calc__orb--c { width: 30vw; height: 30vw; top: 42%; left: 46%; background: radial-gradient(circle, rgba(48,209,88,0.10) 0%, transparent 70%); animation: mrhc-drift-c 38s var(--ease) infinite alternate; }
  @keyframes mrhc-drift-a { to { transform: translate3d(7vw, 5vw, 0) scale(1.14); } }
  @keyframes mrhc-drift-b { to { transform: translate3d(-6vw, -5vw, 0) scale(1.10); } }
  @keyframes mrhc-drift-c { to { transform: translate3d(-9vw, 6vw, 0) scale(0.88); } }
  .mrh-calc__grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(0,0,0,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.028) 1px, transparent 1px); background-size: 68px 68px; -webkit-mask-image: radial-gradient(ellipse 90% 65% at 50% 42%, #000 20%, transparent 100%); mask-image: radial-gradient(ellipse 90% 65% at 50% 42%, #000 20%, transparent 100%); }

  .mrh-calc__inner { position: relative; z-index: 1; max-width: 1160px; margin-inline: auto; }
  .mrh-calc__head { max-width: 640px; margin-bottom: clamp(40px, 5vw, 68px); }
  .mrh-calc__eyebrow { margin: 0 0 20px; font-size: 12px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--c-air); }
  .mrh-calc__title { margin: 0 0 22px; font-family: var(--f-display); font-size: clamp(34px, 4.6vw, 60px); font-weight: 600; line-height: 1.06; letter-spacing: -0.032em; color: var(--c-ink); }
  .mrh-calc__lede { margin: 0; max-width: 48ch; font-size: clamp(15px, 1.25vw, 17px); line-height: 1.6; color: var(--c-ink-dim); }
  .mrh-calc__grid-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; align-items: stretch; }

  .glass { position: relative; background: var(--glass-bg); border: 1px solid var(--glass-line); border-radius: 26px; box-shadow: 0 1px 2px rgba(0,0,0,0.04), 0 24px 60px -26px rgba(0,0,0,0.18); }
  .mrh-calc__panel { display: flex; flex-direction: column; padding: clamp(26px, 2.6vw, 38px); }

  .field { margin: 0 0 34px; padding: 0; border: 0; }
  .field--last { margin-bottom: 0; margin-top: auto; }
  .field__label { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; width: 100%; padding: 0 0 14px; font-size: 12px; font-weight: 600; letter-spacing: 0.09em; text-transform: uppercase; color: var(--c-ink-faint); }
  .field__unit { font-size: 11px; font-weight: 500; letter-spacing: 0.04em; text-transform: none; color: var(--c-air); font-variant-numeric: tabular-nums; transition: opacity 0.3s var(--ease); }
  .field__note { margin: 14px 0 0; font-size: 13px; line-height: 1.5; color: var(--c-ink-faint); }

  .segmented { position: relative; display: grid; grid-template-columns: repeat(2, 1fr); gap: 0; padding: 3px; background: #ececef; border: 1px solid rgba(0,0,0,0.06); border-radius: 13px; }
  .segmented--quad { grid-template-columns: repeat(4, 1fr); }
  .segmented__thumb { position: absolute; top: 3px; left: 3px; height: calc(100% - 6px); border-radius: 10px; background: #ffffff; border: 0.5px solid rgba(0,0,0,0.05); box-shadow: 0 3px 8px -2px rgba(0,0,0,0.16), 0 1px 2px rgba(0,0,0,0.08); transition: transform 0.42s var(--ease), width 0.42s var(--ease); will-change: transform, width; pointer-events: none; }
  .segmented__opt { position: relative; z-index: 1; appearance: none; -webkit-appearance: none; background: none; border: 0; padding: 11px 6px; font-family: inherit; font-size: 14px; font-weight: 500; letter-spacing: -0.005em; color: var(--c-ink-dim); cursor: pointer; border-radius: 10px; transition: color 0.28s var(--ease); white-space: nowrap; }
  .segmented__opt:hover { color: var(--c-ink); }
  .segmented__opt.is-active { color: var(--c-ink); font-weight: 600; }
  .segmented__opt:focus-visible { outline: 2px solid var(--c-air); outline-offset: 2px; }

  .dims { display: flex; flex-direction: column; gap: 22px; }
  .dim__row { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 10px; }
  .dim__name { font-size: 15px; font-weight: 500; color: var(--c-ink); letter-spacing: -0.01em; }
  .dim__entry { display: inline-flex; align-items: baseline; gap: 5px; padding: 5px 12px; background: #f2f2f4; border: 1px solid rgba(0,0,0,0.08); border-radius: 9px; transition: border-color 0.25s var(--ease), background 0.25s var(--ease); }
  .dim__entry:focus-within { border-color: rgba(26,143,60,0.55); background: rgba(48,209,88,0.07); }
  .dim.is-invalid .dim__entry { border-color: rgba(214,69,65,0.6); background: rgba(214,69,65,0.06); }
  .dim__input { width: 4ch; appearance: none; -webkit-appearance: none; background: none; border: 0; padding: 0; font-family: var(--f-display); font-size: 17px; font-weight: 600; font-variant-numeric: tabular-nums; letter-spacing: -0.01em; color: var(--c-ink); text-align: right; }
  .dim__input::-webkit-outer-spin-button, .dim__input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
  .dim__input[type="number"] { -moz-appearance: textfield; }
  .dim__input:focus { outline: none; }
  .dim__suffix { font-size: 12px; font-weight: 500; color: var(--c-ink-faint); }
  .dim__hint { display: block; margin-top: 7px; font-size: 12px; color: #d64541; }

  .slider { -webkit-appearance: none; appearance: none; width: 100%; height: 22px; background: none; cursor: grab; display: block; }
  .slider:active { cursor: grabbing; }
  .slider::-webkit-slider-runnable-track { height: 4px; border-radius: 999px; background: linear-gradient(90deg, var(--c-air-deep), var(--c-air)) 0 / var(--fill, 20%) 100% no-repeat, rgba(0,0,0,0.10); }
  .slider::-moz-range-track { height: 4px; border-radius: 999px; background: rgba(0,0,0,0.10); }
  .slider::-moz-range-progress { height: 4px; border-radius: 999px; background: linear-gradient(90deg, var(--c-air-deep), var(--c-air)); }
  .slider::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; margin-top: -7px; border-radius: 50%; background: #fff; border: 0.5px solid rgba(0,0,0,0.12); box-shadow: 0 1px 3px rgba(0,0,0,0.25); transition: box-shadow 0.25s var(--ease), transform 0.18s var(--ease); }
  .slider::-moz-range-thumb { width: 18px; height: 18px; border-radius: 50%; background: #fff; border: 0.5px solid rgba(0,0,0,0.12); box-shadow: 0 1px 3px rgba(0,0,0,0.25); }
  .slider:hover::-webkit-slider-thumb { transform: scale(1.1); }
  .slider:active::-webkit-slider-thumb { transform: scale(1.16); box-shadow: 0 1px 3px rgba(0,0,0,0.25), 0 0 0 9px rgba(48,209,88,0.14); }
  .slider:focus-visible::-webkit-slider-thumb { box-shadow: 0 1px 3px rgba(0,0,0,0.25), 0 0 0 5px rgba(48,209,88,0.4); }
  .slider:focus { outline: none; }

  .volume-readout { display: flex; align-items: baseline; justify-content: space-between; margin-top: 26px; padding-top: 18px; border-top: 1px solid rgba(0,0,0,0.08); }
  .volume-readout__label { font-size: 12px; font-weight: 600; letter-spacing: 0.09em; text-transform: uppercase; color: var(--c-ink-faint); }
  .volume-readout__value { font-family: var(--f-display); font-size: 17px; font-weight: 600; font-variant-numeric: tabular-nums; letter-spacing: -0.01em; color: var(--c-ink); }

  .stage { position: relative; height: 250px; margin: -8px 0 28px; display: flex; align-items: center; justify-content: center; cursor: grab; touch-action: pan-y; user-select: none; -webkit-user-select: none; }
  .stage:active { cursor: grabbing; }
  .stage__scene { perspective: 1100px; perspective-origin: 50% 46%; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
  .room { position: relative; transform-style: preserve-3d; transition: transform 0.6s var(--ease-out); will-change: transform; }
  .room.is-dragging { transition: none; }
  .room__face { position: absolute; top: 50%; left: 50%; transform-style: preserve-3d; border: 1px solid rgba(26,143,60,0.30); background: rgba(48,209,88,0.05); transition: width 0.55s var(--ease-out), height 0.55s var(--ease-out), transform 0.55s var(--ease-out); }
  .room__face--floor { background: linear-gradient(rgba(48,209,88,0.12), rgba(48,209,88,0.12)), repeating-linear-gradient(0deg, rgba(26,143,60,0.18) 0 1px, transparent 1px 26px), repeating-linear-gradient(90deg, rgba(26,143,60,0.18) 0 1px, transparent 1px 26px); border-color: rgba(26,143,60,0.5); }
  .room__face--ceiling { background: rgba(26,143,60,0.05); border-color: rgba(26,143,60,0.22); }
  .room__face--back { background: rgba(0,0,0,0.028); }
  .room__face--left, .room__face--right { background: rgba(0,0,0,0.02); }
  .room__units { position: absolute; top: 50%; left: 50%; transform-style: preserve-3d; pointer-events: none; }
  .unit-mark { position: absolute; width: 13px; height: 13px; margin: -6.5px 0 0 -6.5px; border-radius: 3px; background: linear-gradient(180deg, #30d158, #148042); box-shadow: 0 0 12px 2px rgba(48,209,88,0.55), 0 0 3px 0 rgba(20,128,66,0.6); transform-style: preserve-3d; animation: mrhc-unit-in 0.5s var(--ease-out) backwards; }
  @keyframes mrhc-unit-in { from { opacity: 0; transform: translateZ(26px) scale(0.3); } to { opacity: 1; transform: translateZ(0) scale(1); } }
  .room__flow { position: absolute; top: 50%; left: 50%; transform-style: preserve-3d; pointer-events: none; }
  .mote { position: absolute; width: 3px; height: 3px; border-radius: 50%; background: rgba(26,143,60,0.75); box-shadow: 0 0 6px 1px rgba(48,209,88,0.55); animation: mrhc-mote-rise linear infinite; }
  @keyframes mrhc-mote-rise { 0% { opacity: 0; transform: translate3d(0,0,0); } 12% { opacity: 0.9; } 88% { opacity: 0.9; } 100% { opacity: 0; transform: translate3d(0, var(--rise, -90px), 0); } }
  .stage__caption { position: absolute; bottom: -2px; left: 50%; transform: translateX(-50%); margin: 0; font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--c-ink-faint); opacity: 0.55; transition: opacity 0.4s var(--ease); }
  .stage:hover .stage__caption { opacity: 0.9; }

  .answer { padding-top: 24px; border-top: 1px solid rgba(0,0,0,0.08); }
  .answer__label { margin: 0 0 8px; font-size: 12px; font-weight: 600; letter-spacing: 0.09em; text-transform: uppercase; color: var(--c-ink-faint); }
  .answer__value { display: flex; align-items: baseline; gap: 10px; }
  .answer__number { font-family: var(--f-display); font-size: clamp(56px, 6.4vw, 82px); font-weight: 680; line-height: 0.94; letter-spacing: -0.045em; font-variant-numeric: tabular-nums; background: linear-gradient(170deg, #1d1d1f 20%, var(--c-air) 130%); -webkit-background-clip: text; background-clip: text; color: transparent; transition: opacity 0.2s var(--ease), transform 0.2s var(--ease); }
  .answer__number.is-swapping { opacity: 0; transform: translateY(-7px); }
  .answer__suffix { font-family: var(--f-display); font-size: 19px; font-weight: 500; color: var(--c-ink-dim); letter-spacing: -0.01em; }
  .answer__product { margin: 12px 0 0; font-size: 14px; color: var(--c-ink-dim); }
  .answer__dot { margin: 0 6px; color: var(--c-ink-faint); }

  .metrics { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; margin: 26px 0 0; background: rgba(0,0,0,0.08); border: 1px solid rgba(0,0,0,0.08); border-radius: 14px; overflow: hidden; }
  .metric { padding: 15px 16px; background: #f7f7f8; }
  .metric--accent { background: rgba(48,209,88,0.08); }
  .metric__key { margin: 0 0 5px; font-size: 11px; font-weight: 500; letter-spacing: 0.03em; color: var(--c-ink-faint); }
  .metric__val { margin: 0; font-family: var(--f-display); font-size: 19px; font-weight: 600; font-variant-numeric: tabular-nums; letter-spacing: -0.015em; color: var(--c-ink); }
  .metric__val i { font-style: normal; font-size: 11px; font-weight: 500; color: var(--c-ink-faint); margin-left: 2px; }
  .metric--accent .metric__val { color: var(--c-air); }

  .coverage { margin-top: 20px; }
  .coverage__track { position: relative; height: 6px; border-radius: 999px; background: rgba(0,0,0,0.08); overflow: hidden; }
  .coverage__fill { position: absolute; inset: 0 auto 0 0; width: 0%; border-radius: 999px; background: linear-gradient(90deg, var(--c-air-deep), var(--c-air), var(--c-mint)); transition: width 0.7s var(--ease-out); }
  .coverage__need { position: absolute; top: -3px; bottom: -3px; width: 2px; background: rgba(0,0,0,0.55); border-radius: 2px; z-index: 2; transition: left 0.7s var(--ease-out); }
  .coverage__note { margin: 10px 0 0; font-size: 12px; color: var(--c-ink-faint); font-variant-numeric: tabular-nums; }

  .mrh-calc__cta { margin-top: auto; padding-top: 26px; }
  .btn { display: inline-flex; align-items: center; gap: 8px; padding: 13px 22px; border-radius: 999px; background: #1d1d1f; color: #ffffff; font-size: 14px; font-weight: 600; letter-spacing: -0.008em; text-decoration: none; transition: transform 0.28s var(--ease), background 0.28s var(--ease); }
  .btn:hover { transform: translateY(-1.5px); background: #333335; }
  .btn svg { transition: transform 0.28s var(--ease); }
  .btn:hover svg { transform: translateX(3px); }
  .btn:focus-visible { outline: 2px solid var(--c-air); outline-offset: 3px; }
  .mrh-calc__disclaimer { margin: 16px 0 0; font-size: 12px; line-height: 1.55; color: var(--c-ink-faint); max-width: 44ch; }

  @media (max-width: 900px) {
    .mrh-calc__grid-layout { grid-template-columns: 1fr; }
    .field--last { margin-top: 0; }
  }
  @media (max-width: 560px) {
    .mrh-calc__panel { padding: 24px 20px; }
    .segmented--quad { grid-template-columns: repeat(2, 1fr); }
    .segmented--quad .segmented__thumb { display: none; }
    .segmented--quad .segmented__opt.is-active { background: #ffffff; border-radius: 10px; box-shadow: 0 2px 6px -2px rgba(0,0,0,0.16); }
    .metrics { grid-template-columns: 1fr; }
    .stage { height: 210px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .mrh-calc *, .mrh-calc *::before, .mrh-calc *::after { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; }
    .mote { display: none; }
  }
`;
