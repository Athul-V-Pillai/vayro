# vayro — AI Driver-Safety Ecosystem Website

> **Tagline:** Drive Safe. Stay Alert.  
> **Headline:** "A moment of sleep can cost a life."

A buying e-commerce website for **vayro** — an AI driver-safety ecosystem combining a dual-camera dashcam with on-device drowsiness detection and companion wireless earbuds delivering real-time auditory alert intervention (<120ms).

---

## Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS (Custom Dark `#07090C`, Teal `#2DD4BF`, Warm Amber `#F59E0B` glow palette)
- **3D Graphics**: Three.js + React Three Fiber (`@react-three/fiber`) + Drei (`@react-three/drei`)
- **State Management**: Zustand (Cart, Active View, Multi-step Checkout, Modal triggers)
- **Audio Synthesizer**: Native Web Audio API dual-tone drowsiness alert chime (no external audio assets required)
- **Motion & Micro-interactions**: Lucide React + Canvas Confetti
- **Device Support**: Mobile-first, lazy-loaded 3D, WebGL detection fallback, and `prefers-reduced-motion` accessibility support.

---

## 3D Animation Centerpieces

1. **Hero 3D Scene**:
   - Rotating dual-lens dashcam floating over a dark atmospheric gradient.
   - Reacts dynamically to mouse/cursor parallax.
   - Pulsing 940nm stealth infrared LED illuminator ring around the cabin driver lens.
   - Two companion wireless earbuds orbiting around the dashcam unit.
   - "Concept visualization" label overlay.

2. **Scroll & Step Exploded Architecture Sequence**:
   - Stage 1: Assembled windshield unit with dual optical paths.
   - Stage 2: Dashcam separates into an exploded 3D view with 6 interactive hardware callout labels:
     - Road Camera (4K HDR, 155° FOV)
     - Driver Cabin Camera (1080p FHD)
     - 940nm Stealth IR LEDs (Zero glare for night tracking)
        - Edge-AI Neural Processing Unit (On-device PERCLOS calculation)
     - MicroSD UHS-I V30 High-Endurance Slot
   - Stage 3: Direct ultra-low latency wireless signal arc travels between dashcam and earbuds.
   - Stage 4: Earbuds flash warning amber and emit concentric soundwave ripples illustrating immediate cognitive arousal intervention.

3. **Interactive 360° Audio Variant Viewer**:
   - Full drag-to-rotate OrbitControls and zoom inspector.
   - Toggle seamlessly between **vayro Pro** (Liquid silicone neckband) and **vayro Lite** (True Wireless earbuds + smart pebble charging case).
   - **Click-to-open case lid**: Clicking the Lite case lid triggers an interactive spring-hinge opening and closing animation with earbud lift!
   - Finish / Colorway previews (Matte Obsidian, Stealth Titanium, Teal Pulse).

4. **Ambient Mode vs ANC 3D Visualizer**:
   - Live 3D particle sound-wave field demonstrating Active Noise Cancellation (flattening road drone) vs Smart Ambient Mode (piping in emergency vehicle sirens and traffic horns).

---

## Centralized Configuration

All product pricing, batch shipping estimates, technical specs, and prototype disclaimers are centralized in a single file:
👉 `src/data/products.ts`

- Easily change pricing:
  ```ts
  // src/data/products.ts
  price: 6999, // vayro Pro ₹6,999
  price: 5999, // vayro Lite ₹5,999
  ```

---

## Custom 3D Model Replacement (.glb)

The site includes high-fidelity procedural 3D models with PBR materials, glowing infrared LED arrays, and opening case hinges. If you generate custom `.glb` models, you can export them and drop them into the `public/models/` directory:

- `public/models/dashcam.glb`
- `public/models/pro_neckband.glb`
- `public/models/lite_tws.glb`

### Prompt for Generating 3D Models (Meshy, Tripo, Luma, etc.)

- **Dashcam**:
  > "Sleek compact matte-black dual-lens car dashcam, one lens facing forward and one facing the driver, small infrared LED ring around the driver lens, minimal premium design, suction/adhesive windshield mount, product render, white background, PBR textures."

- **Pro Neckband**:
  > "Matte-black flexible neckband wireless earbuds with a soft U-shaped band, integrated earbuds on short cables, small physical control buttons on the band, subtle teal accent light, premium audio product design, PBR textures."

- **Lite True Wireless**:
  > "Matte-black true wireless earbuds with a compact charging case, case lid open, subtle teal LED indicator, minimal premium design, PBR textures."

---

## Setup & Running Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 3. Production Build
```bash
npm run build
```
Creates optimized production files in `dist/`.

---

## Key Features & Compliance

- **Founder Batch**: Uses Q3 2026 Batch 1 estimated dispatch messaging.
- **Mandatory Safety Disclaimers**:
  - *"Drowsiness detection is an assistance feature, not a guarantee of safety."*
  - *"Ambient Mode does not guarantee complete awareness of traffic sounds."*
  - *"System must be used per traffic laws and does not encourage interaction while driving."*
- **Cart & Multi-Step Checkout**: Slide-out cart drawer, free priority shipping progress, Stripe-ready payment placeholder, and celebratory order confirmation.
