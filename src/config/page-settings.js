let displayPrice, subscriptionPrice, product

export const getDisplayPrice = () => displayPrice

export const getSubscriptionPrice = () => subscriptionPrice

export const getProduct = () => product

export const setupPage = (tempProduct = 'Sport', tempDisplayPrice = 149.99, tempSubscriptionPrice = 2.99) => {
    product = tempProduct
    displayPrice = tempDisplayPrice
    subscriptionPrice = tempSubscriptionPrice
}

setupPage(); // Configure variables with default values