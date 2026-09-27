#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${1:-http://localhost:3000}"

echo "Running smoke tests against $BASE_URL..."

# Helper curl test
check_status() {
  local url="$1"
  local expected="$2"
  local status
  status=$(curl -s -o /dev/null -w "%{http_code}" "$url")
  if [ "$status" -eq "$expected" ]; then
    echo "✓ $url returned $status"
  else
    echo "✗ FAIL: $url returned $status (expected $expected)"
    exit 1
  fi
}

check_content() {
  local url="$1"
  local pattern="$2"
  local content
  content=$(curl -s "$url")
  if echo "$content" | grep -q "$pattern"; then
    echo "✓ $url matched pattern '$pattern'"
  else
    echo "✗ FAIL: $url did not match pattern '$pattern'"
    exit 1
  fi
}

# 1. Check Storefront Home
check_status "$BASE_URL/" 200

# 2. Check Admin Login
check_status "$BASE_URL/admin/login" 200

# 3. Check Health Endpoints
check_status "$BASE_URL/api/health" 200
check_status "$BASE_URL/admin/api/health" 200

# 4. Check Storefront robots.txt for Disallow: /admin
check_content "$BASE_URL/robots.txt" "Disallow: /admin"

echo "All smoke tests passed successfully!"
