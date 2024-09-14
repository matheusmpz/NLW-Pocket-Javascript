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

    if (respostas == 0) {
        console.log('Nem uma meta selecionada!')
        return
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    console.log('Meta(s) marcadas como concluída(s)!')
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

            case 'sair':
                console.log('Tchau')
                return 
        }
    }
}
start()