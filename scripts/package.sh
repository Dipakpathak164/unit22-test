#!/usr/bin/env bash
set -euo pipefail

APP="${1:-web}"
COMMIT_SHA="${2:-local}"
OUTPUT_DIR="dist/releases"

echo "Packaging app: $APP (commit: $COMMIT_SHA)"

# 1. Build workspace
pnpm turbo run build --filter="apps/$APP"

# 2. Assemble release structure
STANDALONE_DIR="apps/$APP/.next/standalone"
STATIC_DIR="apps/$APP/.next/static"
PUBLIC_DIR="apps/$APP/public"

TARGET_STATIC="$STANDALONE_DIR/apps/$APP/.next/static"
TARGET_PUBLIC="$STANDALONE_DIR/apps/$APP/public"

mkdir -p "$OUTPUT_DIR"
mkdir -p "$TARGET_STATIC"

if [ -d "$STATIC_DIR" ]; then
  cp -r "$STATIC_DIR/"* "$TARGET_STATIC/"
fi

if [ -d "$PUBLIC_DIR" ]; then
  mkdir -p "$TARGET_PUBLIC"
  cp -r "$PUBLIC_DIR/"* "$TARGET_PUBLIC/"
fi

TARBALL="$OUTPUT_DIR/${APP}-${COMMIT_SHA}.tar.gz"
tar -czf "$TARBALL" -C "$STANDALONE_DIR" .

echo "Package created: $TARBALL"
