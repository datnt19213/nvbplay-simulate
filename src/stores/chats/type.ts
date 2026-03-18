interface User {
  userId: string;
  name: string;
  avatar: string;
}

interface Message {
  messageId: string;
  senderId: string;
  receiverId: string;
  type: "text" | "image" | "video" | "file"; // Bạn có thể mở rộng thêm các loại tin nhắn khác
  content: string;
  timestamp: string;
  status: "sent" | "delivered" | "seen"; // Các trạng thái tin nhắn có thể là "sent", "delivered", "seen"
}

interface Chat {
  chatId: string;
  user: User; // Người gửi
  recipient: User; // Người nhận
  messages: Message[];
  lastUpdated: string; // Thời gian cập nhật cuối cùng của cuộc trò chuyện
}

export type { Chat };
