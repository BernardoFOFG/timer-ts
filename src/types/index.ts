import { ReactNode } from 'react'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

// Interfaces Contexts
export interface CycleContextProps {
  children: ReactNode
}
export interface CreateCycleData {
  task: string
  minutesAmount: number
}
export interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  markCurrentCycleAsFinished: () => void
  amountSecondsPassed: number
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

export interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}
