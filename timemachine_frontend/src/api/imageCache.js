const cache = {}

export async function ImageCache(term, fecthFunction) {
    if (term in cache) return cache[term]

    const result = await fecthFunction()
    cache[term] = result
    return result

}