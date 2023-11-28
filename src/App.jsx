import { useEffect, useState } from "react";
import useLocalStorage from "./hook/useLocalStorage";




function App() {
  const [data, setData] = useState([])
  const [basketInfo , setBasketInfo] = useState(localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")):null)
  const [count, setCount] = useLocalStorage(0)

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(basketInfo));
  }, [basketInfo]);
  

  const getFetch =()=>{
    fetch("https://northwind.vercel.app/api/products")
    .then(res => res.json())
    .then(data=>{
      setData(data)
   
    

    })
  }
  getFetch()
  
  
const addBasket=(item)=>{
  setBasketInfo([...basketInfo,item])
  setCount(parseInt(count)+1)
}
  

  return (
    <div className="App">
      <h1>My basket</h1>
      <div className="basket">
        <h1>basket</h1>
        {basketInfo.map((item)=>(
          <ul>
            <li>{item.id}</li>
            <li>{item.name}</li>
            <div>count : {count}</div>
          </ul>
        ))}
      </div>
      
      {data.map(x=><ul key={x.id}>
        <li>{x.id}</li>
        <li>{x.name}</li>
        <button onClick={()=>addBasket(x)}>add to basket</button>
       
      </ul>)}

      
      
      
     
    </div>
  )
  };


export default App;
