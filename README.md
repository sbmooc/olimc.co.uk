# My small blog thing

written by me
built by hugo
hosted by github

add the following snippet to .github/hooks/pre-commit

```
echo 'Building a hugo site, this will be deployed on github pages'
cp docs/CNAME .
rm -rf docs
hugo
mv CNAME docs/
git add docs
```

This will ensure that the docs are built correctly on commit.

Hosting is managed by github pages, which will host the `docs` directory on `master` branch.
