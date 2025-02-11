/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { MenuItem } from "../types";
import { useApi } from "@/hooks/useApi";
import { useRouter } from "next/navigation";

const ItemType = "MENU_ITEM";

interface SideMenuItemProps {
  item: MenuItem;
  index: number;
  parentId?: number | null;
  moveItem: (dragId: number, hoverId: number, parentId?: number | null) => void;
  child?: boolean;
  isEdit: boolean;
  hide?: boolean;
}

const SideMenuItem: React.FC<SideMenuItemProps> = ({
  item,
  parentId,
  moveItem,
  child,
  isEdit,
  hide,
}) => {
  const router = useRouter();
  const [title, setTitle] = React.useState(item.title);
  const [editTitle, setEditTitle] = React.useState(false);
  const [isHidden, setIsHidden] = React.useState(item.visible === false);

  const { request: trackRequest } = useApi<{
    id: number;
    from: string;
    to: string;
  }>();

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { id: item.id, parentId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: isEdit, // Prevent dragging when not in edit mode
  });

  const [, drop] = useDrop({
    accept: ItemType,
    canDrop: () => isEdit,
    hover: (draggedItem: { id: number; parentId?: number | null }) => {
      if (
        isEdit &&
        draggedItem.id !== item.id &&
        draggedItem.parentId === parentId
      ) {
        moveItem(draggedItem.id, item.id, parentId);
      }
    },
    drop: (draggedItem: { id: number; parentId?: number | null }) => {
      if (isEdit && draggedItem.id !== item.id) {
        trackRequest("track", "POST", {
          id: draggedItem.id,
          from: draggedItem.id,
          to: item.id,
        });
      }
    },
  });

  const goToRoute = (
    route: string,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (!isEdit) {
      router.push(route);
    }
  };

  React.useEffect(() => {
    if (hide) setIsHidden(true);
  }, [hide]);

  const nodeRef = React.useRef<HTMLDivElement | null>(null);

  const handleRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      if (isEdit) {
        drag(drop(node));
      }
      nodeRef.current = node;
    },
    [isEdit, drag, drop]
  );

  return (
    <div ref={handleRef} className="w-full cursor-pointer">
      <div
        onClick={(e) => goToRoute(item.target, e)}
        className={`flex items-center justify-between rounded-lg ${
          isDragging ? "opacity-50" : "opacity-100"
        } ${child ? "bg-transparent p-2" : "bg-gray-100/75 my-3 p-3"} ${
          isHidden && isEdit
            ? "opacity-25"
            : isHidden && !isEdit
            ? "hidden"
            : "opacity-100"
        }`}
      >
        <div className="flex items-center gap-2">
          {isEdit && (
            <img
              src="/icons/drag.svg"
              alt="drag icon"
              className="cursor-grab text-gray-500 h-3"
            />
          )}
          {editTitle && isEdit ? (
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                item.title = e.target.value;
              }}
            />
          ) : (
            <span className="text-base text-gray-900">{title}</span>
          )}
        </div>
        {isEdit && (
          <div className="flex items-baseline gap-2">
            <button onClick={() => setEditTitle(!editTitle)}>
              <img
                src="/icons/edit.svg"
                alt="edit icon"
                className="text-gray-400 cursor-pointer h-3"
              />
            </button>
            {isHidden ? (
              <button
                onClick={() => {
                  setIsHidden(false);
                  item.visible = true;
                }}
              >
                <img
                  src="/icons/hide.svg"
                  alt="hide icon"
                  className="text-gray-400 cursor-pointer h-[18px]"
                />
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsHidden(true);
                  item.visible = false;
                  if (item.children) {
                    item.children.forEach((child) => (child.visible = false));
                  }
                }}
              >
                <img
                  src="/icons/show.svg"
                  alt="show icon"
                  className="text-gray-500 cursor-pointer h-3"
                />
              </button>
            )}
          </div>
        )}
      </div>

      {item.children && item.children.length > 0 && (
        <div className="pl-6">
          {item.children.map((child, childIndex) => (
            <SideMenuItem
              key={child.id}
              item={child}
              index={childIndex}
              parentId={item.id}
              moveItem={moveItem}
              child={true}
              isEdit={isEdit}
              hide={isHidden}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SideMenuItem;
