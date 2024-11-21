import { Children, ReactNode } from "react";

function findSlotOfType(children: ReactNode, slotType: any) {
  return Children.toArray(children).find((child) => (child as any).type === slotType);
}

function Header({ children }: any) {
  return <div>{children}</div>
}

function Footer({ children }: any) {
  return <div>{children}</div>
}

function Content({ children }: any) {
  return <div>{children}</div>
}

type PropsType = {
  title?: string,
  children: ReactNode,
  background?: 'white' | 'transparent'
}

const SimpleCard = ({ title, children, background = "white" }: PropsType) => {
  const HeaderComponent = findSlotOfType(children, Header);
  const FooterComponent = findSlotOfType(children, Footer);
  const ContentComponent = findSlotOfType(children, Content);

  return <div className={`section my-4 ${background === 'transparent' ? 'section-transparent' : ''}`}>
    {title && <div >
      <h3 className="my-0">{title}</h3>
    </div>
    }
    {HeaderComponent}
    {ContentComponent}
    {FooterComponent}
  </div>
}

export default Object.assign(SimpleCard, { Header, Content, Footer });