# Odhy's Digital Space :sunglasses:

Welcome to my digital workspace—where I reflect, debug, and occasionally scream at my code.

Built with Hugo, JavaScript, and TailwindCSS. Deployed in Vercel.

## Roadmap

- [ ] Work on the taxonomy pages
- [ ] Add dark/light theme
- [ ] Add search feature
- [ ] Add back-to-top button
- [ ] Add better header (fixed top)
- [ ] Add testimonial section in landing page
- [ ] Add CTA for work inquiry
- [ ] Add RSS button in header
- [ ] Add tags button in header

## Self-reminder

A quick note for my future self.

### Running Site on Local Connection

```bash
hugo server --bind 0.0.0.0 --baseURL http://<YOUR_IP> --port 1313 --disableFastRender
```

> This lets you access it from any device on the same network, including your phone.

### Generating Page with Archetypes

Blog page has `tags`, while Project page has `featured`, `categories`, and `cover` in their front matter.

1. New Blog

   ```bash
   hugo new --kind blog blog/2024-10-27-sample-post.md
   ```

2. New Project

   ```bash
   hugo new --kind project project/2024-10-27-sample-project.md
   ```

### Utilizing Shortcodes

1. Wrapper

   ```bash
   {{< wrapper class="flex flex-wrap gap-x-4 gap-y-1 items-center justify-start" >}}
   Your content here!
   {{< /wrapper >}}
   ```

2. Table of Content
   Simple call, no parameters needed.

   ```bash
   {{< toc >}}
   ```

3. Alerts: `note`, `tip`, `important`, `warning`, and `caution`

    ```bash
    {{< note >}}
    Message here!
    {{< /note >}}
    ```

4. Image with caption

    ```bash
    {{< image-caption src="path/to/image.jpg" alt="Image description" caption="This is a caption." >}}
    ```

5. Call-to-action/button (using icons from [Iconoir])

    ```bash
    {{< cta title="CTA Message" icon="icon-name" href="url_here" >}}
    ```

6. Icon (using icons from [Simple Icons] through [Iconify])

    ```bash
    {{< icon name="python" title="Python" url="https://www.python.org/" >}}
    ```

7. Work Experience

    ```bash
    {{< work-experience startDate="" endDate="" title="" orgName="" orgLink="" >}}
    Your experience here
    {{< /work-experience >}}
    ```

### Shortcodes Tips

| Syntax              | Shortcode Type      | Content Processing | Use Case                                                |
|---------------------|---------------------|--------------------|---------------------------------------------------------|
| `{{< shortcode >}}` | Block               | Markdown           | Content formatted as Markdown.                          |
| `{{< shortcode >}}` | Inline/Self-closing | None               | No content or inline shortcodes.                        |
| `{{% shortcode %}}` | Block               | Raw HTML           | Content is *already* HTML.                              |
| `{{% shortcode %}}` | Definition          | Raw HTML           | Shortcode template files (`layouts/shortcodes/*.html`). |

**Key takeaways:**

- **Angle brackets (`{{< >}}`)** are the default for most block shortcodes, processing content as Markdown.
- **Percent signs (`{{% %}}`)** are used for raw HTML content *and* within shortcode definition files.
- **Inline/self-closing** shortcodes can use either syntax (usually angle brackets for consistency).

<!-- LINKS -->
[Iconoir]: https://iconoir.com/
[Simple Icons]: https://simpleicons.org/
[Iconify]: https://iconify.design/
