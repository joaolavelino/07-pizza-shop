import { Link, useLocation, type LinkProps } from 'react-router-dom'

export interface NavigationLinkProps extends LinkProps {}

export const NavigationLink: React.FC<NavigationLinkProps> = (props) => {
  const { pathname } = useLocation()

  return (
    <Link
      data-current={pathname === props.to}
      {...props}
      className="text-muted-foreground hover:text-foreground data-[current=true]:text-foreground flex items-center gap-1.5 text-sm font-medium"
    ></Link>
  )
}
