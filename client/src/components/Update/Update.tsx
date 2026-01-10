import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

//stylesheets
import "./Update.css";

interface UpdateProps {
    pharmdata: {
        id: string;
        // add other properties if needed
    };
}

const Update: React.FC<UpdateProps> = (props) => {
    const [id, setID] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [mobile, setMobile] = useState<string>("");
    const [username, setUserName] = useState<string>("");
    const [pass, setPass] = useState<string>("");

    const [status, setStatus] = useState<boolean | null>(null);

    const handleID = (e: React.ChangeEvent<HTMLInputElement>) => {
        setID(e.target.value);
    };

    const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleGender = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setGender(e.target.value);
    };

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleAddress = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setAddress(e.target.value);
    };

    const handleMobile = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMobile(e.target.value);
    };

    const handleUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
    };

    const handlePass = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPass(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            Pharm_id: props.pharmdata.id,
            id,
            name,
            gender,
            email,
            address,
            mobile,
            username,
            pass,
        };

        axios
            .post("http://localhost:5000/updateaccount", { data })
            .then((res) => {
                if (res.data.status) {
                    toast.success("Updated Successfully!!!");
                    setStatus(true);
                } else {
                    toast.error("Update Failed!!!");
                }
            })
            .catch((_e) => {
                toast.error("Update Failed!!!");
            });
    };

    if (status) {
        return <Navigate to="/account" />;
    } else {
        return (
            <div className="update">
                <h1>Update Account Details</h1>
                <form className="upform" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="pharm_id"
                        id="pharmid"
                        className="inputs"
                        maxLength={12}
                        placeholder="Enter Aadhar Number"
                        required
                        onChange={handleID}
                    />
                    <input
                        type="text"
                        name="pharm_name"
                        id="pharmname"
                        className="inputs"
                        maxLength={50}
                        placeholder="Enter Name"
                        required
                        onChange={handleName}
                    />
                    <select
                        id="pharmgender"
                        name="pharm_gender"
                        className="inputs"
                        onChange={handleGender}
                        required
                    >
                        <option value="null">-- Select Gender --</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="O">Other</option>
                    </select>
                    <input
                        id="pharmemail"
                        type="text"
                        name="pharm_email"
                        maxLength={50}
                        className="inputs"
                        placeholder="Enter Email"
                        required
                        onChange={handleEmail}
                    />
                    <textarea
                        name="pharm_address"
                        id="pharmaddress"
                        cols={30}
                        rows={10}
                        className="inputs"
                        maxLength={250}
                        placeholder="Enter Address"
                        required
                        onChange={handleAddress}
                    ></textarea>
                    <input
                        type="tel"
                        name="pharm_mobile"
                        id="pharmmobile"
                        className="inputs"
                        maxLength={12}
                        placeholder="Enter Mobile Number"
                        required
                        onChange={handleMobile}
                    />
                    <input
                        type="text"
                        name="user_name"
                        id="username"
                        className="inputs"
                        maxLength={20}
                        placeholder="Set Username"
                        required
                        onChange={handleUserName}
                    />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className="inputs"
                        maxLength={20}
                        placeholder="Set Password"
                        required
                        onChange={handlePass}
                    />
                    <button type="submit" className="upbtn">
                        Update
                    </button>
                </form>
            </div>
        );
    }
};

export default Update;