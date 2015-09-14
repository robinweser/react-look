<div style="float:left"><a href="Intro.md">< <b>1. Intro</b></a></div>
<div style="float:right"><a href="PseudoClasses.md"><b>3. Pseudo classes</b> ></a></div>

# 2. Under the hood
Similar to Radium, Look wraps the `render` function and modifies applied styles while iterating recursive over all children. It adds missing event listeners to match `:hover`, `:active`, `:focus` and `:valid`, `:invalid`. Those action states get saved within your wrapping component _(You can adress those with the [State API](docs/api/State.md))_.<br> It also counts (type-specific) indexes to validate index-specific pseudo classes such as `:nth-child` or  `:nth-type-of`. <br>
> **Note**: This diagram shows an earlier version of Look and is not up to date yet!

![Life cycle](./res/lifecycle.png)