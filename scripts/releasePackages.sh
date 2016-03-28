for package in packages/*; do
  cd "$package" && npm publish
done
