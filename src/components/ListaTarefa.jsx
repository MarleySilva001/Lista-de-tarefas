import { useCallback, useReducer, useEffect, useState } from 'react';

const tarefasReducer = (state, action) => {
    switch (action.type) {
        case 'add_tarefa':
            return [...state, action.payload]
        //payload é o dado atual (valor da tarefa) que
        case 'concluir_tarefa':
            const atualizarTarefa = [...state]
            atualizarTarefa[action.payload].completed = true
            return atualizarTarefa
        case 'excluir_tarefa':
            /*vou colocar um filtro na lista de tarefas para identificar a posição
             do item que vai ser excluido e comparar os outros itens da lista com o atual
             para criar uma nova lista de tarefas sem o item que foi excluido*/
            return state.filter((_, index /*pegando a posição*/) => index !== action.payload)
        //item da posicao precisa ser diferente do dado atual que ta chamando a ção excluir
        default: //se nao tiver fazendo nada
            return state; //retornar a lista de tarefas normal     
    }
}

export default function ListaTarefas() {
    const [tarefa, setTarefa] = useState('')

    const [tarefaAtual, dispatch] = useReducer(tarefasReducer, [])

    const addTarefa = useCallback(() => {
        if (tarefa.trim() !== '') {
            dispatch({ type: 'add_tarefa', payload: { text: tarefa, completed: false } })
        }
    }, [tarefa])

    const concluirTarefa = useCallback((index) => {
        dispatch({ type: 'concluir_tarefa', payload: index })
    }, [])

    const ExcluirTarefa = useCallback((index) => {
        dispatch({ type: 'excluir_tarefa', payload: index })
    }, [])

    return (
        <div className='center'>
            <h1>Lista de Tarefas</h1>
            <div className='inputArea'>
                <input type="text"
                    placeholder='Nova tarefa'
                    value={tarefa}
                    onChange={(e) => setTarefa(e.target.value)}
                />
                <button onClick={addTarefa}>Add tarefa</button>
            </div>
            <div className='lista'>
                <ul>
                    {/*Criando a lista com as tarefas que forem sendo adiconandas
                vamos usar o .map para mapear cada tarefa
                usar o index para identificar a posição de cada tarefa adicionada
                 */}
                    {tarefaAtual.map((tarefas, index) => (
                        <li key={index}>
                            <span className='nomeLista'  style={{ textDecoration: tarefas.completed ? 'line-through' : 'none' }}>
                                {tarefas.text}
                            </span>
                            {!tarefas.completed && (
                                <>
                                    <button onClick={() => concluirTarefa(index)}>Concluir</button>
                                </>
                            )}
                            {tarefas && (
                                <>
                                    <button className='b' onClick={() => ExcluirTarefa(index)}>X</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}