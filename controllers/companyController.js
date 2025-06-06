import { Company } from '../models/company.js'

const getAllCompanies = async (req, res) => {
   try{
      const companies = await Company.find()
      if (!companies) {
        return res.status(404).send({
          message: 'no companies found'
        })
      }
      return res.status(200).send({
        status: 'success',
        data: companies
      })
    } catch (error) {
      console.log(error)
      return res.status(500).send({
        message: 'Internal Server Error'
      })
    }
}

const addCompany = async (req, res) => {
  const {name, address, phone, email} = req.body

  if(!name || !address || !phone || !email) {
    return res.status(400).send({
      message: 'name, address, phone and email are required'
    })
  }

  try{
    const company = await Company.create({
      name: name,
      address: address,
      phone: phone,
      email: email
    })

    if (!company) {
      return res.status(400).send({
        message: 'company not created'
      })
    }
    return res.status(200).send({
      status: 'success',
      data: company
    })

  } catch (error) {
    console.log(error)
    return res.status(500).send({
      message: 'Internal Server Error'
    })
  }
}

const getCompanyById = async (req, res) => {
  const id = req.params.id
  try{
    const company = await Company.findById(id)
    if (!company) {
      return res.status(404).send({message: 'company not found'})
    }
    return res.status(200).send({
      status: 'success',
      data: company
    })
  } catch (error) {
    res.status(500).send({message: error.message})
  }
}


const updateCompany = async (req, res) => {
  const {name, address, phone, email} = req.body
  const id = req.params.id
  try {
    const company = await Company.findById(id)
    if (!company) {
      return res.status(404).send({message: 'company not found'})
    }
    company.name = name || company.name
    company.address = address || company.address
    company.phone = phone || company.phone
    company.email = email || company.email
    await company.save()
    return res.status(200).send({
      status: 'success',
      data: company
    })
  } catch(error) {
    res.status(500).send({message: error.message})
  }
}

const deleteCompany = async (req, res) => {
  const id = req.params.id
  try{
    const company = await Company.findById(id)
    if(!company) {
      return res.status(404).send({message: 'company not found'})
    }
    const deletedCompany = await Company.deleteOne({_id: id})
    if (!deletedCompany) {
      return res.status(400).send({message: 'company not deleted'})
    } return res.status(200).send({
      status: 'success',
      data: company
    })

  } catch (error) {
    res.status(500).send({message: 'Internal Server Error'})
  }
}


export { getAllCompanies, addCompany, getCompanyById, updateCompany, deleteCompany }