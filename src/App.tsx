import { useEffect, useState } from "react";
import AddSuburbForm from "./components/AddSuburbForm/AddSuburbForm";
import { getAllSuburbs, getSuburbsByName, getSuburbsByPostcode } from "./services/suburbs";
import SuburbList from "./container/SuburbList/SuburbList";
import Suburb from "./models/suburb";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [suburbs, setSuburbs] = useState<Array<Suburb>>([]);
  const [added, setAdded] = useState<number>(0);
  const [nameQuery, setNameQuery] = useState<string>("");

  useEffect(() => {
    (async () => {
      if(nameQuery === "") {
        const suburbs = await getAllSuburbs();
        setSuburbs(suburbs);
      } else {
        const suburbResults = await Promise.all([
          getSuburbsByName(nameQuery),
          getSuburbsByPostcode(nameQuery)
        ]);
        setSuburbs([
          ...suburbResults[0], 
          ...suburbResults[1],
        ])
      }
    })()

  }, [added, nameQuery]);

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
            setNameQuery={setNameQuery}
            suburbs={suburbs}
            setAdded={setAdded}
            added={added}
          />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
