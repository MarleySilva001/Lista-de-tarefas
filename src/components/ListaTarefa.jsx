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
            <ul>
                {/*Criando a lista com as tarefas que forem sendo adiconandas
                vamos usar o .map para mapear cada tarefa
                usar o index para identificar a posição de cada tarefa adicionada
                 */}
                {tarefaAtual.map((tarefas, index) => (
                    <li key={index}>
                        <span style={{ textDecoration: tarefas.completed ? 'line-through' : 'none' }}>
                            {tarefas.text}
                        </span>
                        {!tarefas.completed && (
                            <>
                                <button onClick={() => concluirTarefa(index)}>Concluir</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}