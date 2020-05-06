import moment from 'moment'
import queryString from'query-string'
import ShopifyAPIClient from 'shopify-api-node'

class Shopify {
  constructor({token, domain}) {
    this.shopify = ShopifyAPIClient({
      shopName: domain,
      accessToken: token,
      autoLimit: true
    })
  }

graphqls(query) {
  return this.shopify.graphql(query);
}  

  getAllOrders(params) {
    return new Promise((resolve, reject)=>{
      const generateParams = (page) => ({
        ...params,
        page
      })

      const promises = []
      this.shopify.order.count(generateParams(1)).then((orderCount,e)=>{
        for(let i=0; i < orderCount / generateParams(1).limit; i++){
          const promise = new Promise ((resolve, reject)=>{
            this.shopify.order.list(generateParams(i+1)).then(json=>{
              resolve(json)
            }, err=>{
              reject(err)
            })
          })

          promises.push(promise)
        }

        return Promise.all(promises).then(jsons=>{
          resolve([].concat.apply([],jsons))
        }, err=>{
          reject(err)
        })
      })
    })
  }

  getCustomer(customerId, params) {
    return this.shopify.customer.get(customerId, params)
  }

  listhemes(params) {
    return this.shopify.theme.list(params)
  }

  listassets(params) {
    return this.shopify.scriptTag.list([params])
  }
  deleteasset(id) {
    return this.shopify.scriptTag.delete(id)
  }
  scripttag(params) {
  return this.shopify.scriptTag.create(params)
}

  async getAllPurchasersOfProductId(productId) {
    const orders = await this.getAllOrders({limit: 250})
    const purchasers = orders.filter(order=>{
      if(!order.customer) return false
      for(let i = 0; i < order.line_items.length; i++) {
        const item = order.line_items[i]
        if(item.product_id == productId) {
          return true
        }
      }
      return false
    }).map(order=>order.customer.id)
    return purchasers
  }

  getMultipleCustomers(customerIds, params) {
    return new Promise((resolve, reject)=>{
      const promises = []
      customerIds.forEach(customerId=>{
        const promise = new Promise ((resolve, reject)=>{
          this.getCustomer(customerId, params).then(json=>{
            resolve(json)
          }, err=>{
            reject(err)
          })
        })
      })
    })
  }

  getOrder(orderId) {
    return this.shopify.order.get(orderId, {
      status: "closed",
      fulfillment_status: "shipped"
    })
  }
orderCount(params){
  return this.shopify.order.count([params]);
}
productCount(params){
  return this.shopify.product.list([params]);
}
  updateCustomer(customerId, params) {
    return this.shopify.customer.update(customerId, params)
  }

  createPriceRule(params) {
    return this.shopify.priceRule.create(params)
  }

  lookupDiscount(code) {
    return this.shopify.discountCode.lookup({code})
  }

  createDiscountCode(priceRulId, code) {
    return this.shopify.discountCode.create(priceRulId, { code })
  }

  createDiscount(priceRuleParams) {
    return new Promise ((resolve,reject)=>this.createPriceRule(priceRuleParams).then(priceRule=>{
      const code = priceRule.title
      const priceRuleId = priceRule.id
      this.createDiscountCode(priceRuleId, code).then(discount=>{
        resolve(discount)
      }, err=>{
        reject(err)
      })
    }, err=>{
      reject(err)
    }))
  }

  deleteDiscountCode(priceRuleId, discountId) {
    return this.shopify.discountCode.delete(priceRuleId, discountId)
  }

  deletePriceRule(priceRuleId) {
    return this.shopify.priceRule.delete(priceRuleId)
  }

  deleteDiscount(priceRuleId, discountId) {
    return new Promise((resolve, reject)=>{
      this.deleteDiscountCode(priceRuleId, discountId).then(_=>{
        this.deletePriceRule(priceRuleId).then(_=>{
          resolve()
        }, err=>{
          reject(err)
        })
      }, err=>{
        reject(err)
      })
    })
  }

  createWebhook(params) {
    return this.shopify.webhook.create(params)
  }
}

export default Shopify
