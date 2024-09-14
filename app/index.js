const { select, input, checkbox } = require('@inquirer/prompts')
const fs = require("fs").promises

let mensagem = "Bem vindo a sua Lista de Metas";

let metas

// Carregando metas (permitindo amazenar informações em em um aqrquivo JSON)
const carregarMetas = async () => {
    try {
        const dados = await fs.readFile("metas.json", "utf-8")
        metas = JSON.parse(dados)
    }
    catch (erro) {
        metas = []
    }
}

//Indicando onde as metas devem ser armazenadas
const salvarMetas = async () => {
    await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
}

const cadastrarMeta = async () => {
    const meta = await input({ message: "Digite a meta:" })

    if (meta.length == 0) {
        mensagem = 'A meta não pode ser vazia.' // Para exibir na funçao de mostrar mensagem
        return
    }

    metas.push(
        { value: meta, checked: false }
    )
    mensagem = "Meta cadastrada com sucesso!" // Para exibir na funçao de mostrar mensagem
}

const listarMetas = async () => {
    if (metas.length == 0) { // Quando o arquivo JSON ainda não possuir nem uma meta cadastrada
        mensagem = "Não existem metas!" // Para exibir na funçao de mostrar mensagem
        return
    }

    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa",
        choices: [...metas],
        instructions: false, // Já escrevemos na message
    })

    // Desmarcando todas para depois apenas as escolhidas ficarem verdadeiras
    metas.forEach((m) => {
        m.checked = false
    })

    if (respostas.length == 0) {
        mensagem = "Nenhuma meta selecionada!" // Para exibir na funçao de mostrar mensagem
        return
    }

    // Selecionando as marcas e colocando como verdadeira
    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    mensagem = 'Meta(s) marcada(s) como concluída(s)' // Para exibir na funçao de mostrar mensagem

}

const metasRealizadas = async () => {
    if (metas.length == 0) { // Quando o arquivo JSON ainda não possuir nem uma meta cadastrada
        mensagem = "Não existem metas!" // Para exibir na funçao de mostrar mensagem
        return
    }

    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if (realizadas.length == 0) {
        mensagem = 'Não existem metas realizadas! :(' // Para exibir na funçao de mostrar mensagem
        return
    }

    await select({
        message: "Metas Realizadas: " + realizadas.length, // Para exibir na funçao de mostrar mensagem
        choices: [...realizadas] // ... serve para copiar o array antigo e trazer para esse novo
    })
}

const metasAbertas = async () => {
    if (metas.length == 0) { // Quando o arquivo JSON ainda não possuir nem uma meta cadastrada
        mensagem = "Não existem metas!" // Para exibir na funçao de mostrar mensagem
        return
    }

    const abertas = metas.filter((meta) => {
        return meta.checked != true
    })

    if (abertas.length == 0) {
        mensagem = 'Não existem metas abertas! :)' // Para exibir na funçao de mostrar mensagem
        return
    }

    await select({
        message: "Metas Abertas: " + abertas.length, // Para exibir na funçao de mostrar mensagem
        choices: [...abertas]
    })
}

const deletarMetas = async () => {
    if(metas.length == 0) { // Quando o arquivo JSON ainda não possuir nem uma meta cadastrada
        mensagem = "Não existem metas!" // Para exibir na funçao de mostrar mensagem
        return
    }

    const metasDesmarcadas = metas.map((meta) => {
        return { value: meta.value, checked: false }
    })

    const itemsADeletar = await checkbox({
        message: "Selecione item para deletar", // Para exibir na funçao de mostrar mensagem
        choices: [...metasDesmarcadas],
        instructions: false,
    })

    if (itemsADeletar.length == 0) {
        mensagem = "Nenhum item para deletar!" // Para exibir na funçao de mostrar mensagem
        return
    }

    itemsADeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item // Só fica no novo array(escrito em cima do antigo) aqueles itens que são diferentes do que eu quero deletar
        })
    })

    mensagem = "Meta(s) deleta(s) com sucesso!"
}

const mostrarMensagem = () => {
    console.clear();

    if (mensagem != "") {
        console.log(mensagem)
        console.log("") // quebrando a linha
        mensagem = ""
    }
}

const start = async () => { // (async) Informando qua a função e assíncrona
    
    await carregarMetas() // Pegando metas armazenadas no doc JSON

    while (true) {

        mostrarMensagem()

        await salvarMetas() // Sempre que a função retornar a pg principal(menu) o JSON será atualizado instantaneamente

                    // await = aguardar | no caso a seleção do usuario
        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar meta", // O que é exibido
                    value: "cadastrar" // Valor no sistema
                },
                {
                    name: "Listar metas",
                    value: "listar"
                },
                {
                    name: "Metas realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas abertas",
                    value: "abertas"
                },
                {
                    name: "Deletar metas",
                    value: "deletar"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        })

        switch (opcao) {
            case "cadastrar":
                await cadastrarMeta() /* awiat == Esperando toda a função ser executada*/
                break

            case "listar":
                await listarMetas()
                break

            case "realizadas":
                await metasRealizadas()
                break

            case "abertas":
                await metasAbertas()
                break

            case "deletar":
                await deletarMetas()
                break

            case "sair":
                console.log('tchau')
                return
        }
    }
}

start();