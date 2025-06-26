import { JSX, useContext, useEffect, useMemo, useState } from "react";
import CustomButton from "../Buttons/CustomButton";
import AnimateHeight from "react-animate-height";
import { JobPostContext } from "@/common/context/JobPostContext";

export default function JobPostDescription() {
  const {
    job: { description },
  } = useContext(JobPostContext);

  const [isExpanded, setIsExpanded] = useState(false);

  // Maximum length of the description to display
  const maxLength = 300; // This counts characters, not words

  const displayText = useMemo(() => {
    let text = description;
    let toggleButton: null | JSX.Element = null;

    if (isExpanded) {
      const showLessButton = description.length > maxLength;
      toggleButton = showLessButton ? (
        <CustomButton variant="text" onClick={() => setIsExpanded(false)}>
          pungufu
        </CustomButton>
      ) : null;
    } else {
      text = `${description.slice(0, maxLength)}...`;
      const showMoreButton = description.length > maxLength;
      toggleButton = showMoreButton ? (
        <CustomButton variant="text" onClick={() => setIsExpanded(true)}>
          zaidi
        </CustomButton>
      ) : null;
    }

    return (
      <div className="w-full">
        <p>{text}</p>
        {toggleButton}
      </div>
    );
  }, [description, isExpanded, maxLength]);

  useEffect(() => {
    if (maxLength >= description.length) {
      setIsExpanded(true);
    }
  }, [description, maxLength]);

  /**
   * // TODO handle height change animations
   */
  //   const [height, setHeight] = useState<Height>("auto");
  //   const contentDiv = useRef<HTMLDivElement | null>(null);

  //   useEffect(() => {
  //     const element = contentDiv.current as HTMLDivElement;

  //     const resizeObserver = new ResizeObserver(() => {
  //       setHeight(element.clientHeight);
  //     });

  //     resizeObserver.observe(element);

  //     return () => resizeObserver.disconnect();
  //   }, []);

  return (
    <AnimateHeight
      height={"auto"}
      duration={500}
      //   contentClassName="auto-content"
      //   contentRef={contentDiv}
      //   disableDisplayNone
      className="w-full py-2"
    >
      {displayText}
    </AnimateHeight>
  );
}
