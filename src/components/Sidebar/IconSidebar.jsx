import { useState } from "react";
import styled from "styled-components";
import { Icon } from "@/components/Icon/Icon";
import Tooltip from "@/components/Tooltip/Tooltip";
import LnbTree from "@/components/Tree/LnbTree";
import { iconSidebarMenus } from "./iconSidebarData";

const SidebarShell = styled.aside`
    flex: 0 0 auto;
    display: flex;
    align-self: stretch;
    min-height: 0;
    padding-right: ${({ $expanded }) => ($expanded ? "0" : "30px")};
    background: ${({ theme }) => theme.color.secondary.c50};
    transition: padding-right 180ms ease;
`;

const IconRail = styled.nav`
    width: 56px;
    flex: 0 0 56px;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1;
    overflow: visible;
    background: transparent;
`;

const RailCorner = styled.svg`
    width: 56px;
    height: 16px;
    flex: 0 0 16px;
    display: block;
    margin-top: -16px;
    color: ${({ theme }) => theme.color.brand.blue};

    .panel-fill {
        fill: ${({ theme }) => theme.color.secondary.c50};
    }
`;

const RailBody = styled.div`
    width: 56px;
    flex: 1 1 auto;
    min-height: 0;
    margin-top: -1px;
    padding-top: ${({ theme }) => theme.spacing[40]};
    background: ${({ theme }) => theme.color.brand.blue};
    border-top-right-radius: 16px;
`;

const IconList = styled.ul`
    width: 56px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[8]};
    margin: 0;
    padding: 0;
    list-style: none;
`;

const IconItem = styled.li`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const IconMenuButton = styled.button`
    width: 36px;
    height: 36px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: 0;
    border-radius: ${({ theme }) => theme.border.radius.xsmall};
    background: ${({ theme, $active }) => ($active ? `${theme.color.neutral[900]}4D` : "transparent")};
    cursor: pointer;

    &:hover,
    &:focus-visible {
        background: ${({ theme }) => `${theme.color.neutral[900]}4D`};
    }

    &:focus-visible {
        outline: 2px solid ${({ theme }) => theme.color.pure.white};
        outline-offset: -2px;
    }
`;

const MenuPanel = styled.div`
    width: ${({ $expanded, $panelWidth, $collapsedWidth }) => ($expanded ? $panelWidth : $collapsedWidth)};
    flex: 0 0 ${({ $expanded, $panelWidth, $collapsedWidth }) => ($expanded ? $panelWidth : $collapsedWidth)};
    overflow: hidden;
    background: ${({ theme }) => theme.color.secondary.c50};
    transition:
        width 180ms ease,
        flex-basis 180ms ease;
`;

const MenuPanelInner = styled.div`
    width: ${({ $panelWidth }) => $panelWidth};
    min-height: 100%;
    padding: calc(${({ theme }) => theme.spacing[40]} - 1px) ${({ theme }) => theme.spacing[16]} ${({ theme }) => theme.spacing[24]};
    opacity: ${({ $expanded }) => ($expanded ? 1 : 0)};
    visibility: ${({ $expanded }) => ($expanded ? "visible" : "hidden")};
    transition:
        opacity 120ms ease,
        visibility 120ms ease;
`;

export function IconSidebar({
    menus = iconSidebarMenus,
    activeMenuId,
    defaultActiveMenuId,
    defaultExpanded = true,
    expanded,
    panelWidth = "208px",
    collapsedWidth = "0px",
    ariaLabel = "아이콘 메뉴",
    children,
    className,
    onMenuChange,
    onExpandedChange,
}) {
    const firstMenuId = menus[0]?.id ?? "";
    const [internalActiveMenuId, setInternalActiveMenuId] = useState(defaultActiveMenuId ?? firstMenuId);
    const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
    const currentActiveMenuId = activeMenuId !== undefined ? activeMenuId : internalActiveMenuId;
    const currentExpanded = expanded ?? internalExpanded;

    const handleIconClick = (menu) => {
        const alreadyActive = currentActiveMenuId === menu.id;
        const nextExpanded = alreadyActive ? !currentExpanded : true;

        if (activeMenuId === undefined) {
            setInternalActiveMenuId(menu.id);
        }

        if (expanded === undefined) {
            setInternalExpanded(nextExpanded);
        }

        onMenuChange?.(menu);
        onExpandedChange?.(nextExpanded);
    };

    return (
        <SidebarShell className={className} $expanded={currentExpanded} data-expanded={currentExpanded}>
            <IconRail aria-label={ariaLabel}>
                <RailCorner width="56" height="16" viewBox="0 0 56 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <rect width="56" height="16" fill="currentColor" />
                    <path className="panel-fill" d="M0 0H56V16H16C7.16344 16 0 8.83656 0 0Z" />
                </RailCorner>
                <RailBody>
                    <IconList>
                        {menus.map((menu) => {
                            const active = currentActiveMenuId === menu.id && currentExpanded;

                            return (
                                <IconItem key={menu.id}>
                                    <Tooltip content={menu.label} placement="right">
                                        <IconMenuButton
                                            type="button"
                                            $active={active}
                                            aria-label={menu.label}
                                            aria-expanded={active}
                                            data-path={menu.path}
                                            onClick={() => handleIconClick(menu)}
                                        >
                                            <Icon name={menu.iconName} size="primary" />
                                        </IconMenuButton>
                                    </Tooltip>
                                </IconItem>
                            );
                        })}
                    </IconList>
                </RailBody>
            </IconRail>
            <MenuPanel $expanded={currentExpanded} $panelWidth={panelWidth} $collapsedWidth={collapsedWidth}>
                <MenuPanelInner $expanded={currentExpanded} $panelWidth={panelWidth}>
                    {children ?? <LnbTree />}
                </MenuPanelInner>
            </MenuPanel>
        </SidebarShell>
    );
}

export default IconSidebar;
