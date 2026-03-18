import Bounded from "@/components/base-components/containers/bounded";
import "./light.css";
import Script from "next/script";

const ContainerHtml = ({ content }: { content: string }) => {
  return (
    <Bounded className="p-4">
      <div
        className="prose lg:prose-lg w-full min-w-full"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <Script>
        {`
      (function() {
        const e = document.getElementsByClassName("kg-toggle-heading");
        const t = function(e) {
          const t = e.target.closest(".kg-toggle-card");
          "close" === t.getAttribute("data-kg-toggle-state") ? t.setAttribute("data-kg-toggle-state", "open") : t.setAttribute("data-kg-toggle-state", "close");
        };
        for (let a = 0; a < e.length; a++) {
          e[a].addEventListener("click", t, false);
        }
      })();
      `}
      </Script>
    </Bounded>
  );
};

export default ContainerHtml;
