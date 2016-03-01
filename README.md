<p align="center"><img src="https://raw.githubusercontent.com/rofrischmann/react-look/develop/docs/res/logo.png" width=400></p>
<p align="center">
Advanced & Dynamic Component Styling for [React](https://facebook.github.io/react/) and [React Native](https://facebook.github.io/react-native/).
<br>
[![Gitter](https://img.shields.io/gitter/room/rofrischmann/react-look.svg)]()
![TravisCI](https://travis-ci.org/rofrischmann/react-look.svg?branch=develop) [![Test Coverage](https://codeclimate.com/github/rofrischmann/react-look/badges/coverage.svg)](https://codeclimate.com/github/rofrischmann/react-look/coverage) [![Code Climate](https://codeclimate.com/github/rofrischmann/react-look/badges/gpa.svg)](https://codeclimate.com/github/rofrischmann/react-look)
<p>
<br>
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
If you have any questions, feel free to ask them on Gitter, Stack Overflow or Twitter.
I will not answer usage questions as issues but close them directly.
