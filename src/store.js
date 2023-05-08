import { create } from "zustand";
import { produce } from 'immer';

const store = set => ({
    tasks: [{
        title: 'TestTask', 
        state: 'ONGOING'
    }],

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
});

export const useStore = create(store);