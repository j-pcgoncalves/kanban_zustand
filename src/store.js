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
});

export const useStore = create(store);