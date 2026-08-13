# pi-draft-history

A small [Pi coding agent](https://pi.dev/) extension that keeps an unsent
editor draft in prompt history when the editor is cleared.

Type a draft, invoke Pi's `app.clear` action (Ctrl-C by default), then press Up
to restore it. Clearing an entry selected by navigating prompt history does not
store that entry again.

## Install

```sh
pi install npm:pi-draft-history
```

Restart Pi or run `/reload` after installation.

## Keybindings

The extension follows the configured `app.clear` binding. Pi's defaults are:

```json
{
  "app.clear": ["ctrl+c"],
  "app.exit": ["ctrl+d"]
}
```

Avoid binding the same key to `app.exit`: Pi checks exit before clear when the
editor is empty.

## LICENSE

MIT
