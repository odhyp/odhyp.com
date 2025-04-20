+++
title = "Colophon"
description = "How this site was made or behind-the-scenes of this site"
+++

Welcome to the "**How this site was made**" page where I explain each component used in this overengineered personal website, digital garden, service platform, digital space, or whatever this site currently is.

## Tools & Technologies

I built this site using [Hugo], it's a really fast static site generator written in Go. The content is written simply in Markdown and you can customize its front matter and use the page parameters in the HTML template.

I use plain HTML and JavaScript to build the interface. Styling is done using [TailwindCSS] because it's faster to use than Vanilla CSS. All the pages are written in Markdown with the addition of Hugo's Shortcodes for custom content. I deploy this site on [Vercel].

The old version of this site was built with [Jekyll] using [Chirpy Theme], I wasn't that familiar with website building back then.

I use a little bit of Python to run a few scripts like running the site in development mode, displaying a QR code image so I can easily scan it using my phone and view my site on a smaller device, and converting title to slug if I'm updating a page title.

[Hugo]: https://gohugo.io/
[TailwindCSS]: https://tailwindcss.com/
[Vercel]: https://vercel.com/
[Jekyll]: https://jekyllrb.com/
[Chirpy Theme]: https://chirpy.cotes.page/

## Typography

Headers and body are set in [Inter] from [Google Fonts]. I love the simplicity, but also because I know nothing about typography aesthetics.

[Inter]: https://fonts.google.com/specimen/Inter
[Google Fonts]: https://fonts.google.com/

## Background Pattern

I use [ccchaos] SVGs from [fffuel] with a color palette of `hsl(161, 100%, 42%)` and `hsl(161, 10%, 40%)`. I randomize the pattern for each page after a site build, not on reload.

[ccchaos]: https://www.fffuel.co/ccchaos/
[fffuel]: https://www.fffuel.co/

## Icon

I'm using icons from [Iconify], which contains a ton of popular icon sets like [Material UI Icons] and [Simple Icons]. It's simple to use, without the need to switch back and forth between all the different icon libraries.

[Iconify]: https://iconify.design/
[Material UI Icons]: https://mui.com/material-ui/material-icons/
[Simple Icons]: https://simpleicons.org/

## Growth Stages

Every page under [Writings] section has a **growth stage** that indicates how comprehensive it is. They start as sprout, grow into thriving, and end up as evergreen.

[Writings]: /writings/

{{< colophon/growth-stage >}}
