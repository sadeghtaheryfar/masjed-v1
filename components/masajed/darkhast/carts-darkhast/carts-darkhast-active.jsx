import Image from "next/image";
import Link from "next/link";
import ButtonSabt from "../button-sabt/button-sabt";
import { usePathname } from "next/navigation";
const CartsDarkhastActive = ({ item }) => {
  function formatNumber(num) {
    return Math.floor(num / 1000000);
  }

  const pathname = usePathname();
  const pathSegments = pathname.split("/");
  const itemId = pathSegments[1];

  return (
    <div className="flex flex-col justify-end gap-4 border rounded-xl p-4 group hover:border-[#39A894] transition-all duration-200">
      <div className="grid grid-cols-4 items-center gap-4 lg:grid-cols-5 lg:gap-5">
        <img
          className="w-full max-w-28 lg:hidden rounded-[0.5rem]"
          src={item.image}
          style={{ objectFit: "cover", height: "auto" }}
        />
        <img
          style={{ objectFit: "cover", height: "100%" }}
          className="hidden lg:block w-full col-span-2 min-w-[167px] max-w-[167px] row-span-2 rounded-[0.5rem]"
          alt="#"
          src={item.image}
        />
        <div className="flex flex-col gap-2 col-span-3 lg:mr-2">
          <h2 className="text-base font-bold group-hover:text-[#39A894] lg:text-lg">
            {item.title}
          </h2>
          <span className="text-xs font-medium lg:text-base">شماره: {item.id || 0} </span>
        </div>

        <ul className="flex flex-col justify-center gap-1.5 col-span-4 lg:col-span-3 lg:mr-2">
          <li className="text-xs text-[#808393] leading-5 flex items-center gap-2 lg:text-sm">
            <div className="w-1 h-1 bg-[#808393] rounded-full p-1"></div>
            سقف تعداد نفرات مورد حمایت: {item.max_number_people_supported}
          </li>
          <li className="text-xs text-[#808393] leading-5 flex items-center gap-2 lg:text-sm">
            <div className="w-1 h-1 bg-[#808393] rounded-full p-1"></div>
            سرانه حمایتی هر نفر به مبلغ حداکثر {formatNumber(item.support_for_each_person_amount)} میلیون
            ریال میباشد.
          </li>
          <li className="text-xs text-[#808393] leading-5 flex items-center gap-2 lg:text-sm">
            <div className="w-1 h-1 bg-[#808393] rounded-full p-1"></div>
            {item.expires_at === null
              ? "فاقد محدودیت زمانی"
              : `محدود مهلت زمانی انتخاب این درخواست تا تاریخ ${item.expires_at} میباشد.`}
          </li>
          <li className="text-xs text-[#808393] leading-5 flex items-center gap-2 lg:text-sm">
            <div className="w-1 h-1 bg-[#808393] rounded-full p-1"></div>
            {(item.max_allocated_request - item.previous_requests) == 0 ? (
              <span className="font-bold">در خواستی باقی نمانده.</span>
            ) : (
              <span>
                درخواست
                <span className="text-[#D5B260] font-bold">
                  {item.previous_requests} از {item.max_allocated_request}
                </span>
                (تنها {item.max_allocated_request - item.previous_requests} درخواست
                باقی مانده است)
              </span>
            )}
          </li>
        </ul>
      </div>
        {(Number(item.max_allocated_request - item.previous_requests) >= 1 ) ? (
          <Link href={`/${itemId}/darkhast/sabt?id=${item.id}`}>
            <ButtonSabt />
          </Link>
        ) : (
          <button className="w-full h-12 text-red-600 text-base font-medium rounded-[10px] border border-red-600">
            غیر فعال 
          </button>
        )}
    </div>
  );
};

export default CartsDarkhastActive;
