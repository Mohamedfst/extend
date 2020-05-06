import fetch from 'node-fetch';
require('dotenv').config()
const baseUrl = process.env.IMAGE_HOST

export default {
  storeImage: (imageId, image)=>{
    return fetch(`${baseUrl}/img/${imageId}`, {
      method: 'PUT',
      headers: {
        'content-type': 'image/jpeg',
      },
      body: image
    })
  },
  getImage: (imageId)=>{
    return fetch(`${baseUrl}/img/${imageId}`, {
      method: 'GET',
      headers: {
        'content-type': 'image/jpeg',
      },
    })
  }

}

