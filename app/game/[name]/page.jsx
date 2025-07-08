'use client'
import { getDiffInMs, msFormat } from '@/utils/timeFuncs';
import { useEffect, useState } from 'react';

const GameModal = ({setStart}) => {

    const starter = () => {
        setStart(new Date())
    }

    return (
        <div className='absolute w-screen h-screen top-0 left-0 flex justify-center items-center bg-zinc-100 opacity-70'>
            <div className='flex flex-col'>
                <h2 className='text-2xl font-serif'>Ready?</h2>
                <button onClick={starter} className='bg-amber-50 outline outline-zinc-400 rounded mt-1'>Start</button>
            </div>
        </div>
    )
}

const Timer = ({start}) => {
    const [showTimer, setShowTimer] = useState(0);
    const [end, setEnd] = useState(new Date()); // Initialize with current timestamp

    useEffect(() => { // useEffect for the timer at the top
        if (start) {
            // Create a new end variable when start changes
            setEnd(new Date())
            const timer = setInterval(() => {
                let now = new Date();
                setEnd(now)
                setShowTimer(getDiffInMs(start, now))
            }, 10)
        return () => {
            if (timer !== undefined) {
                clearInterval(timer)
            }
        }
        } else {
            // Clear timer if start is null/undefined
            clearInterval(timer)
            setShowTimer(0)
        }
    }, [start])

    return (
        <div className='font-mono text-3xl w-10'>
            {msFormat(showTimer)}
        </div>
    )
}

const Game = () => {
    const [start, setStart] = useState(null);
    const [score, setScore] = useState(0);

    return (
        <main className="flex flex-col items-center mt-10">
            {
                (!start) ? <GameModal setStart={setStart} /> : ""
            }
            
            {
                (!start) ? <div className='font-mono text-3xl'>0.00</div> : <Timer start={start}/>
            }
            
            <div>
                this will be the text of the quote it should be center
            </div>

            <ul>
                <input type="radio" />
            </ul>

            <div className='flex'>
                <div></div>
                <div>{score} / 16</div>
                <button>Next</button>
            </div>

        </main>
    )
}

export default Game;