'use client'
import {useRouter} from "next/navigation";
import Link from "next/link";
import axios from "axios";
import {toast} from "react-toastify";
import {useEffect, useState} from "react";

export default function Registration() {
    const router:any = useRouter();
    const [apiResponse, setApiResponse]: any = useState({ status: null, data: { data: { access_token: null } } })

    useEffect(() => {
        if(apiResponse.status == 201){
            router.push('/login');
        }
    }, [apiResponse]);

    const handleSubmit = async (e): any => {
        e.preventDefault();

        const data = {
            firstName: e.target.first.value,
            lastName: e.target.last.value,
            email: e.target.email.value,
            password: e.target.password.value,
        }

        try {
            const response: any = await axios.post(`http://localhost:4000/api/v1/auth/register`, data);
            console.log("Resss",response);

            if(response.status === 201) {
                toast.success(`Registration successful`, {
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
        }catch (err) {
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
                            Sign Up
                        </h2>
                    </div>
                    <form action="" onSubmit={handleSubmit}>
                        <input type="text" placeholder="First Name" name="first" className="w-full border mb-5 p-2 rounded-md active:outline-none" />
                        <input type="text" placeholder="Last Name" name="last" className="w-full border mb-5 p-2 rounded-md active:outline-none" />
                        <input type="email" placeholder="Email" name="email" className="w-full border mb-5 p-2 rounded-md active:outline-none" />
                        <input type="password" placeholder="Password" name="password" className="w-full border  p-2 rounded-md active:outline-none" />
                        <button type={"submit"} className="my-5 w-full bg-[#BAB6EB] p-2 rounded-md font-medium" >Sign Up</button>
                        <p className='text-center'>Already have an account? <Link className="uppercase text-sm ml-2 font-semibold text-[#BAB6EB] underline" href='/registration'>Sign In</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}