# holdbodí — Frontend

React + Vite + TypeScript frontend for the holdbodí Community Support
platform, wired up to the Django `outreach` API.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4 (design tokens in `src/index.css`)
- React Router for routing
- TanStack Query for server state
- React Hook Form + Zod for form validation
- Axios for API calls
- Sonner for toasts, Lucide for icons

## Getting started

```bash
npm install
cp .env.example .env.local   # already done - edit if your API runs elsewhere
npm run dev
```

The app expects the backend running at the URL in `VITE_API_BASE_URL`
(defaults to `http://localhost:8000/v1/outreach`). Make sure the backend's
`CORS_ALLOWED_ORIGINS` includes this frontend's origin (`http://localhost:5173`
in dev - already the backend's default).

## Structure

```
src/
├── components/
│   ├── layout/     # Header, Footer, Layout
│   ├── home/       # Hero, ImpactTicker, About, HowItWorks, Initiatives, etc.
│   └── ui/         # Button, Field/Input/Select/Textarea, ProgressRing, AnimatedNumber
├── hooks/
│   └── useOutreach.ts   # React Query hooks for every outreach endpoint
├── lib/
│   ├── api.ts           # axios instance + error message helper
│   ├── endpoints.ts      # one function group per backend resource
│   └── format.ts         # currency/number formatting
├── pages/          # HomePage, DonatePage, DonateCallbackPage, VolunteerPage,
│                   # FoodDonationPage, PartnerPage, NotFoundPage
├── types/          # TypeScript types mirroring the API responses
└── assets/images/  # event photography + logo used across the site
```

## Donation flow

1. `/donate` — pick an initiative + amount tier (or custom amount) + donor
   identity (or anonymous) -> `POST /donations/` -> redirects to the returned
   Paystack `payment_url`.
2. Paystack redirects back to `/donate/callback?reference=...` -> the page
   calls `GET /donations/verify/:reference/` and shows success/failure.
3. The backend's Paystack webhook is the actual source of truth for marking
   a donation successful - the callback page is just the user-facing
   confirmation.

## Notes

- The brand brief calls for "TT Norms" as a secondary typeface; that's a
  paid font with no free distribution, so **Inter** is used in its place
  alongside Montserrat. Swap it in `index.html` + `src/index.css` if you
  acquire a license.
- `profile_photo` on the volunteer form is required and submitted as
  `multipart/form-data`, matching the backend's `MultiPartParser`.
- Build with `npm run build`; output goes to `dist/`.
