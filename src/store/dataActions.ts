// import axios from 'axios';
// // import {setRooms} from './store';

// axios.defaults.headers.common['X-Parse-Application-Id'] = 'kUx57AUuSOjGF36AotqV2lzjzjREM3mDQfc2a9gn'
// axios.defaults.headers.common['X-Parse-REST-API-Key'] = '1B647vsxlJr1SCJ732paCCmXB57dKEqxRL3MFE4w'
// axios.defaults.headers.common['Content-Type'] = 'application/json'

// interface Room {
//     title: string,
//     location: Location,
//     price: string,
//     publisherName: string,
//     propertyOwnerName: string, 
//     description: string,
//     propertyType: string,
//     // images: File[]
//   }

//   interface Location {
//     street1: string,
//     street2: string,
//     city: string,
//     state: string,
//     zipCode: number,
//     country: string
//   }


//   export const postRoom = () => {
//     console.log("O am here")
//     const data : Room = {
//       title: 'New Room in Yonkeers',
//       location : {
//         street1: 'Yonkeers St',
//         street2: 'apt: 5g',
//         city: 'Yonkeer',
//         state: 'NY',
//         zipCode: 10058,
//         country: 'USA',
//       },
//       price: "$500/mo",
//       publisherName: "Anony Loy",
//       propertyOwnerName: "Anony Loy",
//       description: "this is a description",
//       propertyType: 'Room',
//       // images: [
//       //     'https://photos.spareroom.com/images/flatshare/listings/large/20/03/200397916.jpg', 
//       //     'https://photos.spareroom.com/images/flatshare/listings/large/20/00/200024167.jpg',
//       //     'https://photos.spareroom.com/images/flatshare/listings/large/20/00/200001345.jpg'
//       //   ]
//   };
//     axios.post('https://parseapi.back4app.com/classes/Room', data)
//     .then((res: any) => {
//       console.log("This is my data", res)
//     })
//     .catch((err: Object) => {
//       console.log(err)
//     });
//   }

//   export const setRooms = () => {
//     axios.get('https://parseapi.back4app.com/classes/Room')
//     .then((res: any) => {
//       console.log("This is my data", res.data.results)
//     })
//     .catch((err: Object) => {
//       console.log(err)
//     });
//   }

