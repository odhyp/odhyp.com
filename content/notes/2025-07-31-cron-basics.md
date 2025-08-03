+++
# Metadata
title = "CRON Basics"
description = "A quick reference to CRON syntax, common schedules, and tips" 
slug = "cron-basics"
date = 2025-07-31T14:46:50+07:00
lastmod = 2025-07-31T14:55:15+07:00
draft = false

# Page setting
toc = false

# Taxonomies & Routing
category = "CRON"
aliases = ["/2025-07-31-cron-basics"]
+++

CRON is a time-based job scheduler in Unix-like OS. It allows users to run scripts or commands automatically at specified times and intervals.

## CRON Expression Format

Each CRON job uses a 5-field format:

```
* * * * * command\_to\_run
| | | | |
| | | | └── Day of the week (0-7) (Sunday = 0 or 7)
| | | └──── Month (1-12)
| | └────── Day of the month (1-31)
| └──────── Hour (0-23)
└────────── Minute (0-59)
```

## Examples

| Schedule             | CRON Expression | Description                         |
| -------------------- | --------------- | ----------------------------------- |
| Every minute         | `* * * * *`     | Runs every minute                   |
| Every day at 7 AM    | `0 7 * * *`     | Runs daily at 07:00                 |
| Every Monday at 9 AM | `0 9 * * 1`     | Runs every Monday at 09:00          |
| First day of month   | `0 0 1 * *`     | Runs monthly at midnight on the 1st |
| Every 15 minutes     | `*/15 * * * *`  | Runs every 15 minutes               |

## Special Strings

CRON also supports special time strings:

| String     | Equivalent          |
| ---------- | ------------------- |
| `@reboot`  | Run once at startup |
| `@daily`   | `0 0 * * *`         |
| `@weekly`  | `0 0 * * 0`         |
| `@monthly` | `0 0 1 * *`         |
| `@yearly`  | `0 0 1 1 *`         |

## Notes

- Use absolute paths in the commands (e.g., `/usr/bin/python3 /home/user/script.py`)
- CRON uses the system's timezone, verify it with `timedatectl`
- Test schedule using [crontab.guru](https://crontab.guru)
