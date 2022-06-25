let user = {
    name: '-',
    email: '-',
    watchlist: []
}

export const getUser = () => { return { ...user } }

export const setWatchlist = (watchlist) => {
    user.watchlist = watchlist
}

export const setUser = (name, email, watchlist) => {
    user = {
        name,
        email,
        watchlist
    }
}