import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Produto } from '../../App';

type favoritoState = {
    itens: Produto[]
}

const initialState: favoritoState = {
    itens: []
}

const favoritoSlice = createSlice({
    name: 'favorito',
    initialState,
    reducers: {
        favoritar: (state, action: PayloadAction<Produto>) => {
            const produto = action.payload;

            const existingIndex = state.itens.findIndex((p) => p.id === produto.id);
            if (existingIndex !== -1) {
                state.itens.splice(existingIndex, 1);
            } else {
                state.itens.push(produto);
            }
        }
    }
})

export const { favoritar } = favoritoSlice.actions
export default favoritoSlice.reducer
