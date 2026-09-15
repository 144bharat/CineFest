import Body from "./components/Body";
import { Provider } from "react-redux";

import appStore from "./utils/appStore";
import { Toaster } from 'react-hot-toast';


const App = () => {
  return (
    
        <Provider store={appStore}>
          <Toaster
            position="top-center"
            toastOptions={{
            duration: 5000,
            }}
          />
          <Body />
        </Provider>
  )
}

export default App;