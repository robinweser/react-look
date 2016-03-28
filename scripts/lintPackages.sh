for package in packages/*; do
  eslint "$package"/modules
done
