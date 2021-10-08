import { DragEventHandler, useEffect, useRef } from "react";
import styled from "./index.module.scss";

const Page = () => {
  const property = useRef<{ node?: HTMLElement }>({}).current;

  const handledragStart = (e) => {
    var data = e.dataTransfer;
    data.effectAllowed = "all";
    data.setData("text/html", e.currentTarget.outerHTML);
    property.node = e.currentTarget;
  };
  useEffect(() => {
    document.querySelectorAll<HTMLElement>(`.${styled.button}`).forEach((n) => {
      if (!n.ondragstart) n.ondragstart = handledragStart;
    });
  }, []);
  return (
    <div
      className={styled.root}
      contentEditable
      onInput={() => {
        document.querySelectorAll<HTMLElement>(`.${styled.button}`).forEach((n) => {
          if (!n.ondragstart) n.ondragstart = handledragStart;
        });
        if (property.node) {
          property.node.remove();
          property.node = null;
        }
      }}
      suppressContentEditableWarning={true}
    >
      あいうえお
      <div className={styled.button} draggable="true" contentEditable={false}>
        非編集エリア
      </div>
      かきくけこ
      <div className={styled.button} draggable="true" contentEditable={false}>
        非編集エリア2
      </div>
    </div>
  );
};
export default Page;
