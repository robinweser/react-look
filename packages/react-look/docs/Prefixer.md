# Prefixer

A prefixer basically adds vendor-prefixes to your styles. Right now there are just two build-in ones. A dynamic one which validates the `userAgent` and a static one which justs adds them all.


## [Available prefixer](plugins/)
| prefixer | options | description |
| ------ | ------ | ------ |
| [DynamicPrefixer](prefixer/DynamicPrefixer.md) | `userAgent`, `keepUnprefixed` | Automatically adds vendor prefixes according your userAgent and caniuse-database.<br> It uses [inline-style-prefixer](https://github.com/rofrischmann/inline-style-prefixer) to do this on-the-go using the userAgent information. |
| [StaticPrefixer](prefixer/StaticPrefixer.md) || Automatically adds all vendor prefixes.<br> It uses [inline-style-prefix-all](https://github.com/rofrischmann/inline-style-prefix-all) to do this on runtime. |

### Build your own
Still want to use another prefixer or even got a better idea how to do prefixing better?
> Check out the [Build your own - Prefixer](../guides/customPrefixer.md) tutorial!
