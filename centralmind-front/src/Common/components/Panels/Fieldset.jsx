import { ReactNode } from "react";

type FieldsetProps = {
  title?: string,
  children: ReactNode,
  titleAnchor?: string
  className?: string,
  actions?: ReactNode,
  background?: 'white' | 'transparent'
};

const Fieldset = ({ title, children, titleAnchor, actions }: FieldsetProps) => {
  return <>
    {title &&
      <div className="flex justify-between items-center">
        <h5 className="font-antic my-4" id={titleAnchor}>{title}</h5>
        {actions && <div>{actions}</div>}
      </div>
    }
  
    <div>
      {children}
    </div>
  </>
}

export default Fieldset;