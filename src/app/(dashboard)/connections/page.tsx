import React from 'react';

const Connections = () => {
    return (
        <div className="h-[calc(100vh-100px)] m-[20px] md:m-[40px]">
            <div className="h-[80px] bg-[#1E2875] w-full rounded-xl p-[40px] flex items-center">
                <p className="text-[24px] font-medium text-white">My Connections</p>
            </div>
            <div className="mt-[24px]">
                <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-[15px]">
                    <div
                        className="border border-black border-opacity-20 rounded-lg shadow p-[14px] bg-white ">
                       <div className="flex items-center justify-between gap-[10px]">
                           <div>
                               <h4 className="font-medium">Vishnu Swaroop</h4>
                               <div className="mt-[8px] text-[#49454FCC]">
                                   <p className="">Full stack developer</p>
                                   <p>@ Oruphones</p>
                               </div>
                           </div>
                           <div
                               className="bg-[#FFA78D] w-[130.889px] h-[130.889px] rounded-full flex justify-center items-center overflow-hidden">
                               <img className="w-[110.889px] h-[110.889px] mt-[10px]" src="/user.png" alt=""/>
                           </div>
                       </div>
                        <button className="bg-[#BAB6EB] px-[8px] py-[4px] rounded-2xl font-medium">Remove Connection</button>
                    </div>
                    <div
                        className="border border-black border-opacity-20 rounded-lg shadow p-[14px] bg-white ">
                        <div className="flex items-center justify-between gap-[10px]">
                            <div>
                                <h4 className="font-medium">Vishnu Swaroop</h4>
                                <div className="mt-[8px] text-[#49454FCC]">
                                    <p className="">Full stack developer</p>
                                    <p>@ Oruphones</p>
                                </div>
                            </div>
                            <div
                                className="bg-[#FFA78D] w-[130.889px] h-[130.889px] rounded-full flex justify-center items-center overflow-hidden">
                                <img className="w-[110.889px] h-[110.889px] mt-[10px]" src="/user.png" alt=""/>
                            </div>
                        </div>
                        <button className="bg-[#BAB6EB] px-[8px] py-[4px] rounded-2xl font-medium">Remove Connection</button>
                    </div>
                </div>

             <div className="mt-[30px]">
                 <p className="text-xl font-medium ">People you can also connect</p>
                 <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-[15px] mt-[10px]">
                     <div
                         className="border border-black border-opacity-20 rounded-lg shadow p-[14px] bg-white ">
                         <div className="flex items-center justify-between gap-[10px]">
                             <div>
                                 <h4 className="font-medium">Vishnu Swaroop</h4>
                                 <div className="mt-[8px] text-[#49454FCC]">
                                     <p className="">Full stack developer</p>
                                     <p>@ Oruphones</p>
                                 </div>
                             </div>
                             <div
                                 className="bg-[#FFA78D] w-[130.889px] h-[130.889px] rounded-full flex justify-center items-center overflow-hidden">
                                 <img className="w-[110.889px] h-[110.889px] mt-[10px]" src="/user.png" alt=""/>
                             </div>
                         </div>
                         <button className="bg-[#BAB6EB] px-[8px] py-[4px] rounded-2xl font-medium">Connect</button>
                     </div>
                     <div
                         className="border border-black border-opacity-20 rounded-lg shadow p-[14px] bg-white ">
                         <div className="flex items-center justify-between gap-[10px]">
                             <div>
                                 <h4 className="font-medium">Vishnu Swaroop</h4>
                                 <div className="mt-[8px] text-[#49454FCC]">
                                     <p className="">Full stack developer</p>
                                     <p>@ Oruphones</p>
                                 </div>
                             </div>
                             <div
                                 className="bg-[#FFA78D] w-[130.889px] h-[130.889px] rounded-full flex justify-center items-center overflow-hidden">
                                 <img className="w-[110.889px] h-[110.889px] mt-[10px]" src="/user.png" alt=""/>
                             </div>
                         </div>
                         <button className="bg-[#BAB6EB] px-[8px] py-[4px] rounded-2xl font-medium">Connect</button>
                     </div>
                 </div>
             </div>
            </div>
        </div>
    );
};

export default Connections;