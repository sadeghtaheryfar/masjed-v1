'use client';
import axios from "axios";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const GozareshKartablGozaresh = () => {
  const [profile, setProfile] = useState(null);
  const pathname = usePathname();
  const pathSegments = pathname.split("/");
  const itemId = pathSegments[1];

  const [info, setInfo] = useState(null);
  const [loadingInfo, setLoadingInfo] = useState(true);

  useEffect(() => {
    if (!pathname) return;

    const fetching = async () => {
      try {
        const response = await axios.get(`/api/info?item_id=${itemId}&role=mosque_head_coach`);
        if (response.data) {
          setInfo(response.data);
        }
      } catch (error) {
        console.log("خطا در دریافت بنرها:", error);
      } finally {
        setLoadingInfo(false);
      }
    };
    fetching();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-5 lg:flex-row lg:justify-between">
      <h2 className="text-base font-bold text-center lg:text-lg xl:text-[22px] text-nowrap">
        گزارش گردش کار گزارش ها{" "}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-[2rem]">
        <div className="flex items-center justify-start gap-3 h-8 rounded-full bg-[#25C7AA]/5 border border-[#e22afc] xl:w-44 xl:h-12">
          <span className="text-lg font-semibold text-white flex items-center justify-center outline outline-8 outline-[#e22afc]/30 rounded-full xl:outline-[14px] bg-[#e22afc] w-8 h-8 pt-1.5 xl:h-12 xl:w-12 xl:text-[28px]">
            {info?.reports?.pending ? info?.reports?.pending : '0'}
          </span>
          <span className="text-sm font-semibold text-[#e22afc] xl:text-lg 2xl:text-[22px]">
            باز
          </span>
        </div>
        <div className="flex items-center justify-start gap-3 h-8 rounded-full bg-[#25C7AA]/5 border border-[#25C7AA] xl:w-44 xl:h-12">
          <span className="text-lg font-semibold text-white flex items-center justify-center outline outline-8 outline-[#25C7AA4D]/30 rounded-full xl:outline-[14px] bg-[#25C7AA] w-8 h-8 pt-1.5 xl:h-12 xl:w-12 xl:text-[28px]">
            {info?.reports?.done ? info?.reports?.done : '0'}
          </span>
          <span className="text-sm font-semibold text-[#25C7AA] xl:text-lg 2xl:text-[22px]">
            تایید شده
          </span>
        </div>
        <div className="flex items-center justify-start gap-6 h-8 rounded-full bg-[#77B7DC]/5 border border-[#77B7DC] xl:w-44 xl:h-12">
          <span className="text-lg font-semibold text-white flex items-center justify-center outline outline-8 outline-[#77B7DC]/30 rounded-full xl:outline-[14px] bg-[#77B7DC] w-8 h-8 pt-1.5 xl:h-12 xl:w-12 xl:text-[28px]">
            {info?.reports?.in_progress ? info?.reports?.in_progress : '0'}
          </span>
          <span className="text-sm font-semibold text-[#77B7DC] xl:text-lg 2xl:text-[22px]">جاری</span>
        </div>
        <div className="flex items-center justify-start gap-5 h-8 rounded-full bg-[#D32F2F]/5 border border-[#D32F2F] xl:w-44 xl:h-12">
          <span className="text-lg font-semibold text-white flex items-center justify-center outline outline-8 outline-[#D32F2F]/30 rounded-full xl:outline-[14px] bg-[#D32F2F] w-8 h-8 pt-1.5 xl:h-12 xl:w-12 xl:text-[28px]">
            {info?.reports?.rejected ? info?.reports?.rejected : '0'}
          </span>
          <span className="text-sm font-semibold text-[#D32F2F] xl:text-lg 2xl:text-[22px]">رد شده</span>
        </div>
        <div className="flex items-center justify-start gap-3 h-8 rounded-full bg-[#FFD140]/5 border border-[#FFD140] xl:w-44 xl:h-12">
          <span className="text-lg font-semibold text-white flex items-center justify-center outline outline-8 outline-[#FFD140]/30 rounded-full xl:outline-[14px] bg-[#FFD140] w-8 h-8 pt-1.5 xl:h-12 xl:w-12 xl:text-[28px]">
            {info?.reports?.action_needed ? info?.reports?.action_needed : '0'}
          </span>
          <span className="text-sm font-semibold min-w-fit text-[#FFD140] xl:text-lg 2xl:text-[22px]">
            نیازمند اصلاح
          </span>
        </div>
      </div>
    </div>
  );
};

export default GozareshKartablGozaresh;
