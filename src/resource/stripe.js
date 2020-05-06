import stripePackage from 'stripe';
require('dotenv').config()
const { STRIPE_API_SECRET } = process.env
const stripe = stripePackage(STRIPE_API_SECRET)
const actions = {}

actions.createCustomer = (email) => {
  return stripe.customers.create({email})
}

actions.deleteCustomer = (customerId) => {
  return stripe.customers.del(customerId)
}

actions.addCard = (customerId, token) => {
  return stripe.customers.createSource(customerId,{
    source: token
  })
}

actions.createCharge = (amount, cardStripeId, customerId) => {
  return stripe.charges.create({amount,
    currency: "usd",
    source: cardStripeId,
    customer: customerId,
  })
}

export default actions
