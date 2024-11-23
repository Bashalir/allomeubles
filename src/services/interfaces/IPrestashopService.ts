import { 
  Product, 
  Category, 
  ProductFeature, 
  ProductOption, 
  Customer, 
  Order, 
  Address, 
  Carrier, 
  Language, 
  Country, 
  Currency 
} from '../../types'

export interface IPrestashopService {
  // Produits
  getProducts(params?: {
    limit?: number, 
    page?: number, 
    categoryId?: number
  }): Promise<Product[]>
  
  getProductById(id: number): Promise<Product>
  getProductImages(productId: number): Promise<string[]>

  // Catégories
  getCategories(params?: {
    limit?: number, 
    page?: number, 
    parentId?: number
  }): Promise<Category[]>

  // Caractéristiques et Options
  getProductFeatures(): Promise<ProductFeature[]>
  getProductOptions(): Promise<ProductOption[]>

  // Clients
  getCustomerById(id: number): Promise<Customer>
  createCustomer(customerData: Partial<Customer>): Promise<Customer>
  updateCustomer(id: number, customerData: Partial<Customer>): Promise<Customer>

  // Commandes
  createOrder(orderData: {
    customerId: number,
    cartId: number,
    carrierId: number,
    invoiceAddressId: number,
    deliveryAddressId: number
  }): Promise<Order>

  getCustomerOrders(customerId: number): Promise<Order[]>

  // Adresses
  getCustomerAddresses(customerId: number): Promise<Address[]>
  createAddress(addressData: Partial<Address>): Promise<Address>

  // Transporteurs
  getCarriers(): Promise<Carrier[]>

  // Langues et Localisation
  getLanguages(): Promise<Language[]>
  getCountries(): Promise<Country[]>
  getCurrencies(): Promise<Currency[]>
}
