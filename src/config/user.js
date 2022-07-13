let user = {
    name: '-',
    email: '-',
    deviceId: '-',
    watchlist: []
}

let watchlistSet = new Set();

const populateWatchlistSet = (watchlist) => {
    watchlistSet = new Set()

    for(const quote of watchlist){
        watchlistSet.add(quote)
    }
}

let settings = {
    style: {
        layout: 'default',
        colors: {
            frame: 'default',
            background: 'default'
        },
    }
}

export const isStockInWatchlist = (quote) => {
    return watchlistSet.has(quote)
}

export const getUser = () => { return { ...user } }

export const getSettings = () => { return { ...settings } }

export const setWatchlist = (watchlist) => {
    user.watchlist = watchlist
    populateWatchlistSet(watchlist)
}

export const setUser = (name, email, device, watchlist) => {
    user = {
        name,
        email,
        device,
        watchlist
    }
}

export const setSettings = (layout, frame, background) => {
    settings = {
        style: {
            layout,
            colors: {
                frame,
                background
            }
        }
    }
}
