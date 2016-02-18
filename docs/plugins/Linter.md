# Linter <img src="../res/dom-badge.png" height=25>

Look uses [inline-style-linter](https://github.com/rofrischmann/inline-style-linter) for runtime style linting.
It is a modular & plugin-based and brings a lot of configuration options.

You **must** pass a configuration object using the `linter` key within your Look configuration. <br>
Check [Linter Configuration](https://github.com/rofrischmann/inline-style-linter/blob/master/docs/Configuration.md) and [Configuring Look](../guides/configureLook.md) for detailed information on how to configure Look and set up the Linter.

Always include devTools **after** all other plugins.


## Look-specific configuration
Next to the configuration options which are shipped by inline-style-linter on default, Look also has some unique options.

| Option | Type | Description |
| --------- | ---- | ----------- |
| onlyLogHint | `boolean` | Only logs a generated linter warning, not additional information |
| mute | `boolean` | prevents logging, used to *mute* single Component warnings |
