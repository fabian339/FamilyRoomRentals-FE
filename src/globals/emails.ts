
export const SendEmailToClientOnOffer = (data: any) => {
    // console.log("from email: ", data.logo)
    const html = `
        <h3> Dear ${data.name}, </h3>
        <p> You offer was successfully sent!!</p>
        <h4>Information:</h4>
        <div style="line-height: 5px;">
            <p>Room: <strong><a href='https://familyroomrentals.com/#/room/'${data.roomId}'>Room</a></strong> </p>
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
        subject: "Offer Confirmation!",
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
            <p>Room: <strong><a href='https://familyroomrentals.com/#/room/${data.roomId}'>Room</a></strong> </p>
            <p>Offer: <strong>$${data.offer}</strong> </p>
            <p>Status: Offer accepted, ${data.ownerName} submitted three available dates </p>
        </div>

        <h4>What now?</h4>
        <p>Verification Id: <strong>${data.verificationId}</strong> - (you will need this ID to select the meeting date) </p>
        <p>Take a look at the available dates 
        <strong><a href='https://familyroomrentals.com/#/offer-for-room/${data.roomId}/select-date-to-meet/${data.token}' target="_blank">HERE</a></strong>.</p>
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

export const SendEmailToClientOnMeetingScheduled = (data: any) => {
    const { street1, street2, city, state, zipCode, country } = data.meetingLocation;
    // console.log("from email: ", data.logo)
    const html = `
        <h3> Dear ${data.name}, </h3>
        <p>YAYY You have offcially scheduled a meeting with ${data.ownerName}!</p>
        <h4>Information:</h4>
        <div style="line-height: 5px;">
            <p>Room: <strong><a href='https://familyroomrentals.com/#/room/${data.roomId}'>Room</a></strong> </p>
            <p>Offer: <strong>$${data.offer}</strong> </p>
            <p>Meeting with:  ${data.ownerName}</p>
            <p>Meeting date:  ${data.meetingDate}</p>
            <p>Meeting Location:  
                <a href='https://www.google.com/maps/place/${street1}+${street2}+${city}+${state}+${zipCode}+${country}' target="_blank">
                    ${street1}, ${street2}, ${city}, ${state}, ${zipCode}, ${country}                
                </a>
            </p>
            <p>${data.ownerName}'s email:  ${data.ownerEmail}</p>
            <p>${data.ownerName}'s phone:  ${data.ownerPhone}</p>

        </div>

        <h4>How to handle the meeting?</h4>
        <p>
            While dealing with a pandemic, visiting others could be challenging. Please take all the precautions
            necessary while visiting ${data.ownerName}'s property. 
        </p>
        <ul> Please wear a face covering </ul>
        <ul> Please stay in a 6 feet distance between you and any other individual. </ul>
        <ul> Please be on time </ul>
        <ul> Please ask as many questions as possible  </ul>
        <ul> Please stay alert while visiting the property. </ul>
        <ul> Please try to contact ${data.clientName} prior to the meeting to descuss details. </ul>

        <p>
            Once the meeting is done, we will send a follow up email to see how it went. 
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
        subject: "Your Meeting has been Confirmed!",
        name: data.name,
        html,
    };
}


export const SendEmailToUserOnMeetingScheduled = (data: any) => {
    const { street1, street2, city, state, zipCode, country } = data.meetingLocation;
    // console.log("from email: ", data.logo)
    const html = `
        <h3> Dear ${data.name}, </h3>
        <p>YAYY A Meeting was scheduled for ${data.clientName}'s offer!</p>
        <h4>Information:</h4>
        <div style="line-height: 5px;">
            <p>Room: <strong><a href='https://familyroomrentals.com/#/room/${data.roomId}'>Room</a></strong> </p>
            <p>Offer: <strong>$${data.offer}</strong> </p>
            <p>Meeting with:  ${data.clientName}</p>
            <p>Meeting date:  ${data.meetingDate}</p>
            <p>${data.clientName}'s email:  ${data.clientEmail}</p>
            <p>${data.clientName}'s phone:  ${data.clientPhone}</p>
            <div>
                <p>Meeting Location:  
                    <a href='https://www.google.com/maps/place/${street1}+${street2}+${city}+${state}+${zipCode}+${country}' target="_blank">
                        ${street1}, ${street2}, ${city}, ${state}, ${zipCode}, ${country}                
                    </a> 
                </p>
            </div>
        </div>

        <h4>How to handle the meeting?</h4>
        <p>
            While dealing with a pandemic, receiving visits could be challenging. Please take all the precautions
            necessary while receiving a visit from ${data.clientName}. 
        </p>
        <ul> Please wear a face covering </ul>
        <ul> Please stay in a 6 feet distance between you and any other individual. </ul>
        <ul> Please ask as many questions as possible  </ul>
        <ul> Please be fair, friendly, and welcoming. </ul>
        <ul> Please stay alert while the visitor is in the property. </ul>
        <ul> Please try to contact ${data.clientName} prior to the meeting to descuss details. </ul>

        <p>
            Once the meeting is done, we will send a follow up email to see how it went. 
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
        subject: "A Meeting has been Confirmed!",
        name: data.name,
        html,
    };
}

export const SendReminderToClient = (data: any) => {
    // console.log("from email: ", data.logo)
    const { street1, street2, city, state, zipCode, country } = data.meetingLocation;
    // console.log("from email: ", data.logo)
    const html = `
        <h3> Dear ${data.name}, </h3>
        <p>Your meeting with ${data.ownerName} is two days away!</p>
        <h4>Information:</h4>
        <div style="line-height: 5px;">
            <p>Room: <strong><a href='https://familyroomrentals.com/#/room/${data.roomId}'>Room</a></strong> </p>
            <p>Offer: <strong>$${data.offer}</strong> </p>
            <p>Meeting with:  ${data.ownerName}</p>
            <p>Meeting date:  ${data.meetingDate}</p>
            <p>Meeting Location:  
                <a href='https://www.google.com/maps/place/${street1}+${street2}+${city}+${state}+${zipCode}+${country}' target="_blank">
                    ${street1}, ${street2}, ${city}, ${state}, ${zipCode}, ${country}                
                </a>
            </p>
            <p>${data.ownerName}'s email:  ${data.ownerEmail}</p>
            <p>${data.ownerName}'s phone:  ${data.ownerPhone}</p>

        </div>

        <h4>Recomendations:</h4>
        <p>
            While dealing with a pandemic, visiting others could be challenging. Please take all the precautions
            necessary while visiting ${data.ownerName}'s property. 
        </p>
        <ul> Please wear a face covering </ul>
        <ul> Please stay in a 6 feet distance between you and any other individual. </ul>
        <ul> Please be on time </ul>
        <ul> Please ask as many questions as possible  </ul>
        <ul> Please stay alert while visiting the property. </ul>
        <ul> Please try to contact ${data.ownerName} prior to the meeting to descuss details. </ul>

        <p>
            Once the meeting is done, we will send a follow up email to see how it went. 
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
        subject: "Meeting Reminder!",
        name: data.name,
        html,
    };
}

export const SendReminderToUser = (data: any) => {
    // console.log("from email: ", data.logo)
    const { street1, street2, city, state, zipCode, country } = data.meetingLocation;
    // console.log("from email: ", data.logo)
    const html = `
        <h3> Dear ${data.ownerName}, </h3>
        <p>Your meeting with ${data.name} is two days away!</p>
        <h4>Information:</h4>
        <div style="line-height: 5px;">
            <p>Room: <strong><a href='https://familyroomrentals.com/#/room/${data.roomId}'>Room</a></strong> </p>
            <p>Offer: <strong>$${data.offer}</strong> </p>
            <p>Meeting with:  ${data.name}</p>
            <p>Meeting date:  ${data.meetingDate}</p>
            <p>Meeting Location:  
                <a href='https://www.google.com/maps/place/${street1}+${street2}+${city}+${state}+${zipCode}+${country}' target="_blank">
                    ${street1}, ${street2}, ${city}, ${state}, ${zipCode}, ${country}                
                </a>
            </p>
            <p>${data.name}'s email:  ${data.email}</p>
            <p>${data.name}'s phone:  ${data.phone}</p>

        </div>

        <h4>Recomendations:</h4>
        <p>
            While dealing with a pandemic, visiting others could be challenging. Please take all the precautions
            necessary receiving a visit from ${data.name}. 
        </p>
        <ul> Please wear a face covering </ul>
        <ul> Please stay in a 6 feet distance between you and any other individual. </ul>
        <ul> Please be on time </ul>
        <ul> Please ask as many questions as possible  </ul>
        <ul> Please stay alert while visiting the property. </ul>
        <ul> Please try to contact ${data.name} prior to the meeting to descuss details. </ul>

        <p>
            Once the meeting is done, we will send a follow up email to see how it went. 
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
        email: data.ownerEmail,
        subject: "Meeting Reminder!",
        name: data.name,
        html,
    };
}

export const SendFollowupToClient = (data: any) => {
    // console.log("from email: ", data.logo)
    // console.log("from email: ", data.logo)
    const html = `
        <h3> Dear ${data.name}, </h3>
        <p>We hope that your meeting with ${data.ownerName} was pleasant!</p>
        
        <h4>Actions: </h4>
        <p>
            If the meeting went well and an agreetment was made, there is nothing to do and we wish you all the best. 
            However, if an agreetment was not made, we encourage you to get a 50% refund of what you paid to make 
            the meeting possible.
        </p>
        <p>
            Please click 
            <strong><a href='https://familyroomrentals.com/#/request/${data.roomId}/refund/${data.token}' target="_blank">HERE</a></strong>
            to issue a 50% refund.
        </p>
        <p>
            Verification ID: <strong>${data.verificationId}</strong> - (you will need this ID to issue the refund).
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
        subject: "Meeting Followup!",
        name: data.name,
        html,
    };
}


export const SendFollowupToUser = (data: any) => {
    // console.log("from email: ", data.logo)
    // console.log("from email: ", data.logo)
    const html = `
        <h3> Dear ${data.ownerName}, </h3>
        <p>We hope that your meeting with ${data.name} was pleasant!</p>
        
        <h4>Actions: </h4>
        <p>
            If the meeting went well and an agreetment was made, we are happy to suggest you to please request your $10 payment.
            However, if an agreetment was not made, we encourage you to keep it up accepting offers until the right one come through.
        </p>
        <p>
            Login to check your account 
            <strong><a href='https://familyroomrentals.com/#/login' target="_blank">HERE.</a></strong>
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
        email: data.ownerEmail,
        subject: "Meeting Followup!",
        name: data.ownerName,
        html,
    };
}


export const SendEmailToAdminOnRefundRequested = (data: any) => {
    // console.log("from email: ", data.logo)
    // console.log("from email: ", data.logo)
    const html = `
        <h3> Dear admin, </h3>
        <p>A new refund has been requested.</p>
        
        <h4>Actions: </h4>
        <p>
            Login to check your account 
            <strong><a href='https://familyroomrentals.com/#/login' target="_blank">HERE.</a></strong>
        </p>
        `;
        
    return {
        email: data.email,
        subject: "New Refund Requested!",
        name: 'FamilyRoomRentals',
        html,
    };
}

export const SendEmailToAdminOnPaymentRequested = (data: any) => {
    // console.log("from email: ", data.logo)
    // console.log("from email: ", data.logo)
    const html = `
        <h3> Dear admin, </h3>
        <p>A new payment has been requested.</p>
        
        <h4>Actions: </h4>
        <p>
            Login to check your account 
            <strong><a href='https://familyroomrentals.com/#/login' target="_blank">HERE.</a></strong>
        </p>
        `;
        
    return {
        email: data.email,
        subject: "New Refund Requested!",
        name: 'FamilyRoomRentals',
        html,
    };
}


export const SendEmailToAdminOnRoomReported = (data: any) => {
    const html = `
    <h3> Dear admin, </h3>
    <p>
        The user ${data.userId} reported the property <a href='https://familyroomrentals.com/#/room/${data.propertyId}' target="_blank">HERE.</a>
    </p>
    
    <h4>Actions: </h4>
    <p>
        Login to check your account 
        <strong><a href='https://familyroomrentals.com/#/login' target="_blank">HERE.</a></strong>
    </p>
    `;
    
    return {
        email: data.email,
        subject: "Property Reported||",
        name: 'FamilyRoomRentals',
        html,
    };
}