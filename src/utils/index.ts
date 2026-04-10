export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount)
}

export function getImagePath(imageUrl: string) {
    const cloudinaryBaseUrl = 'https://res.cloudinary.com' 
    if(imageUrl.startsWith(cloudinaryBaseUrl)){
        return imageUrl
    } else {
        return `/products/${imageUrl}.jpg`
    }
}