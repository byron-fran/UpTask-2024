export const formatDate = (isoString: string): string => {
    
    const date = new Date(isoString)
    const formatDate = new Intl.DateTimeFormat('en-En', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
    return formatDate.format(date)
}