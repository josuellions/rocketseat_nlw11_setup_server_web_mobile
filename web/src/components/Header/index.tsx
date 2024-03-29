import { Plus, X } from 'phosphor-react';
//import { useState } from 'react';

import * as Dialog from '@radix-ui/react-dialog';

import LogoImage from '../../assets/logo.svg';
import { HabitNewForm } from '../HabitNewForm';

export function Header () {
  //const [isModalOpen, setIsModalOpen] = useState(false);

  /*function buttonClicked() {
    setIsModalOpen(true)
  }*/

  return(
    <div className='w-full max-w-3xl mx-auto flex items-center justify-between'>
      <img src={LogoImage} alt='Imagem Logo Habits'/>

      {/*isModalOpen && (
        <p>Clicou</p>
      )
      <button
        type='button'
        onClick={buttonClicked}
        className='border border-violet-500 rounded-lg font-semibold px-6 py-4 flex items-center gap-3 hover:border-violet-300'
      >
        <Plus size={20} className="text-violet-500"/>
        Novo hábito
      </button>
      
      */}

      <Dialog.Root>
        <Dialog.Trigger
          type='button'
          className='border border-violet-500 rounded-lg font-semibold px-6 py-4 flex items-center gap-3 hover:border-violet-300 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-background'
        >
          <Plus size={20} className="text-violet-500"/>
          Novo hábito
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className='w-screen h-screen bg-black/80 fixed inset-0'>
            <Dialog.Content className='absolute p-10 bg-zinc-900 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
              <Dialog.Close className='absolute right-6 top-6 text-zinc-400 rounded-md hover:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-zinc-900'>
                <X size={24} aria-label="Fechar"/>
              </Dialog.Close>

              <Dialog.Title className='text-3xl leading-tight font-extrabold'>Criar hábito</Dialog.Title>

              <HabitNewForm/>
            </Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Portal>

      </Dialog.Root>

    </div>
  )
}