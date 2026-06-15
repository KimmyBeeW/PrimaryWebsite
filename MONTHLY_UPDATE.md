# Monthly Update Checklist (do this at the start of each month)

A couple of things on the site change every month. Walk this short list at the
start of each month. All changes are in **`index.html`**.

> Tip: line numbers shift as the file changes. Each item gives a **search string**
> you can paste into your editor's "Find" (Cmd+F) to jump straight to the spot.
>
> For the once-a-year items (Come, Follow Me link, playlist, song list), see
> **`YEARLY_UPDATE.md`** instead.

---

## 1. "Singing This Month" / "Coming Up" cards

Search: `month-card__title` (~lines 140 & 145)

Two cards name the **current month** and the **next month** (e.g. "June Songs" /
"July Songs"). Update both so the first card is this month and the second is next
month. In December, the "Coming Up" card rolls over to "January Songs".

---

## 2. Calendar / Upcoming Activities

Search: `class="events"` (~line 62), then the `<li class="event …">` blocks.

These are specific dated activities (e.g. "JUN 15 — Primary Program Rehearsal").
Each month:

- **Remove** events that have already passed.
- **Add** the new month's activities.

Each event block has these fields to fill in:

| Field                | Search class      | Example          |
|----------------------|-------------------|------------------|
| Month abbreviation   | `event__month`    | `JUN`            |
| Day number           | `event__day`      | `15`             |
| Title                | `event__title`    | Activity Days    |
| Time / location      | `event__meta`     | 🕕 6:00 PM · 📍 … |
| Description          | `event__desc`     | short blurb      |

**Event color types** — set the type on both the `<li>` and its tag span:

- Sunday / program rehearsal → `event event--sunday` + `event__tag--sunday`
- Weekday activity → `event event--weekday` + `event__tag--weekday`
- Special / ward-wide → `event event--special` + `event__tag--special`

To add an event, copy an existing `<li class="event …">` block and edit the
fields. To verify, open `index.html` in a browser and check the calendar section.

---

## Quick reference

| What | File | Search string |
|------|------|---------------|
| This/next month song cards | index.html | `month-card__title` |
| Calendar events            | index.html | `class="events"` |
