**[odhyp.com](https://odhyp.com)**

my personal website and digital garden

<br>

<samp>code is licensed under <a href='./LICENSE'>MIT</a>,<br> words and images are licensed under <a href='https://creativecommons.org/licenses/by-nc-sa/4.0/'>CC BY-NC-SA 4.0</a></samp>.

<br>

<details>
<summary>&nbsp;<code>self-note</code></summary>

### Future additions?

- [ ] Shortcodes
  - [ ] Callouts (success, warning, danger, important, info)
  - [ ] Image side-by-side comparison
  - [ ] Image gallery/slider
- [ ] Design a good logo
- [ ] Enlarge images when clicked (image modal)
- [ ] Search function using Pagefind (put in on top-right corner)
- [ ] Dark mode?
- [ ] Include pagefind in package.json (`npm install pagefind`)
- [x] Table Of Contents for Writings and Projects page (sticks to the left side of the screen, large screen only)

### Running on local connection

```bash
hugo server --bind 0.0.0.0 --baseURL http://<YOUR_IP> --port 1313 --disableFastRender
```

### New content/page

```bash
hugo new --kind writing writings/2024-10-27-sample-post.md
```

```html
<h2>Sections Range</h2>
{{ range .Sections }}
<a href="{{ .RelPermalink }}">{{ .Title }}</a>
<p>{{ .Description }}</p>
{{ end }}

<hr />
<h2>Pages Range</h2>
{{ range .RegularPagesRecursive }}
<a href="{{ .RelPermalink }}">{{ .Title }}</a>
<p>{{ .Description }}</p>
{{ end }}
```

</details>
