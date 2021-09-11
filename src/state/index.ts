import createState from "@jackcom/raphsducks";

/** Your global application state. Add/remove any properties you need here */
const store = createState({
  /** `DEMO:` a globally-shared counter value */
  globalCount: 0,
});

export default store;
