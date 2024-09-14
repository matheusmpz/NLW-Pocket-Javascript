const { select, input, checkbox } = require('@inquirer/prompts') 

let meta = {
    value: 'Beber água',
    checked: false,
}
let metas = [meta]

const cadastrarMeta = async () => {
    const meta = await input({message: "Digite a meta:"})

    if (meta.length == 0) {
        console.log('A meta não pode ser vazia!')
        return
    }

    metas.push(
        { value: meta, checked: false }
    )
}
    
const listarMetas = async () => {
    const respostas = await checkbox ({
        message: 'Use as setas para mudar de meta, o espaço para marcar ou desmarca e o enter para finalizar!',
        choices: [...metas],
        instructions: false // Já escrevemos elas na message
    })

    // Desmarcando todas para depois apenas as escolhidas ficarem verdadeiras
    metas.forEach((m) => {
        m.checked = false
    })

    if (respostas == 0) {
        console.log('Nem uma meta selecionada!')
        return
    }

    // Selecionando as marcas e colocando como verdadeira
    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    console.log('Meta(s) marcadas como concluída(s)!')
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if (realizadas.length == 0) {
        console.log('Não existem metas realizadas!')
        return
    }

    await select({
        message: 'Metas Realizadas',
        choices: [...realizadas] // ... serve para copiar o array antigo e trazer para esse novo
    })
}

const start = async () => {   // (async) Informando qua a função e assíncrona 

    while(true) {
                    // await = aguardar | no caso a seleção do usuario
        const opcao = await select({
            message: 'Menu >',
            choices: [ //Alternativas 
                {
                    name: 'Cadastrar meta', // O que é exibido
                    value: 'cadastrar' // O que o sistema entende
                },
                {
                    name: 'Listar metas',
                    value: 'listar'
                },
                {
                    name: 'Metas Realizadas',
                    value: 'realizadas'
                },
                {
                    name: 'Sair', 
                    value: 'sair'
                },
            ]
        })

        switch(opcao) {
            case 'cadastrar': 
                await cadastrarMeta()/* awiat == Esperando toda a função ser executada*/
                console.log(metas)
                break 

            case 'listar':
                await listarMetas()
                break 

            case 'realizadas':
                await metasRealizadas()
                break

            case 'sair':
                console.log('Tchau')
                return 
        }
    }
}
start()