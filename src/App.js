
import React from "react";
import Nav from "./component/NavBar2";
import Routcomponent from './component/Routcomponent'
import { BrowserRouter} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <>
    <BrowserRouter>
    <Nav/>
    <div  className=" mt-[64px]">
      <ToastContainer/>
    <Routcomponent/> 
    </div>
    </BrowserRouter>
   
    </>
  );
}

export default App;
