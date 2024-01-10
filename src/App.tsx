import { useEffect, useState } from "react";
import AddSuburbForm from "./components/AddSuburbForm/AddSuburbForm";
import { getAllSuburbs } from "./services/suburbs";
import SuburbList from "./container/SuburbList/SuburbList";
import Suburb from "./models/suburb";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [suburbs, setSuburbs] = useState<Array<Suburb>>([]);
  const [added, setAdded] = useState<number>(0);

  useEffect(() => {
    getAllSuburbs().then((suburbs) => {
      setSuburbs(suburbs);
    });
  }, [added]);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route 
          path="/"
          element={
            <AddSuburbForm 
            setAdded={setAdded}
            added={added}
            />
          }
        />
        <Route
          path="/suburbs-list"
          element={
            <SuburbList 
            suburbs={suburbs}
          />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
