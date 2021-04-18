# preact-hugo-esbuild
POC of using Preact in Hugo with ESBuild bundler

In order to build Preact app with ESBuild, we need to add [JSX Factory](https://esbuild.github.io/api/#jsx-factory) and [JSX Fragment](https://esbuild.github.io/api/#jsx-fragment) options. 

This repo is a minimal example on how to use Preact in Hugo using `js.Build` (implemented with ESBuild). Refer to the documentation: https://gohugo.io/hugo-pipes/js#options

The solution is to add string value `h` for `JSXFactory` and string value `Fragment` for `JSXFragment` options key as per Hugo source code [here](https://github.com/gohugoio/hugo/blob/d90e37e0c6e812f9913bf256c9c81aa05b7a08aa/resources/resource_transformers/js/options.go#L75).

This will let ESBuild to use `h` instead of `React.createElement` and use `Fragment` instead of `React.Fragment`.

`./layouts/index.html`
```html
  {{ with resources.Get "index.jsx" }}
  {{ $defines := dict "process.env.NODE_ENV" "\"development\"" "process.env.BaseURL" (printf `"%s"` $.Site.BaseURL) }}
  {{ $options := dict "defines" $defines "JSXFactory" "h" "JSXFragment" "Fragment"}}
  {{ $script := . | js.Build $options }}
  <script src="{{ $script.RelPermalink }}" defer></script>
  {{end}}
```

`./assets/index.js`
```js
import { h, Fragment, render } from 'preact';
import { useState } from 'preact/hooks';

const Counter = () => {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
  // You can also pass a callback to the setter
  const decrement = () => setCount((currentCount) => currentCount - 1);

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </>
  )
}

//Render Preact component in a single root
render(<Counter/>, document.getElementById('root'));

//Render Preact component in multiple roots
const roots = document.querySelectorAll('.widget');
roots.forEach( root => {
  render(<Counter/>, root)
})
```

## Other examples

Using React in Hugo with ESBuild: https://github.com/kaihendry/react-hugo-esbuild
