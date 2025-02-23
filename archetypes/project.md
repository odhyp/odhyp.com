{{- $removeDate := substr .Name 11 -}}
{{- $pageTitle := replace $removeDate "-" " " | title -}}
{{- $pageSlug := $removeDate -}}

+++
draft = false
featured = false
title = "{{ $pageTitle }}"
slug = "{{ $pageSlug }}"
date = {{ now.Format "2006-01-02" }}
categories = ["categories1", "categories2", "categories3"]
description = "Write a short description of the project here"
+++

<!-- Provide an overview of the project -->

## Features

<!-- List and describe the features of the project -->

## Installation

<!-- Provide instructions on how to install and use the project -->

## Usage

<!-- Provide usage examples and instructions -->

## Contributing

<!-- Explain how others can contribute to the project -->

## License

<!-- Include licensing information -->