# babel-plugin-graphql-raw [![Build Status](https://travis-ci.org/Quadric/babel-plugin-graphql-raw.svg?branch=master)](https://travis-ci.org/Quadric/babel-plugin-graphql-raw)

> Wrap file with iife.


## Install

With [npm](https://npmjs.org/package/babel-plugin-graphql-raw) do:

```
npm i babel-plugin-graphql-raw --D
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
  "plugins": ["graphql-raw"]
}
```


## Contributing

Pull requests are welcome. If you add functionality, then please add unit tests
to cover it.


## License

MIT © [Quadric ApS](https://github.com/Quadric)
