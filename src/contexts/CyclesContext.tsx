import { createContext, useReducer, useState, useEffect } from 'react'
import {
  CreateCycleData,
  Cycle,
  CycleContextProps,
  CyclesContextType,
} from '../types'
import { cyclesReducer } from '../reducers/cycles/reduce'
import {
  addNewCycleAction,
  finishedCurrentCycleAction,
} from '../reducers/cycles/actions'
import { differenceInSeconds } from 'date-fns'

export const CyclesContext = createContext({} as CyclesContextType)
export const CyclesContextProvider = ({ children }: CycleContextProps) => {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (initialState) => {
      const storedStateAsJSON = localStorage.getItem(
        '@ignite-timer:cycles.state-1.0.0',
      )

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }
      return { initialState }
    },
  )
  const { activeCycleId, cycles } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }
    return 0
  })
  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
  }, [cyclesState])

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }
  function markCurrentCycleAsFinished() {
    dispatch(finishedCurrentCycleAction())
  }
  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    dispatch(addNewCycleAction(newCycle))
    setAmountSecondsPassed(0)
  }
  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycle())
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
