//REMINDERS
export const SendReminder1ToClient = (data: any) => {
    const { street1, street2, city, state, zipCode, country } = data.meetingLocation;
    // console.log("from email: ", data.logo)
    const html = `
        <h3> Dear ${data.clientName}, </h3>
        <p> Your meeting with ${data.ownerName} is two days away!</p>
        <h4>Information:</h4>
        <div>
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

        <h4>Are your ready?</h4>
        <p>To cancel or check-in the meeting please click 
            <strong><a href='https://familyroomrentals.com/#/room/${data.roomId}/select-date-to-meet/${data.token}' target="_blank">HERE</a></strong> 
            and use the verification Id below.
        </p>
        <p>Verification Id: <strong>${data.verificationId}</strong></p>

        <p style="font-style: italic;">
            <strong>
                Note: It is crucial to check-in the meeting, otherwise it will complicate the process and you could
                be charged a fee for a no show violation.
            </strong>
        </p>

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
        <ul> Please try to contact ${data.ownerName} prior to the meeting to discuss details. </ul>

        <p>
            Once the meeting is done, we will send a follow up email to see how it went. 
        </p>
        <p>We Thank you for using FamilyRoomRentals, and wish you good luck moving forward.</p>
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
        subject: "Meeting Reminder!",
        name: data.clientName,
        html,
        date: data.date
    };
}

export const SendReminder1ToUser = (data: any) => {
    const { street1, street2, city, state, zipCode, country } = data.meetingLocation;
    // console.log("from email: ", data.logo)
    const html = `
        <h3> Dear ${data.ownerName}, </h3>
        <p> Your meeting with ${data.clientName} is two days away!</p>
        <h4>Information:</h4>
        <div>
            <p>Room: <strong><a href='https://familyroomrentals.com/#/room/${data.roomId}'>Room</a></strong> </p>
            <p>Offer: <strong>$${data.offer}</strong> </p>
            <p>Meeting with:  ${data.clientName}</p>
            <p>Meeting date:  ${data.meetingDate}</p>
            <p>Meeting Location:  
                <a href='https://www.google.com/maps/place/${street1}+${street2}+${city}+${state}+${zipCode}+${country}' target="_blank">
                    ${street1}, ${street2}, ${city}, ${state}, ${zipCode}, ${country}                
                </a>
            </p>
            <p>${data.clientName}'s email:  ${data.clientEmail}</p>
            <p>${data.clientName}'s phone:  ${data.clientPhone}</p>

        </div>

        <h4>Are your ready?</h4>
        <p>To cancel or check-in please log in
            <strong><a href='https://familyroomrentals.com/#/login' target="_blank">HERE</a></strong> 
            and select the offer notification.
        </p>

        <p style="font-style: italic;">
            <strong>
                Note: It is crucial to check-in the meeting, otherwise, it could bring
                consequences such as disabling the property or not getting you $10 if the client decides to move-in.
            </strong>
        </p>

        <h4>Recomendations:</h4>
        <p>
            While dealing with a pandemic, visiting others could be challenging. Please take all the precautions
            necessary while receiving a visit from ${data.clientName}: 
        </p>
        <ul> Please wear a face covering </ul>
        <ul> Please stay in a 6 feet distance between you and any other individual. </ul>
        <ul> Please be on time </ul>
        <ul> Please ask as many questions as possible  </ul>
        <ul> Please stay alert while visiting the property. </ul>
        <ul> Please try to contact ${data.clientName} prior to the meeting to discuss details. </ul>

        <p>
            Once the meeting is done, we will send a follow up email to see how it went. 
        </p>
        <p>We Thank you for using FamilyRoomRentals, and wish you good luck moving forward.</p>
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
        subject: "Meeting Reminder!",
        name: data.ownerName,
        html,
        date: data.date
    };
}

export const SendReminder2ToClient = (data: any) => {
    const { street1, street2, city, state, zipCode, country } = data.meetingLocation;
    // console.log("from email: ", data.logo)
    const html = `
        <h3> Dear ${data.clientName}, </h3>
        <p> Your meeting with ${data.ownerName} is only one day away!</p>
        <h4>Information:</h4>
        <div>
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

        <h4>Are your ready?</h4>
        <p>To cancel or check-in the meeting please click 
            <strong><a href='https://familyroomrentals.com/#/room/${data.roomId}/select-date-to-meet/${data.token}' target="_blank">HERE</a></strong> 
            and use the verification Id below.
        </p>
        <p>Verification Id: <strong>${data.verificationId}</strong></p>

        <p style="font-style: italic;">
            <strong>
                Note: It is crucial to check-in the meeting, otherwise it will complicate the process and you could
                be charged a fee for a no show violation.
            </strong>
        </p>

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
        <ul> Please try to contact ${data.ownerName} prior to the meeting to discuss details. </ul>

        <p>
            Once the meeting is done, we will send a follow up email to see how it went. 
        </p>
        <p>We Thank you for using FamilyRoomRentals, and wish you good luck moving forward.</p>
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
        subject: "Meeting Reminder!",
        name: data.clientName,
        html,
        date: data.date
    };
}

export const SendReminder2ToUser = (data: any) => {
    const { street1, street2, city, state, zipCode, country } = data.meetingLocation;
    // console.log("from email: ", data.logo)
    const html = `
        <h3> Dear ${data.ownerName}, </h3>
        <p> Your meeting with ${data.clientName} is only one day away!</p>
        <h4>Information:</h4>
        <div>
            <p>Room: <strong><a href='https://familyroomrentals.com/#/room/${data.roomId}'>Room</a></strong> </p>
            <p>Offer: <strong>$${data.offer}</strong> </p>
            <p>Meeting with:  ${data.clientName}</p>
            <p>Meeting date:  ${data.meetingDate}</p>
            <p>Meeting Location:  
                <a href='https://www.google.com/maps/place/${street1}+${street2}+${city}+${state}+${zipCode}+${country}' target="_blank">
                    ${street1}, ${street2}, ${city}, ${state}, ${zipCode}, ${country}                
                </a>
            </p>
            <p>${data.clientName}'s email:  ${data.clientEmail}</p>
            <p>${data.clientName}'s phone:  ${data.clientPhone}</p>

        </div>

        <h4>Are your ready?</h4>
        <p>To cancel or check-in please log in
            <strong><a href='https://familyroomrentals.com/#/login' target="_blank">HERE</a></strong> 
            and select the offer notification.
        </p>

        <p style="font-style: italic;">
            <strong>
                Note: It is crucial to check-in the meeting, otherwise, it could bring
                consequences such as disabling the property or not getting you $10 if the client decides to move-in.
            </strong>
        </p>

        <h4>Recomendations:</h4>
        <p>
            While dealing with a pandemic, visiting others could be challenging. Please take all the precautions
            necessary while receiving a visit from ${data.clientName}: 
        </p>
        <ul> Please wear a face covering </ul>
        <ul> Please stay in a 6 feet distance between you and any other individual. </ul>
        <ul> Please be on time </ul>
        <ul> Please ask as many questions as possible  </ul>
        <ul> Please stay alert while visiting the property. </ul>
        <ul> Please try to contact ${data.clientName} prior to the meeting to discuss details. </ul>

        <p>
            Once the meeting is done, we will send a follow up email to see how it went. 
        </p>
        <p>We Thank you for using FamilyRoomRentals, and wish you good luck moving forward.</p>
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
        subject: "Meeting Reminder!",
        name: data.ownerName,
        html,
        date: data.date
    };
}

export const SendCheckInReminderToClient = (data: any) => {
    const { street1, street2, city, state, zipCode, country } = data.meetingLocation;
    // console.log("from email: ", data.logo)
    const html = `
        <h3> Dear ${data.clientName}, </h3>
        <p> Your meeting with ${data.ownerName} should be starting now!</p>
        
        <h4>Check-in now!!</h4>
        <p>If you have not yet to check-in, please do so now by clicking  
            <strong><a href='https://familyroomrentals.com/#/room/${data.roomId}/select-date-to-meet/${data.token}' target="_blank">HERE</a></strong> 
            and use the verification Id below.
        </p>
        <p>Verification Id: <strong>${data.verificationId}</strong></p>

        <p style="font-style: italic;">
            <strong>
                Note: It is crucial to check-in the meeting, otherwise it will complicate the process and you could
                be charged a fee for a no show violation.
            </strong>
        </p>

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
        <ul> Please try to contact ${data.ownerName} prior to the meeting to discuss details. </ul>

        <p>
            Once the meeting is done, we will send a follow up email to see how it went. 
        </p>
        <p>We Thank you for using FamilyRoomRentals, and wish you good luck moving forward.</p>
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
        subject: "Time to Check-In!",
        name: data.clientName,
        html,
        date: data.date
    };
}

export const SendCheckInReminderToUser = (data: any) => {
    const { street1, street2, city, state, zipCode, country } = data.meetingLocation;
    // console.log("from email: ", data.logo)
    const html = `
        <h3> Dear ${data.ownerName}, </h3>
        <p> Your meeting with ${data.clientName} should be starting now!</p>
        
        <h4>Check-in now!!</h4>
        <p>If you have not yet to check-in, please do so now by logging into your account
            <strong><a href='https://familyroomrentals.com/#/login' target="_blank">HERE</a></strong> 
            and select the offer notification, then click the check-in button.
        </p>

        <p style="font-style: italic;">
            <strong>
                Note: It is crucial to check-in the meeting, otherwise, it could bring
                consequences such as disabling the property or not getting you $10 if the client decides to move-in.
            </strong>
        </p>

        <h4>Recomendations:</h4>
        <p>
            While dealing with a pandemic, visiting others could be challenging. Please take all the precautions
            necessary while receiving a visit from ${data.clientName}: 
        </p>
        <ul> Please wear a face covering </ul>
        <ul> Please stay in a 6 feet distance between you and any other individual. </ul>
        <ul> Please be on time </ul>
        <ul> Please ask as many questions as possible  </ul>
        <ul> Please stay alert while visiting the property. </ul>
        <ul> Please try to contact ${data.clientName} prior to the meeting to discuss details. </ul>

        <p>
            Once the meeting is done, we will send a follow up email to see how it went. 
        </p>

        <p>We Thank you for using FamilyRoomRentals, and wish you Good Luck moving forward.</p>
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
        subject: "Time to Check-In!",
        name: data.ownerName,
        html,
        date: data.date
    };
}

//FOLLOW-UPS
export const SendFollowup1ToClient = (data: any) => {
    const html = `
        <h3> Dear ${data.clientName}, </h3>
        <p>We hope that your meeting with ${data.ownerName} was pleasant!</p>
        
        <h4>Follow-up Required: </h4>
        <p>Help us find out how it went. Submit a quick follow-up by clicking 
            <strong><a href='https://familyroomrentals.com/#/room/${data.roomId}/select-date-to-meet/${data.token}' target="_blank">HERE</a></strong> 
            and use the verification Id below.
        </p>
        <p>Verification Id: <strong>${data.verificationId}</strong></p>

        <p style="font-style: italic;">
            <strong>
                Note: It is essential to complete the follow-up, otherwise, it will complicate the 
                process and you could be charged a fee as we will not have enough data to continue.
            </strong>
        </p>
        <p>We Thank you for using FamilyRoomRentals, and wish you good luck moving forward.</p>
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
        subject: "Follow-up Required!",
        name: data.clientName,
        html,
        date: data.date
    };
}

export const SendFollowup1ToUser = (data: any) => {
    const html = `
        <h3> Dear ${data.ownerName}, </h3>
        <p>We hope that your meeting with ${data.clientName} was pleasant!</p>
        
        <h4>Follow-up Required: </h4>
        <p>Help us find out how it went. Submit a quick follow-up by logging into your account 
            <strong><a href='https://familyroomrentals.com/#/login' target="_blank">HERE</a></strong> 
            and select the offer notification, then click the follow-up button.
        </p>

        <p style="font-style: italic;">
            <strong>
                Note: It is essential to complete the follow-up, otherwise, it could bring
                consequences such as disabling the property or not getting you $10 if the client decides to move-in.
            </strong>
        </p>
        <p>We Thank you for using FamilyRoomRentals, and wish you good luck moving forward.</p>
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
        subject: "Follow-up Required!",
        name: data.ownerName,
        html,
        date: data.date
    };
}

export const SendFollowup2ToClient = (data: any) => {
    const html = `
        <h3> Dear ${data.clientName}, </h3>
        <p>Meeting follow-up!</p>
        
        <p>If you have not yet to complete the follow-up, please do so now by clicking 
            <strong><a href='https://familyroomrentals.com/#/room/${data.roomId}/select-date-to-meet/${data.token}' target="_blank">HERE</a></strong> 
            and use the verification Id below.
        </p>
        <p>Verification Id: <strong>${data.verificationId}</strong></p>

        <p style="font-style: italic;">
            <strong>
                Note: It is essential to complete the follow-up, otherwise, it will complicate the 
                process and you could be charged a fee as we will not have enough data to continue.
            </strong>
        </p>
        <p>We Thank you for using FamilyRoomRentals, and wish you good luck moving forward.</p>
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
        subject: "Did you complete the follow-up?",
        name: data.clientName,
        html,
        date: data.date
    };
}

export const SendFollowup2ToUser = (data: any) => {
    const html = `
        <h3> Dear ${data.ownerName}, </h3>
        <p>Meeting Followup!</p>
        
        <p>If you have not yet to complete the follow-up, please do so now by logging into you account 
            <strong><a href='https://familyroomrentals.com/#/login' target="_blank">HERE</a></strong> 
            and select the offer notification, then click the follow-up button.
        </p>

        <p style="font-style: italic;">
            <strong>
                Note: It is essential to complete the follow-up, otherwise, it could bring
                consequences such as disabling the property or not getting you $10 if the client decides to move-in.
            </strong>
        </p>
        <p>We Thank you for using FamilyRoomRentals, and wish you good luck moving forward.</p>
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
        subject: "Did you complete the follow-up?",
        name: data.ownerName,
        html,
        date: data.date
    };
}

export const SendFollowup3ToClient = (data: any) => {
    const html = `
        <h3> Dear ${data.clientName}, </h3>
        <p>Meeting follow-up!</p>
        
        <p>If you have not yet to complete the follow-up, please do so now by clicking 
            <strong><a href='https://familyroomrentals.com/#/room/${data.roomId}/select-date-to-meet/${data.token}' target="_blank">HERE</a></strong> 
            and use the verification Id below.
        </p>
        <p>Verification Id: <strong>${data.verificationId}</strong></p>

        <p style="font-style: italic;">
            <strong>
                Note: It is essential to complete the follow-up, otherwise, it will complicate the 
                process and you could be charged a fee as we will not have enough data to continue.
            </strong>
        </p>
        <p>We Thank you for using FamilyRoomRentals, and wish you good luck moving forward.</p>
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
        subject: "Last reminder to complete follow-up!!",
        name: data.clientName,
        html,
        date: data.date
    };
}

export const SendFollowup3ToUser = (data: any) => {
    const html = `
        <h3> Dear ${data.ownerName}, </h3>
        <p>Meeting Followup!</p>
        
        <p>If you have not yet to complete the follow-up, please do so now by logging into you account 
            <strong><a href='https://familyroomrentals.com/#/login' target="_blank">HERE</a></strong> 
            and select the offer notification, then click the follow-up button.
        </p>

        <p style="font-style: italic;">
            <strong>
                Note: It is essential to complete the follow-up, otherwise, it could bring
                consequences such as disabling the property or not getting you $10 if the client decides to move-in.
            </strong>
        </p>
        <p>We Thank you for using FamilyRoomRentals, and wish you good luck moving forward.</p>
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
        subject: "Last reminder to complete follow-up!!",
        name: data.ownerName,
        html,
        date: data.date
    };
}