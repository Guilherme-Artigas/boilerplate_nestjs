import { Product } from '../models/product.js'

const getAllProducts = async (req, res) => {
  try{
    const products = await Product.find()
    if (products) {
      return res.status(200).send({
        status: 'success',
        data: products
      })
    }
    return res.status(404).send({
      message: 'products not found'
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      message: 'Internal Server Error',
    })
  }
}

const addProduct = async (req, res) => {
  const {name, price} = req.body
  
  if(!name || !price) {
    return res.status(400).send({
      message: 'name and price are required'
    })
  }

  try{
    const product = await Product.create({
      name: name,
      price: price
    })

    if (product) {
      product.save();
      return res.status(200).send({
        status: 'success',
        data: product
      })
    }
    return res.status(400).send({
      message: 'product not added'
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      message: 'Internal Server Error'
    })
  }
}

const getProductById = async (req, res) => {
  const id = req.params.id
  try{
    const product = await Product.findById(id)
    if (product) {
      return res.status(200).send({
        status: 'success',
        data: product
      })
    }
    return res.status(400).send({
      message: 'product not found'
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      message: 'Internal Server Error'
    })
  }
}

const updateProduct = async (req, res) => {
  const id = req.params.id;
  const {name, price} = req.body
  try{
    const existingProduct = await Product.findOne({_id: id})
    if (!existingProduct) {
      res.status(404).send({
        message: 'product not found'
      })
    }
    existingProduct.name = name || existingProduct.name
    existingProduct.price = price || existingProduct.price
    await existingProduct.save()

    res.status(200).send({
      status: 'success',
      data: existingProduct
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: 'Internal Server Error'
    })
  }
}

const deleteProduct = async (req, res) => {
  const id = req.params.id
  try{
    const existingProduct = await Product.findOne({_id: id})
    if (!existingProduct) {
      return res.status(400).send({
        message: 'product not found'
      })
    }
    const deletedProduct = await Product.deleteOne({_id: id})
    if (!deletedProduct) {
      return res.status(400).send({
        message: 'product not deleted'
      })
    }
    res.status(200).send({
      status: 'success',
      data: existingProduct
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: 'Internal Server Error'
    })
  }
}




export { getAllProducts, addProduct, updateProduct, deleteProduct, getProductById }

