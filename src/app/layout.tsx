import './globals.css'
import type { Metadata } from 'next'
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";

export const metadata: Metadata = {
  title: 'User Profile',
  description: 'user profile',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
        <body className='text-black bg-[#FAFBFF]'>
          <section> {children} </section>
           <ToastContainer
               position="top-right"
               autoClose={5000}
               hideProgressBar={false}
               newestOnTop={false}
               closeOnClick
               rtl={false}
               pauseOnFocusLoss
               draggable
               pauseOnHover
               theme="colored"
           />
        </body>
      </html>
  )
}
