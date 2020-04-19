# Site DevFest Nantes 2020

[![Actions Status](https://github.com/GDG-Nantes/devfest2020/workflows/build/badge.svg)](https://github.com/GDG-Nantes/devfest2020/actions)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=GDG-Nantes/devfest2020)](https://dependabot.com)

## Requirement

- [Install Hugo](https://gohugo.io/getting-started/installing/)
  Note: you need to install the extended version.

- [Install NodeJS](https://nodejs.org/en/).

## Install Theme

```bash
git submodule init
git submodule update themes/devfest-theme-hugo --remote
```

Note: `--remote` permet de cibler la branche spécifiée

## Commit theme update

When you have made changes on the theme, you need to add the

```
git add themes/devfest-theme-hugo
```

## Run Local site

For your first run and each time you modify a style or image, run:

```bash
npm run build

npm run build:images # to re-build only images
```

Then just run

```bash
hugo server -D
```

Notice that the `-D` flag is used to render draft elements,
you also can add the `-F` to build elements planed for future.

More information [here](https://gohugo.io/commands/hugo_server/)

## Build

Just run

```bash
npm run build
```

More information [here](https://gohugo.io/commands/hugo/)

## Edit data

You can edit

- general information about the site into the `config.toml` file.
- some data into `data/*.yml` files, for header and footer information, team or schedule data.
- some content into `content/**` files.
- some static assets like images into the `static/*` folder

### Create a new blog entry

You can use `hugo new blog/i-create-a-new-entry.md` command and then edit it.
Or just copy an already existing blog entry, and update the content.

### Update the theme

If you need to touch file of the theme (i.e. into `./themes/devfest-theme-hugo/`) you to know one more thing:

The theme is in another Git repository <https://github.com/GDG-Nantes/devfest-theme-hugo>,
it's using [git submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules),
so you need to handle this two repository.

Here is the workflow in addition to the main one:

- go into the theme folder `./themes/devfest-theme-hugo/`
- install dependencies with `npm install`
- run `npm start` to watch the theme files
- then push the theme's diffs
- and then back in the site folder, `git add themes/devfest-theme-hugo`
- then push the site's diffs

### Publish

You could take a look at the `.github/workflows` file
