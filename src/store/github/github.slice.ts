import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const LS_FV_KEY = 'rfk'

type Endpoint = {
    login: string,
    url: string
}

interface GithubState {
    favourites: Endpoint[]
}

const initialState: GithubState = {
    favourites: JSON.parse(localStorage.getItem(LS_FV_KEY) ?? '[]')
}

export const githubSlice = createSlice({
    name: 'github-slice',
    initialState,
    reducers: {
        addFavourite(state, action: PayloadAction<Endpoint>) {
            state.favourites.push(action.payload);
            localStorage.setItem(LS_FV_KEY, JSON.stringify(state.favourites))
        },
        removeFavourite(state, action: PayloadAction<Endpoint>) {
            state.favourites = state.favourites.filter(f => f.url !== action.payload.url)
            localStorage.setItem(LS_FV_KEY, JSON.stringify(state.favourites))
        }
    }
})

export const githubActions = githubSlice.actions
export const githubReducer = githubSlice.reducer 