
import axios from 'axios';
const headers = {
    'Authorization': 'whatever-you-want',
    'Content-Type': 'application/json'   
}
axios.defaults.headers.common['Authorization'] = 'whatever-you-want';

axios.defaults.headers.common['Content-Type'] = 'application/json';
export const getCategories = () => 
    axios.get(`http://localhost:3001/categories`, { headers })
    .then(res => res.data)

export const getAllPosts = () => 
    axios.get(`http://localhost:3001/posts`, { headers })
    .then(res => res.data)

export const getPostsByCategory = (category) => 
    axios.get(`http://localhost:3001/`+ category +`/posts`, { headers })
    .then(res => res.data)

export const postPost = (data) =>
    axios.post('http://localhost:3001/posts', data)
    .then(res => res.data)

export const getComments = (id) => 
    axios.get(`http://localhost:3001/posts/`+ id +`/comments`, { headers })
    .then(res => res.data)

export const postComment = (data) => {
    axios.post('http://localhost:3001/comments', data)
    .then(res => res.data)
}

export const updateCommentCount = (id, data) => {
    axios.put('http://localhost:3001/posts' + id, data)
    .then(res => res.data)
}