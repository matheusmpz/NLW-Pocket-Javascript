const start =() => {
    while(true) {
        let opcao = 'Cadastrar' // deifine onde ele vai entrar (caso)
        switch(opcao) {
            case 'cadastrar': 
                console.log('Vamos cadastrar')
                break

            case 'listar':
                console.log('Listando')
                break

            case 'sair':
                return // não precisa do break por ser o ultimo
        }
    }
}
start()