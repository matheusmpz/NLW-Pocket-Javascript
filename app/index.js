const { select, input } = require('@inquirer/prompts') 

let meta = {
    value: 'Beber água',
    checked: false,
}
let metas = []

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
                await /*Esperando toda a função ser executada*/ cadastrarMeta()
                console.log(metas)
                break 

            case 'listar':
                console.log('Listando')
                break 

            case 'sair':
                console.log('Tchau')
                return 
        }
    }
}
start()