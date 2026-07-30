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

## 1. Come, Follow Me links (weekly + Fast-Sunday) ⭐ most important

The site auto-advances the *Come, Follow Me* button to the current week (and, on
pages that have one, the *Fast-Sunday* button to the current month). **All the
logic lives in `scripts.js` — you never edit the logic**, you just point it at the
new year in the spots below.

The *Come, Follow Me* manual changes book every year on a 4-year rotation:
2025 = Doctrine & Covenants · **2026 = Old Testament** · 2027 = New Testament ·
2028 = Book of Mormon.

**a) The default button link (in the HTML page)** — search: `id="cfm-link"`
Update its `href` to the new year's manual, week `1`
(e.g. `.../come-follow-me-for-home-and-church-book-of-mormon-2028/01`). This link
is *also how `scripts.js` figures out which year the page is*, so it must contain
the correct 4-digit year.

**b) Add the new year to `WEEK_CONFIG` (in `scripts.js`)** — search: `WEEK_CONFIG`
Add one line for the new year, e.g.:

```js
"2028": { anchorMonday: "2027-12-27", totalWeeks: 52 },
```

- **`anchorMonday`** = the **Monday that starts week 1** of the new manual, written
  as `"YYYY-MM-DD"`. To find it: open week 1 on the church site (it shows the date
  range), or count back — it's usually the Monday of the week containing Jan 1.
  *(No more 0-indexed-month gotcha — it's a plain text date now.)*
- **`totalWeeks`** = number of weekly lessons (usually 52 — confirm on the site).

**c) Fast-Sunday button (only on pages that have one)** — search: `id="fast-sun"`
Update its default `href` to the new manual's Appendix B, first lesson. The 12
monthly topics live in `scripts.js` as `FAST_SUNDAY_MONTHS`; they usually repeat
each year, but double-check the appendix number and the slugs against the new manual.

**How to verify it works:** open the page in a browser and hover/click the buttons —
the week number (and Fast-Sunday month lesson) in the URL should match what's
current on the church's site.

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
| CFM default link (URL + week)   | index.html  | `id="cfm-link"` |
| CFM year anchor + total weeks   | scripts.js  | `WEEK_CONFIG` |
| Fast-Sunday default link        | (the page)  | `id="fast-sun"` |
| Fast-Sunday month topics        | scripts.js  | `FAST_SUNDAY_MONTHS` |
| Primary Program playlist URL    | index.html  | `music-cta` |
| Primary Program subtitle year   | index.html  | `Primary Program songs` |
| "All 20XX Songs" playlist + title | index.html | `casual-listening__card--listen` |
| 12 months of songs              | index.html  | `sheet-music__heading` |

---

*Last reviewed for: **2026**. After you finish updating, change this line to the new year.*
