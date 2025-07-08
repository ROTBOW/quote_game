'use client'

// import 'dotenv/config';

import { calculateTotalTime } from "@/utils/timeFuncs";
import getAllScores from "@/firebase/getScoreboard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import sortScores from "@/utils/sortScores";


const Scoreboard = ({scores}) => {
  
  
  return (
  <div className="w-2/3 flex flex-col items-center bg-amber-50 rounded">
    <h1 className="text-3xl underline mb-4">Scoreboard</h1>

    {scores && scores.length > 0 ? (
      <ol className="ml-0.5">
        {scores.map((score, index) => (
          <li
            key={index}
            className={`p-2 rounded shadow-md ${
              index % 2 === 0 ? 'bg-amber-100' : 'bg-amber-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2>{score.name}</h2>
                <h3>Score: {score.score}/15</h3>
                <h3>Time: {calculateTotalTime(score)}</h3>
              </div>
              <span className="text-sm text-gray-500 font-medium">
                Rank #{index + 1}
              </span>
            </div>
          </li>
        ))}
      </ol>
    ) : (
      <p>No scores yet. Be the first to submit!</p>
    )}
  </div>
  )
}

const Home = () => {
  const [scoreboard, setscoreboard] = useState(null);
  const [name, setName] = useState('');
  const router = useRouter();

  useEffect(() => {
    getAllScores()
    .then(res => {
      setscoreboard(sortScores(res));
    })
    
  }, [])

  const handleStart = () => {
    if (name.trim() !== '') {
      router.push(`/game/${name.trim()}`)
    } else {
      alert('you need to put a name before you can play!')
    }

  }
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
     <h1 className="text-center text-2xl">
      Quotes from <b className="text-emerald-300">Hans</b>, <b className="text-sky-300">Jason</b> and <b className="text-red-400">Josiah</b><br/>but can you tell who said which one?<br/><i className="text-sm">its not hard lol</i>
    </h1>
    
    <div className="flex flex-col">
      <p className="w-[14rem] text-sm">When you hit start (and enter your name) you will see a list of quotes.<br/>You'll score based on how many you get right and how quickly you finish.</p>
      <input type='text' className="bg-amber-50 rounded p-1 outline outline-zinc-400" placeholder="your name" onChange={(e) => {setName(e.target.value)}}/>
      <button
        className="p-1 mt-1 bg-amber-50 rounded-xl outline outline-zinc-400 hover:bg-amber-100 transition-all cursor-pointer text-center"
        onClick={handleStart}
        >
        Start Game
      </button>
    </div>
    
    <Scoreboard scores={scoreboard}/>
    </div>
  );
}

export default Home;