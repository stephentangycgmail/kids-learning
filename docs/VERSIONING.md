# Versioning

Future Lesson Packages and indexes should use semantic versioning.

Format:

```text
MAJOR.MINOR.PATCH
```

Examples:

```text
1.0.0
1.0.1
1.1.0
2.0.0
```

## Version Parts

### MAJOR

Increment MAJOR for incompatible changes.

Examples:

- Required field removed.
- JSON shape changed in a way old consumers cannot read.
- Package split into multiple packages.
- Activity file meaning changes substantially.

Example:

```text
1.4.2 -> 2.0.0
```

### MINOR

Increment MINOR for backward-compatible additions.

Examples:

- Add optional fields.
- Add reviewed vocabulary items.
- Add a new optional activity file.
- Add examples or explanations without breaking existing consumers.

Example:

```text
1.0.0 -> 1.1.0
```

### PATCH

Increment PATCH for safe corrections.

Examples:

- Typo fixes.
- Translation corrections.
- Minor punctuation fixes.
- Metadata note cleanup.
- Correct an answer explanation without changing schema.

Example:

```text
1.0.0 -> 1.0.1
```

## Initial Version

New reviewed packages should start at:

```text
1.0.0
```

Draft packages may use:

```text
0.1.0
```

if a future workflow needs pre-release tracking.

## Versioning Rules

1. Every future Lesson Package must include `metadata.version`.
2. Indexes should include their own `version`.
3. Activity files may include a local `version` if they evolve separately.
4. Version changes should be mentioned in release notes or pull request notes.
5. Do not reset a published package version.

## Existing Files

Existing flat JSON files do not currently use semantic versions. Do not add version fields to existing files unless a dedicated migration milestone approves it.
