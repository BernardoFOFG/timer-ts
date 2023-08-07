/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/no-absolute-path */
import { HeaderContainer } from './styles'
import Logo from '../../assets/logo-ignite.svg'
import { Timer, Scroll } from 'phosphor-react'
import { NavLink } from 'react-router-dom'

export const Header = () => {
  return (
    <HeaderContainer>
      <img src={Logo} />
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
