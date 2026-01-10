import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import axios from "axios";
import { API_URL } from "../../App.tsx"

//stylesheets
import "./Account.css";

interface AccountProps {
    pharmdata: {
        id: string;
        // add other properties if needed
    };
}

interface PharmacistData {
    Pharm_id: string;
    User_name: string;
    Pharm_name: string;
    Pharm_email: string;
    Pharm_address: string;
    Pharm_mobile: string;
    Pharm_gender: string;
}

const Account: React.FC<AccountProps> = (props) => {
    const [data, setData] = useState<PharmacistData | {}>({});
    const [update, setUpdate] = useState<boolean | null>(null);
    const [deleteacc, setDelete] = useState<boolean | null>(null);

    const logout = () => {
        Cookies.remove("jwt_token");
        toast.error("Logged Out!!!");
    };

    const deleteAcc = () => {
        axios
            .post(`${API_URL}/deleteaccount`, {
                id: props.pharmdata.id,
            })
            .then((res) => {
                if (res.data.status === true) {
                    toast.success("Account Deleted!!!");
                    logout();
                }
                setDelete(res.data.status);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const handleUpdate = () => {
        setUpdate(true);
    };

    useEffect(() => {
        axios
            .post(`${API_URL}/getaccount`, {
                id: props.pharmdata.id,
            })
            .then((res) => {
                setData(res.data.results[0]);
            })
            .catch((e) => {
                console.log(e);
            });
    }, [data, props]);

    if (update) {
        return <Navigate to="/update" />;
    } else if (deleteacc) {
        return <Navigate to="/login" />;
    } else {
        return (
            <div className="account" style={{ cursor: "default" }}>
                <h1>Account</h1>
                <div className="accdata">
                    <h2>
                        <u>ID:</u> {(data as PharmacistData).Pharm_id}
                    </h2>
                    <h2>
                        <u>Username:</u> {(data as PharmacistData).User_name}
                    </h2>
                    <h2>
                        <u>Name:</u> {(data as PharmacistData).Pharm_name}
                    </h2>
                    <h2>
                        <u>Email:</u> {(data as PharmacistData).Pharm_email}
                    </h2>
                    <h2>
                        <u>Address:</u> {(data as PharmacistData).Pharm_address}
                    </h2>
                    <h2>
                        <u>Mobile No.:</u> {(data as PharmacistData).Pharm_mobile}
                    </h2>
                    <h2>
                        <u>Gender:</u> {(data as PharmacistData).Pharm_gender}
                    </h2>
                    <button className="updatebtn" onClick={handleUpdate}>
                        Edit
                    </button>
                </div>
                <button className="logoutbtn" onClick={logout}>
                    Logout
                </button>
                <button className="deletebtn" onClick={deleteAcc}>
                    Delete Account
                </button>
            </div>
        );
    }
};

export default Account;
