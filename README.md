# Sparerib Bowling Association

A 2000s-style website for the the Eindhoven Student Bowling Association Sparerib: 
beveled buttons, a scrolling news ticker, a hit counter, a poll, a guestbook and a sparkle cursor trail.

Plain static HTML, CSS and JavaScript. No build step: open `index.html` in a browser.

## Pages

- `index.html`: home, news and upcoming events
- `leagues.html`: league schedule and standings
- `halloffame.html`: 300 club and all-time records
- `bestuur.html`: current board and archive of previous boards
- `join.html`: membership dues and sign-up form
- `guestbook.html`: guestbook

The poll, hit counter and guestbook store their data in the visitor's browser (`localStorage`),
and the membership form only shows a thank-you message. Nothing is sent to a server.

If you want to use this for your own bowling association, refer to build [#5428485](https://github.com/WillSmiff/sparerib/commit/5428485ce6f916417436cf2c92833a444ea68b12)
