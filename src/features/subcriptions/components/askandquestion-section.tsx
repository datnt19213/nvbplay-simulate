import {
  Accordion,
  Content,
  Tab,
  Trigger,
} from "@/components/custom/accordion";
import React from "react";

const questions = [
  {
    title: "Tôi có thể đăng ký hội viên bằng cách nào?",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  },
  {
    title: "Tôi có thể đăng ký hội viên bằng cách nào?",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  },
  {
    title: "Tôi có thể đăng ký hội viên bằng cách nào?",
    content: "Tôi có thể đăng ký hội viên bằng cách nào?",
  },
  {
    title: "Tôi có thể đăng ký hội viên bằng cách nào?",
    content: "Tôi có thể đăng ký hội viên bằng cách nào?",
  },
  {
    title: "Tôi có thể đăng ký hội viên bằng cách nào?",
    content: "Tôi có thể đăng ký hội viên bằng cách nào?",
  },
];

const AskAndQuestionSection = () => {
  return (
    <div className="p-6 gap-6 rounded-lg bg-white flex flex-col">
      <h2 className="text-xl font-semibold text-center">Câu hỏi thường gặp</h2>
      <Accordion className="grid grid-cols-1 gap-3">
        {questions.map((e, i) => {
          return (
            <Tab key={i} index={i} className="bg-[#F5F5FA] rounded-lg">
              <Trigger>
                <div className="text-base font-medium w-full h-full">
                  {i +1 }.{e.title}
                </div>
              </Trigger>
              <Content>
                <div className="text-sm text-muted-foreground">{e.content}</div>
              </Content>
            </Tab>
          );
        })}
      </Accordion>
    </div>
  );
};

export default AskAndQuestionSection;
