import { useState } from "react";
import styled from "styled-components";
import { ICON } from "@/components/Icon/IconData";
import { LnbTreeData } from "./treeData";

const LnbTreeStyle = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 250px;
    background-color: ${({ theme }) => theme.color.secondary.c50};
`;

const LnbNode = styled.div`
    width: 100%;
    & + & {
        margin-top: ${({ theme }) => theme.spacing[8]};
    }
`;

const LnbMenuWrap = styled.div`
    width: 100%;
    border-radius: ${({ theme }) => theme.border.radius.xsmall};
`;

const MenuItem = styled.button`
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 36px;
    padding: 6px 8px 6px 4px;
    border: none;
    border-radius: ${({ theme }) => theme.border.radius.xsmall};
    background-color: ${({ theme, $active }) => ($active ? theme.color.primary[100] : theme.color.secondary.c50)};
    color: ${({ theme, $depth }) => ($depth === 0 ? theme.color.neutral[800] : theme.color.neutral[800])};
    cursor: pointer;
    font-size: ${({ theme }) => theme.font.size.primary};
    font-weight: ${({ theme }) => theme.font.weight.medium};
    line-height: 160%;
    text-align: left;

    &:hover {
        background-color: ${({ theme }) => theme.color.primary[100]};
    }
`;

const Marker = styled.span`
    width: ${({ theme }) => theme.icon.small};
    height: ${({ theme }) => theme.icon.small};
    flex: 0 0 ${({ theme }) => theme.icon.small};
    margin-left: ${({ $depth }) => $depth * 16}px;

    &::before {
        content: "";
        display: ${({ $depth }) => ($depth === 0 ? "none" : "block")};
        width: 6px;
        height: 6px;
        margin: 5px;
        border-left: 1px solid ${({ theme }) => theme.color.neutral[500]};
        border-bottom: 1px solid ${({ theme }) => theme.color.neutral[500]};
    }
`;

const MenuLabel = styled.span`
    flex: 1;
    min-width: 0;
`;

const Arrow = styled.span`
    width: ${({ theme }) => theme.icon.small};
    height: ${({ theme }) => theme.icon.small};
    flex: 0 0 ${({ theme }) => theme.icon.small};
    opacity: ${({ $visible, $depth }) => {
        if (!$visible) return 0.45;
        return $depth > 0 ? 0.3 : 1;
    }};
    background-color: ${({ theme, $depth }) => ($depth > 0 ? theme.color.neutral[800] : theme.color.neutral[900])};
    mask: url("${ICON.down}") center / contain no-repeat;
    -webkit-mask: url("${ICON.down}") center / contain no-repeat;
    transform: ${({ $open }) => ($open ? "rotate(0deg)" : "rotate(-90deg)")};
    transform-origin: center;
    transition:
        transform 180ms ease,
        opacity 180ms ease;
`;

const SubMenu = styled.div`
    display: grid;
    grid-template-rows: ${({ $open }) => ($open ? "1fr" : "0fr")};
    margin-top: ${({ $open }) => ($open ? "10px" : "0")};
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    overflow: hidden;
    transition:
        grid-template-rows 200ms ease,
        margin-top 200ms ease,
        opacity 160ms ease;
`;

const SubMenuInner = styled.div`
    min-height: 0;
    overflow: hidden;
`;

function getChildren(node) {
    return node.children ?? node.sub ?? [];
}

function getInitialOpenIds(nodes) {
    return new Set(nodes.filter((node) => node.open).map((node) => node.id));
}

function findInitialSelectedId(nodes) {
    for (const node of nodes) {
        if (node.active) return node.id;

        const children = getChildren(node);
        const childSelectedId = children.length ? findInitialSelectedId(children) : null;
        if (childSelectedId) return childSelectedId;
    }

    return null;
}

function findNodeById(nodes, id) {
    for (const node of nodes) {
        if (node.id === id) return node;

        const children = getChildren(node);
        const childNode = children.length ? findNodeById(children, id) : null;
        if (childNode) return childNode;
    }

    return null;
}

function getDescendantIds(node) {
    const children = node ? getChildren(node) : [];
    if (!children.length) return [];

    return children.flatMap((child) => [child.id, ...getDescendantIds(child)]);
}

function LnbTreeNode({ node, depth, openIds, selectedId, onSelect }) {
    const children = getChildren(node);
    const hasChildren = Boolean(children.length);
    const isOpen = hasChildren && openIds.has(node.id);
    const isSelected = selectedId === node.id;

    return (
        <LnbNode>
            <LnbMenuWrap>
                <MenuItem type="button" $depth={depth} $active={isSelected} aria-expanded={hasChildren ? isOpen : undefined} onClick={() => onSelect(node.id, hasChildren)}>
                    <Marker $depth={depth} />
                    <MenuLabel>{node.label}</MenuLabel>
                    <Arrow $visible $open={isOpen} $depth={depth} />
                </MenuItem>
            </LnbMenuWrap>
            {hasChildren && (
                <SubMenu $open={isOpen}>
                    <SubMenuInner>
                        {children.map((child) => (
                            <LnbTreeNode key={child.id} node={child} depth={depth + 1} openIds={openIds} selectedId={selectedId} onSelect={onSelect} />
                        ))}
                    </SubMenuInner>
                </SubMenu>
            )}
        </LnbNode>
    );
}

function LnbTree() {
    const [openIds, setOpenIds] = useState(() => getInitialOpenIds(LnbTreeData));
    const [selectedId, setSelectedId] = useState(() => findInitialSelectedId(LnbTreeData));

    const toggleOpen = (id, hasChildren) => {
        if (!hasChildren) return;

        setOpenIds((current) => {
            const next = new Set(current);
            const targetNode = findNodeById(LnbTreeData, id);

            if (next.has(id)) {
                next.delete(id);
                getDescendantIds(targetNode).forEach((descendantId) => next.delete(descendantId));
            } else {
                next.add(id);
            }

            return next;
        });
    };

    const selectMenu = (id, hasChildren) => {
        setSelectedId(id);
        toggleOpen(id, hasChildren);
    };

    return (
        <LnbTreeStyle>
            {LnbTreeData.map((node) => (
                <LnbTreeNode key={node.id} node={node} depth={0} openIds={openIds} selectedId={selectedId} onSelect={selectMenu} />
            ))}
        </LnbTreeStyle>
    );
}

export default LnbTree;
