{{- $removeDate := substr .Name 11 -}}
{{- $pageTitle := replace $removeDate "-" " " | title -}}
{{- $pageSlug := $removeDate -}}

+++
draft = false
title = "{{ $pageTitle }}"
slug = "{{ $pageSlug }}"
date = {{ now.Format "2006-01-02" }}
tags = ["tag1", "tag2", "tag3"]
+++

<!-- A quick introduction/opening -->

## Main Content

<!-- Write the main content here -->

## Conclusion

<!-- Write the conclusion here -->

### References

<!-- List any references or further readings here -->
