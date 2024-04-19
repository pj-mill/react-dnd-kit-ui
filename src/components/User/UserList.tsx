import { useState } from "react";
import { User } from "./User";
import { DummyData } from "../../data/DummyData";
import UserItem from "./UserItem";

import { DndContext, DragEndEvent } from "@dnd-kit/core";

import { SortableContext, arrayMove } from "@dnd-kit/sortable";

import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

const UserList = () => {
    const [userData, setUserData] = useState<User[]>(DummyData);

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setUserData((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }

    return (
        <div className="'max-w-2xl mx-auto grid gap-2 my-10 p-10">
            <h2 className="text-2xl font-bold mb-4">User List</h2>
            <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={handleDragEnd}>
                <SortableContext items={userData}>
                    {userData.map((user) => (
                        <UserItem key={user.id} user={user} />
                    ))}
                </SortableContext>
            </DndContext>
        </div>
    );
};

export default UserList;
