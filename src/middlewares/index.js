const customMiddleware = store => next => action => {
  console.log("Middleware triggered:", action);
  console.log(`Current State - ${store.getState().count}`);

  next(action);
};

export const incrementMiddleware = store => next => action => {
  if (action.type === "INCREMENT") {
    alert(
      `Increment button was clicked, current state is ${
        store.getState().count
      } \nI will now add to it`
    );
  }

  next(action);
};

export default customMiddleware;
