import {
  DiscountIcon,
  NVBLogoIcon,
  NVBPlayAvt,
  ProductIcon,
  RefundIcon,
  ShopIcon,
} from "@/assets/icons";

export const config = {
  questions: [
    "🚛 Kiểm tra trạng thái đơn hàng",
    "🎁 Chương trình khuyến mãi",
    "👩‍💻 Tư vấn chọn sản phẩm",
  ],
  menuItems: [
    {
      icon: ShopIcon.src,
      type: "gradient",
      from: "#FFEED4",
      to: "#FEDCCA",
      title: "Shop",
    },
    {
      icon: ProductIcon.src,
      type: "gradient",
      from: "#F2F7FB",
      to: "#E2EFF5",
      title: "Sản phẩm",
    },
    {
      icon: NVBLogoIcon.src,
      type: "gradient",
      from: "#F5F2FB",
      to: "#EAE2F5",
      title: "NVB Play",
    },
    {
      icon: DiscountIcon.src,
      type: "gradient",
      from: "#F2FBF6",
      to: "#E2F5ED",
      title: "Ưu đãi",
    },
    {
      icon: RefundIcon.src,
      type: "gradient",
      from: "#FBEDE2",
      to: "#F7DBDA",
      title: "Hoàn tiền",
    },
  ],
  suggestions: [
    "🚛 Tra cứu đơn hàng",
    "❌ Yêu cầu hoàn toàn",
    "👩‍💻 Tư vấn chọn sản phẩm",
    "🎁 Chương trình khuyến mãi",
  ],
  chats: [
    {
      chatId: "123456",
      user: {
        userId: "1",
        name: "Bạn",
        avatar:
          "https://static.wikia.nocookie.net/avatar/images/4/4b/Zuko.png/revision/latest/top-crop/width/200/height/150?cb=20180630112142",
      },
      recipient: {
        userId: "2",
        name: "NVB Play",
        avatar: NVBPlayAvt.src,
      },
      messages: [
        {
          messageId: "101",
          senderId: "1",
          receiverId: "2",
          type: "text",
          content: "Xin chào! Tôi cần kiểm tra đơn hàng của mình.",
          timestamp: "2024-02-04T10:15:30Z",
          status: "sent",
        },
        {
          messageId: "102",
          senderId: "2",
          receiverId: "1",
          type: "text",
          content: "Vui lòng cung cấp mã đơn hàng để chúng tôi kiểm tra.",
          timestamp: "2024-02-04T10:16:00Z",
          status: "delivered",
        },
        {
          messageId: "103",
          senderId: "1",
          receiverId: "2",
          type: "text",
          content: "Mã đơn hàng của bạn là 1234567890",
          timestamp: "2024-02-04T10:16:30Z",
          status: "delivered",
        },
        {
          messageId: "104",
          senderId: "2",
          receiverId: "1",
          type: "text",
          content: "Đơn hàng của bạn đã được kiểm tra. Vui lòng kiểm tra lại.",
          timestamp: "2024-02-04T10:17:00Z",
          status: "delivered",
        },
        {
          messageId: "105",
          senderId: "1",
          receiverId: "2",
          type: "text",
          content: "Cảm ơn bạn!",
          timestamp: "2024-02-04T10:17:30Z",
          status: "delivered",
        },
        {
          messageId: "106",
          senderId: "2",
          receiverId: "1",
          type: "text",
          content: "Chúc bạn có một ngày tốt lành!",
          timestamp: "2024-02-04T10:18:00Z",
          status: "delivered",
        },
      ],
      lastUpdated: "2024-02-04T10:18:20Z",
    },
    {
      chatId: "123457",
      user: {
        userId: "1",
        name: "Bạn",
        avatar:
          "https://static.wikia.nocookie.net/avatar/images/4/4b/Zuko.png/revision/latest/top-crop/width/200/height/150?cb=20180630112142",
      },
      recipient: {
        userId: "2",
        name: "NVB Play",
        avatar: NVBPlayAvt.src,
      },
      messages: [
        {
          messageId: "101",
          senderId: "1",
          receiverId: "2",
          type: "text",
          content:
            "Để chúng tôi hổ trợ bạn tốt hơn, hãy chọn đơn hàng bạn cần kiểm tra nhé!",
          timestamp: "2024-02-04T10:15:30Z",
          status: "sent",
        },
      ],
      lastUpdated: "2024-02-04T10:18:20Z",
    },
    {
      chatId: "123458",
      user: {
        userId: "1",
        name: "Bạn",
        avatar:
          "https://static.wikia.nocookie.net/avatar/images/4/4b/Zuko.png/revision/latest/top-crop/width/200/height/150?cb=20180630112142",
      },
      recipient: {
        userId: "2",
        name: "NVB Play",
        avatar: NVBPlayAvt.src,
      },
      messages: [
        {
          messageId: "101",
          senderId: "1",
          receiverId: "2",
          type: "text",
          content: "Xin chào! Tôi cần kiểm tra đơn hàng của mình.",
          timestamp: "2024-02-04T10:15:30Z",
          status: "sent",
        },
      ],
      lastUpdated: "2024-02-04T10:18:20Z",
    },
  ],
};
