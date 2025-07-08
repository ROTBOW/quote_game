'use client'
import { useRouter, useParams } from 'next/navigation';
import { getDiffInMs, msFormat } from '@/utils/timeFuncs';
import { useEffect, useState } from 'react';
import { shuffleCopy } from '@/utils/utils';
import addScore from '@/firebase/addScore';
import { QUOTES } from '@/data/quotes';

const GameModal = ({setStart}) => {

    const starter = () => {
        setStart(new Date())
    }

    return (
        <div className='absolute w-screen h-screen top-0 left-0 flex justify-center items-center bg-zinc-100 opacity-70 z-50'>
            <div className='flex flex-col'>
                <h2 className='text-2xl font-serif'>Ready?</h2>
                <button onClick={starter} className='bg-amber-50 outline outline-zinc-400 rounded mt-1 hover:bg-amber-100 cursor-pointer'>Start</button>
            </div>
        </div>
    )
}

const Timer = ({start, setEnd}) => {
    const [showTimer, setShowTimer] = useState(0);

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
        <div className='font-mono text-3xl w-[5rem] text-center'>
            {msFormat(showTimer)}
        </div>
    )
}

const Game = () => {
    const [quotes, setQuotes] = useState(QUOTES);
    const [end, setEnd] = useState(new Date());
    const [start, setStart] = useState(null);
    const [score, setScore] = useState(0);
    const [idx, setIdx] = useState(0);

    // answer feedback
    const [showRight, setShowRight] = useState(false);
    const [showWrong, setShowWrong] = useState(false);

    const params = useParams();
    const router = useRouter();

    useEffect(() => {
        setQuotes(shuffleCopy(QUOTES));
    }, [])

    const handleButton = (guess) => {
        let newScore = score + 1
        if (guess === quotes[idx].speaker) {
            setScore(newScore);
            setShowRight(true)
            setTimeout(() => (setShowRight(false)), 500);

        } else {
            newScore -= 1;
            setShowWrong(true)
            setTimeout(() => (setShowWrong(false)), 500)
        }

        if (idx + 1 >= QUOTES.length) {
            addScore({
                score: newScore,
                name: params.name.trim().replace('%20', ' '),
                time: getDiffInMs(start, end)
            });
            router.push('/');
        } else {
            setIdx(idx => (idx + 1));
        }
        
    }

    const buttonStyle = 'flex flex-col bg-amber-50 p-4 rounded outline outline-zinc-400 cursor-pointer hover:bg-amber-100 sm:mx-5 mx-1.5'
    return (
        <main className="flex flex-col items-center pt-10 h-screen">
            {
                (!start) ? <GameModal setStart={setStart} /> : ""
            }
            
            {
                (!start) ? <div className='font-mono text-3xl w-10 text-center'>0.00</div> : <Timer start={start} setEnd={setEnd}/>
            }
            
            <div className={`${(!start ? 'blur' : '')} h-3/6 text-3xl text-center flex items-center p-2`}>
                {quotes[idx].quote}
            </div>


            <ul className={`${(!start ? 'blur' : '')} flex justify-between  mb-9 text-3xl`}>
                <button className={`${buttonStyle} text-emerald-300`} onClick={() => {handleButton(1)}}>Hans</button>
                <button className={`${buttonStyle} text-sky-300`} onClick={() => {handleButton(0)}}>Jason</button>
                <button className={`${buttonStyle} text-red-400`} onClick={() => {handleButton(2)}}>Josiah</button>
            </ul>

            <div className='flex items-center'>
                <div className={`${showWrong ? "animate-bounce" : "opacity-0"} text-red-500 text-2xl sm:text-3xl transition-all`}>wrong</div>
                <div className='font-sans text-2xl mx-10'>{score} / {QUOTES.length}</div>
                <div className={`${showRight ? "animate-bounce" : "opacity-0"} text-green-500 text-2xl sm:text-3xl transition-all`}>right</div>
            </div>
        </main>
    )
}

export default Game;