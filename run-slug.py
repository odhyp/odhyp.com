import re
import sys


def title_to_slug(input_text: str) -> str:
    """
    Converts a title into an SEO-friendly slug

    Args:
        title (str): A title string

    Returns:
        str: Slug-ified string
    """
    input_text = input_text.lower()
    input_text = re.sub(r"\s+", "-", input_text)  # Replace spaces with hyphens
    input_text = re.sub(
        r"[^a-z0-9-]", "", input_text
    )  # Remove special characters except hyphens
    input_text = re.sub(r"-+", "-", input_text).strip("-")  # Remove multiple hyphens
    return input_text


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python slug.py 'Your Title Here'")
        sys.exit(1)

    title = sys.argv[1]
    slug = title_to_slug(title)
    print(slug)
