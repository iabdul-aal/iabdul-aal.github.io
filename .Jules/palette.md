## 2024-05-10 - Explicit Labels and Required Indicators
**Learning:** Found that the ContactEmailForm was relying on implicit label wrapping without visual required indicators, which is less accessible and can lead to user frustration.
**Action:** Always use explicit `htmlFor` and `id` attributes for labels and inputs, and use `aria-hidden="true"` on visual indicators like asterisks to prevent redundant screen reader announcements.
