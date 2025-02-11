/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import SideMenuItem from "./SideMenuItem";
import { MenuItem } from "../types";
import { useApi } from "@/hooks/useApi";

interface SideMenuListProps {
  isEdit: boolean;
  save: boolean;
}

const SideMenuList: React.FC<SideMenuListProps> = ({ isEdit, save }) => {
  const [menuItems, setMenuItems] = React.useState<MenuItem[]>([]);
  const { data, request } = useApi<MenuItem[]>();
  const { request: saveNav } = useApi<MenuItem[]>();

  React.useEffect(() => {
    request("nav");
  }, [request]);

  React.useEffect(() => {
    if (data) {
      setMenuItems(data);
    }
  }, [data]);

  React.useEffect(() => {
    if (save) {
      saveNav("nav", "POST", menuItems);
    }
  }, [save, menuItems]);

  const moveItem = (
    dragId: number,
    hoverId: number,
    parentId?: number | null
  ) => {
    const updatedItems = moveNestedItem(menuItems, dragId, hoverId, parentId);
    setMenuItems(updatedItems);
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-4 overflow-y-auto h-full lg:pb-40 pb-20 custom-scrollbar">
        {menuItems.map((item, index) => (
          <SideMenuItem
            key={item?.id}
            index={index}
            item={item}
            moveItem={moveItem}
            isEdit={isEdit}
          />
        ))}
      </div>
    </DndProvider>
  );
};

const moveNestedItem = (
  items: MenuItem[],
  dragId: number,
  hoverId: number,
  parentId?: number | null
): MenuItem[] => {
  let draggedItem: MenuItem | undefined;

  // Remove dragged item from its current position
  const filteredItems = items
    .map((item) => {
      if (item.id === dragId) {
        draggedItem = item;
        return null; // Remove from list
      }
      if (item.children) {
        const updatedChildren = item.children.filter((child) => {
          if (child.id === dragId) {
            draggedItem = child;
            return false; // Remove child from parent
          }
          return true;
        });
        if (updatedChildren.length !== item.children.length)
          return { ...item, children: updatedChildren };
      }
      return item;
    })
    .filter(Boolean) as MenuItem[];

  if (!draggedItem) return items;

  // Ensure dragged item can only be moved within its parent
  if (parentId) {
    const parent = filteredItems.find((item) => item.id === parentId);
    if (parent && parent.children) {
      const targetIndex = parent.children.findIndex(
        (child) => child.id === hoverId
      );
      parent.children.splice(targetIndex + 1, 0, draggedItem);
    }
  } else {
    const targetIndex = filteredItems.findIndex((item) => item.id === hoverId);
    if (targetIndex !== -1) {
      filteredItems.splice(targetIndex + 1, 0, draggedItem);
    }
  }

  return filteredItems;
};

export default SideMenuList;
