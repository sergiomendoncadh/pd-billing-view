#!/usr/bin/env bash
set -e

echo -e "//npm.pkg.github.com/:_authToken=$GITHUB_TOKEN" > .npmrc

yarn && rm -f .npmrc
