import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

//stylesheets
import "./Cust.css";

import { API_URL } from "../../config.ts"

const Cust: React.FC = () => {
    const [formstatus, setFormStatus] = useState<boolean | null>(null);
    const [custstatus, setCustStatus] = useState<boolean | null>(null);

    const [id, setID] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [age, setAge] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [mobile, setMobile] = useState<string>("");

    const handleID = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setID(value);
        if (value.length === 12) {
            axios
                .post(`${API_URL}/checkcust`, { pharmid: value })
                .then((res) => {
                    if (res.data.status) {
                        toast.success("Customer is in the Database");
                        setFormStatus(true);
                    } else {
                        toast.error("Customer is not in the Database");
                        setFormStatus(false);
                    }
                })
                .catch((e) => {
                    console.log(e);
                    toast.error("Error checking customer");
                    setFormStatus(false);
                });
        }
    };

    const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleAge = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAge(e.target.value);
    };

    const handleGender = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setGender(e.target.value);
    };

    const handleAddress = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setAddress(e.target.value);
    };

    const handleMobile = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMobile(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            id,
            name,
            age: Number(age),
            gender,
            address,
            mobile,
        };
        if (formstatus === false) {
            axios
                .post(`${API_URL}/addcust`, { data })
                .then((res) => {
                    setCustStatus(res.data.status);
                })
                .catch((e) => {
                    console.log(e);
                });
        } else if (formstatus === true) {
            setCustStatus(true);
        }
    };

    useEffect(() => {
        if (custstatus) {
            toast.success(`Selling to Customer ID: ${id}`);
        }
    });

    const formChange = () => {
        if (formstatus === false) {
            return (
                <form className="custform" action="" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        onChange={handleID}
                        placeholder="Enter Aadhar Number"
                        maxLength={12}
                        className="inputs"
                        required
                        value={id}
                    />
                    <input
                        id="custname"
                        type="text"
                        name="custname"
                        maxLength={50}
                        placeholder="Enter Name"
                        className="inputs"
                        required
                        onChange={handleName}
                        value={name}
                    />
                    <input
                        type="number"
                        name="custage"
                        id="custage"
                        placeholder="Enter Age"
                        className="inputs"
                        required
                        onChange={handleAge}
                        value={age}
                    />
                    <label htmlFor="custgender">Select Gender</label>
                    <select
                        name="custgender"
                        id="custgender"
                        className="inputs"
                        required
                        onChange={handleGender}
                        value={gender}
                    >
                        <option value="null">-- Select Gender --</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="O">Other</option>
                    </select>
                    <textarea
                        name="custaddress"
                        id="custaddress"
                        cols={30}
                        rows={10}
                        maxLength={250}
                        className="inputs"
                        placeholder="Enter Address"
                        required
                        onChange={handleAddress}
                        value={address}
                    ></textarea>
                    <input
                        id="custmobile"
                        type="tel"
                        name="custmobile"
                        className="inputs"
                        placeholder="Enter mobile number"
                        maxLength={12}
                        required
                        onChange={handleMobile}
                        value={mobile}
                    />
                    <button type="submit" className="custbtn">
                        Continue
                    </button>
                </form>
            );
        } else {
            return (
                <form className="custform" action="" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        onChange={handleID}
                        placeholder="Enter Aadhar Number"
                        maxLength={12}
                        className="inputs"
                        required
                        value={id}
                    />
                    <button type="submit" className="custbtn">
                        Continue
                    </button>
                </form>
            );
        }
    };

    if (custstatus) {
        return <Navigate to={`/sell/${id}`} />;
    } else {
        return (
            <div className="cust">
                <h1>Select Customer</h1>
                {formChange()}
            </div>
        );
    }
};

export default Cust;
