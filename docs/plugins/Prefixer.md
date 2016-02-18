# Prefixer <img src="../res/dom-badge.png" height=25>

Prefixer will automatically add vendor prefixes to your styles according a user's browser. It uses [inline-style-prefixer](https://github.com/rofrischmann/inline-style-prefixer) which pulls the latest [caniuse](http://caniuse.com) data.<br><br>
While opening the application for the first time, inline-style-prefixer takes the `userAgent` and evaluates every property that need to be prefixed. While other libraries such as [Autoprefixer](https://github.com/postcss/autoprefixer) just add every vendor prefix, this method leads to adding only the total minimum of needed prefixes in general which reduces the overload a lot.

By default the prefixer uses the `navigator.userAgent`. You may pass a custom userAgent within the `config` object.
> See the guide on how to [configure Look](../guides/configureLook.md).
