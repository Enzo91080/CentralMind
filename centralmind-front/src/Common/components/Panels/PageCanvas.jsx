import { ReactNode } from "react";
import { findSlotOfType } from "../../tools/global-tools";

function Title({ children }) {
  return <>{children}</>;
}

function Actions({ children }) {
  return <div>{children}</div>;
}

function Content({ children }) {
  return <div>{children}</div>;
}

function SideContent({ children }) {
  return <div>{children}</div>;
}

const PageCanvas = ({ children, title, disableContentPadding = false, titleAlignment = 'left' }) => {
  const TitleComponent = findSlotOfType(children, Title);
  const ContentComponent = findSlotOfType(children, Content);
  const ActionsComponent = findSlotOfType(children, Actions);
  const SideContentComponent = findSlotOfType(children, SideContent);

  const shouldDisplayTopPart =
    title !== undefined || TitleComponent !== undefined || ActionsComponent !== undefined;

  // Applique la classe d'alignement basée sur la prop `titleAlignment`
  const titleAlignmentClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[titleAlignment];

  return (
    <div
      className={
        SideContentComponent
          ? "grid grid-cols-[300px_minmax(300px,_1fr)] border-l-1 border-t-1 p-2 gap-x-2 h-full"
          : ""
      }
    >
      {SideContentComponent && (
        <div className="p-4 bg-pz-blue bg-opacity-20 shadow-sm rounded-md">{SideContentComponent}</div>
      )}
      <div className={`p-frame container ${disableContentPadding ? '!p-0' : ''}`}>
        {shouldDisplayTopPart && (
          <div className={`flex justify-between items-center ${titleAlignmentClass}`}>
            <div className={`w-full ${titleAlignmentClass}`}>
              {title && <h1 className="my-2 font-yusei font-h3">{title}</h1>}
              {TitleComponent}
            </div>
            <div className="my-4">{ActionsComponent}</div>
          </div>
        )}
        <div className={!shouldDisplayTopPart ? "bg-jb-primary" : ""}>
          {ContentComponent}
        </div>
      </div>
    </div>
  );
};

export default Object.assign(PageCanvas, {
  Title,
  Content,
  Actions,
  SideContent,
});
