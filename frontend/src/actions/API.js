
import axios from 'axios';
axios.defaults.headers.common['Authorization'] = 'whatever-you-want';
axios.defaults.headers.common['Content-Type'] = 'application/json';
export const getCategories = () => 
    axios.get(`http://localhost:3001/categories`)
    .then(res => res.data)

export const getAllPosts = () => 
    axios.get(`http://localhost:3001/posts`)
    .then(res => res.data)

export const getPostsByCategory = (category) => 
    axios.get(`http://localhost:3001/`+ category +`/posts`)
    .then(res => res.data)

export const postPost = (data) =>
    axios.post('http://localhost:3001/posts', data)
    .then(res => res.data)

export const getComments = (id) => 
    axios.get(`http://localhost:3001/posts/`+ id +`/comments`)
    .then(res => res.data)

export const postComment = (data) =>
    axios.post('http://localhost:3001/comments', data)
    .then(res => res.data)

export const updateCommentCount = (id, data) =>
    axios.put('http://localhost:3001/posts/' + id, data)
    .then(res => res.data)

export const updatePost = (id, data) => 
    axios.put('http://localhost:3001/posts/' + id, data)
    .then(res => res.data)

export const updateComment = (id, data) => 
    axios.put('http://localhost:3001/comments/' + id, data)
    .then(res => res.data)

export const deleteComment = (id) =>
    axios.delete('http://localhost:3001/comments/' + id)
    .then(res => res.data)

export const deletePost = (id) =>
    axios.delete('http://localhost:3001/posts/' + id)
    .then(res => res.data)


export const upVoteComment = (id, data) =>
    axios.post('http://localhost:3001/comments/' + id, data)
    .then(res => res.data)

export const downVoteComment = (id, data) =>
    axios.post('http://localhost:3001/comments/' + id, data)
    .then(res => res.data)

export const upVotePost = (id, data) =>
    axios.post('http://localhost:3001/posts/' + id, data)
    .then(res => res.data)

export const downVotePost = (id, data) =>
    axios.post('http://localhost:3001/posts/' + id, data)
    .then(res => res.data)