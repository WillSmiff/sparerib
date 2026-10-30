# Sparerib Bowling Association

A deliberately 2000s-style website for the (fictional) Sparerib Bowling Association: beveled buttons,
a scrolling news ticker, a hit counter, a poll, a guestbook and a sparkle cursor trail.

Plain static HTML, CSS and JavaScript. No build step: open `index.html` in a browser.

## Pages

- `index.html`: home, news and upcoming events
- `leagues.html`: league schedule and standings
- `halloffame.html`: 300 club and all-time records
- `join.html`: membership dues and sign-up form
- `guestbook.html`: guestbook

The poll, hit counter and guestbook store their data in the visitor's browser (`localStorage`),
and the membership form only shows a thank-you message. Nothing is sent to a server.
