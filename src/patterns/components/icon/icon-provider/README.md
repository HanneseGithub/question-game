The `Icon` component relies on an `IconContext` to provide means for
constructing the full URL to the SVG file with a reference to the specific
named icon in it.

The context can be provided by wrapping a component tree inside an
`IconProvider` component. This way, any `Icon` components at any arbitrary
depth within that tree will render correctly.

Example:

```
<IconProvider getPath={(name) => 'path/to/icons.svg#' + name}>
    <ComponentA>
        <ComponentB>
            ...
                <ComponentZ>
                    <Icon name="check" />
                </ComponentZ>
            ...
        </ComponentB>
    </ComponentA>
</IconProvider>
```

In this case, the `Icon` component would use `path/to/icons.svg#check` as the
URL.

For more information, see the <a href="https://reactjs.org/docs/context.html"
target="_blank">React documentation for Context</a>.
