<template>
  <v-container>
    <v-progress-linear
      indeterminate
      height="15"
      color="teal"
      v-if="isUserLoading"
    ></v-progress-linear>
    <v-card
      max-width="375"
      class="mx-auto"
      v-else
    >
      <v-dialog
        v-model="deleteUser"
        max-width="330"
        >
        <v-card>
            <v-card-title class="headline">Are you sure you want to eliminate this account??</v-card-title>
            <v-card-text>
                Once this is done, we cannot recover any data.
                The following will be deleted:
                <ol>
                  <li>All account information</li>
                  <li>All rooms and information related to rooms</li>
                  <li>All notifications</li>
                  <li>All messages/conversations</li>
                  <li>You will no longer receive notifications to email/phone</li>
                </ol>
                Do you want to continue?
            </v-card-text>

            <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
                color="green darken-1"
                text
                @click="deleteUser = false"
            >
                Cancel
            </v-btn>

            <v-btn
                color="green darken-1"
                text
                @click="userRemoval"
            >
                Continue
            </v-btn>
            </v-card-actions>
        </v-card>
      </v-dialog>
      <v-alert type="error" v-if="Object.keys(userErrors).length !== 0">
        Error while updating user information. To view and resolve error click <a style="text-decoration: underline;" @click.stop="editUser = true">here</a>.
      </v-alert>
      <SuccessAlert v-if="isOfferDeleted && !isUserLoading" msg="Notification Successfully Deleted!" />
      <SuccessAlert v-if="isUserUpdated && !isUserLoading" msg="User data successfully updated!" />
      <SuccessAlert v-if="isPasswordResetEmailSent && !isUserLoading" msg="Reset password email sent successfully!" />
      <SuccessAlert v-if="isOfferAcceptedByOwner && !isUserLoading" msg="Offer Accepted Successfully, we will notify you when a meeting date is selected." />
      <v-img
        :src="`${currentUser.userPhoto ? currentUser.userPhoto : 'https://i.ibb.co/bNrgM0Q/default-User-Photo.jpg'}`"
        height="300px"
        dark
      >
        <EditUserForm v-model="editUser" />
        <v-card-title>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                  <v-btn 
                  dark 
                  icon 
                  class="mr-4"
                  v-bind="attrs"
                  v-on="on"
                  @click="editUser = true"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
              </template>
              <span>Edit Profile</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                  <v-btn 
                    dark 
                    icon 
                    class="mr-4"
                    v-bind="attrs"
                    v-on="on"
                    @click.stop="deleteUser = true"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
              </template>
              <span>Delete User</span>
            </v-tooltip>
        </v-card-title>

        <v-spacer></v-spacer>

        <!-- <v-card-title style="margin: 110px auto; justify-content: center">
          <div class="display-1 pl-12 pt-12">{{currentUser.fName}} {{currentUser.lName}}</div>
        </v-card-title> -->
      </v-img>

      <v-list two-line>
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="#6B8E23">mdi-phone</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="font">{{currentUser.phone ? currentUser.phone : 'no phone number'}}</v-list-item-title>
            <v-list-item-subtitle>Cell/Mobile</v-list-item-subtitle>
          </v-list-item-content>

          <!-- <v-list-item-icon>
            <v-icon color="#6B8E23">mdi-message-text</v-icon>
          </v-list-item-icon> -->
        </v-list-item>

        <v-divider inset></v-divider>

        <v-list-item>
          <v-list-item-icon>
            <v-icon color="#6B8E23">mdi-email</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="font">{{currentUser.email}}</v-list-item-title>
            <v-list-item-subtitle>Personal/Work</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider inset></v-divider>
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="#6B8E23">mdi-account-circle</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title class="font">{{currentUser.username}}</v-list-item-title>
              <v-list-item-subtitle>Username</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-divider inset></v-divider>
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="#6B8E23">?</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="font">({{this.$store.getters.currentUserRooms.length}})</v-list-item-title>
            <v-list-item-subtitle># Rooms</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider inset></v-divider>
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="#6B8E23">?</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="font">
              {{new Date(currentUser.createdAt).toDateString()}}
            </v-list-item-title>
            <v-list-item-subtitle>User since </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider inset></v-divider>
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="#6B8E23">mdi-lock</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>*********</v-list-item-title>
            <v-list-item-subtitle>Password</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
// @ is an alias to /src
// import store from '@/actions/store'
// import Room from '@/components/Room/Room.vue'
import EditUserForm from '@/components/User/EditUserForm.vue'
import { mapGetters, mapActions } from 'vuex'
import SuccessAlert from '@/components/notification/SuccessAlert.vue'

export default {
  name: 'Profile',
  components: {
    EditUserForm,
    SuccessAlert
  },
  computed: {
      ...mapGetters([
        'currentUser',
        'isUserLoading',
        'userErrors',
        'isOfferDeleted',
        'isUserUpdated',
        'isPasswordResetEmailSent',
        'isOfferAcceptedByOwner',
      ])
  },
  data(){
    return {
      editUser: false,
      deleteUser: false
      // myRooms: []
    }
  },
  created(){
    // const { objectId } = this.currentUser;
    // this.myRooms = this.contentRooms.filter(room => room.ownerId === objectId);
  },
  methods:{
      ...mapActions([
          'deleteUserAccount'
      ]),
      userRemoval(e){
        e.preventDefault();
        const roomIds = [];
        const notificationIds = [];
        if(this.$store.getters.currentUserRooms && this.$store.getters.currentUserRooms.length !== 0){
          this.$store.getters.currentUserRooms.forEach(room => roomIds.push(room.objectId));
        }
        if(this.$store.getters.currentUserNotifications && this.$store.getters.currentUserNotifications.length !== 0){
          this.$store.getters.currentUserNotifications.forEach(noti => notificationIds.push(noti.objectId));
        }

        console.log({
          roomIds,
          notificationIds,
        })
        this.deleteUserAccount({
          userId: this.$store.getters.currentUser.objectId,
          roomIds,
          notificationIds,
        })
      }

  }
}
</script>