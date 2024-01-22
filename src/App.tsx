import { useEffect, useState } from "react";
import AddSuburbForm from "./components/AddSuburbForm/AddSuburbForm";
import { getAllSuburbs, getSuburbsByName, getSuburbsByPostcode } from "./services/suburbs";
import SuburbList from "./container/SuburbList/SuburbList";
import Suburb from "./models/suburb";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/Login/Login";

function App() {
  const [suburbs, setSuburbs] = useState<Array<Suburb>>([]);
  const [suburbsLoading, setSuburbsLoading] = useState<boolean>(true);
  const [added, setAdded] = useState<number>(0);
  const [showDataWhenLoggedIn, setShowDataWhenLoggedIn] = useState<number>(0);
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

      setSuburbsLoading(false);
    })()

  }, [added, showDataWhenLoggedIn, nameQuery]);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <Login
            showDataWhenLoggedIn={showDataWhenLoggedIn}
            setShowDataWhenLoggedIn={setShowDataWhenLoggedIn}
            />
          }
        />
        <Route 
          path="/add-suburb"
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
            suburbsLoading ?
             (<div className="flex flex-col w-full mt-6 items-center"><p className="text-3xl text-white">Loading Suburbs...</p></div>)
             : 
              <SuburbList 
                setNameQuery={setNameQuery}
                suburbs={suburbs}
                setAdded={setAdded}
                added={added}
              />
          }
        />
      </Routes>
      <ToastContainer 
        position="bottom-right"
      />
    </BrowserRouter>
  )
}

export default App
