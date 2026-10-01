# B.E.N. — Benevolent Energy Network website

A static, responsive rough-draft website for the Benevolent Energy Network.

## Files

- `index.html` — page structure and copy
- `styles.css` — colours, layout, animation, responsive design
- `script.js` — cursor interaction, scroll reveals, tilt effects, mobile navigation, B.E.N. Test
- `assets/ben-banner.png` — “HELLO WE ARE B.E.N.” banner image
- `assets/ben-logo.png` — current B.E.N. logo
- `.nojekyll` — tells GitHub Pages to serve the files directly

## Put it on GitHub Pages

1. Create a new GitHub repository, e.g. `ben-network`.
2. Upload **the contents of this folder** to the repository root.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Choose the `main` branch and `/ (root)`, then save.
6. GitHub will provide the public site URL after deployment.

No build process, package manager, framework, or server is required.

## Easy edits

### Change the logo or banner
Replace the files in `/assets` but keep the filenames:
- `ben-banner.png`
- `ben-logo.png`

### Change colours
At the top of `styles.css`, edit the CSS variables under `:root`.

Current palette extracted from the supplied artwork:
- Cream `#FDFAF2`
- Ink `#181818`
- Banner red `#CF191B`
- Benevolent gold `#FDB41F`
- Warm orange `#E94B28`
- Teal `#49847C`
- Soft gold `#F5DCA3`

### Add the real community links
The final call-to-action currently says the community links are coming soon. Replace the buttons in the `#join` section of `index.html` when the public links are ready.

## Accessibility

The site supports:
- reduced-motion preferences
- keyboard-operable buttons and navigation
- semantic headings and section structure
- responsive layouts for phones, tablets and desktops

## Note

This is deliberately a framework-free first draft so it is easy for any B.E.N. steward to understand and maintain.


## v0.2 changes

- The B.E.N. logo now uses an optimised JPEG as the primary browser image, with the original PNG retained as a fallback.
- The full palette now rotates automatically every few seconds and advances again when a visitor clicks or interacts with the page. Cursor position also shifts the ambient colour field.
- The bottom and footer back-to-top controls now use explicit JavaScript scrolling for reliable GitHub Pages behaviour.
- The early community-channel list has been removed. The section now introduces B.E.N.'s culture through creativity, benevolence and meliorism instead.

Palette used: Cream `#FDFAF2`, Ink `#181818`, Banner red `#CF191B`, Benevolent gold `#FDB41F`, Warm orange `#E94B28`, Teal `#49847C`, Soft gold `#F5DCA3`.
