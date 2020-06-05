# Build CSS Class

Simple css class builder/injector.

### Installation

```bash
$ npm install build-css-class
# or
$ yarn add build-css-class
```

### Usage

- bccInitial: String with initial classes.
- bccSource: Object with properties to be checked.
- bccKeys: Array with specific properties to be checked in bccSource.

```js
const buildClass = require("build-css-class");

// default
buildClass("initial-class", { dark: true, mobile: false });
// result: "initial-class dark"

// object
buildClass({
  bccInitial: "",
  bccSource: { dark: true, mobile: true, other: true },
  bccKeys: ["dark", "mobile"]
});
// result: "dark mobile"
```

#### Example with VueJS

```html
<template lang="html">
  <div id="app" :class="appClass"></div>
</template>
```

```js
<script>
import buildClass from "build-css-class";

export default {
  data: () => ({
    show: true,
    mobile: false,
    theme: "dark"
  }),
  computed: {
    appClass() {
      // "dark show"
      return buildClass(this.theme, this.$data, ["mobile", "show"]);
    }
  }
};
</script>
```
