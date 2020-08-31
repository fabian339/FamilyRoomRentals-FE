export interface Room {
    title: string,
    location: Location,
    price: number,
    createdAt: string,
    objectId: string,
    updatedAt: string,
    // propertyOwnerName: string, 
    description: string,
    // propertyType: string,
    images: string[]
  }

  export interface Location {
    street1: string,
    street2: string,
    city: string,
    state: string,
    zipCode: number,
    country: string
  }

  export interface User {
    fName: string,
    lName: string,
    username: string,
    email: string,
    createdAt: string,
    objectId: string,
    password: string,
    confirmPassword: string,
  }