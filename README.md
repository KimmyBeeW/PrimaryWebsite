# Cherry Hill 9th Ward Primary

A simple, mobile-friendly single-page website that gives parents a central hub
for ward Primary information — upcoming activities, music practice, the weekly
*Come, Follow Me* lesson, and leadership info.

Built as plain HTML + CSS.

## Files

| File | Purpose |
|------|---------|
| `images` | Folder containing leader images. Delete images when leaders are released. |
| `.gitignore` | Tells git and GitHub to ignore certain local files (i.e. if you don't know how to code, don't worry about this file. I (KimmyBeeW) have already added just about everything you could possibly need git to ignore.) |
| `index.html` | All page content and structure |
| `styles.css` | Colors, layout, and styling |
| `UPDATES_AS_NEEDED.md` | Reminders about which parts need updating as needed. |
| `YEARLY_UPDATE.md` | Reminders about which parts need updating each year. |


## How to update common things

**Add or change an activity** — In `index.html`, find the `<ul class="events">`
list. Copy one `<li class="event ...">` block, paste it, and edit the date,
title, time, location, and description. Use the matching color class:

- `event--sunday` — Sunday meetings / program rehearsals (sage green)
- `event--weekday` — weekday activities / youth events (sky blue)
- `event--special` — special performances / ward-wide events (terracotta)

(Remember to also change the `event__tag--*` class on the tag inside.)

**Casual-listening buttons** — The two cards in the `<div class="casual-listening">`
block link to the year's playlist and the Church Music Library. The playlist link
and "All 20XX Songs" title are year-specific (see `YEARLY_UPDATE.md`).

**Update leader names** — If a new primary presidency is called, in the "Meet Your Leaders" section, replace each name and photo. Fix zoom by searching for `.leader__photo-img--zoom-` in styles.css and updating each of the five configurations.

## FYI if you need to restart the website: Publishing to GitHub Pages

1. Create a new repository on GitHub (e.g. `primary-website`).
2. Upload `.gitignore`, `index.html`, `styles.css`, the `images` folder, and this `README.md` to the repo (or push them with git).
3. In the repo, go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to *Deploy from a branch*,
   choose the `main` branch and the `/ (root)` folder, then **Save**.
5. Wait a minute, then visit `https://<your-username>.github.io/<repo-name>/`.

---

*This is an unofficial local ward resource for communication with ward families.
It is not an official publication of The Church of Jesus Christ of Latter-day Saints.*
