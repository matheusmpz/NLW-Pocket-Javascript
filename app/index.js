const { select } = require('@inquirer/prompts') 

const start = async () => {

    while(true) {
                    // await = aguardar | no caso a seleção do usuario
        const opcao = await select({
            message: 'Menu >',
            /*Alternativas*/ choices: [
                {
                    name: 'Cadastrar meta', // O que é exibido
                    value: 'cadastrar' // O que o sistema entende
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