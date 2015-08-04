# Mixins

Using [DSS-Mixins](https://github.com/dynamicstylesheets/DSS-Mixins) which is a core processor of [Dynamic Style Sheets](https://github.com/dynamicstylesheets/Dynamic-Style-Sheets) enables you to create your own mixins. A mixin uses a unique name that represents a special key. Those keys get resolved before your styles get applied.

## Usage
Check out the official [usage example](https://github.com/dynamicstylesheets/DSS-Mixins#usage).
It is quite simple though. You register a mixin using `Mixin.register(name, function)` and that's it. Now you can process your sheet to resolve all mixins. `sheet.process(Mixins)`.
> **Note**: DSS-Mixins respects `!important` values and won't overwrite them.
 
## Available Mixins
Please also check [react-look-tools](https://github.com/rofrischmann/react-look-tools) which includes a lot of useful mixins such as **extend**, **keyframes**, **linear-gradient** and some nice css-hacks that enable `:webkit-scrollbar`, `:placeholder` and other pseudo-classes that can't be achieved by pure javascript.