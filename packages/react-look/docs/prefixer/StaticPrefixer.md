# Static Prefixer
An alternative to the [Dynamic Prefixer](./DynamicPrefixer.md) which uses [inline-style-prefix-all](https://github.com/rofrischmann/inline-style-prefix-all) instead of  [inline-style-prefixer](https://github.com/rofrischmann/inline-style-prefixer) to prefix styles.

Instead of evaluating the `userAgent` and iterating [caniuse.com](caniuse.com) data, it just adds every needed vendor-prefix. The output styles are somehow bigger, but in return the bundle size itself will be much smaller *(only 3.3kb instead of 10kb~)*
