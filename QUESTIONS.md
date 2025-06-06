### 1. What is the difference between Component and PureComponent? Give an example where it might break my app.

The main difference is how they handle rendering. Component will re-render every time setState is called, regardless of whether the new state or props are actually different. PureComponent, on the other hand, implements a shallow comparison of props and state to avoid unnecessary re-renders.

#### Example where it might break:

If a PureComponent receives a prop that is an object or array, and that object is recreated on every render (even with the same values), the shallow comparison will detect it as "changed", triggering a re-render—or worse, not re-rendering when it should. This can cause UI to be out of sync.

```js
<PureComponent data={{ name: 'Raphael' }} />
```

Here, even if name stays the same, data is a new object on every render, so PureComponent might not behave as expected.

### 2. Context + ShouldComponentUpdate might be dangerous. Why is that?
shouldComponentUpdate doesn’t take context changes into account. So, if your component relies on context to render something, but you block re-renders with shouldComponentUpdate, your component won't update when the context value changes.

So, it's dangerous because you may think you're optimizing performance, but you're actually blocking updates triggered by context changes, leading to stale or incorrect UI.

### 3. Describe 3 ways to pass information from a component to its PARENT.

1. Callback functions:
The parent passes a function as a prop. The child calls it to send data back.

```js
<Child onChange={value => setParentValue(value)} />
```

2. Using Context API:

Create a shared context where both parent and child can access and modify the same state.
The child updates the context, and the parent reads the new value.

3. Global state managers (like Redux or Zustand):

The child writes to the global store, and the parent reads from it.
Useful for deeply nested or cross-cutting state needs.

### 4. Give 2 ways to prevent components from re-rendering.

1. Memoization (React.memo or useMemo):
This prevents re-rendering if props haven’t changed.

2. shouldComponentUpdate or PureComponent:
In class components, these prevent re-renders if the state/props didn’t actually change.

### 5. What is a fragment and why do we need it? Give an example where it might break my app.
A Fragment (<>...</>) lets you return multiple elements from a component without adding extra DOM nodes.

Why useful:
It avoids unnecessary <div> wrappers that might break CSS or layout.

When it might break your app:
If you’re rendering a list of fragments without assigning a key:

```js
items.map(item => <> <span>{item.name}</span> </>)
```

Fragments without keys can break list rendering or cause warnings.

### 6. Give 3 examples of the HOC pattern.
HOCs (Higher-Order Components) are functions that take a component and return a new component with added functionality.

1. connect from Redux:

```js
export default connect(mapStateToProps)(MyComponent);
```

2. withRouter from React Router:
Adds routing props like history and location.

3. Custom HOC for loading state:

```js
const withLoading = Component => props =>
  props.loading ? <Spinner /> : <Component {...props} />;
```

### 7. What's the difference in handling exceptions in promises, callbacks and async/await?

1. Promises:
Use .catch() to handle errors.

```js
doSomething().then(...).catch(error => handleError(error));
```

2. Callbacks:
Errors are usually the first parameter, and must be handled manually.

```js
doSomething((err, result) => {
  if (err) handleError(err);
});
```

3. Async/await:
Use try/catch blocks for cleaner syntax.

```js
try {
  const data = await fetchData();
} catch (err) {
  handleError(err);
}
```

### 8. How many arguments does setState take and why is it async?
It takes two arguments:

1. The new state (object or updater function).
2. An optional callback executed after the update.

It's async because React batches multiple state updates to improve performance. So, setState doesn't update immediately.

### 9. List the steps needed to migrate a Class to Function Component.

1. Replace class with a function.
2. Replace this.state and setState with useState().
3. Replace lifecycle methods with hooks (useEffect, useLayoutEffect, etc).
4. Remove this. from all references.
5. Convert bound methods into inline functions or use useCallback.

10. List a few ways styles can be used with components.

1. Inline styles

```js
<div style={{ color: 'blue' }} />
```

2. CSS Modules

```js
import styles from './Button.module.css';  
<button className={styles.primary} />
```

3. Styled Components (CSS-in-JS)

```js
const Button = styled.button`color: red;`;
```

4. External CSS files

```js
import './App.css';
```

5. Utility libraries (like Tailwind CSS)

```js
<div className="text-sm font-bold" />
```

11. How to render an HTML string coming from the server.

Use dangerouslySetInnerHTML, which tells React to insert raw HTML.

```js
<div dangerouslySetInnerHTML={{ __html: serverHtml }} />
```

This can expose your app to XSS (Cross-site scripting) if the content is not sanitized. Always validate or sanitize the HTML before rendering.