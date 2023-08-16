import React, {useEffect, useState} from 'react';
import axios from "axios";

const UseUser = () => {
    const [userData, setUserData]: any = useState({firstName: '', lastName: '', email: '', phone: '', about: '', image: ''});

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = JSON.parse(localStorage.getItem("access_token"));
                if (token) {
                    const response = await axios.post(`http://localhost:4000/api/v1/auth/user`, { token });
                    if (response.status === 200) {
                        setUserData(response.data);
                    } else {
                        console.error("Request was successful but received an unexpected response:", response);
                    }
                } else {
                    console.warn("No access token found.");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    return [userData, setUserData];
};

export default UseUser;