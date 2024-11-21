import { ReactNode } from "react";
import { findSlotOfType } from "../../tools/global-tools";

type PropsType = {
  title: string,
  children: ReactNode
}

function Title({ children }: any) {
  return <>{children}</>;
}

function Actions({ children }: any) {
  return <div>{children}</div>;
}

function Content({ children }: any) {
  return <div>{children}</div>;
}

function Nav({ children }: { children: ReactNode[] }) {
  return <ul>
    {children && children.length && children.map((ch, i) =>
      <li key={i} className="flex justify-between rounded-md items-center p-2 bg-white my-2">
        {ch}
      </li>
    )}

  </ul>;
}

const SidePanel = ({ title, children }: PropsType) => {
  const TitleComponent = findSlotOfType(children, Title);
  const ContentComponent = findSlotOfType(children, Content);
  const ActionsComponent = findSlotOfType(children, Actions);
  const NavComponent = findSlotOfType(children, Nav);

  return <div>
    <div className="flex justify-between">
      <div>
        {title && <h5 className="my-0">{title}</h5>}
        {TitleComponent}
      </div>
      <div>{ActionsComponent}</div>
    </div>
    <div>
      {ContentComponent}
      {NavComponent}
    </div>
  </div>
}

export default Object.assign(SidePanel, {
  Title,
  Content,
  Actions,
  Nav
});