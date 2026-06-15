# Yearly Update Checklist (do this each January)

This site has a handful of things baked in for the current year. Every January,
walk this list top to bottom and update each item. All changes are in
**`index.html`** unless noted.

> For the calendar of activities (which is worth refreshing through the year),
> see **`UPDATES_AS_NEEDED.md`**. In January, do that list too so you start clean.

> Tip: line numbers below are approximate — they shift as the file changes. Each
> item also gives a **search string** you can paste into your editor's "Find"
> (Cmd+F) to jump straight to the spot.

---

## 1. Come, Follow Me link + auto-week script ⭐ most important

The site auto-advances the *Come, Follow Me* link to the correct week based on
today's date, but the math is anchored to this year's calendar and manual, so it
must be re-anchored each January.

The *Come, Follow Me* manual changes book every year on a 4-year rotation:
2025 = Doctrine & Covenants · **2026 = Old Testament** · 2027 = New Testament ·
2028 = Book of Mormon.

**a) The default link** — search: `id="cfm-link"` (~line 267)
Update the `href` to the new year's manual URL, with week `1` in it. The easiest
way to get the new URL: go to the official *Come, Follow Me* page on
churchofjesuschrist.org, open week 1, and copy the address.

**b) The script's settings** — search: `ANCHOR_WEEK` (~lines 354–358)
Update these four values:

| Variable        | What it is                                              | How to set it |
|-----------------|---------------------------------------------------------|---------------|
| `ANCHOR_WEEK`   | A known week number to anchor the math to               | Set to `1` |
| `anchorMonday`  | The **Monday** that starts that anchor week             | `new Date(YEAR, MONTH, DAY)` — see note below |
| `TOTAL_WEEKS`   | How many weekly lessons the new manual has              | Usually 52 (confirm on the church site) |
| `BASE_URL`      | The manual URL **up to the final `/`** (no week number) | Copy from the new year's manual |

⚠️ **`anchorMonday` gotcha:** the month is **0-indexed** in JavaScript
(January = 0, February = 1, … December = 11). So Monday, January 5, 2026 would be
`new Date(2026, 0, 5)`. Set this to the Monday that begins week 1 of the new year.

**How to verify it works:** save the file, open `index.html` in a browser, and
hover/click the "This Week's Come, Follow Me Lesson" button — the week number in
the URL should match the current week on the church's site.

---

## 2. Playlists (two of them)

**a) Primary Program playlist** — search: `music-cta` and `Primary Program songs`

- **`href`** on the `music-cta` link: paste the new year's Primary Program
  playlist URL from churchofjesuschrist.org → Media → Music → Playlists.
- **Subtitle text**: change `2026 Primary Program songs` to the new year.

**b) "All 2026 Songs" casual-listening playlist** — search: `casual-listening__card--listen`

- **`href`** on that link: paste the new year's "all songs" playlist URL.
- **Title text**: change `All 2026 Songs` (the `casual-listening__title`) to the new year.
- The second card ("Church Music Library" / Explore) is **not** year-specific —
  leave it alone.

---

## 3. This year's songs (sheet music list)

Search: `sheet-music__heading` (~line 152), then the 12 `<article class="month-block">`
blocks below it (~lines 157–251).

Each month has its own block (January → December) with **2 songs** each. For every
month, update both the **song title**, the **link** (`href`), and the
**reference** (the `song-list__ref` span, e.g. "Children's Songbook, 228–29").

Get the new year's song list from your ward music leader or the Primary Program
outline. To get a song's link: search the song on churchofjesuschrist.org and
copy the page URL.

---

## 4. Don't forget the calendar

The calendar of activities also needs a reset to start the year. It lives in
**`UPDATES_AS_NEEDED.md`** — run that list in January too.

---

## Quick reference — everything with a year in it

| What | File | Search string |
|------|------|---------------|
| CFM default link (URL + week)   | index.html | `id="cfm-link"` |
| CFM script anchor/settings      | index.html | `ANCHOR_WEEK` |
| Primary Program playlist URL    | index.html | `music-cta` |
| Primary Program subtitle year   | index.html | `Primary Program songs` |
| "All 20XX Songs" playlist + title | index.html | `casual-listening__card--listen` |
| 12 months of songs              | index.html | `sheet-music__heading` |

---

*Last reviewed for: **2026**. After you finish updating, change this line to the new year.*
