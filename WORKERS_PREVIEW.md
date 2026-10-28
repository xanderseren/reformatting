# Isolated Workers preview

Preview: https://migration-reformatting-preview.alexkcummings.workers.dev

The config targets account `8974a3b56dad7c42b3a8b4b832fe1ce2`, with workers.dev
enabled and no routes, custom domains, DNS changes or automatic deployments.

With Node/npm installed:

```sh
npx wrangler@4.154.0 deploy --dry-run
npx wrangler@4.154.0 dev --local
```

When authorized and authenticated to that account, use
`npx wrangler@4.154.0 deploy` to update only this preview. `.assetsignore` excludes
Git metadata, local tooling, environment files, repository docs and Finder files.
The historical README contains raw working notes and is not a public asset.

The two HTTPS URLs for Google Fonts and jQuery avoid mixed-content failures.
The historical missing `fonts/Inconsolata.otf` and browser autoplay restrictions
are unchanged; this does not restore missing assets or redesign the site.

This reproduces the previously prepared patch, with additional exclusions for
local environment files and this documentation. The existing preview already has
the HTTPS substitutions. Current credentials do not authorize a fresh deployment
or management-config inspection in this account; a dry-run is not a deployment.

Rollback: revert the two HTTPS substitutions and remove the preview config and
exclusions. If deployed later, restore the prior Worker version separately;
Git reverts do not change deployed Workers.
