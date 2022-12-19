const fs = require('fs')
const path = './products.json'

class ProductManager {
  constructor (filename) {
    this.filename = this.filename
    this.format = 'utf-8'
  }

  checkFileExistsSync () {
    let flag = true
    try {
      fs.accessSync(path, fs.constants.F_OK)
    } catch (e) {
      flag = false
    }
    return flag
  }

  async createProduct (name) {
    if (this.checkFileExistsSync()) {
      const id = await this.getNextId()
      return this.getProducts()
        .then(products => {
          products.push({ id, name })
          return products
        })
        .then(productsNew =>
          fs.promises.writeFile(this.filename, JSON.stringify(productsNew))
        )
    } else {
        const id = 1;
        const products = {
            id,
            name
        }
        return fs.writeFile(path, JSON.stringify(products), function (err) {
            if(err) throw err;
            console.log('File creado!')
        })
    }
  }

  async getProducts () {
    return fs.promises
      .readFile(this.filename, this.format)
      .then(content => JSON.parse(content))
      .catch(err => {
        console.log('error', err)
        return []
      })
  }

  async getNextId () {
    const aux = await this.getProducts()
    const count = aux.length
    console.log(count)
    return count > 0 ? aux[count - 1].id + 1 : 1
  }

  addProduct (name) {
    const id = this.getNextId()

    const product = {
      id,
      name: this.name
    }
    this.products.push(product)
  }
}

async function run () {
  const manager = new ProductManager(path)
  await manager.createProduct('PC')
  console.log(manager.getProducts)
}

run()
