# Specification

## Summary
**Goal:** Add a 3D necklace accessory to the Stitch character in the existing 3D scene.

**Planned changes:**
- Add a `StitchNecklace` sub-component in `FrogScene.tsx` following the existing `StitchGlasses` pattern
- Render the necklace as 3D geometry (a looping chain/band around the neck plus a small pendant or bead)
- Position and scale the necklace correctly around Stitch's neck to match his cartoon proportions
- Apply a gold or metallic material fitting Stitch's cartoon aesthetic
- Ensure the necklace moves with Stitch during jump/squash-stretch animations

**User-visible outcome:** The Stitch character in the 3D scene will visibly wear a necklace around his neck that animates with him.
