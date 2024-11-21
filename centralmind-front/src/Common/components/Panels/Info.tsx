import { InfoCircleFilled } from "@ant-design/icons";
import { ReactNode } from "react";

type SectionProps = {
  title?: string,
  children: ReactNode,
  className?: string,
};

const Info = ({ title, children, className, }: SectionProps) => {
  return <>
    {title && <h5 className="font-normal">{title}</h5>}

    <div className={`section flex gap-2 border-t-4 text-xs border-pz-lightBlue rounded-b px-4 shadow-md`}>
      <div>
        <InfoCircleFilled className="text-pz-lightBlue text-lg"/>
      </div>
      <div>
        {children}
      </div>
    </div>
  </>
}

export default Info;