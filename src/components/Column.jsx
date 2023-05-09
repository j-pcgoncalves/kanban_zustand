import { useStore } from '../store';
import { shallow } from 'zustand/shallow';
import './Column.css';
import Task from './Task';
import { useState } from 'react';
import classNames from 'classnames';

export default function Column({ state }) {
    const [text, setText] = useState('');
    const [open, setOpen] = useState(false);
    const [drop, setDrop] = useState(false);

    const tasks = useStore(store => 
        store.tasks.filter(task => task.state === state),
        shallow
    );

    const setDraggedTask = useStore(store => store.setDraggedTask);
    const draggedTask = useStore(store => store.draggedTask);
    const moveTask = useStore(store => store.moveTask);
    const addTask = useStore(store => store.addTask);

    return (
        <div 
            className={classNames('column', { drop: drop })} 
            onDragOver={e => {
                e.preventDefault();
                setDrop(true);
            }}
            onDragLeave={e => {
                e.preventDefault();
                setDrop(false);
            }}
            onDrop={e => {
                setDrop(false);
                setDraggedTask(null);
                moveTask(draggedTask, state);
            }}
        >
            <div className='titleWrapper'>
                <p>{state}</p>
                <button onClick={() => setOpen(true)}>Add</button>
            </div>
            {tasks.map(task => (
                <Task title={task.title} key={task.title} />
            ))}
            {open && (
                <div className='Modal'>
                    <div className='modalContent'>
                        <input onChange={e => setText(e.target.value)} value={text} />
                        <button 
                            onClick={() => {
                                addTask(text, state);
                                setText('');
                                setOpen(false);
                            }}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}