# Stash Scripts

Private repository for Stash-related scripts and local sync helpers.

See `PROJECT.md` for the project authority file, Stash runtime policy, and editing rules.

## Files

- `scripts/haijiao-stash.js`: Haijiao Stash script copied from the current desktop version.
- `clsq/clsq.stoverride`: CLSQ Stash override converted from the Quantumult X rules.
- `clsq/clsq.js`: CLSQ request-header script for Stash.
- `clsq/clsqad.js`: CLSQ response-body ad filtering script.
- `tools/sync-to-desktop.ps1`: Copies the repository version back to the desktop path currently used by Stash.

## Stash Usage

Canonical managed file:

```text
F:\AI-Workspace\20_Projects\stash-scripts\scripts\haijiao-stash.js
```

If the existing Stash setup still points at the desktop path, it can keep using this runtime copy:

```text
C:\Users\srguang2\Desktop\haijiao-stash.js
```

After editing `scripts/haijiao-stash.js`, sync the project copy to the desktop runtime copy with:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\tools\sync-to-desktop.ps1
```

Private GitHub raw URLs normally require authentication and are not a good direct Stash script-provider URL. Keep the Stash-facing runtime file local unless the repository is intentionally made public or a separate authenticated delivery method is configured.

CLSQ override raw URL:

```text
https://raw.githubusercontent.com/aizijigao-sketch/stash-scripts/master/clsq/clsq.stoverride
```

## Security

Do not commit tokens, cookies, account credentials, private keys, `.env` files, logs, or Stash runtime secrets.
