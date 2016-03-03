for package in packages/*; do
  npm run build && npm run prepare && cd "$package" && npm publish
done
