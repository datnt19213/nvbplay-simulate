import {
  FireWork,
  OrderError,
  OrderSuccess,
  OrderWarning,
} from "@/assets/icons";
import Image from "@/components/base-components/images/image";
import { cn } from "@/lib/utils";

interface BackgroundResultProps {
  type?: "success" | "error" | "pending";
  receiveType?: "shipping" | "pickup";
}

const BackgroundResult = ({
  type = "success",
  receiveType,
}: BackgroundResultProps) => {
  return (
    <div
      className={cn(
        "relative h-[200px] bg-gradient-to-r overflow-hidden rounded-sm md:rounded-lg flex items-center justify-center",
        {
          "from-[#65D380] via-[#5ECA80] to-[#079449]": type === "success",
          "from-[#FF99A0] via-[#D26169] to-[#D93843]": type === "error",
          "from-[#FFD530] via-[#D1B132] to-[#E59900]": type === "pending",
        }
      )}
    >
      <div className="flex flex-col w-full items-center justify-center gap-4">
        <Image
          src={
            type === "success"
              ? OrderSuccess.src
              : type === "error"
                ? OrderError.src
                : OrderWarning.src
          }
          alt="fire-work"
          className="size-16"
        />
        <div className="flex flex-col items-center justify-center gap-3">
          <h3 className="text-white text-xl font-semibold">
            {type === "success"
              ? "Đặt hàng thành công!"
              : type === "error"
                ? "Thanh toán thất bại!"
                : "Chưa thanh toán"}
          </h3>
          <p className="text-white text-base">
            {type === "success"
              ? receiveType === "shipping"
                ? "Đơn hàng đang trên đường giao đến bạn"
                : "Đơn hàng đang được chuẩn bị tại cửa hàng"
              : type === "error"
                ? "Thanh toán lỗi, vui lòng thực hiện lại"
                : "Vui lòng thanh toán để hoàn tất đơn hàng của bạn"}
          </p>
        </div>
      </div>
      {/* FIRE WORK WHEN SUCCESS */}
      {type === "success" && (
        <Image
          src={FireWork.src}
          alt="fire-work"
          className="h-[88px] w-[332px] absolute pt-5 inset-y-0 z-0"
        />
      )}

      {/* VECTOR */}
      {type === "success" && (
        <svg
          className="absolute inset-0 object-cover hidden md:block"
          width="1200"
          height="200"
          viewBox="0 0 1200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1068.53 -159.957V-160H1726V475H721.863C691.861 393.603 675.594 202.786 850.544 90.6974C1068.58 -48.9935 1068.53 -154.861 1068.53 -159.957Z"
            fill="url(#paint0_linear_1035_81537)"
          />
          <path
            d="M1171.53 -40.9568V-41H1829V594H824.863C794.861 512.603 778.594 321.786 953.544 209.697C1171.58 70.0065 1171.53 -35.8611 1171.53 -40.9568Z"
            fill="url(#paint1_linear_1035_81537)"
          />
          <path
            d="M-2.52896 -276.957V-277H-660V358H344.137C374.139 276.603 390.406 85.7857 215.456 -26.3026C-2.57755 -165.994 -2.53122 -271.861 -2.52896 -276.957Z"
            fill="url(#paint2_linear_1035_81537)"
          />
          <path
            d="M-105.529 -157.957V-158H-763V477H241.137C271.139 395.603 287.406 204.786 112.456 92.6974C-105.578 -46.9935 -105.531 -152.861 -105.529 -157.957Z"
            fill="url(#paint3_linear_1035_81537)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_1035_81537"
              x1="703"
              y1="157.5"
              x2="1726"
              y2="157.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#28B868" />
              <stop offset="1" stopColor="#079449" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_1035_81537"
              x1="806"
              y1="276.5"
              x2="1829"
              y2="276.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#28B868" />
              <stop offset="1" stopColor="#079449" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_1035_81537"
              x1="363"
              y1="40.5"
              x2="-660"
              y2="40.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#60CD80" />
              <stop offset="1" stopColor="#079449" />
            </linearGradient>
            <linearGradient
              id="paint3_linear_1035_81537"
              x1="260"
              y1="159.5"
              x2="-763"
              y2="159.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#5AC97C" />
              <stop offset="1" stopColor="#079449" />
            </linearGradient>
          </defs>
        </svg>
      )}
      {type === "pending" && (
        <svg
          className="absolute inset-0 object-cover hidden md:block"
          width="1200"
          height="200"
          viewBox="0 0 1200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1068.53 -159.957V-160H1726V475H721.863C691.861 393.603 675.594 202.786 850.544 90.6974C1068.58 -48.9935 1068.53 -154.861 1068.53 -159.957Z"
            fill="url(#paint0_linear_1035_81791)"
          />
          <path
            d="M1171.53 -40.9568V-41H1829V594H824.863C794.861 512.603 778.594 321.786 953.544 209.697C1171.58 70.0065 1171.53 -35.8611 1171.53 -40.9568Z"
            fill="url(#paint1_linear_1035_81791)"
          />
          <path
            d="M-2.52896 -276.957V-277H-660V358H344.137C374.139 276.603 390.406 85.7857 215.456 -26.3026C-2.57755 -165.994 -2.53122 -271.861 -2.52896 -276.957Z"
            fill="url(#paint2_linear_1035_81791)"
          />
          <path
            d="M-105.529 -157.957V-158H-763V477H241.137C271.139 395.603 287.406 204.786 112.456 92.6974C-105.578 -46.9935 -105.531 -152.861 -105.529 -157.957Z"
            fill="url(#paint3_linear_1035_81791)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_1035_81791"
              x1="703"
              y1="157.5"
              x2="1726"
              y2="157.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#DCA315" />
              <stop offset="1" stopColor="#FFB700" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_1035_81791"
              x1="806"
              y1="276.5"
              x2="1829"
              y2="276.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#E9AB0D" />
              <stop offset="1" stopColor="#E59900" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_1035_81791"
              x1="363"
              y1="40.5"
              x2="-660"
              y2="40.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#DEBB31" />
              <stop offset="1" stopColor="#FFB700" />
            </linearGradient>
            <linearGradient
              id="paint3_linear_1035_81791"
              x1="260"
              y1="159.5"
              x2="-763"
              y2="159.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#E8BA22" />
              <stop offset="1" stopColor="#E59900" />
            </linearGradient>
          </defs>
        </svg>
      )}
      {type === "error" && (
        <svg
          className="absolute inset-0 object-cover hidden md:block"
          width="1200"
          height="200"
          viewBox="0 0 1200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1068.53 -159.957V-160H1726V475H721.863C691.861 393.603 675.594 202.786 850.544 90.6974C1068.58 -48.9935 1068.53 -154.861 1068.53 -159.957Z"
            fill="url(#paint0_linear_1035_82045)"
          />
          <path
            d="M1171.53 -40.9568V-41H1829V594H824.863C794.861 512.603 778.594 321.786 953.544 209.697C1171.58 70.0065 1171.53 -35.8611 1171.53 -40.9568Z"
            fill="url(#paint1_linear_1035_82045)"
          />
          <path
            d="M-2.52896 -276.957V-277H-660V358H344.137C374.139 276.603 390.406 85.7857 215.456 -26.3026C-2.57755 -165.994 -2.53122 -271.861 -2.52896 -276.957Z"
            fill="url(#paint2_linear_1035_82045)"
          />
          <path
            d="M-105.529 -157.957V-158H-763V477H241.137C271.139 395.603 287.406 204.786 112.456 92.6974C-105.578 -46.9935 -105.531 -152.861 -105.529 -157.957Z"
            fill="url(#paint3_linear_1035_82045)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_1035_82045"
              x1="703"
              y1="157.5"
              x2="1726"
              y2="157.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#D64852" />
              <stop offset="1" stopColor="#FF424E" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_1035_82045"
              x1="1317.5"
              y1="-41"
              x2="1317.5"
              y2="594"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#E74550" />
              <stop offset="1" stopColor="#D93843" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_1035_82045"
              x1="-660"
              y1="40.5"
              x2="363"
              y2="40.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FF424E" />
              <stop offset="1" stopColor="#E0737A" />
            </linearGradient>
            <linearGradient
              id="paint3_linear_1035_82045"
              x1="260"
              y1="159.5"
              x2="-763"
              y2="159.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#E56B73" />
              <stop offset="1" stopColor="#D93843" />
            </linearGradient>
          </defs>
        </svg>
      )}
    </div>
  );
};

export default BackgroundResult;
