'use client'

// import 'dotenv/config';

import { calculateTotalTime } from "@/utils/timeFuncs";
import getAllScores from "@/firebase/getScoreboard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import sortScores from "@/utils/sortScores";


const Scoreboard = ({scores}) => {
  
  
  return (
  <div className="w-5/6 md:w-1/3 flex flex-col items-center bg-amber-50 rounded">
    <h1 className="text-3xl underline mb-4">Scoreboard</h1>

    {scores && scores.length > 0 ? (
      <ol className="ml-0.5 w-full pb-1 mb-2">
        {scores.map((score, index) => (
          <li
            key={index}
            className={`p-2 rounded shadow-md mx-4 my-1
              ${
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
      <p>Loading...</p>
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
    <div className="flex flex-col items-center">
      <h1 className="text-center text-2xl mt-10">
        Quotes from <b className="text-emerald-300">Hans</b>, <b className="text-sky-300">Jason</b> and <b className="text-red-400">Josiah</b><br/>but can you tell who said which one?<br/><i className="text-sm">(its not hard lol)</i>
      </h1>
    
      <div className="flex flex-col my-20">
        <p className="w-[14rem] text-sm">After hitting start you will see one quote at a time<br/>You'll rank based on how many you get right and how quickly you finish.</p>
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