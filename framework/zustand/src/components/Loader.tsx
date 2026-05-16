import useTodoStore from "../stores/todoStore";

function Loader() {
  // With this approach, any store change triggers a re-render because Zustand uses Object.is.
  // Different object references are never equal, so components re-render even when they do not use the changed state, which can hurt performance.
  // To avoid this, Always try to select only the specific state you need mean if re-rendering is triggered by a change in the selected state, Otherwise, it won't trigger a re-render.
  // Or we can use "Zustand" Utility function called "useShallow" instead of "useTodoStore" to shallow compare the selected state, So, it only re-render when the selected state changes, Not when any state changes.

  //   const isLoading = useTodoStore((state) => state); 👉 Let's fix this
  const isLoading = useTodoStore((state) => state.isLoading);

  return isLoading ? <div className="loader">Working...</div> : null;
}

export default Loader;
