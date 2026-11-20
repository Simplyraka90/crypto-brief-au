# Crypto Watch AU — Responsive Website

A self-contained HTML/CSS/JavaScript implementation based on the supplied screenshots. No build tools required.

## Run
Open `index.html` in Chrome/Edge, or run `python -m http.server 8000` in this folder and visit http://localhost:8000.

## Features
- Responsive layout, mobile navigation, scroll reveal animations
- Scenario selector and USD → AUD calculator at the screenshot's stated 0.6677 AUD/USD rate
- Registration/sign-up UI (frontend demonstration; no backend or accounts)
- Preserved screenshot text, sections, colors and styling as closely as possible

## Important source limitations
- The screenshot contains unrendered `{{row...}}` historical-return placeholders. Real numerical values are not visible; the table shows `Data pending` rather than fabricated numbers. Replace with verified values from the original source.
- The four educational cards had unrendered `{{l...}}` placeholders; meaningful explanatory copy is supplied instead.
- The hero image is a cropped portion of the user's provided screenshot, not an independently sourced original asset.
- Market figures and dates are from the supplied screenshot, not verified live data.
