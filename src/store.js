import { create } from "zustand";
import { produce } from 'immer';

const store = set => ({
    tasks: [{
        title: 'TestTask', 
        state: 'ONGOING'
    }],
    draggedTask: null,

    addTask: (title, state) => 
        set(
            produce(store => {
                store.tasks.push({title, state });
            }),

            false,
            'addTask'
        ),

    deleteTask: (title) => 
        set(store => ({
            tasks: store.tasks.filter(task => task.title !== title),
        })
    ),

    setDraggedTask: (title) => set({ draggedTask: title }),
    moveTask: (title, state) => 
        set(store => ({ 
            tasks: store.tasks.map(task => 
                task.title === title ? {title, state } : task
            ),
        })),
});

export const useStore = create(store);