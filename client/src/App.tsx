import { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";

//components
import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";
import Cust from "./components/Cust/Cust";
import Account from "./components/Account/Account";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Sell from "./components/Sell/Sell";
import Update from "./components/Update/Update";

//stylesheets
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { API_URL } from "./config.ts"

function App() {
    const [auth, setAuth] = useState<boolean>(false);
    const [pharmdata, setPharmData] = useState<any>({});

    useEffect(() => {
        try {
            const token = Cookies.get("jwt_token");
            axios
                .post(`${API_URL}/auth`, { token })
                .then((res) => {
					if(res.data.status){
                    	setAuth(true);
                    	setPharmData(res.data.pharmdata?.data || {});
						window.location.href = "/";
					}else {
						setAuth(false);
					}
                })
                .catch((e) => {
                    console.log(e);
					setAuth(false);
                });
        } catch (e) {
            console.log(e);
        }
    }, []);

    return (
        <Router>
            <Nav />
            <div className="App">
            </div>

            <Routes>
                <Route
                    path="/"
                    element={
                        auth ? (
                            <Home pharmdata={pharmdata} />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
                <Route
                    path="/sell"
                    element={auth ? <Cust /> : <Navigate to="/login" />}
                />
                <Route
                    path="/sell/:id"
                    element={
                        auth ? (
                            <Sell pharmdata={pharmdata} />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
                <Route
                    path="/account"
                    element={
                        auth ? (
                            <Account pharmdata={pharmdata} />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
                <Route
                    path="/update"
                    element={
                        auth ? (
                            <Update pharmdata={pharmdata} />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
                <Route
                    path="/login"
                    element={auth ? <Navigate to="/" /> : <Login />}
                />
                <Route path="/register" element={<Register />} />
            </Routes>
            <ToastContainer />
        </Router>
    );
}

export default App;
