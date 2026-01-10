import React, { useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

//stylesheets
import "./Sell.css";

interface SellProps {
    pharmdata: {
        id: string;
        // add other properties if needed
    };
}

const Sell: React.FC<SellProps> = (props) => {
    const location = useLocation();
    const path = location.pathname;
    const custid = path.substring(path.lastIndexOf("/") + 1, path.length);

    const [medname, setMedName] = useState<string>("");
    const [ppu, setPpu] = useState<string>("");
    const [quantity, setQuantity] = useState<string>("");
    const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);

    const [status, setStatus] = useState<boolean | null>(null);

    const handleMedName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMedName(e.target.value);
    };

    const handlePpu = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPpu(e.target.value);
    };

    const handleQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(e.target.value);
    };

    const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        setDate(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const pharmid = props.pharmdata.id;
        const medprice = Number(ppu) * Number(quantity);
        const data = { medname, medprice, date, pharmid, custid };
        axios
            .post("http://localhost:5000/addmed", { data })
            .then((res) => {
                if (res.data.status) {
                    toast.success("Medicine Sold Successfully!!!");
                    setStatus(true);
                } else {
                    toast.error("Failed to sell medicine!!!");
                }
            })
            .catch((_e) => {
                toast.error("Failed to sell medicine!!!");
            });
    };

    if (status) {
        return <Navigate to="/" />;
    } else {
        return (
            <div className="sell">
                <h1>Sell Medicine</h1>
                <form action="" className="sellform" onSubmit={handleSubmit}>
                    <input
                        id="medname"
                        type="text"
                        name="med_name"
                        placeholder="Enter Medicine Name"
                        maxLength={50}
                        className="inputs"
                        required
                        value={medname}
                        onChange={handleMedName}
                    />
                    <input
                        type="number"
                        name="med_price_per_unit"
                        id="medppu"
                        placeholder="Enter Price Per Unit"
                        className="inputs"
                        required
                        value={ppu}
                        onChange={handlePpu}
                    />
                    <input
                        type="number"
                        name="med_quantity"
                        id="medquantity"
                        placeholder="Enter Quantity"
                        className="inputs"
                        required
                        value={quantity}
                        onChange={handleQuantity}
                    />
                    <input
                        type="date"
                        name="purch_date"
                        id="purchdate"
                        placeholder="Enter Date"
                        className="inputs"
                        required
                        value={date}
                        onChange={handleDate}
                    />
                    <button type="submit" className="sellbtn">
                        Submit
                    </button>
                </form>
            </div>
        );
    }
};

export default Sell;