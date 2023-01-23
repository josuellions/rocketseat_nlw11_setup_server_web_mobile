import './styles.css';
import clsx from 'clsx';
import dayjs from "dayjs";
import { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';

import { ProgressBar } from '../ProgressBar';
import { HabitList } from '../HabitList';


interface HabitDayProps {
  defaultCompleted?: number,
  amount?: number,
  date: Date
}

export function HabitDay({ amount = 0, defaultCompleted = 0, date }:HabitDayProps) {
  //const days = Array.from(Array(31).keys())
  const [ completed, setCompleted ] = useState(defaultCompleted);
  const completedProcentage = amount > 0 ? Math.round((completed / amount) * 100) : 0
  const dayOfWeek = dayjs(date).format('dddd');
  const dayAndMonth = dayjs(date).format('DD/MM');

  function handleCompletedChanged(completed: number) {
    setCompleted(completed)
  }

  return (
    //<div key={date.toString()} className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg"/>*/}
    <Popover.Root>
      <Popover.Trigger 
        className={clsx('w-10 h-10  border-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-background', {
          'bg-zinc-900 border-zinc-800 ' : completedProcentage === 0,
          'bg-violet-900 border-violet-700' : completedProcentage > 0 && completedProcentage < 20,
          'bg-violet-800 border-violet-600' : completedProcentage >= 20 && completedProcentage < 40,
          'bg-violet-700 border-violet-500' : completedProcentage >= 40 && completedProcentage < 60,
          'bg-violet-600 border-violet-400' : completedProcentage >= 60 && completedProcentage < 80,
          'bg-violet-500 border-violet-300' : completedProcentage >= 80
        })}
      />

        <Popover.Portal>
          <Popover.Content className='min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col'>
            <span className='font-semibold text-zinc-400 '>{dayOfWeek}</span>
            <span className='font-extrabold text-3xl leading-tight mt-1'>{dayAndMonth}</span>

            <ProgressBar progress={completedProcentage}/>

            <HabitList date={date} onCompletedChanged={handleCompletedChanged}/>

            <Popover.Arrow className='fill-zinc-900' height={8} width={16}/>
          </Popover.Content>
        </Popover.Portal>
    </Popover.Root>
  )
}
