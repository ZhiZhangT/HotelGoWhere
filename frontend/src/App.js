import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
<<<<<<< Updated upstream
import Home from "./pages/home/Home";
import Hotels from "./pages/hotel/Hotels";
import Booking from "./pages/booking/Booking";
import Hotel from "./pages/hotel/Hotel";
import Register from "./pages/proxy/Register";
import Login from "./pages/proxy/Login";
=======
import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import Booking from "./pages/Booking";
import Hotel from "./pages/Hotel";
import Register from "./pages/Register";
import Login from "./pages/Login";
>>>>>>> Stashed changes


function App() {
  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<Home/>}/>
        <Route path="/hotels" element={<Hotels/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
        <Route path="/booking" element={<Booking/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/Login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}


export default App;