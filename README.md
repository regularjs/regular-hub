# Component Hub for Regularjs

regular-hub is Component Hub for all components created by regularjs


## Why Hub?

You need to initialize all components via `new Component`. 

```
new Pager({
  
})
```


now, you can use regular-hub as boots for all components in pages.  all component can initialized throungh directive way, just like you use component as [nested component](http://regularjs.github.io/guide/en/advanced/component.html).





## Usage

just like [nested component](http://regularjs.github.io/guide/en/advanced/component.html). you can initializing a component in directive way.


```html

<body>
  <pager current=1 total={{todos.length}} />
  <div class="g-sd">
    <todomvc todos={{todos}} />
  </div>
  ... other components scattered in pages ...
</body>
...

```

```javascript

new Hub({
  data: {
    todos: [...]
  }
})

```

> Warning: Only component can be booting by Hub Component, you can't booting other stuff by it.










