import React from "react";

const DESCRIPTION_ELEMENT = `
<p>Bạn đã biết hết các <strong>thông số vợt cầu lông</strong> chưa? Việc chọn vợt cầu lông phù hợp không chỉ dựa vào cảm giác cầm nắm mà còn phụ thuộc rất nhiều vào việc bạn hiểu và lựa chọn đúng thông số kỹ thuật. Để giúp bạn dễ dàng hơn trong việc đưa ra quyết định, bài viết dưới đây sẽ giải thích cách đọc hiểu các thông số vợt cầu lông và đưa ra những gợi ý để bạn chọn vợt phù hợp.</p><h2><strong>1. Thông số vợt cầu lông thường nằm ở đâu trên cây vợt?</strong></h2><p>Các thông số kỹ thuật của vợt cầu lông thường được in trực tiếp trên thân vợt, khung vợt hoặc tay cầm. Những vị trí phổ biến bao gồm:</p><ul><li><p>Thân vợt: In các thông số về trọng lượng, độ cứng thân vợt và sức căng dây tối đa.</p></li></ul><img src="https://nvbplay.vn/wp-content/uploads/2024/11/thong-so-vot-cau-long-co-ban-2.webp" alt="Thông số vợt cầu lông cơ bản trên khung vợt"><p style="text-align: center">Thông số vợt cầu lông cơ bản trên khung vợt</p><img src="https://nvbplay.vn/wp-content/uploads/2024/11/thong-so-vot-cau-long-co-ban-1.webp" alt="Thông số vợt cầu lông cơ bản trên khung vợt"><p style="text-align: center">Thông số vợt cầu lông cơ bản trên khung vợt</p><ul><li><p>Khung vợt: Thông tin về sức căng dây, chất liệu khung.</p></li><li><p>Tay cầm (Grip): Thông số về chu vi cán cầm, kích thước tay cầm.</p></li></ul><img src="https://nvbplay.vn/wp-content/uploads/2024/11/thong-so-vot-cau-long-co-ban-3.webp" alt="Thông số vợt cầu lông cơ bản trên tay cầm"><p style="text-align: center">Thông số vợt cầu lông cơ bản trên tay cầm</p><p>Khi chọn mua vợt, bạn nên kiểm tra kỹ các thông số này để đảm bảo cây vợt phù hợp với nhu cầu sử dụng và phong cách chơi của mình.</p><h2><strong>2. Những thống số vợt cầu lông cơ bản</strong></h2><h3><strong>2.1 Trọng lượng (Weight)</strong></h3><p>Trọng lượng là thông số vợt cầu lông đầu tiên cần xem xét khi chọn vợt cầu lông. Trọng lượng vợt được ký hiệu bằng chữ U, một thông số quan trọng ảnh hưởng đến khả năng kiểm soát và lực đánh. Thông thường, số U càng lớn thì vợt càng nhẹ, và số U nhỏ thì vợt nặng hơn.</p><p>&nbsp;</p><table class="!border !border-gray-300" style="min-width: 75px"><colgroup><col style="min-width: 25px"><col style="min-width: 25px"><col style="min-width: 25px"></colgroup><tbody><tr class="!border !border-gray-300"><td class="!border !border-gray-300 !p-2" colspan="1" rowspan="1"><p><strong>Số U</strong></p></td><td class="!border !border-gray-300 !p-2" colspan="1" rowspan="1"><p><strong>Trọng lượng (g)</strong></p></td><td class="!border !border-gray-300 !p-2" colspan="1" rowspan="1"><p><strong>Đặc điểm</strong></p></td></tr><tr class="!border !border-gray-300"><td class="!border !border-gray-300 !p-2" colspan="1" rowspan="1"><p>5U</p></td><td class="!border !border-gray-300 !p-2" colspan="1" rowspan="1"><p>75g – 80g</p></td><td class="!border !border-gray-300 !p-2" colspan="1" rowspan="1"><p>Vợt siêu nhẹ, phù hợp với người mới tập chơi hoặc những người muốn tăng tốc độ vung vợt và linh hoạt trong các pha cầu nhanh.</p></td></tr><tr class="!border !border-gray-300"><td class="!border !border-gray-300 !p-2" colspan="1" rowspan="1"><p>4U</p></td><td class="!border !border-gray-300 !p-2" colspan="1" rowspan="1"><p>80g – 85g</p></td><td class="!border !border-gray-300 !p-2" colspan="1" rowspan="1"><p>Trọng lượng phổ biến, phù hợp với người chơi trung cấp và cả những ai có lối chơi nhanh nhẹn, công thủ toàn diện.</p></td></tr><tr class="!border !border-gray-300"><td class="!border !border-gray-300 !p-2" colspan="1" rowspan="1"><p>3U</p></td><td class="!border !border-gray-300 !p-2" colspan="1" rowspan="1"><p>85g – 90g</p></td><td class="!border !border-gray-300 !p-2" colspan="1" rowspan="1">
`;

const DATA = [
  {
    id: 1,
    title: "[Hội viên] Chương trình hội NVB Play là gì?",
    desc: DESCRIPTION_ELEMENT,
  },
  {
    id: 2,
    title:
      "[Trả hàng/Hoàn tiền] Hướng dẫn gửi yêu cầu trả hàng khi sản phẩm có vấn đề",
    desc: DESCRIPTION_ELEMENT,
  },
  {
    id: 3,
    title:
      "[Trả hàng/Hoàn tiền] Hướng dẫn gửi yêu cầu trả hàng khi sản phẩm có vấn đề",
    desc: DESCRIPTION_ELEMENT,
  },
  {
    id: 4,
    title:
      "[Xu NVB Loyalty] Xu NVB Loyalty là gì? Cách để nhận xu NVB Loyalty?",
    desc: DESCRIPTION_ELEMENT,
  },
];

const QuestionItem = ({ item }: { item: (typeof DATA)[0] }) => {
  return <div className="text-base text-neutral-600">{item.title}</div>;
};

export const ListQuestion = () => {
  return (
    <div className="space-y-3">
      {DATA.map((item, index) => (
        <div key={index}>
          <QuestionItem item={item} />
          {index < DATA.length - 1 && (
            <div className="w-full h-[1px] bg-neutral-200" />
          )}
        </div>
      ))}
    </div>
  );
};
