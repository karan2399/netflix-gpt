import "./App.css";
import Body from "./components/Body";
import { Provider } from "react-redux";
import appStore from "./utils/store/appStore";

function App() {
  return (
    <main className="min-h-screen bg-[#050505] font-sans text-white antialiased">
      <Provider store={appStore}>
        <Body />
      </Provider>
    </main>
  );
}

export default App;
