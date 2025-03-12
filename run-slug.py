import re
import sys


def title_to_slug(title: str) -> str:
    """Converts a title into an SEO-friendly slug."""
    title = title.lower()  # Convert to lowercase
    title = re.sub(r"\s+", "-", title)  # Replace spaces with hyphens
    title = re.sub(r"[^a-z0-9-]", "", title)  # Remove special characters except hyphens
    title = re.sub(r"-+", "-", title).strip("-")  # Remove multiple hyphens
    return title


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python slug.py 'Your Title Here'")
        sys.exit(1)

    title = sys.argv[1]
    slug = title_to_slug(title)
    print(slug)
