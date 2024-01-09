import { useEffect, useState } from "react";
import AddSuburbForm from "./components/AddSuburbForm/AddSuburbForm";
import { getAllSuburbs } from "./services/suburbs";
import SuburbList from "./container/SuburbList/SuburbList";
import Suburb from "./models/suburb";


function App() {
  const [suburbs, setSuburbs] = useState<Array<Suburb>>([]);
  const [added, setAdded] = useState<number>(0);

  useEffect(() => {
    getAllSuburbs().then((suburbs) => {
      setSuburbs(suburbs);
    });
  }, [added]);

  return (
    <>
      <h1>Postcode Search</h1>
      <AddSuburbForm 
        setAdded={setAdded}
        added={added}
      />
      <SuburbList 
        suburbs={suburbs}
      />
    </>
  )
}

export default App
