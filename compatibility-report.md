# Image Gallery Block — PHP / WordPress Compatibility Report

**Plugin:** Image Gallery Block (`image-gallery-block`)
**Version:** 1.3.4 → 1.5.0
**Branch:** `image-gallery-block-dev` (branched off `latest`)
**Date of audit:** 2026-08-09
**Nothing committed or pushed — all changes left in the working tree.**

---

## 1. Detected original baseline

### PHP — original floor: **5.6**

| Evidence | File:line | Implies |
|---|---|---|
| `public static function get_instance( ...$args )` and `new static( ...$args )` | `includes/font-loader.php:21,23` | PHP 5.6+ (variadics + argument unpacking) |
| Short array syntax `[]` throughout | all files | PHP 5.4+ |
| Closure passed as `render_callback` | `image-gallery-block.php:139` | PHP 5.3+ |
| No `??`, no scalar/return type hints, no typed properties, no arrow functions, no `match`, no constructor promotion | all files | Nothing above 5.6 required |

Two later constructs had been added on top of that 5.6 baseline without raising the floor:

- `str_contains()` — `includes/helpers.php:48` — **PHP 8.0+ only**, hard fatal below it.
- `throw new Error( … )` — `image-gallery-block.php:36` — the `Error` class does not exist before **PHP 7.0**.

So the code as shipped in 1.3.4 was written for 5.6 but only actually ran on 8.0+.

### WordPress — original floor: **5.5 in principle, 5.8 in practice**

| Evidence | File:line | Implies |
|---|---|---|
| `register_block_type()` given a *directory path* | `image-gallery-block.php:136` | WP 5.8+ (path form landed in 5.8) |
| `block.json` metadata file | `block.json` | WP 5.5+ |
| `WP_Block_Type_Registry::get_instance()` | `image-gallery-block.php:134` | WP 5.0+ |
| `render_block` filter | `includes/font-loader.php:31` | WP 5.0+ |
| `register_meta()` with `show_in_rest` | `includes/post-meta.php:20` | WP 4.6+ |
| `site-editor.php` handling | `includes/helpers.php:48` | WP 5.9+ |

`Image_Gallery_Helper::get_block_register_path()` tried to bridge older WP by returning a
block *name* for `(float) get_bloginfo('version') <= 5.6`, but the name it returned was
`"advanced-heading/advanced-heading"` — a copy-paste leftover from a different plugin, not
this plugin's block. Result: **WP 5.6 registered the wrong block name, and WP 5.7 passed a
directory path to a `register_block_type()` that did not yet accept one.** The declared floor
of 5.6 was never real; the true working floor was 5.8.

### Declared vs. detected — they disagreed

| Field | Declared before | Detected reality |
|---|---|---|
| Plugin header `Requires PHP` | *absent* | 8.0 as shipped (5.6 as written) |
| Plugin header `Requires at least` | *absent* | 5.8 |
| `readme.txt` `Requires at least` | 5.6 | 5.8 |
| `readme.txt` `Requires PHP` | *absent* | 8.0 |
| `readme.txt` `Tested up to` | 6.5 | — |

---

## 2. Target range

Live version check performed **2026-08-09**:

- `https://www.php.net/releases/index.php?json&max=3` → latest **PHP 8.5.9**, actively supported branches **8.2, 8.3, 8.4, 8.5**.
- `https://api.wordpress.org/core/version-check/1.7/` → latest **WordPress 7.0.3**.

**Audited across PHP 5.6 → 8.5 and WordPress 5.6 → 7.0**, every version in between:

- PHP: 5.6, 7.0, 7.1, 7.2, 7.3, 7.4, 8.0, 8.1, 8.2, 8.3, 8.4, 8.5
- WP: 5.6, 5.7, 5.8, 5.9, 6.0, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, and 7.0

The code was fixed to be safe across that whole span, but the **declared** floor was
subsequently raised to the **PHP 7.4 / WP 6.0 policy minimum** at the maintainer's direction
(see §6). The sub-6.0 guards were left in place rather than stripped — they cost nothing and
keep the plugin from fataling if it is ever force-installed below the declared floor.

Note on WP 7.0: this release is exactly why float-casting the version string is unsafe. `(float) '7.0'`
happens to still be 7.0, but a future `6.10`/`7.10` collapses to `6.1`/`7.1` and silently
inverts every comparison. All float casts in control flow were removed.

---

## 3. Issue table

| # | File:line | Issue | Breaks on | Severity |
|---|---|---|---|---|
| 1 | `image-gallery-block.php:27` | `require_once … /lib/style-handler/style-handler.php` unconditional; `lib/style-handler` is an **uninitialised git submodule** (`git submodule status` shows `-74863767…`) | Every PHP/WP version — fatal on load | **Critical** |
| 2 | `includes/helpers.php:48` | `str_contains()` used with no polyfill | PHP < 8.0 — `Call to undefined function` fatal in wp-admin | **Critical** |
| 3 | `image-gallery-block.php:36` | `throw new Error()` at `init` when `dist/index.asset.php` is missing — white screen; also `Error` class absent before PHP 7.0 | PHP < 7.0 always; all versions when build assets missing | **Critical** |
| 4 | `includes/helpers.php:85` | `(float) get_bloginfo('version') <= 5.6` — float cast on a version string | WP 6.10 / 7.10 onward (silent, wrong branch) | **High** |
| 5 | `includes/helpers.php:85` | Returns the block name `"advanced-heading/advanced-heading"` on old WP — wrong block, copy-paste from another plugin | WP 5.6 | **High** |
| 6 | `image-gallery-block.php:136` | Directory path passed to `register_block_type()`, unsupported before WP 5.8 | WP 5.7 (and 5.6 via #5) — block never registers | **High** |
| 7 | `includes/helpers.php:50` | `include_once` used to *retrieve* a returned array — returns `true` on a repeat include, then `['dependencies']` is read off a bool | PHP 7.4 warning / PHP 8.0+ `Trying to access array offset on value of type bool` | **High** |
| 8 | `includes/helpers.php:50` | No `file_exists()` check before including `dist/modules.asset.php` | All versions when build assets missing | **Medium** |
| 9 | `image-gallery-block.php:1` | No `if ( ! defined( 'ABSPATH' ) ) exit;` guard | All versions — direct file access | **Medium** |
| 10 | `image-gallery-block.php:30-32` | `define()` calls with no `defined()` guard | All versions — `Constant already defined` notice on redeclare | **Low** |
| 11 | `includes/post-meta.php:12` | `add_filter('init', …)` where `add_action` is meant | All versions — works, but semantically wrong | **Low** |
| 12 | `includes/font-loader.php:96` | `trim( $font )` / `str_replace( …, $font )` where `$font` may be `null` from block attributes | PHP 8.1+ — *Passing null to parameter of type string is deprecated* | **Medium** |
| 13 | `includes/font-loader.php:52` | `$block['blockName']` read without `isset()`; `$block['attrs']` not verified as array | PHP 8.0+ — undefined-key warning | **Low** |
| 14 | `includes/font-loader.php:16` | `private static $block_name = []` declared as array, always assigned a string | All versions — type confusion, no runtime error | **Low** |
| 15 | `includes/helpers.php:60` | `'eb_wp_version' => (float) get_bloginfo('version')` — float cast sent to JS | WP 6.10 / 7.10 onward | **High — flagged, not fixed** |
| 16 | `image-gallery-block.php:134` | Registration guard checks `essential-blocks/advanced-heading`, not this plugin's block | All versions — logic bug | **High — flagged, not fixed** |
| 17 | `lib/js/eb-animation-load.js:26` | `DOMNodeInserted` — Mutation Events, **removed in Chrome 127 (2024)** | All modern browsers — listener never fires | **Medium — flagged, not fixed** |
| 18 | `block.json` | No `apiVersion` key → defaults to API v1; the editor cannot iframe v1 blocks | WP 6.3+ — degraded editing, not broken | **Medium — flagged, not fixed** |
| 19 | `src/index.js:23-25` | Keywords translated against text domain `"essential-blocks"`, plugin's domain is `"image-gallery-block"` | All versions — strings never translate | **Low — flagged, not fixed** |

Also checked and found **clean**: no `mysql_*` / `create_function()` / `each()` / `ereg*` /
`money_format()` / `FILTER_SANITIZE_STRING` / curly-brace offsets / `${var}` interpolation;
no `$wpdb` usage at all (so no `prepare()` gap); no REST routes (so no missing
`permission_callback`); no deprecated jQuery 3.x or jQuery Migrate patterns in `lib/js` or
`src`; no dynamic property creation; no implicit nullable parameters; no
`ArrayAccess`/`Iterator`/`JsonSerializable` implementations needing
`#[\ReturnTypeWillChange]`; no text-domain loading before `init`; all class/function/constant
names are plugin-prefixed.

---

## 4. Fixes applied

| Issue | Fix |
|---|---|
| 1 | `image-gallery-block.php` — the `style-handler` require is now wrapped in `file_exists()`. An un-initialised submodule degrades instead of fataling. |
| 2 | `includes/helpers.php` — `str_contains($qs, 'gutenberg-edit-site')` → `strpos($qs, 'gutenberg-edit-site') !== false`. Identical result, works on 5.6 through 8.5. `$_SERVER['QUERY_STRING']` is now read through an `isset()` + `(string)` cast. |
| 3 | `image-gallery-block.php` — `throw new Error(…)` → `return;`. A missing build no longer takes the site down. |
| 4, 5, 6 | `includes/helpers.php` — `get_block_register_path()` now uses `version_compare()` against `'5.8'` instead of a float cast. New `Image_Gallery_Helper::register_block()` calls `register_block_type()` on WP 5.8+ and falls back to `register_block_type_from_metadata()` (WP 5.5+) below it. `image-gallery-block.php` now calls `register_block( IMAGEGALLERY_BLOCK_ADMIN_PATH, … )` directly, so the bogus `"advanced-heading/advanced-heading"` name is gone and WP 5.6 / 5.7 register the correct block. |
| 7, 8 | `includes/helpers.php` — `include_once` → `include`, preceded by `file_exists()` and followed by an `is_array()` check plus `wp_parse_args()` defaults for `dependencies` / `version`. |
| 9 | `image-gallery-block.php` — `if ( ! defined( 'ABSPATH' ) ) { exit; }` added. |
| 10 | `image-gallery-block.php` — all three `define()` calls wrapped in `defined()` guards. |
| 11 | `includes/post-meta.php` — `add_filter('init', …)` → `add_action('init', …)`. |
| 12 | `includes/font-loader.php` — `get_fonts_family()` skips unset / non-string / whitespace-only attribute values; `fonts_loader()` re-checks each font before `trim()`/`str_replace()`. Kills the PHP 8.1+ null deprecations and also stops a malformed `+:100,…\|` fragment reaching the Google Fonts URL. |
| 13 | `includes/font-loader.php` — `$block['attrs']` verified with `is_array()`, `$block['blockName']` read through `isset()`. |
| 14 | `includes/font-loader.php` — `private static $block_name = [];` → `= '';`. |

Metadata (Step 5):

- Plugin header gained `Requires at least: 6.0` and `Requires PHP: 7.4` (it had neither).
- `readme.txt`: `Requires at least: 5.6` → `6.0`; `Tested up to: 6.5` → `7.0`;
  `Requires PHP: 7.4` added; `Stable tag: 1.3.4` → `1.5.0`.
- Version bumped **1.3.4 → 1.5.0** (minor) and kept in sync across the plugin header,
  `IMAGEGALLERY_BLOCK_VERSION`, `readme.txt` `Stable tag`, and `package.json`.
- Changelog entry added for 1.5.0.

---

## 5. Flagged, not auto-fixed — these change user-facing behaviour

**A. `eb_wp_version` is still a float** (`includes/helpers.php:60`)

```php
'eb_wp_version' => (float) get_bloginfo('version'),
```

This value is handed to JavaScript inside the `controls` submodule, which is not checked out
here, so how it is compared is unverifiable. Changing it to a string would break any numeric
`>=` comparison on the JS side. It is wrong for a future WP `6.10`/`7.10`, but harmless on
7.0.3 today.
*Recommendation:* add a second key (e.g. `eb_wp_version_str`) alongside the float and migrate
the JS comparisons to `version_compare`-style string handling, rather than mutating the
existing key. Additive, so nothing breaks mid-migration.

**B. The registration guard checks the wrong block** (`image-gallery-block.php:134`)

```php
if ( ! WP_Block_Type_Registry::get_instance()->is_registered( 'essential-blocks/advanced-heading' ) ) {
```

The block being registered is `image-gallery-block/image-gallery-block`. The intent is
presumably "skip if Essential Blocks already provides this block", in which case the check
should be `essential-blocks/image-gallery`. As written, having Essential Blocks active with
Advanced Heading enabled suppresses the standalone Image Gallery block, and conversely, if
Advanced Heading is disabled but Image Gallery is enabled, both register and collide.
*Recommendation:* change to `essential-blocks/image-gallery` — but confirm the intended
precedence first, since it changes which block users get on sites running both plugins.

**C. `DOMNodeInserted` is dead on every current browser** (`lib/js/eb-animation-load.js:26`)

Mutation Events were removed in Chrome 127 (July 2024) and are gone from current Firefox and
Safari too. The listener that re-applies animation classes when the editor's animation
dropdown appears therefore never fires.
*Recommendation:* replace with a `MutationObserver` on `document.body`. This *restores*
intended behaviour rather than changing it, but it does alter what users see in the editor,
so it is your call.

**D. `block.json` has no `apiVersion`** — defaults to Block API v1. WP 6.3+ only iframes v2/v3
blocks, so the editor drops out of iframed mode for this block, which affects style isolation
and responsive previews. Bumping to `"apiVersion": 3` requires the `edit` component to use
`useBlockProps` and is a markup-affecting change.
*Recommendation:* schedule as its own change with a visual regression pass.

**E. Text domain mismatch in `src/index.js:23-25`** — keywords use `"essential-blocks"` while
the plugin's domain is `"image-gallery-block"`, so those three strings never translate. Fixing
requires a rebuild of `dist/`.

---

## 6. Old-vs-new conflicts

**None that could not be reconciled.** Every fix is range-safe across PHP 5.6→8.5 and
WP 5.6→7.0 using `file_exists()`, `function_exists()`, `is_array()` and `version_compare()`
guards. No construct newer than PHP 5.6 remains in the plugin's own PHP.

### Declared floor raised to policy minimum

The audit originally left the declared floor at PHP 5.6 / WP 5.6 — honest about the code, but
generous about reality. WordPress 7.0 itself requires PHP 7.2+, and the plugin had been
effectively 8.0-only since `str_contains()` was introduced into it, so nobody was running it
on 5.6 anyway.

At the maintainer's direction the declared floor is now the **PHP 7.4 / WP 6.0 policy
minimum**. No code changed as a result — the plugin's PHP is 5.6-compatible, which is a strict
subset of 7.4 — and the sub-6.0 compatibility guards (`Image_Gallery_Helper::register_block()`'s
`register_block_type_from_metadata()` fallback, `get_block_register_path()`'s pre-5.8 branch)
were deliberately kept. They are unreachable at the declared floor but harmless, and they mean
a force-installed copy degrades instead of fataling.

---

## 7. Final declared compatibility

| Field | Value |
|---|---|
| `Requires at least` (plugin header + readme) | **6.0** |
| `Requires PHP` (plugin header + readme) | **7.4** |
| `Tested up to` (readme) | **7.0** |
| `Stable tag` / plugin version / `package.json` | **1.5.0** |

Declared support: **PHP 7.4 → 8.5**, **WordPress 6.0 → 7.0**.
Code verified safe over the wider **PHP 5.6 → 8.5**, **WordPress 5.6 → 7.0** span.

---

## 8. Verification performed

- `php -l` on all 9 PHP files (local PHP **8.5.8**) — **no syntax errors detected** in any file,
  including the generated `*.asset.php` bundles.
  ```
  No syntax errors detected in ./image-gallery-block.php
  No syntax errors detected in ./dist/index.asset.php
  No syntax errors detected in ./dist/frontend.asset.php
  No syntax errors detected in ./dist/modules.asset.php
  No syntax errors detected in ./includes/post-meta.php
  No syntax errors detected in ./includes/font-loader.php
  No syntax errors detected in ./includes/helpers.php
  No syntax errors detected in ./build/index.asset.php
  No syntax errors detected in ./dist/frontend/index.asset.php
  ```
- Grep sweep for PHP 7.0+/8.0+ syntax (`??`, `<=>`, return types, `fn()`, `?->`, `match`,
  attributes) across `image-gallery-block.php` and `includes/*.php` — **no matches**, so the
  5.6 floor holds by inspection. A real PHP 5.6 runtime was not available locally to execute
  against.
- `phpcs` is not installed on this machine (`phpcs -i` → command not found). Per the skill's
  rule, no global tooling was installed; the WordPress Coding Standards pass was skipped.
- Version consistency confirmed across plugin header, `IMAGEGALLERY_BLOCK_VERSION`,
  `readme.txt` `Stable tag`, and `package.json` — all **1.5.0**.
- `git diff --stat`: 6 files changed, 106 insertions(+), 22 deletions(-). Nothing committed,
  nothing pushed.

### Not verified

- Runtime execution on PHP 5.6/7.x or on WordPress 5.6–6.x — this is static analysis plus
  8.5.8 lint only.
- The `controls` and `lib/style-handler` submodules are not checked out, so their contents were
  not audited. `lib/style-handler` is `require`d at runtime and is now guarded; **initialise
  both submodules before building a release**, or the shipped zip will be missing the style
  handler and the editor controls bundle.
