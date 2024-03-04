import { Produto as ProdutoType } from '../App'
import Produto from '../components/Produto'
import { useGetProdutosQuery } from '../services/api'
import { useSelector, useDispatch } from 'react-redux' 
import { RootReducer } from '../store'
import { favoritar } from '../store/reducers/favorito'

import * as S from './styles'

const ProdutosComponent = () => {
  const favoritos = useSelector((state: RootReducer) => state.favorito.itens) // Acessando os favoritos do estado
  const dispatch = useDispatch();


  const produtoEstaNosFavoritos = (produto: ProdutoType) => {
    const produtoId = produto.id
    const IdsDosFavoritos = favoritos.map((f) => f.id)

    return IdsDosFavoritos.includes(produtoId)
  }

  const { data: produtos, isLoading } = useGetProdutosQuery()

  if (isLoading) return <h2>Carregando...</h2>

  return (
    <>
      <S.Produtos>
        {produtos?.map((produto) => (
          <Produto
            estaNosFavoritos={produtoEstaNosFavoritos(produto)}
            key={produto.id}
            produto={produto}  
            favoritar={() => dispatch(favoritar(produto))}    
            />
        ))}
      </S.Produtos>
    </>
  )
}

export default ProdutosComponent
