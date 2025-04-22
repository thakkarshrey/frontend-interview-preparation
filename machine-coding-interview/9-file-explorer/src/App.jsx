import { useCallback, useState } from "react";
import FileExplorer from "./components/FileExplorer";
import { file_explorer_data } from "./data/fileExplorerData";

export default function App() {
  const [input, setInput] = useState('')
  const [explorerData, setExplorerData] = useState(file_explorer_data)

  const addFileFolder = (tree, folderId, isFolder, name) => {
    if (tree.id === folderId && tree.isFolder) {
      return {
        ...tree,
        items: [
          {
            id: new Date(),
            name,
            isFolder,
            items: []
          },
          ...tree.items
        ]
      }
    }

    if (!tree.items) return tree

    return {
      ...tree,
      items: tree.items.map((element) => {
        return addFileFolder(element, folderId, isFolder, name)
      })
    }
  }

  const onAddFileOrFolder = useCallback((folderId, isFolder, name) => {
    setExplorerData((prevValue) => {
      return addFileFolder(prevValue, folderId, isFolder, name)
    })
  },[explorerData])

  return <>
  <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
  <FileExplorer explorer={explorerData} onAddFileOrFolder={onAddFileOrFolder} />
  </>
}