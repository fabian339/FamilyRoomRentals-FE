
export const SendEmailToClientOnOffer = (data: any) => {
    console.log("from email: ", data)
    const html = `
        <h3> Dear ${data.name}, </h3>
        <p> You offer was successfully sent!!</p>
        <h4>Information:</h4>
        <div style="line-height: 5px;">
            <p>Room: <strong><a href='https://familyroomrentals.com/#/room/${data.roomId}'>Room</a></strong> </p>
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
            <p><a href='https://familyroomrentals.com'>familyroomrentals.com</a> </p>
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
            <strong><a href='https://familyroomrentals.com/#/room/${data.roomId}'>Room</a></strong>
            for the ammount of <strong>$${data.offer}</strong>.
        </p>
        <p> 
            To accept or reject this offer please log in into 
            <a href='https://familyroomrentals.com/#/login'>familyroomrentals.com.</a>
        </p>

        <p>Thank you for using FamilyRoomRentals</p>
        <p>Stay safe during this critical times and enjoy the rest of your day!</p>

        <div style="line-height: 3px; margin: 40px 0px;">
            <p>FamilyRoomRentals.Inc</p>
            <p>New York, NY</p>
            <p>(347) 389-0868</p>
            <p>familyroomrentas@dr.com</p>
            <p><a href='https://familyroomrentals.com'>familyroomrentals.com</a> </p>
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
        <h3> Dear ${data.clientName}, </h3>
        <p>WOAA You're offer has been accepted!!</p>
        <p>${data.ownerName} has accepted your offer and decided to move forward.</p>
        <h4>Information:</h4>
        <div>
            <p>Room: <strong><a href='https://familyroomrentals.com/#/room/${data.roomId}'>Room</a></strong> </p>
            <p>Offer: <strong>$${data.offer}</strong> </p>
            <p>Status: Offer accepted, ${data.ownerName} submitted three available dates to meet. </p>
        </div>

        <h4>What now?</h4>
        <p>Verification Id: <strong>${data.verificationId}</strong> - (you will need this ID to select the meeting date) </p>
        <p>Take a look at the available dates 
        <strong><a href='https://familyroomrentals.com/#/room/${data.roomId}/meeting/${data.token}' target="_blank">HERE</a></strong>.</p>
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
            <p><a href='https://familyroomrentals.com'>familyroomrentals.com</a> </p>
        </div>
        <img src="https://i.ibb.co/DrcHFyW/logo.png" style="margin-left: -20px;" alt="logo" border="0" width="200">
        `;
        
    return {
        email: data.clientEmail,
        subject: "Offer Accepted!",
        name: data.clientName,
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
            <a href='https://familyroomrentals.com'>familyroomrentals.com.</a>
        </p>
            
        <p>Thank you for using FamilyRoomRentals</p>
        <p>Stay safe during this critical times and enjoy the rest of your day!</p>

        <div style="line-height: 3px; margin: 40px 0px;">
            <p>FamilyRoomRentals.Inc</p>
            <p>New York, NY</p>
            <p>(347) 389-0868</p>
            <p>familyroomrentas@dr.com</p>
            <p><a href='https://familyroomrentals.com'>familyroomrentals.com</a> </p>
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
            <p><a href='https://familyroomrentals.com'>familyroomrentals.com</a> </p>
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

export const SendVerificationCodeOnOfferMade = (data: any) => {
    const html = `
        <h3> Dear ${data.name}, </h3>

        <p>Please verify this email before completing the offer submission.</p>
        
        <h4>Verification Code: <span style="color: blue;">${data.verificationCode}</span></h4>

        <p>We Thank you for using FamilyRoomRentals, and stay safe during this critical times.</p>

        <div style="line-height: 3px; margin: 40px 0px;">
            <p>FamilyRoomRentals.Inc</p>
            <p>New York, NY</p>
            <p>(347) 389-0868</p>
            <p>familyroomrentas@dr.com</p>
            <p><a href='https://familyroomrentals.com'>familyroomrentals.com</a> </p>
        </div>
        <img src="https://i.ibb.co/DrcHFyW/logo.png" style="margin-left: -20px;" alt="logo" border="0" width="200">
        `;
        
    return {
        email: data.email,
        subject: "FamilyRoomRentals, Email Verification",
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
            <p><a href='https://familyroomrentals.com'>familyroomrentals.com</a> </p>
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

export const SendEmailToClientOnMeetingCanceledByOwner = (data: any) => {
    // console.log("from email: ", data.logo)
    const html = `
        <h3> Dear ${data.clientName}, </h3>
        <p> The meeting process with ${data.ownerName} has been cancelled. </p>

        <h4>Information:</h4>
        <p> 
            You made an offer regarding the following  
            <strong><a href='https://familyroomrentals.com/#/room/${data.roomId}'>property</a></strong>
            for the ammount of <strong>$${data.offer}</strong>.
        </p>
        <p> 
            Unfortunately, the property owner has cancelled the meeting process
            and will not be moving forward.
        </p>

        <p> 
            ${data.meetingScheduled ? `The meeting proccess was canceled by ${data.ownerName}. You will not be charged!!` : 'This offer is terminated!'}
        </p>
        
        <p>
            <strong>But,</strong> there is a property for everyone. <strong>Do not give up,</strong> 
            we encourage you to keep sending offers at 
            <a href='https://familyroomrentals.com/#'>familyroomrentals.com.</a>
        </p>
            
        <p>Thank you for using FamilyRoomRentals</p>
        <p>Stay safe during this critical times and enjoy the rest of your day!</p>

        <div style="line-height: 3px; margin: 40px 0px;">
            <p>FamilyRoomRentals.Inc</p>
            <p>New York, NY</p>
            <p>(347) 389-0868</p>
            <p>familyroomrentas@dr.com</p>
            <p><a href='https://familyroomrentals.com'>familyroomrentals.com</a> </p>
        </div>
        <img src="https://i.ibb.co/DrcHFyW/logo.png" style="margin-left: -20px;" alt="logo" border="0" width="200">
    `;
    return {
        email: data.clientEmail,
        subject: "Your Pending Meeting Has Been Canceled",
        name: data.clientName,
        html,
    };
}

export const SendEmailToOwnerOnMeetingCanceledByOwner = (data: any) => {
    // console.log("from email: ", data.logo)
    const html = `
        <h3> Dear ${data.ownerName}, </h3>
        <p> The meeting process with ${data.clientName} has been cancelled. </p>

        <h4>Information:</h4>
        <p> 
            You accepted an offer regarding the following  
            <strong><a href='https://familyroomrentals.com/#/room/${data.roomId}'>property</a></strong>
            for the ammount of <strong>$${data.offer}</strong>.
        </p>

        <p>
            At FamilyRoomRentals, we depend on clients making offers. Cancelling a pending meeting could
            result in losing revenue and potentially losing the client.
        </p>
        <p> 
            ${data.meetingScheduled ? `You canceled the meeting process with ${data.clientName}. As a concequence of cancelling a pending meeting, we could disable this property for a period
            of one week, or more.` : 'This offer is terminated effectively now!'}
        </p>
            
        <p>Thank you for using FamilyRoomRentals</p>
        <p>Stay safe during this critical times and enjoy the rest of your day!</p>

        <div style="line-height: 3px; margin: 40px 0px;">
            <p>FamilyRoomRentals.Inc</p>
            <p>New York, NY</p>
            <p>(347) 389-0868</p>
            <p>familyroomrentas@dr.com</p>
            <p><a href='https://familyroomrentals.com'>familyroomrentals.com</a> </p>
        </div>
        <img src="https://i.ibb.co/DrcHFyW/logo.png" style="margin-left: -20px;" alt="logo" border="0" width="200">
    `;
    return {
        email: data.ownerEmail,
        subject: "Meeting Cancelation Confirmed!",
        name: data.ownerName,
        html,
    };
}

export const SendEmailToClientOnMeetingCanceledByClient = (data: any) => {
    // console.log("from email: ", data.logo)
    const html = `
        <h3> Dear ${data.clientName}, </h3>
        <p> You have canceled the meeting process with ${data.ownerName}. </p>

        <h4>Information:</h4>
        <p> 
            You made an offer regarding the following  
            <strong><a href='https://familyroomrentals.com/#/room/${data.roomId}'>property</a></strong>
            for the ammount of <strong>$${data.offer}</strong>.
        </p>
        <p> 
            We are sorry to see that the meeting will not be completed. This offer is terminated!
        </p>

        <h4>IMPORTANT:</h4>
        <p> 
            At FamilyRoomRentals, we depend on users posting and sharing their properties. 
            Canceling a pending meeting could result in the lost of revenue and potentially losing the user. 
            As a concequence of canceling a pending meeting, we could charge a fee of <strong>$5</strong> as the user dedicated 
            his/her time to look foward for this meeting. Please read FamilyRoomRentals property's 
            <strong><a href='https://familyroomrentals.com/#/terms-and-conditions'>Terms & Conditions</a></strong>
            for more details.
        </p>
        
            
        <p>Thank you for using FamilyRoomRentals</p>
        <p>Stay safe during this critical times and enjoy the rest of your day!</p>

        <div style="line-height: 3px; margin: 40px 0px;">
            <p>FamilyRoomRentals.Inc</p>
            <p>New York, NY</p>
            <p>(347) 389-0868</p>
            <p>familyroomrentas@dr.com</p>
            <p><a href='https://familyroomrentals.com'>familyroomrentals.com</a> </p>
        </div>
        <img src="https://i.ibb.co/DrcHFyW/logo.png" style="margin-left: -20px;" alt="logo" border="0" width="200">
    `;
    return {
        email: data.clientEmail,
        subject: "Meeting cancelation confirmed!",
        name: data.clientName,
        html,
    };
}

export const SendEmailToOwnerOnMeetingCanceledByClient = (data: any) => {
    // console.log("from email: ", data.logo)
    const html = `
        <h3> Dear ${data.ownerName}, </h3>
        <p> ${data.clientName} has been canceled the meeting process with you. </p>

        <h4>Information:</h4>
        <p> 
            You accepted an offer regarding the following  
            <strong><a href='https://familyroomrentals.com/#/room/${data.roomId}'>property</a></strong>
            for the ammount of <strong>$${data.offer}</strong>.
        </p>

        <p> 
            We are sorry to see that the meeting will not be completed. This offer is terminated!
        </p>

        <p> 
            Please feel free to eliminate this offer from you inbox!
        </p>

        <p>Thank you for using FamilyRoomRentals</p>
        <p>Stay safe during this critical times and enjoy the rest of your day!</p>

        <div style="line-height: 3px; margin: 40px 0px;">
            <p>FamilyRoomRentals.Inc</p>
            <p>New York, NY</p>
            <p>(347) 389-0868</p>
            <p>familyroomrentas@dr.com</p>
            <p><a href='https://familyroomrentals.com'>familyroomrentals.com</a> </p>
        </div>
        <img src="https://i.ibb.co/DrcHFyW/logo.png" style="margin-left: -20px;" alt="logo" border="0" width="200">
    `;
    return {
        email: data.ownerEmail,
        subject: "Your Meeting Has Been Canceled!!",
        name: data.ownerName,
        html,
    };
}

export const SendEmailToClientOnOwnerCheckIn = (data: any) => {
    const html = `
        <h3> Dear ${data.clientName}, </h3>
        <p> ${data.ownerName} has checked-in for the meeting! </p>

        <p> If you haven't, please use your verification ID to check-in 
            <strong><a href='https://familyroomrentals.com/#/room/${data.roomId}/select-date-to-meet/${data.token}' target="_blank">HERE</a></strong>.</p>
        </p>

        <p>Verification ID: <strong>${data.verificationId}</strong> - (you will need this ID to check-in the meeting!) </p>
        
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
        <ul> Verify that ${data.ownerName} has checked-in on the app before starting the meeting! </ul>
        <ul> Stay Alert and be safe!! </ul>

        <p>
            Once the meeting is done, we will send you a follow up email to see how it went. 
        </p>

        <p> We wish you all the best on your meeting with ${data.ownerName}! </p>

        <p>Thank you for using FamilyRoomRentals</p>
        <p>Stay safe during this critical times and enjoy the rest of your day!</p>

        <div style="line-height: 3px; margin: 40px 0px;">
            <p>FamilyRoomRentals.Inc</p>
            <p>New York, NY</p>
            <p>(347) 389-0868</p>
            <p>familyroomrentas@dr.com</p>
            <p><a href='https://familyroomrentals.com'>familyroomrentals.com</a> </p>
        </div>
        <img src="https://i.ibb.co/DrcHFyW/logo.png" style="margin-left: -20px;" alt="logo" border="0" width="200">
    `;
    return {
        email: data.clientEmail,
        subject: "WOA Your meeting is about to start!!",
        name: data.clientName,
        html,
    };
}

export const SendEmailToOwnerOnClientCheckIn = (data: any) => {
    const html = `
        <h3> Dear ${data.ownerName}, </h3>
        <p> ${data.clientName} has checked-in for the meeting! </p>

        <p> If you haven't, please log-in into 
            <strong><a href='https://familyroomrentals.com/#/login' target="_blank">FamilyRoomRentals</a></strong>
            in order to check-in.
        </p>
                
        <h4>How to handle the meeting?</h4>
        <p>
            While dealing with a pandemic, receiving visitors could be challenging. Please take all the precautions
            necessary while meeting with ${data.clientName}. 
        </p>
        <ul> Please wear a face covering </ul>
        <ul> Please stay in a 6 feet distance between you and any other individual. </ul>
        <ul> Please be on time </ul>
        <ul> Please ask as many questions as possible  </ul>
        <ul> Please stay alert while visiting the property. </ul>
        <ul> Verify that ${data.clientName} has checked-in on the app before starting the meeting! </ul>
        <ul> Stay Alert and be safe!! </ul>

        <p>
            Once the meeting is done, we will send you a follow up email and notification to see how it went. 
        </p>
        
        <p> We wish you all the best on your meeting with ${data.clientName}! </p>

        <p>Thank you for using FamilyRoomRentals</p>
        <p>Stay safe during this critical times and enjoy the rest of your day!</p>

        <div style="line-height: 3px; margin: 40px 0px;">
            <p>FamilyRoomRentals.Inc</p>
            <p>New York, NY</p>
            <p>(347) 389-0868</p>
            <p>familyroomrentas@dr.com</p>
            <p><a href='https://familyroomrentals.com'>familyroomrentals.com</a> </p>
        </div>
        <img src="https://i.ibb.co/DrcHFyW/logo.png" style="margin-left: -20px;" alt="logo" border="0" width="200">
    `;
    return {
        email: data.ownerEmail,
        subject: "WOA Your meeting is about to start!!",
        name: data.ownerName,
        html,
    };    
}

//ADMINS
export const SendEmailToAdminOnClientMeetingCancelation = (data: any) => {
    const html = `
    <h3> Dear admin, </h3>
    <p>The client ${data.clientName} has canceled a meeting.</p>
    <h4>Actions: </h4>
    <p>
        Login to check your account 
        <strong><a href='https://familyroomrentals.com/#/login' target="_blank">HERE.</a></strong>
    </p>
    <p> MeetingID/OfferID: ${data.offerId} </p>
    <p> Please proceed to charge the cancelation fee to the client! </p?
    `;
    
    return {
        email: data.adminEmail,
        subject: "New Cancelation Feed To Charge!",
        name: 'FamilyRoomRentals',
        html,
    };
}

export const SendEmailToAdminOnOwnerMeetingCancelation = (data: any) => {
    const html = `
    <h3> Dear admin, </h3>
    <p>The property owner ${data.ownerName} has canceled a meeting.</p>
    <h4>Actions: </h4>
    <p>
        Login to check your account 
        <strong><a href='https://familyroomrentals.com/#/login' target="_blank">HERE.</a></strong>
    </p>
    <p> MeetingID/OfferID: ${data.offerId} </p>
    <p> Please refund money to client! </p?
    `;
    
    return {
        email: data.adminEmail,
        subject: "New Cancelation by owner, refund to client!",
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

export const SendEmailToAdminOnFollowUpSubmitted = (data: any) => {
    // console.log("from email: ", data.logo)
    // console.log("from email: ", data.logo)
    const html = `
        <h3> Dear admin, </h3>
        <p>A follow-up has been submitted. Please check!!</p>
        
        <h2>Information: </h2>
        <p>Follow up submitted by ${data.owner ? 'owner': 'client'}: ${data.name}, meetingId: ${data.meetingId}</p>
        <p>
            Login to check your account 
            <strong><a href='https://familyroomrentals.com/#/login' target="_blank">HERE.</a></strong>
        </p>
        `;
        
    return {
        email: data.email,
        subject: "New Follow-up Submitted",
        name: 'FamilyRoomRentals',
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

export const SendEmailToAdminOnRewardRequested = (data: any) => {
    const html = `
        <h3> Dear admin, </h3>
        <p>A new Reward has been requested.</p>

        <p>Please send ${data.rewardName} gift card to ${data.ownerName} from offer ${data.offerId}.</p>
        
        <h4>Actions: </h4>
        <p>
            Login to check your account 
            <strong><a href='https://familyroomrentals.com/#/login' target="_blank">HERE.</a></strong>
        </p>
        `;
        
    return {
        email: data.email,
        subject: "URGENT ACTION, New Reward Requested!",
        name: 'FamilyRoomRentals',
        html,
    };
}