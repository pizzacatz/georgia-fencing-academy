# v5.2: viewing the draft

The page addresses are folders (`adults/`, `kids/`, `schedule/`), which browsers only resolve to the page inside through a web server. Opening `index.html` as a file shows the home page, but links to the other pages will not work.

## Start a local server

Run this from the `v5.2` folder. Python 3 is already on the machine; nothing to install.

```bash
cd "/home/nuc1/Documents/Coding Projects/website-georgiafencingacademy/v5.2" && python3 -m http.server 8000
```

Then open:

| Page | Address |
| --- | --- |
| Home | http://localhost:8000/ |
| Adult classes | http://localhost:8000/adults/ |
| Kids and teens | http://localhost:8000/kids/ |
| Schedule and pricing | http://localhost:8000/schedule/ |
| Not-found page | http://localhost:8000/404.html |

Press `Ctrl+C` in the terminal to stop the server. If port 8000 is busy, change the number in the command and in the addresses.

## View on a phone

With the server running, find this computer's address on the local network:

```bash
hostname -I | cut -d' ' -f1
```

On a phone connected to the same Wi-Fi, open `http://<that address>:8000/`.

## What is in this folder

| Path | Purpose |
| --- | --- |
| `index.html`, `adults/`, `kids/`, `schedule/` | The four pages. The header, footer and head tags are copied into each by hand. |
| `styles.css`, `script.js` | Shared by every page. |
| `img/`, `fonts/`, `docs/` | Photos (JPEG and WebP), the two typefaces, the three PDF forms. |
| `robots.txt`, `sitemap.xml`, `llms.txt` | For search engines and AI crawlers. |
| `404.html` | Not-found page; the host must be configured to serve it. |
| `MOCK_CONTENT.md` | Everything on the pages that is invented and must be replaced before launch. |

## Preview on GitHub Pages

The folder is a git repository published at https://pizzacatz.github.io/georgia-fencing-academy/ (`noindex` keeps it out of search results). To publish a change, commit it and push to `main`; GitHub Pages redeploys in about a minute.

`404.html` uses root-relative paths, so it is unstyled on the GitHub Pages preview; it will be styled once the site is at its own domain.

Every page still carries `<meta name="robots" content="noindex">`. Remove it from all four pages at launch, and only once the invented content is gone.
