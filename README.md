# Clearway Check — Adult Screening Companion

A lightweight, client-side web app that walks a user through a 10-question observational screening flow (inspired by the AQ-10 style questionnaire) plus a few background details, then returns an informational, non-clinical likelihood indicator with a visual gauge.

Originally prototyped as a Python CLI tool that trained a `RandomForestClassifier` on a CSV dataset; rebuilt here as a fully static, in-browser experience with a transparent rule-based scoring model (no backend, no data leaves the browser).

**🔗 Live demo:** *add your GitHub Pages / Netlify / Vercel link here*

\---

## ✨ Features

* **Guided, one-question-at-a-time flow** with an animated progress bar
* **10-item trait questionnaire** + demographic inputs (age, gender, jaundice history, family history)
* **Instant results screen** with an animated SVG gauge, risk category (Low / Medium / High), and a transparent score breakdown
* **Fully client-side** — all logic runs in `script.js`; no server, no API calls, no data collection
* **Responsive design** — works on mobile and desktop
* **Accessible** — keyboard-navigable choices, visible focus states

## 🧱 Tech Stack

|Layer|Tech|
|-|-|
|Structure|HTML5|
|Styling|CSS3 (custom properties, no framework)|
|Interactivity|Vanilla JavaScript (no dependencies)|
|Fonts|Google Fonts (Fraunces, IBM Plex Sans, IBM Plex Mono)|

## 📁 Project Structure

```
screening-tool-site/
├── index.html      # Markup and app structure
├── style.css        # All styling (design tokens, layout, components)
├── script.js        # Question bank, scoring logic, screen navigation, gauge rendering
└── README.md
```

## 🚀 Getting Started

No build step, no dependencies, no server required.

```bash
git clone https://github.com/<your-username>/clearway-check.git
cd clearway-check
open index.html   # or just double-click the file
```

To deploy, drop the three files into any static host (GitHub Pages, Netlify, Vercel, S3, etc.).

## 🧠 How Scoring Works

Each of the 10 questions is mapped to an "indicative" answer direction (e.g., not making eye contact, or staring at nothing for long periods, contributes to the trait score). The raw score out of 10 is combined with small weighted adjustments for family history and jaundice history to produce a likelihood percentage, which is then bucketed into Low / Medium / High.

This mirrors the *shape* of the original machine-learning prototype (features, questions, risk buckets) but intentionally uses a transparent, auditable heuristic instead of a black-box model, since a trained scikit-learn model can't run natively in the browser without a backend to serve it.

> \*\*⚠️ Disclaimer:\*\* This tool is for informational and educational purposes only. It is \*\*not\*\* a diagnostic or clinical instrument and is not a substitute for evaluation by a qualified healthcare professional.

## 🔮 Possible Next Steps

* \[ ] Add a Flask/FastAPI backend to serve the original trained `RandomForestClassifier` for higher-fidelity predictions
* \[ ] Persist anonymized, opt-in results for aggregate research (with consent flow)
* \[ ] Add i18n / multi-language support
* \[ ] Add unit tests for the scoring logic

## 📄 License

MIT — free to use, modify, and distribute.

\---

## 

