# odhyp.com

Sup m8.

## Roadmap

- [ ] Add testimonial section in Home and Service page
- [ ] Work on the Taxonomy pages
- [ ] Add search and sort feature in Writings page
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

## Create new writings

```bash
hugo new --kind writing writings/2025-05-18-sample-idea.md
```

## Using Shortcodes

1. Image shortcodes

```bash
{{< img src="" alt="" caption="" >}}
```
