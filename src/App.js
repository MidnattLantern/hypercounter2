import ContextMenu from "./pages/contextMenu/ContextMenu";
import TermManager from "./pages/TermManager/TermManager";
import "./App.css";
import { useEffect, useState } from "react";

function App() {

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const checkScreenSize = () => {
    setIsSmallScreen(window.innerWidth > 1330);
  };

  useEffect(() => {
    checkScreenSize();

    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  return (<>
    <div className="AppContainer">
      <div className="Main">
        <TermManager />
      </div>

      {isSmallScreen ? (<>
        <div className="Context">
          <ContextMenu />
        </div>      
      </>) : (<>
      
      </>)}

    </div>
    </>);
}

export default App;
