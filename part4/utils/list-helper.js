const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogList) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }

    return blogList.reduce(reducer, 0)
}

const favoriteBlog = (blogList) => {

    const arr = []
    blogList.forEach(element => {
        arr.push(element.likes)
    })

    const max = Math.max(...arr)

    return {
        title: blogList[arr.indexOf(max)].title,
        author: blogList[arr.indexOf(max)].author,
        likes: max
    }

}

const mostBlogs = (blogList) => {
    const o = new Object()
    
    blogList.forEach(blog => {
        Object.keys(o).includes(blog.author)
            ? o[blog.author] += 1
            : o[blog.author] = 1
    })

    const max = Math.max(...Object.values(o))

    return {
        author: Object.keys(o).find(key => o[key] === max),
        blogs: max
    }
}

const mostLikes = (blogList) => {
    const o = new Object()
    
    blogList.forEach(blog => {
        Object.keys(o).includes(blog.author)
            ? o[blog.author] += blog.likes
            : o[blog.author] = blog.likes
    })

    const max = Math.max(...Object.values(o))

    return {
        author: Object.keys(o).find(key => o[key] === max),
        likes: max
    }
}

module.exports = {
    dummy,
    totalLikes, 
    favoriteBlog,
    mostBlogs,
    mostLikes
}