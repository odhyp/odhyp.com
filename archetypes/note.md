+++
# Metadata
title = "{{ replace .File.ContentBaseName "-" " " | title }}"
description = "Add a short summary of the page" 
slug = "{{ .File.ContentBaseName | lower }}"
date = {{ now.Format "2006-01-02" }}
lastmod = {{ now.Format "2006-01-02" }}
draft = true

# Page setting
toc = false

# Taxonomies & Routing
category = ""
aliases = ["/{{ .File.ContentBaseName | lower }}"]
+++

> Your note here!
