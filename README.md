# minisheet

Tiny module that implements a tiny subset of sheetify,
without using transforms.

```
npm install minisheet
```

## Usage

``` js
const css = require('minisheet')

// minisheet inserts the style and generates the :host class which is returned,
// that is it.

const className = css`
  :host {
    background-color: blue;
  }
`

document.body.className = className
```

## License

MIT
