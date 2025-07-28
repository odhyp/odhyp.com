**[odhyp.com](https://odhyp.com)**

<samp>**my personal website**</samp>

<br>

<samp>code is licensed under <a href='./LICENSE'>MIT</a>,<br> words and images are licensed under <a href='https://creativecommons.org/licenses/by-nc-sa/4.0/'>CC BY-NC-SA 4.0</a></samp>.

<br>

> <samp>You're welcome to use this as inspiration. Credit is appreciated, but please don't copy it directly.</samp>

<br>

<details>
<summary>&nbsp;<code>self-note</code></summary>

<br>

_For my future self._

## Get-shit-done list

- [ ] Shortcodes
  - [ ] Image side-by-side comparison
  - [ ] Image gallery/slider
- [ ] Enlarge images when clicked (image modal)
- [ ] Filter function for list pages
- [ ] Search function using Pagefind (put in on top-right corner)
- [ ] Include Pagefind in package.json (`npm install pagefind`)
- [ ] Dark mode?
- [x] Temporarily disable Pagefind postbuild

## Adding new content

### Writings page

```bash
hugo new --kind writing writings/2025-06-22-sample-writing.md
```

### Projects page

```bash
hugo new --kind project projects/2025-06-22-sample-project.md
```

## Using custom shortcodes

### 1. Wrapper

Wrap content with a custom TailwindCSS class.

```md
{{< wrapper class="your-tailwind-classes" >}}
**Your content here**
{{< /wrapper >}}
```

**Parameters:**

- class – (required) TailwindCSS classes to style the wrapper container

### 2. Image/Figure

Insert responsive images with optional captions and custom styles.

```md
{{< img src="path/to/image.jpg" alt="Descriptive alt text" caption="Optional caption" class="your-tailwind-classes" >}}
```

**Parameters:**

- `src`: (required) URL or path to the image file
- `alt`: (required) Alternative text for accessibility and SEO
- `caption`: (optional) Text shown below the image
- `class`: (optional) TailwindCSS classes for styling

### 3. Icon Link

Insert styled links with optional icons, ideal for external resources or references.

```md
{{< icon href="https://example.com" title="Link text" icon="external-link" >}}
```

**Parameters:**

- `href`: (required) URL to link to
- `title`: (required) Text displayed as the link label
- `icon`: (optional) Lucide icon name to display beside the text

### 4. Callouts

Insert callouts with icon based on type. Currently, there are 6 types:

1. Tip
2. Info
3. Warning
4. Important
5. Todo
6. Note (default)

```md
{{< callout type="tip" title="Quick Trick" >}}
Callout content here.
{{< /callout >}}
```

**Parameters:**

- `type`: (optional) Controls icon and color
- `title`: (optional) Heading title (default title based on type)

### 5. Threads (Instagram)

```md
{{< threads username="odhypradhana" id="tuNapAN1n1" >}}
```

**Parameters:**

- `username`: (required) Username
- `id`: (required) Post ID
