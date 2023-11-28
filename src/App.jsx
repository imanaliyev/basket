import { useEffect, useState } from "react";
import useLocalStorage from "./hook/useLocalStorage";




function App() {
  const [data, setData] = useState([])
  const [basketInfo, setBasketInfo] = useState(localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [])
  

  useEffect(() => {
    getFetch()
    localStorage.setItem('items', JSON.stringify(basketInfo));
  }, [basketInfo]);


  const getFetch = () => {
    fetch("https://northwind.vercel.app/api/products")
      .then(res => res.json())
      .then(data => {
        setData(data)



      })
  }
  const remove = (id) => {


    setBasketInfo(basketInfo.filter((x) => x.id !== id))




  }



  const addBasket = (item) => {
    const elementIndex = basketInfo.findIndex((x) => x.id === item.id)
    console.log(elementIndex);
    if (elementIndex !== -1) {
      const newBasket = [...basketInfo]
      newBasket[elementIndex].count++
      setBasketInfo(newBasket)
    }
    else {
      setBasketInfo([...basketInfo, { ...item, count: 1 }])
    }




  }
  const setCountValue = (isAdd, item) => {
    const elementIndex = basketInfo.findIndex((x) => x.id === item.id)
    const newBasket = [...basketInfo]
    if (isAdd) {
      newBasket[elementIndex].count++
      setBasketInfo(newBasket)

    }
    else {
      if (newBasket[elementIndex].count > 0) {
        newBasket[elementIndex].count--
        setBasketInfo(newBasket)

      }


    }


  }



  return (
    <div className="App">
      <h1>My basket</h1>
      <div className="basket">
        <h1>basket</h1>
        {basketInfo.map((item) => (
          <ul>
            <li>{item.id}</li>
            <li>{item.name}</li>
            <div>count : {item.count}</div>
            <button onClick={() => setCountValue(false, item)}>-</button>
            <button onClick={() => setCountValue(true, item)}>+</button>
            <button onClick={() => remove(item.id, item.count)}>remove</button>
          </ul>
        ))}
      </div>

      {data.map(x => <ul key={x.id}>
        <li>{x.id}</li>
        <li>{x.name}</li>
        <button onClick={() => addBasket(x)}>add to basket</button>

      </ul>)}





    </div>
  )
};


export default App;
