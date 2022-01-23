import { configureStore } from '@reduxjs/toolkit'

import pessoasSlice from './proponenteReducers'

const store = configureStore({
    reducer: {
        pessoas: pessoasSlice.reducer

    }
})

export default store
