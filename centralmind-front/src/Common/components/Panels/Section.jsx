import { ReactNode } from 'react'

type SectionProps = {
  title?: string
  action?: ReactNode
  children: ReactNode
  titleAnchor?: string
  className?: string
  background?: 'white' | 'transparent'
}

const Section = ({ title, action, children, titleAnchor, className, background = 'white' }: SectionProps) => {
  return (
    <>
      <div className='flex justify-between items-center'>
        <div>
          {title && (
            <h5 className='font-normal' id={titleAnchor}>
              {title}
            </h5>
          )}
        </div>
        <div className='my-4'>{action}</div>
      </div>

      <div className={`section ${background === 'transparent' ? 'section-transparent' : ''} ${className}`}>
        {children}
      </div>
    </>
  )
}

export default Section
