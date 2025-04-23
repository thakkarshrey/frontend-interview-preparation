import useNotification from "./components/notification"
import "./App.css"
const App = () => {
  const { notify, NotificationComponent } = useNotification("top-right")

  return <main className="App">
    <h1>Toast Component</h1>
    <section className="Container">
      <button className="toast-button" onClick={() => notify({
        type: "success",
        message: "This is a success message!",
        duration: 5000,
        animation: "slide"
      })}>Success</button>
      <button className="toast-button" onClick={() => notify({
        type: "error",
        message: "This is an error message!",
        duration: 5000,
        animation: "pop"
      })}>Error</button>
      <button className="toast-button" onClick={() => notify({
        type: "info",
        message: "This is an info message!",
        duration: 5000,
        animation: "fade"
      })}>Info</button>
      <button className="toast-button" onClick={() => notify({
        type: "warning",
        message: "This is a warning message!",
        duration: 5000,
        animation: "slide"
      })}>Warning</button>

      {NotificationComponent}
    </section>
  </main>
}

export default App