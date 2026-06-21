# Stash Scripts Project

## Purpose

This project is the source-of-truth workspace for Stash-related scripts.

The current managed script is:

```text
F:\AI-Workspace\20_Projects\stash-scripts\scripts\haijiao-stash.js
```

Additional converted Stash rule sets:

```text
F:\AI-Workspace\20_Projects\stash-scripts\clsq\clsq.stoverride
F:\AI-Workspace\20_Projects\stash-scripts\clsq\clsq.js
F:\AI-Workspace\20_Projects\stash-scripts\clsq\clsqad.js
```

## GitHub Repository

```text
https://github.com/aizijigao-sketch/stash-scripts
```

Visibility: private.

## Stash Runtime Policy

Use the project copy as the canonical managed file:

```text
F:\AI-Workspace\20_Projects\stash-scripts\scripts\haijiao-stash.js
```

If Stash is still configured to read the old desktop path, keep that path as a runtime copy:

```text
C:\Users\srguang2\Desktop\haijiao-stash.js
```

After editing the project copy, sync it back to the desktop runtime copy with:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\tools\sync-to-desktop.ps1
```

Do not rely on a private GitHub raw URL as a direct Stash script-provider URL. Private raw URLs require authentication and may fail inside Stash.

## Editing Rules

- Edit `scripts\haijiao-stash.js` in this project first.
- Keep converted rule sets in their own subdirectories, for example `clsq\`, so unrelated Stash rules do not mix.
- Commit and push changes to the private GitHub repository.
- Sync to the desktop runtime copy only if Stash still points there.
- Do not commit cookies, tokens, credentials, private keys, `.env` files, logs, local Stash runtime secrets, or account-specific data.

## Verification

Before committing:

```powershell
rg -n --hidden -i "(ghp_|github_pat_|sk-|BEGIN .*PRIVATE KEY|authorization\s*[:=]|bearer\s+|cookie\s*[:=]|password\s*[:=]|token\s*[:=]|secret\s*[:=])" .
```

After syncing, confirm both files have the same size:

```powershell
Get-Item .\scripts\haijiao-stash.js, C:\Users\srguang2\Desktop\haijiao-stash.js | Select-Object FullName,Length,LastWriteTime
```
