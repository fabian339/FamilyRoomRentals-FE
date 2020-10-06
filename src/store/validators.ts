interface Room {
  title: string,
  location: Location,
  price: number,
  createdAt: string,
  objectId: string,
  updatedAt: string,
  // propertyOwnerName: string, 
  description: string,
  ownerId: string,
  images: string[]
}

interface Location {
  street1: string,
  street2: string,
  city: string,
  state: string,
  zipCode: string,
  country: string
}

interface User {
  fName: string,
  lName: string,
  username: string,
  email: string,
  phone: string,
  notifyBy: string,
  password: string,
  confirmPassword: string,
}

interface Login {
  email: string,
  password: string,
}


  //helper function
const isEmail = (email: string) => {
  // eslint-disable-next-line no-useless-escape
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(email.match(regEx)) return true;
  else return false;
}

const isPhoneNumber = (str: string) => {
  var patt = new RegExp(/^\+?1?\s*?\(?\d{3}(?:\)|[-|\s])?\s*?\d{3}[-|\s]?\d{4}$/);
  return patt.test(str);}

//helper function
const isEmpty = (string: string) => {
  if(typeof string !== 'undefined' && string.trim() === '') return true;
  else return false;
}

const is_usZipCode = (str: string) => {
  let regexp = /^[0-9]{5}(?:-[0-9]{4})?$/;
  if (regexp.test(str)) return true;
  else return false;
}


export const validateCreateRoom = (data: Room) => {
  let errors:any = {};
  
  // console.log(data)
  //validation for first title
  if(isEmpty(data.title)) errors.title = 'Must not be empty';

  //validation for last location
  if(isEmpty(data.location.street1)) errors.street1 = 'Must not be empty';
  if(isEmpty(data.location.street2)) errors.street2 = 'Must not be empty';
  if(isEmpty(data.location.city)) errors.city = 'Must not be empty';
  if(isEmpty(data.location.state)) errors.state = 'Must not be empty';
  if(!is_usZipCode(data.location.zipCode)) {
    errors.zipCode = 'Must be a valid zipcode';
  }
  if(isEmpty(data.location.country)) errors.country = 'Must not be empty';

  //validation for price
  if(data.price < 0 || !data.price) errors.price = 'Must enter a positive amount';

  //validation for description
  if(isEmpty(data.description)) errors.description = 'Must not be empty';

  return {
    errors,
    valid: (Object.keys(errors).length === 0) ? true : false
  }
}

export const validateUpdateRoom = (data: any) => {
  let errors:any = {};
  for (const property in data) {
    if(property === 'title' && isEmpty(data.title)) errors.title = 'Must not be empty';
    if(property === 'location'){
      // console.log('validate Location => ', data.location.country === undefined)
      if(data.location.street1 === undefined) errors.street1 = 'Must not be empty';
      if(data.location.street2 === undefined) errors.street2 = 'Must not be empty';
      if(data.location.city === undefined) errors.city = 'Must not be empty';
      if(data.location.state === undefined) errors.state = 'Must not be empty';
      if(data.location.country === undefined) errors.country = 'Must not be empty';
      if(!is_usZipCode(data.location.zipCode)) {
        errors.zipCode = 'Must be a valid zipcode';
      }
    }
    if(property === 'price'){
      if(data.price < 0 || !data.price) errors.price = 'Must enter a positive amount';
    }
    if(property === 'description'){
      if(isEmpty(data.description)) errors.description = 'Must not be empty';
    }
  }

  return {
    errors,
    valid: (Object.keys(errors).length === 0) ? true : false
  }
}

export const validateUpdateUser = (data: any) => {
  let errors:any = {};
  for (const property in data) {
    if(property === 'fName' && isEmpty(data.fName)) errors.fName = 'Must not be empty';
    if(property === 'lName' && isEmpty(data.lName)) errors.lName = 'Must not be empty';
    if(property === 'username' && isEmpty(data.username)) errors.username = 'Must not be empty';

    if(property === 'email'){
      if(isEmpty(data.email)) {
        errors.email = 'Must not be empty'
      } else if(!isEmail(data.email)){
        errors.email = 'Must be a valid email address'
      }
    }
    if(property === 'phone'){
      if(isEmpty(data.phone)) {
        errors.phone = 'Must not be empty'
      } else if(!isPhoneNumber(data.phone)){
        errors.phone = 'Must be a valid phone number'
      } 
    }
  }

  return {
    errors,
    valid: (Object.keys(errors).length === 0) ? true : false
  }
}

export const validatePasswordResetEmail = (data: any) => {
  let errors:any = {};

  if(isEmpty(data.email)) {
    errors.email = 'Must not be empty'
  } else if(!isEmail(data.email)){
    errors.email = 'Must be a valid email address'
  }

  return {
    errors,
    valid: (Object.keys(errors).length === 0) ? true : false
  }
}

export const validateUserRegistration = (data: User) => {
  let errors:any = {};
  
  //validation for fname,lname,username
  if(isEmpty(data.fName)) errors.fName = 'Must not be empty';
  if(isEmpty(data.lName)) errors.lName = 'Must not be empty';
  if(isEmpty(data.username)) errors.username = 'Must not be empty';
  //validation for emails
  if(isEmpty(data.email)) {
      errors.email = 'Must not be empty'
  } else if(!isEmail(data.email)){
      errors.email = 'Must be a valid email address'
  }
    //validation for phone
  if(isEmpty(data.phone)) {
    errors.phone = 'Must not be empty'
  } else if(!isPhoneNumber(data.phone)){
    errors.phone = 'Must be a valid phone number'
  } 
  
  //validation for notifyBy
  if(isEmpty(data.notifyBy)) errors.notifyBy = 'Please make a selection.';

  //validation for password
  if(isEmpty(data.password)) errors.password = 'Must not be empty'
  else if(data.password.length <= 7) errors.password = 'Must have at least 8 characters'
  //validation for confirn-password
  if(isEmpty(data.confirmPassword)) errors.confirmPassword = 'Must not be empty';
  //validation for password & confirn-password if they dont match
  if(data.password !== data.confirmPassword) errors.confirmPassword = 'Passwords must match';

  return {
    errors,
    valid: (Object.keys(errors).length === 0) ? true : false
  }
}



export const validateOffer = (data: any) => {
  let errors:any = {};

  //validation for fullname
  if(isEmpty(data.full_name)) errors.full_name = 'Must not be empty';
  //validation for email
  if(isEmpty(data.email)) {
    errors.email = 'Must not be empty'
  } else if(!isEmail(data.email)){
      errors.email = 'Must be a valid email address'
  }  
  //validation for phone
  if(isEmpty(data.phone)) {
    errors.phone = 'Must not be empty'
  } else if(!isPhoneNumber(data.phone)){
    errors.phone = 'Must be a valid phone number'
  } 
  //validation for offer
  if(data.offer < 0 || !data.offer) errors.offer = 'Must enter a positive amount';
  //check if errors are registered
  return {
      errors,
      valid: (Object.keys(errors).length === 0) ? true : false
  }
}



export const validateLoginData = (data: Login) => {
  let errors:any = {};

  //validation for email
  if(isEmpty(data.email)) {
    errors.email = 'Must not be empty'
  } else if(!isEmail(data.email)){
      errors.email = 'Must be a valid email address'
  }  
  //validation for password
  if(isEmpty(data.password)) errors.password = 'Must not be empty';
  //check if errors are registered
  return {
      errors,
      valid: (Object.keys(errors).length === 0) ? true : false
  }
}