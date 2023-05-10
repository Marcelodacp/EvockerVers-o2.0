
let modalKey = 0


let quantjogos = 1

let cart = [] // carrinho


// funcoes auxiliares ou uteis
const seleciona = (elemento) => document.querySelector(elemento)
const selecionaTodos = (elemento) => document.querySelectorAll(elemento)

const formatoReal = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const formatoMonetario = (valor) => {
    if(valor) {
        return valor.toFixed(2)
    }
}

const abrirModal = () => {
    seleciona('.jogoWindowArea').style.opacity = 0 
    seleciona('.jogoWindowArea').style.display = 'flex'
    setTimeout(() => seleciona('.jogoWindowArea').style.opacity = 1, 150)
}

const fecharModal = () => {
    seleciona('.jogoWindowArea').style.opacity = 0 
    setTimeout(() => seleciona('.jogoWindowArea').style.display = 'none', 500)
}

const botoesFechar = () => {
    selecionaTodos('.jogoInfo--cancelButton, .jogoInfo--cancelMobileButton').forEach( (item) => item.addEventListener('click', fecharModal) )
}

const preencheDadosDasjogos = (jogoItem, item, index) => {

	jogoItem.setAttribute('data-key', index)
    jogoItem.querySelector('.jogo-item--img img').src = item.img
    jogoItem.querySelector('.jogo-item--price').innerHTML = formatoReal(item.price[2])
    jogoItem.querySelector('.jogo-item--name').innerHTML = item.name
    jogoItem.querySelector('.jogo-item--desc').innerHTML = item.description
}

const preencheDadosModal = (item) => {
    seleciona('.jogoBig img').src = item.img
    seleciona('.jogoInfo h1').innerHTML = item.name
    seleciona('.jogoInfo--desc').innerHTML = item.description
    seleciona('.jogoInfo--actualPrice').innerHTML = formatoReal(item.price[2])
}


const pegarKey = (e) => {

    let key = e.target.closest('.jogo-item').getAttribute('data-key')
    console.log('jogo clicada ' + key)
    console.log(jogoJson[key])


    quantjogos = 1

    modalKey = key

    return key
}



const mudarQuantidade = () => {
    // Ações nos botões + e - da janela modal
    seleciona('.jogoInfo--qtmais').addEventListener('click', () => {
        quantjogos++
        seleciona('.jogoInfo--qt').innerHTML = quantjogos
    })

    seleciona('.jogoInfo--qtmenos').addEventListener('click', () => {
        if(quantjogos > 1) {
            quantjogos--
            seleciona('.jogoInfo--qt').innerHTML = quantjogos	
        }
    })
}



const adicionarNoCarrinho = () => {
    seleciona('.jogoInfo--addButton').addEventListener('click', () => {
        console.log('Adicionar no carrinho')


    	console.log("jogo " + modalKey)
    	
	    // quantidade
    	console.log("Quant. " + quantjogos)
        // preco
        let price = seleciona('.jogoInfo--actualPrice').innerHTML.replace('R$&nbsp;', '')
    
        

	    let identificador = jogoJson[modalKey].id

        // antes de adicionar verifique se ja tem aquele codigo
        // para adicionarmos a quantidade
        let key = cart.findIndex( (item) => item.identificador == identificador )
        console.log(key)

        if(key > -1) {
            // se encontrar aumente a quantidade
            cart[key].qt += quantjogos
        } else {
            // adicionar objeto jogo no carrinho
            let jogo = {
                identificador,
                id: jogoJson[modalKey].id,
              
                qt: quantjogos,
                price: parseFloat(price)
            }
            cart.push(jogo)
            console.log(jogo)
            console.log('Sub total R$ ' + (jogo.qt * jogo.price).toFixed(2))
        }

        fecharModal()
        abrirCarrinho()
        atualizarCarrinho()
    })
}

const abrirCarrinho = () => {
    console.log('Qtd de itens no carrinho ' + cart.length)
    if(cart.length > 0) {
        // mostrar o carrinho
	    seleciona('aside').classList.add('show')
        seleciona('header').style.display = 'flex'
    }

    // exibir aside do carrinho no modo mobile
    seleciona('.menu-openner').addEventListener('click', () => {
        if(cart.length > 0) {
            seleciona('aside').classList.add('show')
            seleciona('aside').style.left = '0'
        }
    })
}

const fecharCarrinho = () => {
    seleciona('.menu-closer').addEventListener('click', () => {
        seleciona('aside').style.left = '100vw' 
        seleciona('header').style.display = 'flex'
    })
}

const atualizarCarrinho = () => {
    // exibir número de itens no carrinho
	seleciona('.menu-openner span').innerHTML = cart.length

	if(cart.length > 0) {

		// mostrar o carrinho
		seleciona('aside').classList.add('show')
		seleciona('.cart').innerHTML = ''

		let subtotal = 0
		let desconto = 0
		let total    = 0

		for(let i in cart) {
			// use o find para pegar o item por id
			let jogoItem = jogoJson.find( (item) => item.id == cart[i].id )
			console.log(jogoItem)

        	subtotal += cart[i].price * cart[i].qt

			let cartItem = seleciona('.models .cart--item').cloneNode(true)
			seleciona('.cart').append(cartItem)

			let jogoName = `${jogoItem.name}`

			cartItem.querySelector('img').src = jogoItem.img
			cartItem.querySelector('.cart--item-nome').innerHTML = jogoName
			cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt

			// selecionar botoes + e -
			cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
				console.log('Clicou no botão mais')
				// adicionar apenas a quantidade que esta neste contexto
				cart[i].qt++
				// atualizar a quantidade
				atualizarCarrinho()
			})

			cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
				console.log('Clicou no botão menos')
				if(cart[i].qt > 1) {
					// subtrair apenas a quantidade que esta neste contexto
					cart[i].qt--
				} else {
					// remover se for zero
					cart.splice(i, 1)
				}

                (cart.length < 1) ? seleciona('header').style.display = 'flex' : ''

				// atualizar a quantidade
				atualizarCarrinho()
			})

			seleciona('.cart').append(cartItem)

		}
		desconto = subtotal * 0
		total = subtotal - desconto

		// exibir na tela os resultados
		// selecionar o ultimo span do elemento
		seleciona('.subtotal span:last-child').innerHTML = formatoReal(subtotal)
		seleciona('.desconto span:last-child').innerHTML = formatoReal(desconto)
		seleciona('.total span:last-child').innerHTML    = formatoReal(total)

	} else {
		// ocultar o carrinho
		seleciona('aside').classList.remove('show')
		seleciona('aside').style.left = '100vw'
	}
}

const finalizarCompra = () => {
    seleciona('.cart--finalizar').addEventListener('click', () => {
        console.log('Finalizar compra')
        seleciona('aside').classList.remove('show')
        seleciona('aside').style.left = '100vw'
        seleciona('header').style.display = 'flex'
    })
}



// MAPEAR jogoJson para gerar lista de jogos
jogoJson.map((item, index ) => {
    //console.log(item)
    let jogoItem = document.querySelector('.models .jogo-item').cloneNode(true)
    //console.log(jogoItem)
    //document.querySelector('.jogo-area').append(jogoItem)
    seleciona('.jogo-area').append(jogoItem)
    preencheDadosDasjogos(jogoItem, item, index)

    jogoItem.querySelector('.jogo-item a').addEventListener('click', (e) => {
        e.preventDefault()
        console.log('Clicou na jogo')
        let chave = pegarKey(e)
        // abrir janela modal
        abrirModal()

        preencheDadosModal(item)

		seleciona('.jogoInfo--qt').innerHTML = quantjogos
    
    })

    botoesFechar()

}) // fim do MAPEAR jogoJson para gerar lista de jogos

mudarQuantidade()

adicionarNoCarrinho()
atualizarCarrinho()
fecharCarrinho()
finalizarCompra()

