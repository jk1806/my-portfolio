#!/bin/bash
# Static analysis using cppcheck

set -e

SOURCE_DIR="${1:-.}"
OUTPUT_DIR="reports/cppcheck"
mkdir -p "$OUTPUT_DIR"

echo "Running cppcheck on $SOURCE_DIR..."

cppcheck \
    --enable=all \
    --suppress=missingIncludeSystem \
    --xml \
    --xml-version=2 \
    --output-file="$OUTPUT_DIR/report.xml" \
    "$SOURCE_DIR"

cppcheck \
    --enable=all \
    --suppress=missingIncludeSystem \
    --output-file="$OUTPUT_DIR/report.txt" \
    "$SOURCE_DIR"

echo "cppcheck analysis complete. Report: $OUTPUT_DIR/report.txt"

