+++
# Metadata
title = "{{ .File.ContentBaseName | replaceRE `^\d{4}-\d{2}-\d{2}-` `` | humanize | title }}"
description = "Add a short summary of the page" 
slug = "{{ .File.BaseFileName | strings.TrimPrefix (substr .File.BaseFileName 0 11) }}"
date = {{ now.Format "2006-01-02T15:04:05+07:00" }}
lastmod = {{ now.Format "2006-01-02T15:04:05+07:00" }}
draft = true

# Page setting
toc = false

# Taxonomies & Routing
category = ""
aliases = ["/{{ .File.ContentBaseName | lower }}"]
+++

> Your note here!
