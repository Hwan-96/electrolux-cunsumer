import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import useMenuStore from '@/components/admin/store/menuStore';

const AsideContainer = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: 230px;
  height: 100%;
  padding-top: 80px;
  background-color: #fff;
  transition: all 0.3s;
  z-index: 900;
`;

const AsideMenu = styled.div`
  overflow-y: auto;
`;

const AsideMenuList = styled.ul`
  margin-bottom: 20px;
`;

const AsideMenuListItem = styled.li`
  background-color: #fff;
  border-bottom: 1px solid #ccc;

  a{
    display: flex;
    position: relative;
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: left;
    font-size: 16px;
    padding: 0 20px;
    transition: background-color 0.3s;
  }

  &.on {
    a{
      background-color: #e6e9ee;
    }
  }
`;

const ArrowRight = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  i{
    width: 25px;
    height: 25px;
    background-image: url(/admin/icon/arrow-right-s-line.svg);
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    transition: all 0.3s;
    opacity: 0;
  }

  ${AsideMenuListItem}.on & {
    i {
      opacity: 1;
    }
  }
`;

const Aside = () => {
  const { selectedMenu, subMenus } = useMenuStore();
  const location = useLocation();

  const isActivePath = (menuPath) => {
    const currentPath = location.pathname;
    return currentPath.startsWith(menuPath);
  };

  return (
    <AsideContainer>
      <AsideMenu>
        <AsideMenuList>
          {subMenus[selectedMenu]?.map((submenu) => (
            <AsideMenuListItem 
              key={submenu.path}
              className={isActivePath(submenu.path) ? 'on' : ''}
            >
              <Link to={submenu.path}>
                <span>{submenu.name}</span>
                <ArrowRight>
                  <i className="i_arrow_right"></i>
                </ArrowRight>
              </Link>
            </AsideMenuListItem>
          ))}
        </AsideMenuList>
      </AsideMenu>
    </AsideContainer>
  );
};

export default Aside;
