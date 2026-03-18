import {
  Appota,
  Basketball,
  Batminton,
  Brand,
  Cod,
  CreditCardIco,
  Football,
  Momo,
  NvbPlay,
  Pickleball,
  Shoes,
  Stripe,
  Tennis,
} from "@/assets/icons";
import {
  Adidas,
  Amour,
  FacebookLogo,
  LiNing,
  MessengerLogo,
  Redson,
  TelegramLogo,
  Toalson,
  TrendCategory1,
  TrendCategory2,
  TrendCategory3,
  TrendCategory4,
  XLogo,
  Yonex,
  ZaloLogo,
} from "@/assets/images";
import {translate} from "@/utilities/translator";
import {Viewport} from "next";

export const COMMON_DATA = {
  meta: {
    title: "NVBPlay - Nền tảng thương mại điện tử cao cấp",
    description:
      "Nền tảng thương mại điện tử giá cả phải chăng | NVBPlay - Nền tảng thương mại điện tử trực tuyến đáng tin cậy của bạn",
    image: `/nvb-play.svg`,
  },
  header: {
    navigations: [
      // {
      //   name: "Hội viên NVB",
      //   link: "/subcription",
      //   icon: "ph:star",
      // },
      {
        name: "Blog",
        link: "/blogs",
        icon: "ph:newspaper",
      },
      {
        name: "Khuyến mãi",
        link: "/flashsale",
        icon: "ph:tag",
      },
      // {
      //   name: "Xây dựng trang bị",
      //   link: "#",
      //   icon: "ph:t-shirt",
      // },
      {
        name: "Thông báo",
        link: null,
        icon: "ph:bell",
      },
      // {
      //   name: "Hỗ trợ CSKH",
      //   link: "/help-center",
      //   icon: "ph:headphones",
      // },
    ],
    user_buttons: [
      {
        name: "Quản lý đơn hàng",
        link: "/profile/order-management",
        showDetails: true,
        icon: "ph:notepad",
      },
      {
        name: "Thông tin tài khoản",
        link: "/profile/overview",
        icon: "lsicon:user-outline",
      },
      {
        name: "Quản lý đơn hàng",
        link: "/profile/order-management",
        icon: "ph:clipboard",
      },
      // {
      //   name: "Hội viên NVB",
      //   link: "/subcription",
      //   icon: "ph:star",
      // },
      //   {
      //     name: "Xây dựng trang bị",
      //   link: "#",
      //   icon: "ph:t-shirt",
      // },
      {
        name: "Sổ địa chỉ",
        link: "/profile/personal-info/address",
        icon: "hugeicons:note-01",
      },
      // {
      //   name: "Ví voucher",
      //   link: "/profile/wallet-vouchers",
      //   icon: "streamline:discount-percent-coupon",
      // },
      // {
      //   name: "Sản phẩm yêu thích",
      //   link: "/profile/favorites",
      //   icon: "ph:heart",
      // },
      // {
      //   name: "Bài viết đã lưu",
      //   link: "#",
      //   icon: "ph:bookmarks",
      // },
      // {
      //   name: "Hỗ trợ khách hàng",
      //   link: "/help-center",
      //   icon: "ph:phone",
      // },
      {
        name: "Đăng xuất",
        link: "#",
        icon: "ph:sign-out",
        showDetails: true,
      },
    ],
    adddress: [
      {
        label: "Cần Thơ",
        value: "Can Tho",
      },
      {
        label: "Hồ Chí Minh",
        value: "Ho Chi Minh",
      },
      {
        label: "Hà Nội",
        value: "Ha Noi",
      },
      {
        label: "Đà Nẵng",
        value: "DaNang",
      },
    ],
    category_menu: {
      left: [
        {
          name: "Cầu lông",
          value: "cau-long",
          icon: "ph:caret-right",
          description: "Trang bị cầu lông chuyên nghiệp",
          image: Batminton.src,
        },
        {
          name: "Pickleball",
          value: "pickleball",
          icon: "ph:caret-right",
          description: "Trang bị pickle ball hàng đầu",
          image: Pickleball.src,
        },
        {
          name: "Tennis",
          value: "tennis",
          icon: "ph:caret-right",
          description: "Dụng cụ chơi tennis đỉnh cao",
          image: Tennis.src,
        },
        {
          name: "Chạy bộ",
          value: "chay-bo",
          icon: "ph:caret-right",
          description: "Trang phục chạy bộ năng động",
          image: Shoes.src,
        },
        {
          name: "Bóng đá",
          value: "bong-da",
          icon: "ph:caret-right",
          description: "Phụ kiện bóng đá dẳng cấp",
          image: Football.src,
        },
        {
          name: "Bóng rổ",
          value: "bong-ro",
          icon: "ph:caret-right",
          description: "Thiết bị bóng rổ chuẩn NBA",
          image: Basketball.src,
        },
      ],
      middle: [
        {
          name: "Redson",
          image: Redson.src,
        },
        {
          name: "Yonex",
          image: Yonex.src,
        },
        {
          name: "Li-Ning",
          image: LiNing.src,
        },
        {
          name: "Toalson",
          image: Toalson.src,
        },
        {
          name: "Adidas",
          image: Adidas.src,
        },
        {
          name: "Leader Armour",
          image: Amour.src,
        },
        {
          name: "Ds",
          image: Redson.src,
        },
        {
          name: "Strokus",
          image: Amour.src,
        },
      ],
      middle_bottom: [
        {
          name: "Vợt cầu lông",
          children: [
            {
              name: "Vợt cầu lông Yonex",
            },
            {
              name: "Vợt cầu lông Adidas",
            },
            {
              name: "Vợt cầu lông Li-Ning",
            },
            {
              name: "Vợt cầu lông Ds",
            },
            {
              name: "Vợt cầu lông Toalson",
            },
          ],
        },
        {
          name: "Áo cầu lông",
          children: [
            {
              name: "Áo cầu lông Yonex",
            },
            {
              name: "Áo cầu lông Adidas",
            },
            {
              name: "Áo cầu lông Li-Ning",
            },
            {
              name: "Áo cầu lông Ds",
            },
          ],
        },
        {
          name: "Túi",
          children: [
            {
              name: "Túi cầu lông Yonex",
            },
            {
              name: "Túi cầu lông Adidas",
            },
            {
              name: "Túi cầu lông Li-Ning",
            },
          ],
        },
        {
          name: "Vợt cầu lông",
          children: [
            {
              name: "Vợt cầu lông Yonex",
            },
            {
              name: "Vợt cầu lông Adidas",
            },
            {
              name: "Vợt cầu lông Li-Ning",
            },
            {
              name: "Vợt cầu lông Ds",
            },
            {
              name: "Vợt cầu lông Toalson",
            },
          ],
        },
        {
          name: "Áo cầu lông",
          children: [
            {
              name: "Áo cầu lông Yonex",
            },
            {
              name: "Áo cầu lông Adidas",
            },
            {
              name: "Áo cầu lông Li-Ning",
            },
            {
              name: "Áo cầu lông Ds",
            },
          ],
        },
        {
          name: "Túi",
          children: [
            {
              name: "Túi cầu lông Yonex",
            },
            {
              name: "Túi cầu lông Adidas",
            },
            {
              name: "Túi cầu lông Li-Ning",
            },
          ],
        },
      ],
    },
    navigation_bar: [
      {
        name: "Trang chủ",
        link: "/",
        icon: "ph:house",
      },
      {
        name: "Bảng tin",
        link: "/blogs",
        icon: "ph:newspaper",
      },
      {
        name: "Thông báo",
        link: "/notification",
        icon: "ph:bell",
      },
      {
        name: "Giỏ hàng",
        link: "/cart",
        icon: "ph:shopping-cart",
      },
      {
        name: "Tài khoản",
        link: "/user",
        icon: "lsicon:user-outline",
      },
    ],
    search_history: [
      {
        id: 1,
        keywords: "Pickleball",
      },
      {
        id: 2,
        keywords: "Áo cầu lông",
      },
    ],
    trend_search: [
      {
        id: 1,
        name: "Pickleball",
      },
      {
        id: 2,
        name: "Áo cầu lông",
      },
      {
        id: 3,
        name: "Vợt Yonex",
      },
      {
        id: 4,
        name: "Phụ kiện cầu lông",
      },
      {
        id: 5,
        name: "Cước cầu lông",
      },
      {
        id: 6,
        name: "Quần vợt",
      },
      {
        id: 7,
        name: "Cầu lông",
      },
      {
        id: 8,
        name: "Túi cầu lông",
      },
      {
        id: 9,
        name: "Balo cầu lông",
      },
    ],
    trend_categories: [
      {
        id: 1,
        name: "Vợt cầu lông",
        background: TrendCategory1.src,
      },
      {
        id: 2,
        name: "Quả cầu lông",
        background: TrendCategory2.src,
      },
      {
        id: 3,
        name: "Áo cầu lông",
        background: TrendCategory3.src,
      },
      {
        id: 4,
        name: "Quần cầu lông",
        background: TrendCategory4.src,
      },
    ],
    order_status_list: [
      {
        id: 1,
        name: "Tất cả",
        value: "tatca",
      },
      {
        id: 2,
        name: "Đang xử lý",
        value: "dangxuly",
      },
      {
        id: 3,
        name: "Đang giao",
        value: "danggiao",
      },
      {
        id: 4,
        name: "Đã giao",
        value: "dagiao",
      },
      {
        id: 5,
        name: "Đã huỷ",
        value: "dahuy",
      },
      {
        id: 6,
        name: "Trả hàng",
        value: "trahang",
      },
    ],
  },
  product: [
    {
      id: 1,
      name: "VỢT ADIDAS SPIELER E08.2 Pulse Blue (Xanh/cam)",
      image: "/images/product.png",
      price: 1350000,
      amount: 6,
      sale: {
        discount: 31,
        end_date: "2024-12-31",
      },
      isFavourable: false,
      colors: [
        {
          id: 1,
          color: ["#000", "#fff"],
        },
        {
          id: 2,
          color: ["#ff3f1a", "#4d6afa"],
        },
        {
          id: 3,
          color: ["#f31dde"],
        },
      ],
    },
    {
      id: 2,

      name: "VỢT ADIDAS SPIELER E08.2 Pulse Blue (Xanh/cam)",
      image: "/images/product.png",
      price: 1350000,
      amount: 6,
      sale: {
        discount: 31,
        end_date: "2024-12-31",
      },
      isFavourable: false,
      colors: [
        {
          id: 1,
          color: ["#000", "#fff"],
        },
        {
          id: 2,
          color: ["#ff3f1a", "#4d6afa"],
        },
        {
          id: 3,
          color: ["#f31dde"],
        },
      ],
    },
    {
      id: 3,
      name: "VỢT ADIDAS SPIELER E08.2 Pulse Blue (Xanh/cam)",
      image: "/images/product.png",
      price: 1350000,
      amount: 6,
      sale: {
        discount: 31,
        end_date: "2024-12-31",
      },
      isFavourable: false,
      colors: [
        {
          id: 1,
          color: ["#000", "#fff"],
        },
        {
          id: 2,
          color: ["#ff3f1a", "#4d6afa"],
        },
        {
          id: 3,
          color: ["#f31dde"],
        },
      ],
    },
    {
      id: 4,
      name: "VỢT ADIDAS SPIELER E08.2 Pulse Blue (Xanh/cam)",
      image: "/images/product.png",
      price: 1350000,
      amount: 6,
      sale: {
        discount: 31,
        end_date: "2024-12-31",
      },
      isFavourable: false,
      colors: [
        {
          id: 1,
          color: ["#000", "#fff"],
        },
        {
          id: 2,
          color: ["#ff3f1a", "#4d6afa"],
        },
        {
          id: 3,
          color: ["#f31dde"],
        },
      ],
    },
    {
      id: 5,
      name: "VỢT ADIDAS SPIELER E08.2 Pulse Blue (Xanh/cam)",
      image: "/images/product.png",
      price: 1350000,
      amount: 6,
      sale: {
        discount: 31,
        end_date: "2024-12-31",
      },
      isFavourable: false,
      colors: [
        {
          id: 1,
          color: ["#000", "#fff"],
        },
        {
          id: 2,
          color: ["#ff3f1a", "#4d6afa"],
        },
        {
          id: 3,
          color: ["#f31dde"],
        },
      ],
    },
    {
      id: 6,
      name: "VỢT ADIDAS SPIELER E08.2 Pulse Blue (Xanh/cam)",
      image: "/images/product.png",
      price: 1350000,
      amount: 6,
      sale: {
        discount: 31,
        end_date: "2024-12-31",
      },
      isFavourable: false,
      colors: [
        {
          id: 1,
          color: ["#000", "#fff"],
        },
        {
          id: 2,
          color: ["#ff3f1a", "#4d6afa"],
        },
        {
          id: 3,
          color: ["#f31dde"],
        },
      ],
    },
    {
      id: 7,
      name: "VỢT ADIDAS SPIELER E08.2 Pulse Blue (Xanh/cam)",
      image: "/images/product.png",
      price: 1350000,
      amount: 6,
      sale: {
        discount: 31,
        end_date: "2024-12-31",
      },
      isFavourable: false,
      colors: [
        {
          id: 1,
          color: ["#000", "#fff"],
        },
        {
          id: 2,
          color: ["#ff3f1a", "#4d6afa"],
        },
        {
          id: 3,
          color: ["#f31dde"],
        },
      ],
    },
    {
      id: 8,
      name: "VỢT ADIDAS SPIELER E08.2 Pulse Blue (Xanh/cam)",
      image: "/images/product.png",
      price: 1350000,
      amount: 6,
      sale: {
        discount: 31,
        end_date: "2024-12-31",
      },
      isFavourable: false,
      colors: [
        {
          id: 1,
          color: ["#000", "#fff"],
        },
        {
          id: 2,
          color: ["#ff3f1a", "#4d6afa"],
        },
        {
          id: 3,
          color: ["#f31dde"],
        },
      ],
    },
    {
      id: 9,
      name: "VỢT ADIDAS SPIELER E08.2 Pulse Blue (Xanh/cam)",
      image: "/images/product.png",
      price: 1350000,
      amount: 6,
      sale: {
        discount: 31,
        end_date: "2024-12-31",
      },
      isFavourable: false,
      colors: [
        {
          id: 1,
          color: ["#000", "#fff"],
        },
        {
          id: 2,
          color: ["#ff3f1a", "#4d6afa"],
        },
        {
          id: 3,
          color: ["#f31dde"],
        },
      ],
    },
    {
      id: 10,
      name: "VỢT ADIDAS SPIELER E08.2 Pulse Blue (Xanh/cam)",
      image: "/images/product.png",
      price: 1350000,
      amount: 6,
      sale: {
        discount: 31,
        end_date: "2024-12-31",
      },
      isFavourable: false,
      colors: [
        {
          id: 1,
          color: ["#000", "#fff"],
        },
        {
          id: 2,
          color: ["#ff3f1a", "#4d6afa"],
        },
        {
          id: 3,
          color: ["#f31dde"],
        },
      ],
    },
  ],
  live: [
    {
      id: 1,
      name: "Ngày hội giảm giá, săn ngay kẻo lỡ mất cơ hội ngàn năm có một",
      view: 1922,
      image: "/images/live1.png",
      host: {
        name: "NVB Play",
        image: Brand.src,
      },
    },
    {
      id: 2,
      name: "Ngày hội giảm giá, săn ngay kẻo lỡ mất cơ hội ngàn năm có một",
      view: 1922,
      image: "/images/live2.png",
      host: {
        name: "NVB Play",
        image: Brand.src,
      },
    },
    {
      id: 3,
      name: "Ngày hội giảm giá, săn ngay kẻo lỡ mất cơ hội ngàn năm có một",
      view: 1922,
      image: "/images/live3.png",
      host: {
        name: "NVB Play",
        image: Brand.src,
      },
    },
    {
      id: 4,
      name: "Ngày hội giảm giá, săn ngay kẻo lỡ mất cơ hội ngàn năm có một",
      view: 1922,
      image: "/images/live4.png",
      host: {
        name: "NVB Play",
        image: Brand.src,
      },
    },
    {
      id: 5,
      name: "Ngày hội giảm giá, săn ngay kẻo lỡ mất cơ hội ngàn năm có một",
      view: 1922,
      image: "/images/live5.png",
      host: {
        name: "NVB Play",
        image: Brand.src,
      },
    },
    {
      id: 6,
      name: "Ngày hội giảm giá, săn ngay kẻo lỡ mất cơ hội ngàn năm có một",
      view: 1922,
      image: "/images/live6.png",
      host: {
        name: "NVB Play",
        image: Brand.src,
      },
    },
    {
      id: 7,
      name: "Ngày hội giảm giá, săn ngay kẻo lỡ mất cơ hội ngàn năm có một",
      view: 1922,
      image: "/images/live7.png",
      host: {
        name: "NVB Play",
        image: Brand.src,
      },
    },
    {
      id: 8,
      name: "Ngày hội giảm giá, săn ngay kẻo lỡ mất cơ hội ngàn năm có một",
      view: 1922,
      image: "/images/live1.png",
      host: {
        name: "NVB Play",
        image: Brand.src,
      },
    },
  ],
  categories: [
    {
      id: 1,
      name: "Vợt cầu lông",
      value: "vot-cau-long",
    },
    {
      id: 2,
      name: "Áo cầu lông",
      value: "ao-cau-long",
    },
    {
      id: 3,
      name: "Pickleball",
      value: "pickleball",
    },
    {
      id: 4,
      name: "Tennis",
      value: "tennis",
    },
    {
      id: 5,
      name: "Chạy bộ",
      value: "chay-bo",
    },
    {
      id: 6,
      name: "Bóng đá",
      value: "bong-da",
    },
    {
      id: 7,
      name: "Bóng rổ",
      value: "bong-ro",
    },
  ],
  footer: {
    socials: [
      {
        id: 1,
        icon: "ph:facebook-logo-fill",
        url: "https://www.facebook.com",
      },
      {
        id: 1,
        icon: "ph:instagram-logo-fill",
        url: "https://www.instagram.com",
      },
      {
        id: 1,
        icon: "ph:tiktok-logo-fill",
        url: "https://www.tiktok.com",
      },
      {
        id: 1,
        icon: "ph:shopping-bag-fill",
        url: "https://www.shoppe.com",
      },
    ],
  },
  profile_sidebar: [
    {
      id: 1,
      icon: "tabler:user-filled",
      title: "overview",
      url: "/profile/overview",
    },
    {
      id: 1,
      icon: "ph:user",
      title: "account",
      url: "/profile/personal-info/information",
    },
    {
      id: 2,
      icon: "ph:clipboard",
      title: "order_management",
      url: "/profile/order-management",
    },
    {
      id: 5,
      icon: "ph:ticket",
      title: "voucher_wallet",
      url: "/profile/wallet-vouchers",
    },
    {
      id: 6,
      icon: "tabler:affiliate",
      title: "affiliate_nvb_play",
      url: "/profile/affiliate",
    },
    {
      id: 7,
      icon: "ph:heart",
      title: "favorite_products",
      url: "/profile/favorites",
    },
  ],
  profile_address: [
    {
      id: 1,
      name: "Luân Nguyễn",
      phone: "070 123 4567",
      address:
        "52, ngõ 12, đường Trần hưng Đạo, Phường Cửa Đông, Quận Hoàn Kiếm, Hà Nội",
      tags: [
        {
          id: 1,
          name: "Mặc định",
          color: "#FF3F1A",
        },
        {
          id: 2,
          name: "Nhà riêng",
          color: "#0B74E5",
        },
      ],
    },
  ],
  payment_method: [
    {
      id: "stripe",
      name: "Stripe",
      description: "Thanh toán bằng cổng Stripe",
      icon: Stripe.src,
    },
    {
      id: "appota",
      name: "Thanh toán qua Appota",
      description:
        "Thanh toán với AppotaPay. Đảm bảo an toàn tuyệt đối cho mọi giao dịch",
      icon: Appota.src,
    },
    // {
    //   id: 2,
    //   name: "Apota",
    //   description: "Thanh toán bằng cổng Apota",
    //   icon: Momo.src,
    // },
    // {
    //   id: 3,
    //   name: "Thanh toán qua Appota",
    //   description:
    //     "Thanh toán với AppotaPay. Đảm bảo an toàn tuyệt đối cho mọi giao dịch",
    //   icon: Appota.src,
    // },
    // {
    //   id: 4,
    //   name: "Ví NVB",
    //   description: "(Số dư: 1.250.000)",
    //   icon: NvbPlay.src,
    // },
    // {
    //   id: 5,
    //   name: "Trả góp qua thẻ tín dụng",
    //   description: "Trả góp mỗi tháng bằng thẻ tín dụng",
    //   icon: CreditCardIco.src,
    // },
    // {
    //   id: 6,
    //   name: "QR VNPay",
    //   description:
    //     "Quét mã chuyển khoản qua ứng dụng ngân hàng. Hỗ trợ hầu hết ngân hàng Việt Nam",
    //   icon: NvbPlay.src,
    // },
  ],
  sidebar_builder: [
    {
      id: 1,
      icon: "build-new",
      title: "Build new",
      url: "/builder/build-new",
    },
    {
      id: 1,
      icon: "collection",
      title: "Collection",
      url: "/builder/collection",
    },
    {
      id: 1,
      icon: "store-suggest",
      title: "Store suggest",
      url: "/builder/store-suggest",
    },
    {
      id: 1,
      icon: "pro-suggest",
      title: "Pro suggest",
      url: "/builder/pro-suggest",
    },
  ],
  filter_builder: [
    {
      id: 1,
      name: "Prices",
      value: "prices",
    },
    {
      id: 2,
      name: "Brands",
      value: "brands",
    },
    {
      id: 3,
      name: "Colors",
      value: "colors",
    },
    {
      id: 4,
      name: "Materials",
      value: "materials",
    },
    {
      id: 5,
      name: "Weights",
      value: "weights",
    },
  ],
  profile_tabs: [
    {
      id: 1,
      name: "information",
      icon: "tabler:user-circle",
      url: "/profile/personal-info/information",
    },
    {
      id: 2,
      name: "security",
      icon: "tabler:lock-access",
      url: "/profile/personal-info/security",
    },
    {
      id: 3,
      name: "address",
      icon: "uiw:map",
      url: "/profile/personal-info/address",
    },
  ],
  flashsale_sort: [
    {
      id: 1,
      name: "best_seller",
      value: "best-seller",
    },
    {
      id: 2,
      name: "price_low_to_high",
      value: "price-asc",
    },
    {
      id: 3,
      name: "price_high_to_low",
      value: "price-desc",
    },
    {
      id: 4,
      name: "newest",
      value: "newest",
    },
    {
      id: 5,
      name: "deep_discount",
      value: "deep_discount",
    },
  ],
  sort_by: [
    {
      id: 1,
      name: "best_seller",
      value: "best-seller",
    },
    {
      id: 2,
      name: "price_low_to_high",
      value: "price-asc",
    },
    {
      id: 3,
      name: "price_high_to_low",
      value: "price-desc",
    },
    {
      id: 4,
      name: "newest",
      value: "newest",
    },
    {
      id: 5,
      name: "popular",
      value: "popular",
    },
  ],
  sort_toggle_by: [
    {
      id: 1,
      name: "popular",
      value: "popular",
    },
    {
      id: 2,
      name: "best_seller",
      value: "best-seller",
    },
    {
      id: 3,
      name: "newest",
      value: "newest",
    },
  ],
  dwmy_sort: [
    {
      id: 1,
      name: "daily",
      value: "daily",
    },
    {
      id: 2,
      name: "weekly",
      value: "weekly",
    },
    {
      id: 3,
      name: "monthly",
      value: "monthly",
    },
    {
      id: 4,
      name: "yearly",
      value: "yearly",
    },
  ],
  share_url: [
    {
      id: 0,
      value: "facebook",
      img: FacebookLogo.src,
      url: `https://www.facebook.com/sharer/sharer.php?u=`,
    },
    {
      id: 0,
      value: "messenger",
      img: MessengerLogo.src,
      url: `https://www.messenger.com/t/?link=`,
    },
    {
      id: 0,
      value: "zalo",
      img: ZaloLogo.src,
      url: `https://zalo.me/share?url=`,
    },
    {
      id: 0,
      value: "telegram",
      img: TelegramLogo.src,
      url: `https://t.me/share/url?url=`,
    },
    {id: 0, value: "x", img: XLogo.src, url: `https://x.com/intent/tweet?url=`},
  ],
};

export const STYLES = {
  disableFocusVisible:
    "focus-visible:!border-[#DDDDE3] focus-visible:!outline-none focus-visible:!ring-0 focus-visible:!ring-offset-0 focus:!ring-0 focus:!ring-offset-0",
};

export enum ENUM {
  AUTH_PROVIDER_EMAILPASS = "emailpass",
  AUTH_PROVIDER_GOOGLE = "google",
  AUTH_PROVIDER_GITHUB = "github",
  SECRET_AES_TOKEN_HASH = "WkCvCwJSBOvsIvQu1SW1XgZLvw82psEh",
  SECRET_AES_TOKEN_RESET_PASS_HASH = "VAC16V3OSc1beuGegsC3eMBPjp",

  // data controll
  LOADMORE_ADDRESS_ITEMS = 6,

  // query keys for tanstacks queries
  QK_AN_ADDRESSES = "an_addreses",
  QK_ADDRESSES = "addreses",
  QK_USERS = "users",
  QK_CITIES = "cities",
  QK_DISTRICTS = "districts",
  QK_WARDS = "wards",
  QK_RECHECK = "recheck",
}

export const meta = {
  title: "NVBPlay - Nền tảng thương mại điện tử cao cấp",
  description:
    "Nền tảng thương mại điện tử giá cả phải chăng | NVBPlay - Nền tảng thương mại điện tử trực tuyến đáng tin cậy của bạn",
  image: `/nvb-play.svg`,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  interactiveWidget: "resizes-visual",
};

export const BLOG_API_URL = process.env.NEXT_PUBLIC_BLOG_API_URL;
export const USER_ID = process.env.NEXT_PUBLIC_USER_ID;
export const CHANNEL_ID = process.env.NEXT_PUBLIC_CHANNEL_ID;
export const CONTENT_MODEL_ID = process.env.NEXT_PUBLIC_CONTENT_MODEL_ID;
