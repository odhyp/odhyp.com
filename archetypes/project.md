+++
draft = true
featured = false
date = {{ now.Format "2006-01-02T15:04:05+07:00" }}
slug = "{{ .File.BaseFileName | strings.TrimPrefix (substr .File.BaseFileName 0 11) }}"
aliases = ["/{{ .File.BaseFileName | strings.TrimPrefix (substr .File.BaseFileName 0 11) }}"]
cover = ""
icon = "python"
title = "{{ .File.ContentBaseName | replaceRE `^\d{4}-\d{2}-\d{2}-` `` | humanize | title }}"
description = "Add a short summary of the project"
tech-stacks = []
+++

<!-- Content Here -->
