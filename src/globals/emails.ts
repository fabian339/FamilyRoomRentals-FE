
export const SendClientEmail = (data: any) => {
    // console.log("from email: ", data.logo)
    const html = `
        <h3> Dear ${data.name}, </h3>
        <p> You offer was successfully sent!!</p>
        <h4>Information:</h4>
        <div style="line-height: 5px;">
            <p>Room: <strong><a href='familyroomrentals/#/room/'${data.roomId}'>Room</a></strong> </p>
            <p>Offer: <strong>$${data.offer}</strong> </p>
            <p>Status: Waiting for a response </p>
        </div>
        <p> Please give time for the room renter to make his/her decision. Once this is done, you will
            receive an email/text notifying you whether the offer was accepted or not.
        </p>


        <p>Thank you for using FamilyRoomRentals</p>
        <p>Stay safe during this critical times and enjoy the rest of your day!</p>

        <div style="line-height: 3px; margin: 40px 0px;">
            <p>FamilyRoomRentals.Inc</p>
            <p>New York, NY</p>
            <p>(347) 389-0868</p>
            <p>familyroomrentas@dr.com</p>
            <p>familyroomrentals.com</p>
        </div>
        <img src="https://i.ibb.co/DrcHFyW/logo.png" style="margin-left: -20px;" alt="logo" border="0" width="200">
        `;
        
    return {
        email: data.email,
        subject: "Offer Comfirmation!",
        name: data.name,
        html,
    };
  }