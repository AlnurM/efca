import clsx from 'clsx'

const Button = ({ children, type = 'primary', className = '', onClick }) => {
  return (
    <button className={clsx('py-3 px-7 font-semibold rounded-[40px]', className, {
      ['bg-primary text-white']: type === 'primary'
    })} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
