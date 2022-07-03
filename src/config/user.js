let user = {
    name: '-',
    email: '-',
    watchlist: []
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

export const getUser = () => { return { ...user } }

export const getSettings = () => { return { ...settings } }

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
