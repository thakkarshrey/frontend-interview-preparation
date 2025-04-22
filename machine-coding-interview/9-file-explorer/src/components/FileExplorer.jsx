import React, { useState } from "react"
import "./FileExplorer.css"

const FileExplorer = React.memo(({ explorer, onAddFileOrFolder }) => {
    console.log('rendering file explorer')
    const [showFiles, setShowFiles] = useState(false)
    const [showInput, setShowInput] = useState({
        visibility: false,
        isFolder: false
    })

    const handleClickFileFolder = (e, isFolder) => {
        e.stopPropagation();
        setShowInput({ visibility : true, isFolder})
        setShowFiles(true)
    }

    const handleKeyDown = (e) => {
        if(e.keyCode === 13 && e.target.value){
            onAddFileOrFolder(explorer.id, showInput.isFolder, e.target.value)
            setShowInput(prevValue => ({...prevValue, visibility:false}))
        }
    }


    if (explorer.isFolder) {
        return (
            <>
                <div className="file-explorer">
                    <div className="file-explorer__parent" onClick={() => {
                        setShowFiles(prevValue => !prevValue)
                    }}>
                        <span className="file-explorer__folder">📁 {explorer.name}</span>
                        <div className="file-explorer__actions">
                            <button onClick={(e) => handleClickFileFolder(e, true)}>Folder +</button>
                            <button onClick={(e) => handleClickFileFolder(e, false)}>File +</button>
                        </div>
                    </div>
                    {
                        showInput.visibility &&
                        <div className="file-explorer__parent">
                            {showInput.isFolder ? "📁" : "📑" }{" "}
                            <input type="text" onKeyDown={(e) => handleKeyDown(e)} autoFocus onBlur={() => setShowInput(prevValue => ({...prevValue, visibility:false}))}/>
                        </div>
                    }
                    <div className="file-explorer__child" style={{ display: showFiles ? "block" : "none", marginLeft: '25px' }}>
                        {
                            explorer?.items?.map((element) => {
                                return <FileExplorer explorer={element} key={element.id} onAddFileOrFolder={onAddFileOrFolder}/>
                            })
                        }
                    </div>
                </div>
            </>
        )
    }
    else {
        return (
            <div className="file-explorer__parent" data-file="true">
                <span className="file-explorer__file">📑 {explorer.name}</span>
            </div>
        )
    }
})

export default FileExplorer