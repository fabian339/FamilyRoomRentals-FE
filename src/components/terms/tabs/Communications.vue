<template>
    <div class="termsContainer">
        <div class="termsTextContainer">
            <p style="font-size: 45px"> FamilyRoomRentals Communications </p>
            <hr style="margin: 15px 25px;">

            <h3 style="font-family: 'Scheherazade', serif; font-size: 25px">Welcome to FamilyRoomRentals!</h3>
            <br>
            <p>Last updated (10/23/2020)</p>  
            <p>
                FamilyRoomRentals uses a simple communication method. Notifications and emails. A property is
                shared to the public, offers are comming via notification and emails, offers are acceped or rejected
                on the application but emails are send by FamilyRoomRentals to notification the offer's holder.
            </p>
            <p>
                When an offer is rejected, an email is sent to notify the offer's holder and the process is finished. However,
                when an offer is accepted, there are further steps to take. An emaill will be sent to the offer's holder
                notifying that his/her offer has been accepted. This email will provide a schedule of three (3) days made
                by the person renting the property for which the offer's holder must select one. Once a date is selected,
                an email will be sent to both parties (the person renting the property and the person looking to rent the 
                property) to comfirm such date. After a date is selected, there may be
                free communication between both parties (the person renting the property and the person looking to rent the 
                property) to discuss details. Two days before the actual meeting, a reminder
                email will be sent to both parties (the person renting the property and the person looking to rent the 
                property). Twro days after the actual meeting, a follow up email will be sent to both
                parties (the person renting the property and the person looking to rent the 
                property).
            </p>
            <p>
                Keep in mind that the follow up emails contains the information about refunds / payments.
            </p>
        </div>
        <v-btn
            icon
            to="/terms-and-conditions/agreements"
            class="termsBackLink"
        >
            <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-btn
            icon
            to="/terms-and-conditions/privacy"
            class="termsNextLink"
        >
            <v-icon>mdi-arrow-right</v-icon>
        </v-btn> 
    </div>
</template>
<style scoped>

</style>