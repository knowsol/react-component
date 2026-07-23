import { startTransition, useState } from "react";
import styled from "styled-components";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import Gnb from "@/components/GNB/GNB";
import { Icon } from "@/components/Icon/Icon";
import { IconSidebar } from "@/components/Sidebar";
import { iconSidebarMenus } from "@/components/Sidebar/iconSidebarData";
import BookmarkButton from "@/components/Table/TableHeader/BookmarkButton";
import { tableHeaderData } from "@/components/Table/TableHeader/tableHeaderData";
import LnbTree from "@/components/Tree/LnbTree";
import { LnbTreeData } from "@/components/Tree/treeData";
import { Page } from "@/styles/Common";

const AdminRoot = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: ${({ theme }) => theme.color.neutral[50]};
`;

const AdminBody = styled.div`
    flex: 1 1 auto;
    display: flex;
    min-height: 0;
`;

const ContentArea = styled.main`
    flex: 1 1 auto;
    min-width: 0;
    padding: 28px 32px 40px;
    background: ${({ theme }) => theme.color.pure.white};
    border-top-left-radius: 32px;
`;

const ContentHeader = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: ${({ theme }) => theme.spacing[24]};
    margin-bottom: ${({ theme }) => theme.spacing[24]};
`;

const PageTitle = styled.h1`
    display: inline-flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[4]};
    color: ${({ theme }) => theme.color.neutral[900]};
    font-size: ${({ theme }) => theme.font.size.large};
    font-weight: ${({ theme }) => theme.font.weight.semibold};
    line-height: 26px;
`;

const Breadcrumbs = styled.nav`
    display: inline-flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[4]};
    min-height: 24px;
`;

const Breadcrumb = styled.span`
    display: inline-flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[4]};
    color: ${({ theme }) => theme.color.neutral[600]};
    font-size: ${({ theme }) => theme.font.size.xsmall};
    line-height: 18px;

    & + &::before {
        content: "";
        width: ${({ theme }) => theme.icon.xsmall};
        height: ${({ theme }) => theme.icon.xsmall};
        background-color: ${({ theme }) => theme.color.neutral[600]};
        mask: url("/assets/icons/arrow_right.svg") center / contain no-repeat;
        -webkit-mask: url("/assets/icons/arrow_right.svg") center / contain no-repeat;
    }
`;

const AdminPageBody = styled.div`
    width: 100%;

    & > ${Page} {
        padding: ${({ theme }) => theme.spacing[32]} 0 0;
    }
`;

function getChildren(node) {
    return node.children ?? node.sub ?? [];
}

function findTreePath(nodes, selectedId, ancestors = []) {
    for (const node of nodes) {
        const currentPath = [...ancestors, node];
        if (node.id === selectedId) return currentPath;

        const children = getChildren(node);
        const childPath = children.length ? findTreePath(children, selectedId, currentPath) : [];
        if (childPath.length) return childPath;
    }

    return [];
}

function getActiveMenu(pathname) {
    return iconSidebarMenus.find((menu) => pathname === menu.path || pathname.startsWith(`${menu.path}/`)) ?? iconSidebarMenus[0];
}

function getSelectedTreeId(pathname, activeMenu) {
    if (!activeMenu || pathname === activeMenu.path) return null;

    return pathname
        .slice(activeMenu.path.length)
        .split("/")
        .filter(Boolean)[0] ?? null;
}

function Admin() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [pendingMenu, setPendingMenu] = useState(null);
    const isAdminHome = pathname === "/admin" || pathname === "/admin/";
    const activeMenu = isAdminHome ? null : getActiveMenu(pathname);
    const activeMenuId = pendingMenu?.fromPath === pathname ? pendingMenu.id : activeMenu?.id ?? null;
    const selectedTreeId = getSelectedTreeId(pathname, activeMenu);
    const selectedTreePath = selectedTreeId ? findTreePath(LnbTreeData, selectedTreeId) : [];
    const selectedTreeNode = selectedTreePath.at(-1);
    const breadcrumbItems = isAdminHome
        ? tableHeaderData.breadcrumbs.map((label, index) => ({ id: `admin-home-${index}`, label }))
        : selectedTreePath.length
          ? selectedTreePath
          : activeMenu
            ? [{ id: activeMenu.id, label: activeMenu.label }]
            : [];
    const pageTitle = isAdminHome ? tableHeaderData.pageTitle : selectedTreeNode?.label ?? activeMenu?.label;

    const handleMenuChange = (menu) => {
        if (!menu.path) return;

        setPendingMenu({ id: menu.id, fromPath: pathname });
        startTransition(() => navigate(menu.path));
    };

    const handleTreeSelect = (node) => {
        if (!activeMenu) return;

        navigate(`${activeMenu.path}/${node.id}`);
    };

    if (selectedTreeId && !selectedTreeNode) {
        return <Navigate to={activeMenu.path} replace />;
    }

    return (
        <AdminRoot>
            <Gnb logoutPath="/" />
            <AdminBody>
                <IconSidebar ariaLabel="관리자 메뉴" menus={iconSidebarMenus} activeMenuId={activeMenuId} onMenuChange={handleMenuChange}>
                    <LnbTree nodes={LnbTreeData} selectedId={selectedTreeId} onSelect={handleTreeSelect} />
                </IconSidebar>
                <ContentArea>
                    <ContentHeader>
                        <PageTitle>
                            {pageTitle}
                            <BookmarkButton key={isAdminHome ? "admin-home" : activeMenu?.id} defaultActive={isAdminHome ? tableHeaderData.bookmarked : false} />
                        </PageTitle>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Breadcrumb aria-label="홈">
                                <Icon name="home" size="xsmall" />
                            </Breadcrumb>
                            {breadcrumbItems.map((breadcrumb, index) => (
                                <Breadcrumb key={breadcrumb.id} aria-current={index === breadcrumbItems.length - 1 ? "page" : undefined}>
                                    {breadcrumb.label}
                                </Breadcrumb>
                            ))}
                        </Breadcrumbs>
                    </ContentHeader>
                    <AdminPageBody>
                        <Outlet />
                    </AdminPageBody>
                </ContentArea>
            </AdminBody>
        </AdminRoot>
    );
}

export default Admin;
