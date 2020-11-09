---
title: "Simple, simple, simple"
date: 2020-11-03
---

I've been meaning to set up my own site for a while. Lockdown, longer nights, and a job search pushed me to actually do it. But I needed the barrier for setup to be as low as possible, but still give me a platform to grow and build it further. For now, i'll concentrate on the writing - making it look good can come later.

This site is simple. I use the excellent [Hugo](gohugo.io) to generate the html, and host it on github pages. Not only is it free, it saves all the faff of having to set up an SSL certificate.

In order for the static site to be generated I added the following pre-commit hook, so publishing something to my site is as easy as writing a markdown post, committing it, and pushing it to master. Within a couple of minutes it'll be live.

```bash
set -e
echo 'Building a hugo site, this will be deployed on github pages'
cp docs/CNAME .
rm -rf docs
hugo
mv CNAME docs/
git add docs
```

