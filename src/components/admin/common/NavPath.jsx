import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import useMenuStore from '@/components/admin/store/menuStore';

const NavPathContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
  padding-bottom: 10px;
  border-bottom: 1px solid #898989;
`;

const PageNav = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  p{
    font-size: 14px;
    color: #898989;

    &.active{
      color: #000;
    }
  }
`;

const NavPath = () => {
  const { selectedMenu, subMenus, setCurrentMenuByPath } = useMenuStore();
  const location = useLocation();

  useEffect(() => {
    setCurrentMenuByPath(location.pathname);
  }, [location.pathname, setCurrentMenuByPath]);

  const findCurrentMenu = () => {
    const currentPath = location.pathname;
    const menu = subMenus[selectedMenu]?.find(menu => {
      // 메인 메뉴 경로와 현재 경로를 비교
      const menuPath = menu.path.replace('/:id', '');
      return currentPath.startsWith(menuPath) || 
        (menu.subMenus?.some(subMenu => {
          // 서브메뉴 경로와 현재 경로를 비교
          const subMenuPath = subMenu.path.replace('/:id', '');
          return currentPath.startsWith(subMenuPath);
        }));
    });

    if (!menu) return null;

    const subMenu = menu.subMenus?.find(subMenu => {
      const subMenuPath = subMenu.path.replace('/:id', '');
      return currentPath.startsWith(subMenuPath);
    });

    return { menu, subMenu };
  };

  const currentMenu = findCurrentMenu();
  
  // 특별한 서브경로 체크 (new, batch, add)
  const isSpecialSubPath = location.pathname.includes('/new') || 
                          location.pathname.includes('/batch') || 
                          location.pathname.includes('/add');
                          
  // 디테일 페이지 체크 로직 수정 - 특별 서브 경로도 포함
  const isDetailPage = location.pathname.includes('/:id') || 
                        /\d+$/.test(location.pathname) || 
                        isSpecialSubPath;

  return (
    <NavPathContainer>
      <PageNav>
        <p>{selectedMenu}</p>
        {currentMenu?.menu && (
          <>
            <p>&gt;</p>
            <p className={!isDetailPage ? 'active' : ''}>{currentMenu.menu.name}</p>
            {currentMenu?.subMenu && isDetailPage && (
              <>
                <p>&gt;</p>
                <p className="active">{currentMenu.subMenu.name}</p>
              </>
            )}
          </>
        )}
      </PageNav>
    </NavPathContainer>
  );
};

export default NavPath;
