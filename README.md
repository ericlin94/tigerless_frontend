# Apsu Frontend Take-Home

Responsive implementation of the supplied Apsu desktop and mobile designs using Next.js App Router, React, strict TypeScript, Tailwind CSS 4, and Storybook.
## Run

Requires Node.js 20.19+ (Node.js 22 LTS recommended).

```sh
npm install
npm run dev
```

Open http://127.0.0.1:3000. For another port use `npm run dev -- --port 3001`.

```sh
npm run build
npm run typecheck
npm test
npm run storybook
npm run build-storybook
```

Storybook runs at http://127.0.0.1:6006. Viewport options include the exact 375px mobile and 1440px desktop boards. The npm lockfile is included.

## Structure

- `src/app/`: App Router entry points, styles, layout, and informational routes.
- `src/components/`: One folder per substantial component, with its `.tsx`, `.module.css`, and `.stories.tsx` files together. Small shared primitives and social buttons stay under `ui/`. `index.ts` is the public library entry point.
- `src/lib/contracts.ts`: Future API data shapes, independent of rendering.
- `src/lib/mock-content.ts`: Typed fixtures for services, plans, care layers, features, testimonials, FAQs, navigation, and footer groups.
- `src/lib/content-repository.ts`: Mock content and consultation preview adapters. The page consumes the adapter rather than fixtures directly.
- `src/lib/bmi.ts`: Pure BMI calculation, with boundary tests.
- `public/assets/`: Original Figma images and SVGs. Raster images use Next.js image optimization; SVGs retain their source geometry.
- `scripts/`: Asset provenance/download tooling and browser checks.
- `.storybook/`: Story discovery, shared styles, accessibility addon, and board viewports.

## API Contracts

`HomeContent` is the proposed payload for `GET /v1/home`. It contains typed collections for dynamic sections. `ServiceId` connects navigation, plans, testimonials, and consultation actions. `Money` carries currency and billing interval separately from presentation. `ImageAsset` contains a source and alternate text.

`ConsultationRequest` is the proposed body for `POST /v1/consultations`: `{ serviceId, language, email }`. The current adapter returns a typed `ConsultationPreview` in memory. A real adapter should validate server responses, handle loading/errors, and supply the production consent workflow. No backend submission or persistent storage is implemented.

BMI accepts canonical centimeters/kilograms; imperial conversion occurs at the form boundary. Classification uses the unrounded result, while display rounds to one decimal. The design's Male/Female selector defaults to Female and retains its selection when units change. Sex is form state only: it does not affect the BMI calculation or classification and is not stored or submitted. BMI does not decide medical eligibility.

## Deviation Log

| Change                                                                                                            | Reason                                                                                                                       |
| ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| “Loss Weight In Your Way” becomes “Lose weight in your way.”                                                      | Corrects the verb and capitalization.                                                                                        |
| “Easy Manager Treatment” becomes “Easily Manage Treatment.”                                                       | Corrects a copy error.                                                                                                       |
| “No Issuance Needed” becomes “No Insurance Needed.”                                                               | Corrects the intended cash-pay message.                                                                                      |
| “Comapny” becomes “Company”; “USA pharmacies” becomes “US pharmacies.”                                            | Fixes spelling and makes copy consistent.                                                                                    |
| Russian and Arabic use separate language labels.                                                                  | The source incorrectly combines both languages in one label.                                                                 |
| All three service summary cards use their respective supplied portraits instead of the repeated tirzepatide vial. | Uses the supplied portrait assets, with the weight-management portrait replacing the vial at the user's request.              |
| Weight-management summary artwork intentionally differs from the original Figma vial.                             | The requested portrait replacement uses its own responsive crop instead of the original vial crop measurements.               |
| Both medication plans include an illustration/product-appearance disclaimer.                                      | The supplied vial art is labeled tirzepatide, including in the semaglutide card, so it is treated as illustrative only.      |
| Portrait testimonial uses “Patient story” instead of “David L”.                                                   | The source image/name pairing is inconsistent.                                                                               |
| Missing FAQ answers receive distinct mock answers.                                                                | Source instances reuse an unrelated all-50-states answer.                                                                    |
| Provider-support and medication carousel artwork uses responsive, centered placement.                             | Prevents mobile cropping and keeps the phone, chat, and medication art aligned across widths.                                |
| Trust strip scrolls horizontally instead of clipping benefits on narrow screens.                                  | Keeps all benefits reachable with visible overflow and keyboard/touch scrolling.                                             |
| Page scrollbar space remains reserved while dialogs lock background scrolling.                                    | Prevents centered content from shifting when dialogs or the mobile menu hide page scrolling.                                 |
| Added adult-screening and physician-assessment context.                                                           | BMI alone is not a diagnosis or prescription decision.                                                                       |
| Mobile BMI result sits inside the form above measurements, with unit control and validation.                      | Preserves the mobile composition while making it usable.                                                                     |
| Badge text and care step numbers use darker green tokens.                                                         | Original contrast failed accessibility checks.                                                                               |
| Health-widget text uses a compact normal row rather than mirrored layer geometry.                                 | Keeps the illustrative profile readable.                                                                                     |
| Legal/editorial links open clearly identified demonstration pages; social buttons open an explanatory dialog.     | No production documents or social destinations were supplied.                                                                |
| Consultation/login include explicit demo confirmation states.                                                     | No backend exists, so the UI does not claim email or booking actions occurred.                                               |
| Carousel has consistent previous/next buttons with disabled boundaries.                                           | Corrects the source's missing mobile previous control and overlapping arrow layers.                                          |
| Letter spacing is zero; sections grow when corrected content needs room.                                          | Maintains responsive readability without clipped source geometry.                                                            |


## Interaction States And Motion

| Component               | States and behavior                                                                                                                                                 |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Action / ActionLink     | Primary, secondary, outline, with-arrow, disabled; hover color/shadow, visible focus outline, 1px pressed translation.                                              |
| Navigation              | Desktop, mobile closed, mobile open. Native modal focus containment, Escape, scroll lock, and close-on-navigation.                                                  |
| FAQ                     | Expanded/collapsed; first question initially open, one open at a time. Hover/focus, animated chevron and answer entry; labeled regions and `aria-expanded`.         |
| BMI                     | Imperial empty, metric empty, invalid, results in four categories, Male selected, mobile, and sex-selection interaction stories. Unit change clears measurements while preserving sex; editing measurements clears stale results. Changing sex preserves results. Errors/results are announced. |
| Carousel                | Start, middle, end. Disabled boundary controls, keyboard arrows, scroll snap, smooth scrolling, and touch swiping.                                                  |
| Trust strip             | Centered desktop, overflowing mobile/tablet, and scrolled-to-end. Visible horizontal scrollbar, touch swiping, keyboard arrows on focus, and a labeled region. |
| Consultation dialog     | Closed, consultation, login, validation error, success preview, information. Native focus containment, Escape, labeled fields, and email validation.                |
| Links / social controls | Hover, keyboard focus, pressed; icons have accessible names and tooltips.                                                                                           |

## AI Use

Most of the project was completed with AI assistance. There isn’t an easy way to export the full logs in a readable format, but I can walk you through them on a video call if needed.

## Production Boundaries

No authentication, clinical backend, payments, persistent patient data, or deployment is implemented. Contact leads to the consultation CTA. Legal/editorial pages are explicit demonstration placeholders. Prices and statements are mock content; a real service needs approved copy and accurate medication imagery. Asset download URLs expire, but the application uses local originals and does not depend on those URLs.

