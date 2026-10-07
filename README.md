# Storm Design Reference

Stormwater design desk for 7 Cloud Engineering. Sibling of [OSS-Design-Reference](https://github.com/timothywli00-svg/OSS-Design-Reference).

The live site is [storm.7cloudengineering.com](https://storm.7cloudengineering.com). GitHub Pages serves the static build. A push to `main` runs that build.

What it does:

- Minimum-requirement thresholds from the 2024 Stormwater Management Manual for Western Washington
- BMP sizing that uses those same areas: downspout dispersion (T5.10B), downspout infiltration (T5.10A), full dispersion (T5.30), and a full-flow pipe check
- A preliminary Word draft you can edit
- A library of past report patterns

```bash
npm install
npm run dev
```
