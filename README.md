# babel-plugin-iife-wrap [![Build Status](https://travis-ci.org/TrySound/babel-plugin-iife-wrap.svg?branch=master)](https://travis-ci.org/TrySound/babel-plugin-iife-wrap)

> Wrap file with iife.


## Install

With [npm](https://npmjs.org/package/babel-plugin-iife-wrap) do:

```
npm i babel-plugin-iife-wrap --D
```


## Example

### Input

```js
window.a = 1;
```

### Output

```js
;(function () {
  window.a = 1;
}());
```


## Usage

In your Babel configuration:

```json
{
  "plugins": ["iife-wrap"]
}
```


## Contributing

Pull requests are welcome. If you add functionality, then please add unit tests
to cover it.


## License

MIT © [Bogdan Chadkin](https://github.com/trysound)
