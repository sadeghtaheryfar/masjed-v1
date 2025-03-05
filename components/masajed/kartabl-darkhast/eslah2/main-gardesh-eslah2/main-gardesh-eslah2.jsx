"use client";
import Image from "next/image";
import Link from "next/link";
import FormEslah from "../form-eslah/form-eslah";
import { usePathname, useSearchParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";

const MainGardesheslah2 = () => {
  const [requestData, setRequsestData] = useState("");
  const params = useSearchParams();

  const pathname = usePathname();
  const pathSegments = pathname.split("/");
  const itemId = pathSegments[1];

  useEffect(() => {
    const fetching = async () => {
      try {
        const id = params.get("id");
        const request = await axios.get(`/api/request/show?id=${id}&item_id=${itemId}`);
        if (request.data) {
          setRequsestData(request.data.data);
        }
      } catch (error) {
        console.log(error);
      }
      // try {
      //   const active = await axios.get("/api/active");
      //   if (active.data) {
      //     setActiveCarts(active.data.data);
      //   }
      // } catch (error) {
      //   console.log(error);
      // }
    };
    fetching();
  }, []);
  
  return (
    <div className="relative z-30 rounded-[20px] bg-white drop-shadow-3xl p-6 mb-16 lg:mt-2 container mx-auto md:p-9 xl:px-12 xl:py-[53px]">
      <div className="flex flex-col gap-4 lg:flex-row lg:justify-between items-center mb-8">
        <h2 className="text-base font-bold text-center lg:text-lg md:text-right xl:text-xl 2xl:text-[22px]">
          گردش کار درخواست شماره {requestData?.id}
        </h2>
        <div className="bg-[#FEF8E8] rounded-lg pb-5 pt-2 px-3.5 flex flex-col gap-2 lg:items-center lg:flex-row xl:p-4">
          <div className="flex items-center gap-3">
            <Image
              width={0}
              height={0}
              className="w-7 xl:w-9"
              alt="#"
              src={"/Images/masajed/kartabl-darkhast/eslah2/eslah.svg"}
            />
            <div className="flex flex-col">
              <h3 className="text-sm font-semibold text-[#FABE00] xl:text-[18px]">
                نیازمند اصلاح{" "}
              </h3>
              <p className="hidden 2xl:block text-base leading-9">
                {requestData?.message}
              </p>
            </div>
          </div>
          <p className="text-xs leading-5 xl:text-base 2xl:hidden">
            {requestData?.message}
          </p>
        </div>
      </div>

      <FormEslah data={requestData}/>
    </div>
  );
};

export default MainGardesheslah2;
