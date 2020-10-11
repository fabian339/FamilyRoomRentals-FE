
export const SendEmailToClientOnOffer = (data: any) => {
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

export const SendEmailToUserOnOffer = (data: any) => {
    // console.log("from email: ", data.logo)
    const html = `
        <h3> Dear ${data.name}, </h3>
        <p> You have a new offer in your inbox!!</p>

        <h4>Information:</h4>
        <p> 
            The offer is regarding the following 
            <strong><a href='familyroomrentals/#/room/'${data.roomId}'>room</a></strong>
            for the ammount of <strong>$${data.offer}</strong>.
        </p>
        <p> 
            To accept or reject this offer please log in into 
            <a href='http://familyroomrentals.com/#/login'>familyroomrentals.com.</a>
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
        subject: "New Offer!",
        name: data.name,
        html,
    };
}

export const SendEmailToClientOnOfferAccepted = (data: any) => {
    // console.log("from email: ", data.logo)
    const html = `
        <h3> Dear ${data.name}, </h3>
        <p>WOAA You're offer has been accepted!!</p>
        <p>${data.ownerName} has accepted your offer and decided to move forward.</p>
        <h4>Information:</h4>
        <div style="line-height: 5px;">
            <p>Room: <strong><a href='http://localhost:8080/#/room/${data.roomId}'>Room</a></strong> </p>
            <p>Offer: <strong>$${data.offer}</strong> </p>
            <p>Status: Offer accepted, ${data.ownerName} submitted three available dates </p>
        </div>

        <h4>What now?</h4>
        <p>Verification Id: <strong>${data.verificationId}</strong> - (you will need this ID to select the meeting date) </p>
        <p>Take a look at the available dates 
        <strong><a href='http://localhost:8080/#/offer-for-room/${data.roomId}/select-date-to-meet/${data.token}' target="_blank">HERE</a></strong>.</p>
        <p>
            You have 7 days to select a date, keep in mind that if you do not select a date, the offer will
            be dismiss.
        </p>
        <p>
            Details: ${data.ownerName} will meet with you and show you the property. Please be aware that
            FamilyRoomRentals requires a small payment fee for the service provided, see our Terms 
            & Conditions. Once a date is selected and the payment is completed, you will be provided with 
            ${data.ownerName}'s contact information. You will be able to get in contact with ${data.ownerName}
            to discuss any details prior to the actual meeting.
        </p>

        <p>We Thank you for using FamilyRoomRentals, and wish you good luck moving forward</p>
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
        subject: "Offer Accepted!",
        name: data.name,
        html,
    };
}

export const SendEmailToClientOnOfferRejected = (data: any) => {
    // console.log("from email: ", data.logo)
    const html = `
        <h3> Dear ${data.name}, </h3>
        <p> We are sorry to inform you that offer has been rejected! </p>

        <h4>Information:</h4>
        <p> 
            You made an offer regarding the following  
            <strong><a href='familyroomrentals/#/room/'${data.roomId}'>property</a></strong>
            for the ammount of <strong>$${data.offer}</strong>.
        </p>
        <p> 
            Unfortunately, such offer was not accepted by the property owner and will not
            be moving forward with the process.
        </p>
        
        <p>
            <strong>But,</strong> there is a property for everyone. <strong>Do not give up,</strong> 
            we encourage you to keep sending offers at 
            <a href='http://familyroomrentals.com/#/login'>familyroomrentals.com.</a>
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
        subject: "Important Information about your offer!",
        name: data.name,
        html,
    };
}