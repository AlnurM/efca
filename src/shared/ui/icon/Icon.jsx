import clsx from 'clsx'

const Icon = ({ width = 20, height = 20, src, className = '' }) => {
  return (
    <div
      className={clsx('bg-cover bg-no-repeat bg-center', className)}
      style={{
        width,
        height,
        backgroundImage: `url(${src})`,
      }}
    />
  )
}

export default Icon
