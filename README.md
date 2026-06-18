# Stash Scripts

Private repository for Stash-related scripts and local sync helpers.

## Files

- `scripts/haijiao-stash.js`: Haijiao Stash script copied from the current desktop version.
- `tools/sync-to-desktop.ps1`: Copies the repository version back to the desktop path currently used by Stash.

## Stash Usage

The existing Stash setup can keep using the local desktop file:

```text
C:\Users\srguang2\Desktop\haijiao-stash.js
```

This repository keeps a private backup and editable source copy. After editing `scripts/haijiao-stash.js`, run:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\tools\sync-to-desktop.ps1
```

Private GitHub raw URLs normally require authentication and are not a good direct Stash script-provider URL. Keep the Stash-facing runtime file local unless the repository is intentionally made public or a separate authenticated delivery method is configured.

## Security

Do not commit tokens, cookies, account credentials, private keys, `.env` files, logs, or Stash runtime secrets.
