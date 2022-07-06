let user = {
    name: '-',
    email: '-',
    device: '-',
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
