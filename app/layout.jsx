"use client";
import "../styles/globals.css";
import { Suspense, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
// export const metadata = {
//   title: " masjed ",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const fetching = async () => {
      const accessToken = Cookies.get("token");

      const token = params.get("jwt");

      if (token) {
        Cookies.set("token", token);
        window.history.replaceState(null, "", "/");
        return;
      }
      if (!accessToken) {
        try {
          const url = await axios.get("/api/url");
          if (url.data) {
            router.push(url.data.verify_url);
          }
        } catch (error) {
          console.log(error);
        }
        // router.push("/");
      } else {
        
      }
    };
    fetching();
  }, []);

  return (
    <html dir="rtl" lang="fa">
      <body className="relative">
        <Suspense>{children}</Suspense>
      </body>
    </html>
  );
}
