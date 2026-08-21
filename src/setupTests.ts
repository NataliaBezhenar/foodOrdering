import "@testing-library/jest-dom/vitest";

// Modal.tsx resolves these portal targets once at module import time (mirroring
// index.html), so they must exist before any test file imports it.
for (const id of ["root", "backdrop-root", "overlay-root"]) {
  if (!document.getElementById(id)) {
    const el = document.createElement("div");
    el.id = id;
    document.body.appendChild(el);
  }
}
