"use client";
import {Icon} from "@iconify/react";
import ManagerOrder from "./manager-order";
import LogoutButton from "./logout-button";
import {redirect, RedirectType, useRouter} from "next/navigation";
import {RootState} from "@/stores";
import {useDispatch, useSelector} from "react-redux";
import {clearUserData} from "@/stores/datas/users-data-slice";
import {RemoveACookie} from "@/utilities/cookies";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {setUserAddressData} from "@/stores/datas/addresses-data-slice";
import {ClearAllData} from "@/utilities/clear";
import {cn} from "@/lib/utils";

type NavLinkType = {
  showDetails?: boolean;
  data: {
    name: string;
    icon: string;
    link?: string;
    showDetails?: boolean;
  }[];
};
const NavLinks = ({showDetails, data}: NavLinkType) => {
  const {user} = useSelector((state: RootState) => state.users_data);
  const dispatch = useDispatch();
  const router = useRouter();

  const dataRendering = data.filter((item) => !item.showDetails);
  const handleNavigation = (route: string) => {
    redirect(route, RedirectType.push);
  };
  const clear = new ClearAllData();
  const handleLogout = () => {
    dispatch(clearUserData());
    dispatch(setUserAddressData(null));
    RemoveACookie("token");
    localStorage.removeItem("cart_id");
    clear.cookieButAccept("rp").localStorage().sessionStorage().store();
    router.push("/");
  };

  return (
    <div className="w-full flex flex-col gap-2">
      {showDetails && <ManagerOrder />}

      <div className="grid grid-cols-1">
        {dataRendering.map((item, index) => (
          <div
            onClick={() => handleNavigation(item.link || "#")}
            key={index}
            className={cn(
              "py-3 px-2 flex items-center gap-2 rounded-lg hover:bg-gray-100 cursor-pointer w-full text-[#38383D] dark:text-gray-400 border-b border-gray-100"
            )}
          >
            <Icon icon={item.icon} className="size-6" />
            <p className="text-sm">{item.name}</p>
          </div>
        ))}

        {user && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <div className="py-3 px-2 flex items-center gap-2 rounded-lg hover:bg-gray-100 cursor-pointer w-full text-[#38383D] dark:text-gray-400">
                <Icon icon="ph:sign-out" className="size-6" />
                <p className="text-sm">Đăng xuất</p>
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Đăng xuất</AlertDialogTitle>
                <AlertDialogDescription>
                  Bạn có chắc chắn muốn đăng xuất? <br /> Và bạn cần đăng nhập
                  lại để tiếp tục sử dụng. Hãy xác nhận để hoàn tất thao tác.
                </AlertDialogDescription>
              </AlertDialogHeader>
              {/* <div className="flex items-center justify-center">
                <Image
                  src={NVBPlay_Bill.src}
                  className="size-72"
                  alt="NVBPlay_Bill"
                />
              </div> */}
              <AlertDialogFooter>
                <AlertDialogCancel>Hủy</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-transparent border border-primary text-primary hover:bg-primary hover:text-white"
                  onClick={handleLogout}
                >
                  Xác nhận
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
      {showDetails && (
        <div className="py-4">
          <LogoutButton />
        </div>
      )}
    </div>
  );
};

export default NavLinks;
