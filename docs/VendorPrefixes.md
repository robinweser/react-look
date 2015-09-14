<div style="float:left"><a href="Mixins.md">< <b>7. Mixins</b></a></div>
<div style="float:right"><a href="FAQ.md"><b>9. FAQ</b> ></a></div>

# 8. Vendor Prefixes (DOM-only)
Look automatically adds vendor prefixes to your styles according a user's browser. It uses [inline-style-prefixer](https://github.com/rofrischmann/inline-style-prefixer) which pulls the latest [caniuse](http://caniuse.com) data.<br><br>
When the user opens your application, inline-style-prefixer takes in the userAgent and evaluates properties that need to be prefixed. This leads to adding only the total minimum of needed prefixes in general. 
> **Note**: Modern browsers sometimes don't even need any prefixes