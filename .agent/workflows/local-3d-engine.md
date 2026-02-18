---
description: Create local 3D scenes using Three.js — a no-SaaS alternative to Spline. Use when users request 3D scenes, Three.js components, WebGL renders, 3D product showcases, interactive 3D backgrounds, particle systems, procedural geometry, or anything involving local 3D rendering.
---

## Local 3D Engine Workflow

// turbo-all

1. **Read the skill instructions**:
   ```
   Read `~/.gemini/antigravity/skills/local-3d-engine/SKILL.md`
   ```

2. **Scaffold or create a scene** — choose one:

   a) **Quick scaffold** (generates from template):
   ```bash
   node ~/.gemini/antigravity/skills/local-3d-engine/scripts/scaffold-scene.js --name "scene-name" --style dark --controls orbit --bloom
   ```

   b) **Copy template manually**:
   ```bash
   cp ~/.gemini/antigravity/skills/local-3d-engine/assets/scene-template.html ./my-scene.html
   ```

   c) **Write from scratch** using patterns from the skill references.

3. **Customize the scene**: Replace the placeholder geometry section with the desired 3D content. Follow the scene composition order from SKILL.md.

4. **Preview**: Open the HTML file directly in a browser, or:
   ```bash
   npx serve .
   ```

5. **Iterate**: Use Gemini to refine lighting, materials, and composition. See `references/gemini-3d-integration.md` for prompt patterns.
