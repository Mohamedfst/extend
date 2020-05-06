import fetch from 'node-fetch';
require('dotenv').config()
const baseUrl = process.env.RENDER_HOST

export default {
  generateJPG: (params)=>{
    return fetch(`${baseUrl}/jpeg`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(params)
    })
  }
}
