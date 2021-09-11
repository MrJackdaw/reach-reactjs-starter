# Reach Helpers

## What is it?
A folder with some basic helpers and a global pub-sub Reach state manager.

## How do I use it?
This section contains a few individual components that can be imported and used independently: 

* `useReach()`:\
  A function that returns the current global `stdLib` instance. The instance will be created only the first time this function is called.

* `getCurrentNetwork()`:\
  A function that returns the current `reach.connector` property. This represents the network to which your `stdLib` instance is connected/configured

* `getNetworkProvider()`:\
  A function that returns either `TestNet` or `MainNet`: only relevant when `stdLib` is configured to Algorand.

* `ReachStore`:\
  A [raphsducks state instance](https://www.npmjs.com/package/@jackcom/raphsducks) for storing Reach-specific data.
  ### `ReachStore` (State) Properties
  All values return `null` when not set. 
  * `currentNetwork`: Current `reach.connector` **network** (defaults to `Algorand`)
  * `error`: Error messages around using the `reach` instance
  * `user`: Authenticated Reach account (a connected `Address`) 

### `ReachStore` Instance methods
  * `getState()`:\
    Returns an object containing all state properties. Can be deconstructed for individual items.

  * `subscribe(args)`:
    ```typescript
    subscribe(
      listener: (updates: Record<string, any>, updatedKeys: string[])
    ): unsubscribeFn:() => void
    ```
    Use `subscribe` to subscribe all changes to the `ReachStore` instance. As in Redux, you supply a `listener` function that is triggered when any state property is updated. The listener receives two arguments: the updated state, and a list of state properties that were updated.

## Additional Resources
  [📚] [*RaphsDucks*](https://www.npmjs.com/package/@jackcom/raphsducks)\
  A lightweight redux-like global state manager. You can create additional instances (e.g. to separate global UI state values from Reach values), or build out the `ReachStore` instance (by adding properties to it) if you want to use that as your single application state. View the [library API](https://www.npmjs.com/package/@jackcom/raphsducks#reference) to learn how to use it.
