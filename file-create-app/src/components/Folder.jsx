/** @format */

import React, { useState } from "react";
import { FaFile, FaFolder } from "react-icons/fa";

const Folder = ({ explorerdata, handleInsertNode = () => {} }) => {
  const [expand, setexpand] = useState(false);
  const [showinput, setshowinput] = useState({
    visible: false,
    isFolder: null,
  });
  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setexpand(true);
    setshowinput({
      visible: true,
      isFolder,
    });
  };

  const addNewFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorerdata.id, e.target.value, showinput.isFolder);
      setshowinput({ ...showinput, visible: false });
    }
  };

  // conditions implemented
  if (explorerdata.isFolder) {
    return (
      <div style={{ marginTop: 8 }}>
        <span className='folder__main' onClick={() => setexpand(!expand)}>
          <FaFolder color='yellow' /> {explorerdata.name}
          <div>
            <button onClick={(e) => handleNewFolder(e, true)}>
              add folder
            </button>
            <button
              onClick={(e) => handleNewFolder(e, false)}
              style={{ marginLeft: 5 }}>
              add file
            </button>
          </div>
        </span>
        <div style={{ marginLeft: 25, display: expand ? "block" : "none" }}>
          {showinput.visible && (
            <>
              <div className='input_container'>
                <span>
                  {showinput.isFolder ? (
                    <FaFolder color='yellow' />
                  ) : (
                    <FaFile color='cyan' />
                  )}
                </span>
                <input
                  onKeyDown={addNewFolder}
                  type='text'
                  autoFocus
                  onBlur={() => setshowinput({ ...showinput, visible: false })}
                />
              </div>
            </>
          )}
        </div>
        <div style={{ marginLeft: 25, display: expand ? "block" : "none" }}>
          {explorerdata.items.map((item) => {
            return <Folder key={item.id} explorerdata={item} />;
          })}
        </div>
      </div>
    );
  } else {
    return (
      <span
        className='file'
        style={{ display: "block", paddingTop: 3, paddingBottom: 3 }}>
        <FaFile color='cyan' /> {explorerdata.name}
      </span>
    );
  }
};

export default Folder;
