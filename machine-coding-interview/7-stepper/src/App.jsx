import "./App.css";
import Stepper from "./components/Stepper";

function App() {
  const CONFIG_DATA = [
    {
      id: 1,
      name: "Personal Info",
      Component: () => <div>Personal Info</div>,
    },
    {
      id: 2,
      name: "Education",
      Component: () => <div>Education</div>,
    },
    {
      id: 3,
      name: "Work And Jobs",
      Component: () => <div>Work And Jobs</div>,
    },
    {
      id: 4,
      name: "Add to cart",
      Component: () => <div>This is the add to cart component</div>,
    },
    {
      id: 5,
      name: "Another random",
      Component: () => <div>Another random component</div>,
    },
    {
      id: 6,
      name: "Another random 01",
      Component: () => <div>Another random component 01</div>,
    },
    {
      id: 7,
      name: "Another random 01",
      Component: () => <div>Another random component 01</div>,
    },
    {
      id: 8,
      name: "Another random 01",
      Component: () => <div>Another random component 01</div>,
    },
    {
      id: 9,
      name: "Another random 01",
      Component: () => <div>Another random component 01</div>,
    },
    {
      id: 10,
      name: "Another random 01",
      Component: () => <div>Another random component 01</div>,
    },
  ];
  return (
    <div className="App">
      <Stepper data={CONFIG_DATA} />
    </div>
  );
}

export default App;
