import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

//stylesheets
import "./Home.css";

interface HomeProps {
    pharmdata: {
        id: string;
        // add other properties if needed
    };
}

const Home: React.FC<HomeProps> = (props) => {
    const [sales, setSales] = useState<number>(0);

    useEffect(() => {
        const date = new Date().toISOString().slice(0, 10);
        axios
            .post("http://localhost:5000/getsales", {
                id: props.pharmdata.id,
                date,
            })
            .then((res) => {
                let total = 0;
                for (let r of res.data.results) {
                    total = total + r.Med_price;
                }
                setSales(total);
            })
            .catch((e) => {
                console.log(e);
            });
    }, [sales, props]);

    return (
        <div className="home">
            <Link to="sell" style={{ cursor: "default" }}>
                <button className="salebtn">S E L L</button>
            </Link>
            <div className="salesdata">
                <h1>
                    <u>SALES DATA</u>
                </h1>
                <div className="data">
                    <h1>Revenue Today: {sales}</h1>
                </div>
            </div>
        </div>
    );
};

export default Home;