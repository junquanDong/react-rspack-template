
import React, { useEffect } from "react";

const Home = ({ dispatch, useSelector, ...props }: WithPageProps) => {
  
  const value = useSelector((state) => state.counter.value)
  

  useEffect(() => {
    
  }, [])

  return (
    <div>
      <h1>Home</h1>
      <h3>{value}</h3>
      <button onClick={() => dispatch({ type: 'counter/increment' })}>+1</button>
      <button onClick={() => dispatch({ type: 'counter/decrement' })}>-1</button>
      <button onClick={() => dispatch({ type: 'counter/incrementByAmount', payload: 10 })}>+10</button>

      <button onClick={() => props.navigate('/about')}>GOTO About</button>
      <button onClick={() => {
        props.setLoading(true)
        setTimeout(() => {
          props.setLoading(false)
        }, 3000)
      }}>loading 3s</button>
      <button onClick={() => {
        dispatch({ type: 'user/logout' });
      }}>logout</button>
    </div>
  )
}
export default Home