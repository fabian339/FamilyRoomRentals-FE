interface Room {
    title: string,
    street1: string,
    street2: string,
    city: string,
    state: string,
    zipCode: number,
    country: string,
    price: string,
    description: string,
    propertyType: string,
    images: object
  }

  const rooms: Room[] = [
      {
          title: 'New Room in Yonkeers',
          street1: 'Yonkeers St',
          street2: 'apt: 5g',
          city: 'Yonkeer',
          state: 'NY',
          zipCode: 10058,
          price: "$500/mo",
          description: "this is a description",
          country: 'USA',
          propertyType: 'Room',
          images: [
              'https://photos.spareroom.com/images/flatshare/listings/large/20/03/200397916.jpg', 
              'https://photos.spareroom.com/images/flatshare/listings/large/20/00/200024167.jpg',
              'https://photos.spareroom.com/images/flatshare/listings/large/20/00/200001345.jpg'
            ]
      },
      {
        title: 'New Room in Queens',
        street1: 'Queens St',
        street2: 'apt: 5g',
        city: 'Queens',
        state: 'NY',
        zipCode: 10058,
        price: "$600/mo",
        description: "this is a description",
        country: 'USA',
        propertyType: 'Room',
        images: [
            'https://photos.spareroom.com/images/flatshare/listings/large/20/00/200024167.jpg', 
            'https://photos.spareroom.com/images/flatshare/listings/large/20/00/200024167.jpg',
            'https://photos.spareroom.com/images/flatshare/listings/large/20/00/200001345.jpg'
          ]
    },
    {
        title: 'New Room in Bronx',
        street1: 'Bronx St',
        street2: 'apt: 5g',
        city: 'Bronx',
        state: 'NY',
        zipCode: 10058,
        price: "$900/mo",
        description: "this is a description",
        country: 'USA',
        propertyType: 'Room',
        images: [
            'https://photos.spareroom.com/images/flatshare/listings/large/20/03/200397916.jpg', 
            'https://photos.spareroom.com/images/flatshare/listings/large/20/00/200024167.jpg',
            'https://photos.spareroom.com/images/flatshare/listings/large/20/00/200001345.jpg'
          ]
    },
  ];

export default rooms;