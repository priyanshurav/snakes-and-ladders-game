set -e

git checkout main
npm test
npm run lint
npm run build
rm -rf build
git merge dev
git push origin main
git checkout dev
