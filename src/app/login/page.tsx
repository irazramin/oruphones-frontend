'use client'
import {useRouter} from "next/navigation";
import Link from "next/link";
import axios from "axios";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";

export default function Login() {
    const router:any = useRouter();
    const [apiResponse, setApiResponse]: any = useState({ status: null, data: { data: { access_token: null } } })

    useEffect(() => {
        const storedAccessToken = localStorage.getItem("access_token");
        if (storedAccessToken !== null && storedAccessToken !== "") {
            router.push("/profile");
        }
    }, [])

    useEffect(() => {
       if(apiResponse.status == 200){
           localStorage.setItem("access_token", JSON.stringify(apiResponse.data.data.access_token));
           router.push('/profile');
       }
    }, [apiResponse]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            email: e.target.email.value,
            password: e.target.password.value,
        }

        try {
            const response = await axios.post(`http://localhost:4000/api/v1/auth/login`, data);

            if(response.status === 200) {
                toast.success(`Login successful`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });

                setApiResponse(response)
            }
        } catch (err) {
            toast.error(`${err.response?.data?.message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }

    return (
        <>
            <div className='flex items-center justify-center h-screen bg-gray-100'>
                <div className="w-96 shadow-xl bg-white  mb-[60px] p-[20px] rounded-lg">
                    <div className="card-body">
                        <div className='text-center mb-6 flex items-center justify-center'>
                            <h2 className="card-title text-center ">
                                Sign In
                            </h2>
                        </div>
                        <form action="" onSubmit={handleSubmit}>
                            <input type="email" placeholder="Email" name="email" className="w-full border mb-5 p-2 rounded-md active:outline-none" />
                            <input type="password" placeholder="Password" name="password" className="w-full border  p-2 rounded-md active:outline-none" />
                            <button type={"submit"} className="my-5 w-full bg-[#BAB6EB] p-2 rounded-md font-medium" >Sign In</button>
                            <p className='text-center'>Don't have an account? <Link className="uppercase text-sm ml-2 font-semibold text-[#BAB6EB] underline" href='/registration'>Sign Up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}