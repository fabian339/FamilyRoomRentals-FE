<template>
  <v-card
    max-width="375"
    class="mx-auto"
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
    <SuccessAlert v-if="isNotificationDeleted" msg="Notification Successfully Deleted!" />
    <SuccessAlert v-if="isUserUpdated" msg="User data successfully updated!" />
    <SuccessAlert v-if="isPasswordResetEmailSent" msg="Reset password email sent successfully!" />
    <v-img
      :src="currentUser.userPhoto"
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

      <v-card-title style="margin: 110px auto; justify-content: center">
        <div class="display-1 pl-12 pt-12">{{currentUser.fName}} {{currentUser.lName}}</div>
      </v-card-title>
    </v-img>

    <v-list two-line>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="green">mdi-phone</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{currentUser.phone ? currentUser.phone : 'no phone number'}}</v-list-item-title>
          <v-list-item-subtitle>Cell/Mobile</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-icon>
          <v-icon color="green">mdi-message-text</v-icon>
        </v-list-item-icon>
      </v-list-item>

      <v-divider inset></v-divider>

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="green">mdi-email</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{currentUser.email}}</v-list-item-title>
          <v-list-item-subtitle>Personal/Work</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider inset></v-divider>
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="green">mdi-account-circle</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{currentUser.username}}</v-list-item-title>
            <v-list-item-subtitle>Username</v-list-item-subtitle>
          </v-list-item-content>
      </v-list-item>

      <v-divider inset></v-divider>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="green">?</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{
              currentUser.notifyBy === 'both' ? 
              'both email & phone' : 
              currentUser.notifyBy === 'none' ?
              'not email nor phone' : currentUser.notifyBy
            }}</v-list-item-title>
          <v-list-item-subtitle>Receive notifications about rooms by </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider inset></v-divider>

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="green">?</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>({{this.$store.getters.currentUserRooms.length}})</v-list-item-title>
          <v-list-item-subtitle>Active Rooms</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider inset></v-divider>

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="green">mdi-lock</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>*********</v-list-item-title>
          <v-list-item-subtitle>Password</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
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
        'isNotificationDeleted',
        'isUserUpdated',
        'isPasswordResetEmailSent',
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
        this.$store.getters.currentUserRooms.forEach(room => roomIds.push(room.objectId));
        this.$store.getters.currentUserNotifications.forEach(noti => notificationIds.push(noti.objectId));
        const userData = {
          userId: this.$store.getters.currentUser.objectId,
          roomIds,
          notificationIds,
        }
        // console.log(userData)
        this.deleteUserAccount(userData)
      }

  }
}
</script>