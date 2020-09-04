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
  createdAt: string,
  objectId: string,
  password: string,
  confirmPassword: string,
}


  //helper function
// const isEmail = (email: string) => {
//   const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//   if(email.match(regEx)) return true;
//   else return false;
// }

// const isPhoneNumber = (str) => {
//   return (/^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/.test(str))
// }

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

// exports.validateTimesheetSubmit = (data) => {
//   let errors = {};

//   //validation for email
//   if(isEmpty(data.name)) errors.name = 'Must not be empty';
//   //validation for password
//   if(data.actType != "Clock-in" && data.actType != "Clock-out") errors.actType = 'Must select to Clock-In or Clock-out!';
//   //check if errors are registered
//   return {
//       errors,
//       valid: (Object.keys(errors).length === 0) ? true : false
//   }
// }



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
  if(data.price < 0 || !data.price) errors.price = 'Must enter a positive ammount';

  //validation for description
  if(isEmpty(data.description)) errors.description = 'Must not be empty';

  return {
    errors,
    valid: (Object.keys(errors).length === 0) ? true : false
  }
}


  //validation for emails
  // if(isEmpty(data.email)) {
  //     errors.email = 'Must not be empty'
  // } else if(!isEmail(data.email)){
  //     errors.email = 'Must be a valid email address'
  // }

  // // if (typeof variable !== 'undefined') {

  // //validation for password
  // if(isEmpty(data.password)) errors.password = 'Must not be empty'
  // //validation for confirn-password
  // if(isEmpty(data.confirmPassword)) errors.confirmPassword = 'Must not be empty';
  // //validation for password & confirn-password if they dont match
  // if(data.password !== data.confirmPassword) errors.confirmPassword = 'Passwords must match';
  // //validation for dob
  // if(isEmpty(data.dob)) errors.dob = 'Must not be empty';
  // //validation for phone
  // if(isEmpty(data.phone)) errors.phone = 'Must not be empty';
  // //validation for user role
  // if(isEmpty(data.role)) errors.role = 'Must choose a role';
  
  //check if errors are registered



// exports.validateLoginData = (data) => {
//   let errors = {};

//   //validation for email
//   if(isEmpty(data.email)) errors.email = 'Must not be empty';
//   //validation for password
//   if(isEmpty(data.password)) errors.password = 'Must not be empty';
//   //check if errors are registered
//   return {
//       errors,
//       valid: (Object.keys(errors).length === 0) ? true : false
//   }
// }