const Layout = ({ header = <></>, content = <></>, footer = <></> }) => {
  return (
    <div className="bg-white">
      {header}
      {content}
      {footer}
    </div>
  )
}

export default Layout
