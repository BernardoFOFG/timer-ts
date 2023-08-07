import { useContext } from 'react'
import { HistoryContainer, HistoryList, Status } from './styles'
import { formatDistanceToNow } from 'date-fns'
import { CyclesContext } from '../../contexts/CyclesContext'
import ptBR from 'date-fns/locale/pt-BR'

export const History = () => {
  const { cycles } = useContext(CyclesContext)
  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <th>Tarefa</th>
            <th>Duração</th>
            <th>Início</th>
            <th>Status</th>
          </thead>

          <tbody>
            {cycles.map((value) => {
              return (
                <tr key={value.id}>
                  <td>{value.task}</td>
                  <td>{value.minutesAmount} minutos</td>
                  <td>
                    {formatDistanceToNow(new Date(value.startDate), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </td>
                  <td>
                    {value.finishedDate && (
                      <Status statusColor="green">Concluído</Status>
                    )}
                    {value.interruptedDate && (
                      <Status statusColor="red">Interrompido</Status>
                    )}
                    {!value.finishedDate && !value.interruptedDate && (
                      <Status statusColor="yellow">Em andamento</Status>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
