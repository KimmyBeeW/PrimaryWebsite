# As Needed Update Checklist (do this whenever activities get added to the calendar)

The calendar of activities is the one thing on the site that's worth refreshing
through the year. All changes are in **`index.html`**.

> Tip: line numbers shift as the file changes. Each item gives a **search string**
> you can paste into your editor's "Find" (Cmd+F) to jump straight to the spot.
>
> For the once-a-year items (Come, Follow Me link, playlists, song list), see
> **`YEARLY_UPDATE.md`** instead.

---

## Calendar / Upcoming Activities

Search: `class="events"` (~line 62), then the `<li class="event …">` blocks.

These are specific dated activities (e.g. "JUN 21 — Father's Day Performance").
As needed:

- **Remove** events that have already passed.
- **Add** the new activities, rehearsals, and performances.

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
| Calendar events | index.html | `class="events"` |
