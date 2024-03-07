# .husky/pre-commit
. "$(dirname -- "$0")/common.sh"

yarn format
yarn lint