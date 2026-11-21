# Scripts Directory Rules

- Keep shared text, HTML/TeX subscript normalization, and `infer_preprint_info()` logic centralized in `scripts/config_helper.py` rather than duplicating helpers across fetchers and generators.
- Handle non-arXiv preprint repositories (`Preprints.org`, `Optica Open`, `TechRxiv`, `bioRxiv`, `chemRxiv`, `Research Square`, `OSF Preprints`, `SSRN`, `HAL`) uniformly alongside `arXiv` via `infer_preprint_info()`.
- Make all upstream API fetchers non-destructive: preserve previously cached JSON records if a network request fails, times out, or returns an empty payload.
- Explicitly read and write files with UTF-8 encoding (`encoding="utf-8"`) and LF newlines (`newline="\n"`) for cross-platform consistency between Windows and Linux CI runners.
- Keep third-party dependencies minimal and pinned in `scripts/requirements.txt`.
- Preserve `\definecolor{SECTIONCOLOR}{RGB}{0,102,204}` in `scripts/update_cv_tex.py`, because `titlesec`'s trailing `\uppercase` transforms `\color{sectioncolor}` to uppercase.
- After modifying any script, verify with `python -m compileall -q scripts` and `python scripts/verify_site.py --ci`.
