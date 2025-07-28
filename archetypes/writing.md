+++
# Metadata
title = "{{ .File.ContentBaseName | replaceRE `^\d{4}-\d{2}-\d{2}-` `` | humanize | title }}"
description = "Add a short summary of the page" 
slug = "{{ .File.BaseFileName | strings.TrimPrefix (substr .File.BaseFileName 0 11) }}"
date = {{ now.Format "2006-01-02T15:04:05+07:00" }}
lastmod = {{ now.Format "2006-01-02T15:04:05+07:00" }}
draft = true

# Page setting
toc = true
cover = "https://placehold.co/1200x675"

# Taxonomies & Routing
topics = []
aliases = ["/{{ .File.BaseFileName | strings.TrimPrefix (substr .File.BaseFileName 0 11) }}"]
+++

> A brief summary of what this writing is about.

## Content

Start writing your idea, thought, or insight here.

---

## References

Reference here
