const { select } = require('@inquirer/prompts') 

             // Informando qua a função e assíncrona 
const start = async () => {

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
                console.log('Vamos cadastrar')
                break // retorna ao menu se opções

            case 'listar':
                console.log('Listando')
                break // retorna ao menu se opções

            case 'sair':
                console.log('Tchau')
                return // acaba a função
        }
    }
}
start()