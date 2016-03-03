for package in packages/*; do
  rimraf "$package"/lib && babel -d "$package"/lib "$package"/modules
done
