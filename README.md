<p align="center"><img src="https://raw.githubusercontent.com/rofrischmann/react-look/develop/res/logo.png" width=400></p>
<p align="center">
Advanced & Dynamic Component Styling for <a href="https://facebook.github.io/react/">React</a> and <a href="https://facebook.github.io/react-native/">React Native</a>.
<br>
<a href=" https://gitter.im/rofrischmann/react-look"><img alt="Gitter" src="https://img.shields.io/gitter/room/rofrischmann/react-look.svg"></a>
<img alt="TravisCI" src="https://travis-ci.org/rofrischmann/react-look.svg?branch=develop"> 
<a href="https://codeclimate.com/github/rofrischmann/react-look/coverage"><img alt="Test Coverage" src="https://codeclimate.com/github/rofrischmann/react-look/badges/coverage.svg"></a> 
<a href="https://codeclimate.com/github/rofrischmann/react-look"><img alt="Code Climate" src="https://codeclimate.com/github/rofrischmann/react-look/badges/gpa.svg"></a>
</p>

# Packages
Wondering where all the content was going to? Look was restructured into single packages as support for React Native was added. Having single packages and some common files that are shared by both helps to keep the code & documentation clean while still having the ability to manage issues/feature requests for both packages in a single repository.

### [react-look](packages/react-look)
This package targets `react-dom`. Working with the web this is the package you need to use. It supports both client-side and server-side rendering. It uses CSS under the hood which allows us to use pseudo classes and media queries by default.

### [react-look-native](packages/react-look-native)
This package targets `react-native`. With no CSS support this package uses a different way to achieve the benefits of dynamic Component styling.

## Universal API
While the core modules and styling mechanism of both packages are totally different, we still try to achieve an universal API. Both use the exact same API except for the package-names.
>If you've already learned to use one, you can use the other one without additional effort.


# Support
If you have any questions, feel free to ask them on <a href=" https://gitter.im/rofrischmann/react-look">Gitter</a>, Stack Overflow or <a href="https://twitter.com/rofrischmann">Twitter</a>.
I will not answer usage questions as issues but close them directly.
