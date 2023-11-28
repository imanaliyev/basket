import { useEffect, useState } from "react";

function useLocalStorage(key = "localData", initalValue = "") {
  const [localData, setLocalData] = useState(
    localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key))
      : initalValue
  );

  function changeLocalData(val) {
    setLocalData(val);
  }
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(localData));
  }, [localData, key]);

  return [localData,changeLocalData];
}

export default useLocalStorage;