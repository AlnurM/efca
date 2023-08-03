import clsx from 'clsx'

const Button = ({ children, disabled, type = 'primary', className = '', onClick }) => {
  return (
    <button disabled={disabled} className={clsx('py-3 px-7 font-semibold rounded-[40px]', className, {
      ['bg-primary text-white']: type === 'primary',
      ['opacity-50']: disabled
    })} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
