<div style="float:left">[< **6. Processors**](Processors.md)</div>
<div style="float:right">[**8. FAQ** >](FAQ.md)</div>

# 7. Mixins

Using [Mixins](https://github.com/rofrischmann/react-look-tools#mixins) provides a lot of power to improve your workflow. It let's you define custom keys which get resolved before your styles get applied.

## Usage
```javascript
import {Processors} from 'react-look-tools';
let Mixins = Processors.Mixins;
```
You register a mixin using `Mixin.register(name, function)` and that's it.
> **Note**: Mixins respect `!important` values and won't overwrite them.

```javascript
function doubleLineHeight(fontSize){
  return { 
    fontSize: fontSize, 
    lineHeight: fontSize*2 + 'px'
  }
}

Mixins.register('doubleLineHeight', doubleLineHeight);

class Button extends React.Component {
  look(){
    return {
      color: 'blue',
      doubleLineHeight : 15
    }
  }
  processors(){
    return Mixins;
  }
}

export default Look(Button);
```
## Mixin packs
Check Look Tools' [Mixin packs](https://github.com/rofrischmann/react-look-tools#mixinpacks) which includes a lot of useful mixins such as **extend**, **linearGradient**, **keyframes** and some nice css-hacks that enable a lot of **additional pseudo classes** like `:webkit-scrollbar` or `:placeholder` that can't be achieved by pure javascript.