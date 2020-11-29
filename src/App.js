import React,{useEffect, useState} from 'react';
import axios from 'axios'
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import Home from './Home/Home'
import Events from './Events/Events'
import './App.css';
import Footer from './Footer'

function App() {
  const [page,setPage]=useState('Home')
  const [loggedin,setLoggedIn]=useState(false)
  const [data,setData]=useState({eventsRegistered:[]})
  const [token,setToken]=useState({})
  const [eventsList, setEventsList] = useState(null);

  function dataSetter(val){
    sessionStorage.setItem('data',JSON.stringify(val))
    setData(val)
  }
  function eventsRefresh(){
    axios.get('https://thepc-one.herokuapp.com/api/allEvents')
    .then((response) => {
        console.log(response.data)
        setEventsList(response.data)
    }, (error) => {
        console.log(error)
    })
}

  function pageSetter(val){
    setPage(val)
    sessionStorage.setItem('page',val)
  }

  function logoutHandler(val){
    setLoggedIn(val)
    setPage('Home')
    setData({eventsRegistered:[]})
    setToken({})
    sessionStorage.clear()
  }

  function loginStateHandler(val,data){
    const login=val 
    setLoggedIn(login) 
    setData(data) 
    setToken(data.tokens[data.tokens.length-1])
    sessionStorage.setItem('data',JSON.stringify(data))
  }

  function refreshLogin(){
    if (sessionStorage.getItem('data')){
    loginStateHandler(true,JSON.parse(sessionStorage.getItem('data')))
    if (sessionStorage.getItem('page'))
    pageSetter(sessionStorage.getItem('page'))
    else
    pageSetter('Home')  
  }}
 
  return (
    <div className="app" onLoad={refreshLogin}>
      {page=='Home'?<Home pageSetter={pageSetter}  data={data} setData={dataSetter} eventsList={eventsList} setEventsList={setEventsList} token={token} loggedin={loggedin} loginStateHandler={loginStateHandler} logoutHandler={logoutHandler} />:<></>}
      {(page=='Events')&&(loggedin)?<Events pageSetter={pageSetter} userData={data} logoutHandler={logoutHandler} eventsList={eventsList} setEventsList={setEventsList} eventsRefresh={eventsRefresh}/>:<></>}
      <Footer />
    </div>
  );
}

export default App