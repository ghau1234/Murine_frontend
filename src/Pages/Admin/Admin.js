import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import "./Admin.css";

const Admin = () => {
    const [timer, setTimer] = useState('');
    const [murinePrice, setMurinePrice] = useState('');
    const [murineHead, setMurineHead] = useState('');
    const [storageUsed, setStorageUsed] = useState('');
    const [storageTotal, setStorageTotal] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchSettings();
        fetchUsers();

    }, []);

    const fetchSettings = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/admin/settings`);
            const settingsData = response.data;
debugger;
            // Convert the timer to ISO 8601 date string if needed
            const formattedTimer = new Date(settingsData.timer).toISOString().split('T')[0];

            // Update state with fetched settings
            setTimer(formattedTimer);
            setMurinePrice(settingsData.murinePrice);
            setMurineHead(settingsData.murineHead);
            setStorageUsed(settingsData.storageUsed);
            setStorageTotal(settingsData.storageTotal);
        } catch (error) {
            console.error('Failed to fetch settings:', error);
        }
    };
    const fetchUsers = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/auth/admin/userslist`);
            setUsers(response.data);
        } catch (error) {
            console.error('Failed to fetch users:', error);
            toast.error("Failed to load users. Please try again later.");
        }
    };


    const handleSettingsSubmit = async () => {
        try {
            const response = await axios.post(`http://localhost:3001/admin/settings`, {
                timer,
                murinePrice,
                murineHead,
                storageUsed,
                storageTotal
            });

            if (response.status == 200) {
                toast.success("Settings updated Successfully.");
                console.log('Settings updated successfully:', response.data);
                alert("'Settings updated successfully:")
            }


        } catch (error) {
            console.error('Failed to update settings:', error);
            toast.error(error)
        }
    };

    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

    return (
        <div >
            <h1 className='headingBox'>Murine Admin Settings</h1>
            <div className='admin'>
                {/* <h1 className='admin-title'>Murine Admin Settings</h1> */}
                <div className='form-group'>
                    <label htmlFor="timer">Timer</label>
                    <input
                        type="date"
                        id="timer"
                        value={timer}
                        min={today} // Set the minimum date to today's date
                        onChange={(e) => setTimer(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="murinePrice">MURINE Price</label>
                    <input
                        type="number"
                        id="murinePrice"
                        value={murinePrice}
                        onChange={(e) => setMurinePrice(parseFloat(e.target.value))}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="murineHead">Title</label>
                    <input
                        type="text"
                        id="murineHead"
                        value={murineHead}
                        onChange={(e) => setMurineHead(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="storageUsed">USED STORAGE</label>
                    <input
                        type="number"
                        id="storageUsed"
                        value={storageUsed}
                        onChange={(e) => setStorageUsed(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="storageTotal">TOTAL STORAGE</label>
                    <input
                        type="number"
                        id="storageTotal"
                        value={storageTotal}
                        onChange={(e) => setStorageTotal(e.target.value)}
                    />
                </div>
                <button onClick={handleSettingsSubmit} className='update-button'>Update Settings</button>
            </div>
            <h1 className='headingBox'>Murine Users</h1>
            <div className="userlist">
                <table>
                    <thead>
                        <tr>
                            <th>S.N0</th>
                            <th>User ID</th>
                            <th>Email</th>
                            <th>Wallet ID</th>
                            <th>Role</th>
                            <th>Referral ID</th>
                            <th>Coin Count</th>
                            <th>Own Referral ID</th>
                            <th>Screenshot</th>
                        </tr>
                    </thead>
                
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}> {/* Use index as unique key */}
                            <td>{index+1}</td>
                                <td>{user.user.userID}</td>
                                <td>{user.user.email}</td>
                                <td>{user.user.walletId}</td>
                                <td>{user.user.role}</td>
                                <td>{user.user.referralID}</td>
                                <td>{user.user.coinCount}</td>
                                <td>{user.user.ownReferralID}</td>
                                <td>
                                    {user.files.length > 0 ? (
                                        user.files.map((file, idx) => (
                                            <img key={idx} src={`data:${file.contentType};base64,${file.data}`} alt={`Screenshot ${idx}`} className="user-img" />
                                        ))
                                    ) : (
                                        <span>No screenshots</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Admin;
