# Odhy's Digital Garden 🪴

Welcome to my digital garden—where I plant ideas, debug thoughts, and occasionally scream at my code.

Built with Hugo, JavaScript, and TailwindCSS. Deployed in Vercel.

## Roadmap

- [ ] Add Services section
- [ ] Add CTA for work inquiry
- [ ] Add testimonial section in landing page
- [ ] Work on the taxonomy pages
- [ ] Add search feature
- [ ] Add back-to-top button

## Self-note

1️⃣ Use a Hugo Debug Page to Detect Duplicates
Create a special Hugo template (layouts/_default/list.html) to log and check duplicate slugs:

```html
{{ define "main" }}
<h1>Duplicate Slug Checker</h1>
<ul>
  {{ $slugs := dict }}
  {{ range .Site.RegularPages }}
    {{ $slug := .Params.slug }}
    {{ if index $slugs $slug }}
      <li style="color: red;">Duplicate slug found: {{ $slug }} (from {{ .RelPermalink }})</li>
    {{ else }}
      {{ $slugs = merge $slugs (dict $slug true) }}
    {{ end }}
  {{ end }}
</ul>
{{ end }}
```

📌 How to Use It:

Save this file as layouts/_default/list.html.
Run hugo server.
Visit /duplicate-check/ in your browser to see any duplicate slugs in red.
