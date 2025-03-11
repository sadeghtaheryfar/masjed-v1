'use client';
import axios from "axios";
import Link from "next/link";
import { usePathname,useRouter  } from "next/navigation";
import { useEffect, useState } from "react";

const Header = ({bgBox,bgRole}) => {
    const [profile, setProfile] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(true);
    
    const router = useRouter();
    const pathname = usePathname();
    const pathSegments = pathname.split("/");
    const itemId = pathSegments[1];

    const [showRoleMenu, setShowRoleMenu] = useState(false);

    useEffect(() => {
        const fetching = async () => {
            try {
                const response = await axios.get(`/api/profile?item_id=${itemId}`);
                if (response.data) {
                    setProfile(response.data);
                }

                const hasHeadCoachRole = response.data?.data?.roles?.some(
                    role => role.role_en === "mosque_head_coach"
                );

                if (!hasHeadCoachRole) {

                    if (pathname !== "/2" || pathname !== "/3" || pathname !== "/4") {
                        router.push("/" + itemId);
                    }
                }
            } catch (error) {
                console.log("خطا در دریافت بنرها:", error);
            } finally {
                setLoadingProfile(false);
            }
        };
        fetching();
    }, [itemId]);

    const roleOptions = [
        { key: 'mosque_head_coach', label: 'سرمربی مسجد' },
        { key: 'mosque_cultural_officer', label: 'مسئول فرهنگی مسجد' },
        { key: 'area_interface', label: 'رابط منطقه' },
        { key: 'executive_vice_president_mosques', label: 'معاونت اجرایی مساجد' },
        { key: 'deputy_for_planning_and_programming', label: 'معاونت طرح و برنامه' }
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showRoleMenu && !event.target.closest(".role-menu-container")) {
                setShowRoleMenu(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [showRoleMenu]);

    const translateRole = (role) => {
        if (role === "admin") {
            return "ادمین";
        } else if (role === "super_admin") {
            return "سوپر ادمین";
        } else if (role === "user") {
            return "کاربر";
        } else {
            return "نامشخص";
        }
    };

    const translateNama = (role) => {
        if (role === "mosque_head_coach") {
            return "سرمربی مسجد";
        } else if (role === "mosque_cultural_officer") {
            return " مسئول فرهنگی مسجد";
        } else if (role === "area_interface") {
            return "رابط منطقه";
        } else if (role === "executive_vice_president_mosques") {
            return "معاونت اجرایی مساجد";
        } else if (role === "deputy_for_planning_and_programming") {
            return "معاونت طرح و برنامه";
        } else {
            return "نامشخص";
        }
    };

    return (
        <>
            <img
                className="w-12 lg:w-16"
                alt="user"
                width={0}
                height={0}
                src={profile?.data?.avatar || '/Images/home/Ellipse 477.svg'}
            />
                <div className="flex flex-col gap-1 leading-5">
                <span className="text-xs lg:text-lg font-medium text-right" dir="rtl">سلام {profile?.data?.name || ' '}!</span>
                <span className="text-[10px] lg:text-sm font-medium">شناسه یکتا : {profile?.data?.id || ' '}</span>
                </div>

                <div style={{ backgroundColor: bgRole }} className='relative z-[12] px-2 py-1 rounded-xl cursor-pointer' onClick={() => setShowRoleMenu(!showRoleMenu)}>
                    <div className='flex justify-between items-center gap-6 sm:gap-8 lg:gap-16 cursor-pointer'>
                        <span className='text-xs lg:text-base font-medium'>نقش</span>
                        <img className='w-5' alt='#' width={0} height={0} src={'/Images/home/edit-2.svg'} />
                    </div>
                    <span className='text-[10px] lg:text-sm'>
                        {translateNama(profile?.data?.nama_role)}
                    </span>
                    {(showRoleMenu && itemId) && (
                        <div style={{ backgroundColor: '#fff' }} className='absolute top-full right-0 mt-2 w-full rounded-xl shadow-lg z-10 overflow-hidden text-black'>
                            {profile?.data?.roles?.map((role) => (
                                <a
                                    href={`/role?role=${role.role_en}&item_id=${itemId}`}
                                    key={role.role_en}
                                    className='!px-4 !py-2 hover:bg-gray-200 cursor-pointer !w-full flex'
                                >
                                    {role.role}
                                </a>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex flex-col leading-7">
                <span className="text-xs lg:text-base font-medium">سطح دسترسی</span>
                <span className="text-[10px] lg:text-sm">{translateRole(profile?.data?.arman_role)}</span>
            </div>
        </>
    );
};

export default Header;