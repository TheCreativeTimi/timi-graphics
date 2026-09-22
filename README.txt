TIMI GRAPHICS PORTFOLIO
=======================

DEPLOY
  Drag this whole folder onto https://app.netlify.com/drop  (no build step needed).

ADD / EDIT YOUR WORK  (js/works.js  +  assets/work/)
  1. Put your image in the assets/work/ folder (jpg, png, webp or svg).
  2. Open js/works.js and add one line to the WORKS list (copy an existing line):
       { type: 'design', title: 'My Flyer', desc: 'Short line', image: 'assets/work/my-flyer.jpg', url: '' },
     type 'web' = web project, 'design' = graphic design.
  3. For web projects put the live link in url. The whole card then opens it in a new tab.
     Without a url, clicking the card opens the image full-size.
  Optional: add pos: '50% 20%' to choose which part of a tall image the card shows.
  The web-project pictures on the cards are SAMPLE screens I drew. Replace them by saving
  your real screenshots / designs over the same file names (or change the names in works.js).
  Show only your best few here; the Instagram card sends visitors to the rest.

LAPTOP ICONS (page 2)
  Open js/main.js and fill in LINKS.github and LINKS.linkedin at the top.
  Empty ones are hidden. Instagram is already linked.

CONTACT FORM
  Works automatically on Netlify. In your Netlify dashboard open
  Forms > contact > Notifications to get each message by email.

EDIT TEXT / COLORS
  Text: index.html      Colors and sizes: css/style.css (see :root at the top)
  Motion: js/main.js
