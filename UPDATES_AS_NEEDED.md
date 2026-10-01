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

- **Add** the new activities, rehearsals, and performances.
- **Remove** events once the page gets cluttered — see "Past events" below;
  they hide themselves, so this is only tidying, never urgent.

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

### Past events hide themselves

`scripts.js` drops each event from the page at **2 AM the morning after it
happens**, so the calendar never leads with something that's already over. A few
things worth knowing:

- A date range in `event__day` (e.g. `3-4`) hides after the **last** day.
- The year comes from the Come, Follow Me link on the page, so `index.html`
  events are read as this year's and `2027.html` events as 2027's. Nothing to set.
- **`TBD` / `TBA` events never hide** — there's no date to go on. Fill in the real
  date when you know it, or delete the event when it's past.
- The event is only hidden, not deleted, so the `<li>` sticks around in the file.
  Clear out old ones whenever you like; the yearly cleanup is a good time.
- If *every* event on the page is past, the color legend is replaced by a short
  "check back soon" note. That's a sign the calendar needs new events.

---

## Quick reference

| What | File | Search string |
|------|------|---------------|
| Calendar events | index.html | `class="events"` |
