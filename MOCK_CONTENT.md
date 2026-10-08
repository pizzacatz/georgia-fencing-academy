# v5.2: invented content and media sources

This file is not part of the site. Everything below appears on the home page (`index.html`) or the schedule page (`schedule/index.html`) as if it were fact, but **none of it comes from the club**. Replace or delete each item before publishing. `index.html` carries `noindex` so search engines skip it while the mock is up.

## Invented content

| Section | What is made up |
| --- | --- |
| Hero | "Ask about joining" button label and the "kids from age 8" wording (taken from the youth class age range, not a stated minimum age) |
| Classes | "New to fencing" and "Already fence": that ages 8 to 11 should call to be placed, and that John will suggest which class fits (class times and fees are real) |
| Schedule page | "Competition": Georgia/Southeast travel, John strip-coaching at every event |
| Schedule page | "What happens in class" (footwork, tactical drills, conditioning, sparring) |
| Schedule page | Evening private lessons "can usually be arranged" |
| Facility | 8 strips (4 wired), electronic scoring boxes, sprung hardwood floor, air conditioning and heat |
| Facility | Amenities: two changing rooms, one shower, repair bench staffed Wednesday nights, parking lot of about 30 spaces |
| Members | One testimonial (Daniel R.). The Sara K. testimonial was removed in v5.2 |
| Members | Three results (Priya Nair, Marcus Hale, épée team) |
| FAQ | "I've fenced before. Where do I start?" answer |

The FAQ's "Foil or épée?" answer (target area, right-of-way) is general fact about the sport, not a club claim.

## Confirm with John

- Which class should a complete beginner aged 8 to 11 join? The only youth classes listed are "Pre-competitive" and "Competitive".

Everything else on the page (class schedule, open fencing hours, prices, fees, membership rules, John Terris's credentials, address, phone, email, links, forms, every photo) is copied from gafencingac.com.

## Photos

Every photo is from gafencingac.com. There is no stock media and no video in this version.

| File | Original on gafencingac.com | Used in |
| --- | --- | --- |
| `img/lesson-1600.jpg`, `img/lesson-800.jpg` | `3ef8e8_dcbf5c25...png`, lesson under the academy banner | Hero |
| `img/coaching.jpg` | `3ef8e8_37955822...jpg`, lesson with a blade target | Coach |
| `img/salle.jpg` | `3ef8e8_fa684c47...jpg`, training room | Facility |
| `img/salute.jpg` | `3ef8e8_032c20bd...png`, fencer saluting | Members photos |
| `img/competition.jpg` | `3ef8e8_ce0ecc46...jpg` | Members photos |
| `img/podium.jpg` | `3ef8e8_e63760f7...jpg` | Members photos |
| `img/school-demo.jpg` | `3ef8e8_e129bb38...jpg` (only 576 px wide) | Members photos |
| `img/john.jpg` | `3ef8e8_08617e64...jpg` (only 108 px wide) | Coach |

Notes:
- The lesson and salute photos had a black frame baked in, which was trimmed. Both were resized and re-saved as JPEG.
- None of the club's photos clearly shows foil. The hero and salute photos both show épée, so the Foil and Épée panels carry no photos.
- The original files are in `../v1/assets/`.

## Logo

`img/logo.png` is the club's shield logo with the colors swapped: a white shield with the fencer as a black silhouette, a thin black outline, and a transparent background. It was rebuilt from the 828 px original on gafencingac.com (`../v1/assets/3ef8e8_6c646aab...jpg`), which is a navy shield with a white fencer. Don't enlarge it past about 360 px. Ask John for a vector or high-resolution file.

## Search and AI additions (5 October 2026)

The JSON-LD in the `<head>`, the "About Georgia Fencing Academy" section, `llms.txt` and the new FAQ entries use only facts copied from gafencingac.com. Nothing from the invented table above is in them. The one FAQ answer that rests on invented content ("I've fenced before") carries a `data-unconfirmed` attribute and is left out of the JSON-LD.

One wording choice to confirm with John: the page now describes Marietta as "in Cobb County in Atlanta's northern suburbs".

Fonts (Barlow, Barlow Condensed; SIL Open Font License) are now served from `fonts/` instead of Google Fonts. `img/share.jpg` is a 1200 x 630 crop of the hero photo for link previews.

## Confirmed by John, 7 October 2026

- Both Adult Beginner classes (Monday and Friday) teach the principles of fencing to new fencers; the basics are taught with a foil, but they are not foil classes. Neither schedule row carries a weapon tag.
- A first-time fencer needs to buy nothing; all equipment is available at the club. Fencers who intend to compete in local tournaments buy their own. The invented gear table was replaced with this.
- The Wednesday and Saturday foil classes have no age range; they now say "All ages".
- The number of foil fencers is not to be published.

## Four pages (7 October 2026)

The site is now four pages: `/` (home), `/adults/`, `/kids/` and `/schedule/`, each a folder with its own `index.html` so the addresses need no host configuration. Asset paths are root-relative (`/img/...`), so the pages must be viewed through a web server, for example `python3 -m http.server` in this folder, not opened as files.

The adult and kids pages contain only confirmed facts rearranged by audience: class names, times, ages, prices, the equipment policy and John's credentials. Two sentences are mine, not John's: on the adults page, "You do not need to know anything about the sport before the first class"; on the kids page, the $35 class is "a good way to find out whether your child likes it".

The header, footer and head tags are copied into each page by hand. A change to the nav or footer means editing four files.
