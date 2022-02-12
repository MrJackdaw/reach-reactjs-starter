"reach 0.1";

/**
 * This is purely an example stub: you can expand it into a real `Reach DApp`
 * or delete the file if you're bringing in your contracts. It is mainly here
 * to suggest how you can organize your files.
 */
export const main = Reach.App(() => {
  const A = Participant("A", {});
  init();

  // App details go here
  A.publish();
  commit();
  exit();
});
