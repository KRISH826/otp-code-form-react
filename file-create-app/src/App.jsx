/** @format */
import { useState } from "react";
import "./App.css";
import explorer from "./data/FolderData";
import Folder from "./components/Folder";
import useTree from "./hooks/useTree";

function App() {
  const [explorerdata, setexplorerData] = useState(explorer);
  const { insertNode } = useTree();
  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode({ explorerdata, folderId, item, isFolder });
    setexplorerData(finalTree);
  };
  return (
    <>
      <h1>FILE EXPLORER APP</h1>
      <Folder explorerdata={explorerdata} handleInsertNode={handleInsertNode} />
    </>
  );
}

export default App;
