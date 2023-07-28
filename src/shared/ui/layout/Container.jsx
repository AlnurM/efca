import clsx from 'clsx'

const Container = ({ children, shrink, className = '' }) => {
  return (
    <div 
      className={clsx('mx-auto w-full flex', className, {
        [`max-w-[812px]`]: shrink,
        ['max-w-[1184px]']: !shrink
      })}
    >
      {children}
    </div>
  )
}

export default Container
