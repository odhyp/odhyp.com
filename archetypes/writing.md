+++
draft = true
featured = false
date = {{ now.Format "2006-01-02" }}
slug = "{{ .File.BaseFileName | strings.TrimPrefix (substr .File.BaseFileName 0 11) }}"  
aliases = ["/{{ .File.BaseFileName | strings.TrimPrefix (substr .File.BaseFileName 0 11) }}"]
type = "idea" # Type of the page (article, note, idea, log)
stage = "sprout" # Progress of the idea (sprout, thriving, evergreen)
cover = ""
title = "{{ .File.ContentBaseName | replaceRE `^\d{4}-\d{2}-\d{2}-` `` | humanize | title }}"
description = "Add a short summary of the project"
topics = []
+++

<!-- Content Here -->
