import clsx from 'clsx'

const Container = ({ children, className = '' }) => {
  return <div className={clsx('mx-auto w-full max-w-[1184px] flex', className)}>{children}</div>
}

export default Container
