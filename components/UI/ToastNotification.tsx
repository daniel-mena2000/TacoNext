"use client"

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

//Lo mandaremos llamar en app/order/layout.tsx
export function ToastNotification() {
    return(
        <ToastContainer  position="top-center" theme="dark" />
    )
}
