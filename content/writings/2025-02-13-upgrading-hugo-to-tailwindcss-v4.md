+++
# Metadata
title = "Upgrading a Hugo Website from Tailwind CSS v3 to v4"
description = "A step-by-step guide to upgrading your Hugo site from Tailwind CSS v3 to v4"
slug = "upgrading-a-hugo-website-from-tailwind-css-v3-to-v4"
date = 2025-02-13
lastmod = 2025-02-13
draft = false

# Page setting
section_type = "article" # article, note, log, idea
stage = "evergreen" # sapling, growing, evergreen
toc = true
cover = "https://tailwindcss.com/_next/static/media/card.d69e3d8c.jpg"

# Taxonomies & Routing
topics = ["hugo", "tailwindcss"]
aliases = ["/upgrading-a-hugo-website-from-tailwind-css-v3-to-v4", "/blog/upgrading-hugo-to-tailwindcss-v4"]
+++

I recently upgraded my site to use TailwindCSS v4. In this post, I'll guide you through the upgrade process, just as I did for my own website, step by step… hopefully.

There are a few breaking changes, as stated in their [documentation]. Some of these will change the way we structure the Hugo project.

- TailwindCSS v4 now automatically detects the content directory unlike the previous version, where we manually listed the `layouts` and `contents` files.

- Everything moves into your `styles.css` file; we no longer use the `tailwind.config.js`.

- The PostCSS plugin now lives in the new `@tailwindcss/postcss` package.

[documentation]: https://tailwindcss.com/docs/upgrade-guide

## Upgrading to v4

### Step 1: Installing new dependencies

To upgrade your project from v3 to v4:

```bash
npx @tailwindcss/upgrade
```

Then install the new `@tailwindcss/postcss` package:

```bash
npm install @tailwindcss/postcss
```

From here, you can safely remove `postcss`, `postcss-cli`, and `autoprefixer` from your `package.json`.

{{< callout type="warning" >}}
When deploying the site on Vercel, make sure to install the dependencies as regular dependencies instead of DevDependencies to avoid deployment error:

```bash
...
Error: error building site: POSTCSS: failed to transform "/css/styles.css" (text/css):
Error: Loading PostCSS Plugin failed: Cannot find module '@tailwindcss/oxide-linux-x64-gnu'
```

{{< /callout >}}

### Step 2: Removing old files

Since `tailwind.config.js` is no longer used, migrate your custom styles to `styles.css` and add `@import "tailwindcss"`. Here's what it looks like now:

```js
@import "tailwindcss"; // The new TailwindCSS import method

@plugin "@tailwindcss/typography"; // Import plugins

@theme {
  --color-custom-100: oklch(0.98 0.04 113.22); // Custom class
  --color-custom-200: oklch(0.94 0.11 115.03);
  ...
}

.example {
  @apply text-custom-400; // Custom styles
}
```

### Step 3: Small adjustments (optional)

I renamed my `postcss.config.js` to `postcss.config.mjs` (this may not be necessary) to match the TailwindCSS docs, so we need to update the `css.html` with the new file name:

```html
...
{{- $styles := resources.Get "css/styles.css" | postCSS (dict "config" "./assets/css/postcss.config.mjs") -}} 
...
```

### Step 4: Running the site

You can now run the site locally using `hugo server` and check for the applied TailwindCSS styles.

---

For those who are starting a new Hugo project with TailwindCSS v4, you can use the [Hugo TailwindCSS Starter Template] to quickly get up and running. This template is a clean starting point with TailwindCSS v4 already configured, so you can focus on building your content.

[Hugo TailwindCSS Starter Template]: https://github.com/odhyp/hugo-tailwindcss-starter
