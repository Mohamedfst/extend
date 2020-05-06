function handleResponse(res, code, statusMsg, json={}) {
  res.status(code).json(Object.assign({}, {status: statusMsg}, json))
}

function sanitizeBody(body, updatableColumns) {
  const sanitizedBody = {}

  Object.keys(body).forEach(key=>{
    if(updatableColumns[key]) {
      sanitizedBody[key] = body[key]
    }
  })
  return sanitizedBody
}

export default {
  handleResponse,
  sanitizeBody,
}
