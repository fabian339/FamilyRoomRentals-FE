<template>
  <v-container>
    <!-- <v-progress-linear
      indeterminate
      height="15"
      color="teal"
      v-if="isUserLoading"
    ></v-progress-linear> -->
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
            <v-card-text style="color: red">
                Once this is done, we cannot recover any data.
                The following will be deleted:
                <ol>
                  <li>All account information</li>
                  <li>All property shared</li>
                  <li>All notifications/offers</li>
                  <li>All messages/conversations</li>
                  <li>You will no longer receive notifications to your attached email/phone</li>
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
            <span v-if="!userLoading.userBeinDeleted && !userLoading.userLoggingOut">Continue</span>
            <!-- <span v-if="!userLoading.userBeinDeleted && !userLoading.userLoggingOut">Continue</span> -->
              <v-progress-circular
                  v-else
                  color="#7d3333"
                  :size="30"
                  :width="5"
                  indeterminate
              ></v-progress-circular>
            </v-btn>
            </v-card-actions>
        </v-card>
      </v-dialog>
      <v-alert type="error" v-if="Object.keys(userErrors).length !== 0">
        Error while updating user information. To view and resolve error click <a style="text-decoration: underline;" @click.stop="editUser = true">here</a>.
      </v-alert>
      <!-- <SuccessAlert v-if="isOfferDeleted && !isUserLoading" msg="Notification Successfully Deleted!" />
      <SuccessAlert v-if="isPasswordResetEmailSent && !isUserLoading" msg="Reset password email sent successfully!" />
      <SuccessAlert v-if="isOfferAcceptedByOwner && !isUserLoading" msg="Offer Accepted Successfully, we will notify you when a meeting date is selected." /> -->
      <Alert 
        v-model="isOfferDeleted"
        :component="{
            type: 'success',
            message: 'Offer Successfully Deleted!',
            mutation: 'offerDeleted'
        }" 
      />
      
      <Alert 
        v-model="isUserUpdated"
        :component="{
            type: 'success',
            message: 'Account Updated Successfully!',
            mutation: 'userUpdated'
        }" 
      />
      <Alert 
        v-model="isOfferAcceptedByOwner"
        :component="{
            type: 'success',
            message: 'Offer Accepted Successfully, we will notify you when a meeting date is selected.',
            mutation: 'offerAcceptedByOwner'
        }" 
      />
      
      <v-img
        :src="`${currentUser.userPhoto ? currentUser.userPhoto : 'https://i.ibb.co/bNrgM0Q/default-User-Photo.jpg'}`"
        height="300px"
        dark
      >
        <EditUserForm v-model="shouldUpdatingUserDialogBeOpen" />
        <v-card-title>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                  <v-btn 
                  dark 
                  icon 
                  class="mr-4"
                  v-bind="attrs"
                  v-on="on"
                  @click.stop="openUserUpdatinDialog"
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
              <a @click.stop="openSavedRooms">
                ({{this.$store.getters.currentUser.savedRoomsIds ?  this.$store.getters.currentUser.savedRoomsIds.length : 0}})
              </a>
            </v-list-item-title>
            <v-list-item-subtitle>Saved Rooms</v-list-item-subtitle>
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
          <v-dialog
        v-model="openSavedRoomsCatalog"
        max-width="800"
        >
        <v-card>
          <div v-if="savedRooms.length > 0">
            <v-card-title style="justify-content: center;">
                <h2 style="font-weight: 200;" class="text-center">Saved Properties</h2>
            </v-card-title>
              <!-- <v-card-text>

              </v-card-text> -->
              <v-row>
                  <v-col
                    class="mb-8"
                    cols="16"
                    v-for="(item) in savedRooms" :key="item.street1"
                  >
                    <Room :roomData="item"/>
                  </v-col>
              </v-row>
          </div>
          <div v-else>
            <v-card-title style="justify-content: center;">
                <h2 style="font-weight: 200;" class="text-center">No Properties saved!</h2>
            </v-card-title>
              <!-- <v-card-text>Looking for a tenant? Register and share your room now!!</v-card-text> -->
              <v-card-text>
                Sometimes, when properties are saved, they might get eliminated by the person who shared them. If that 
                is the case, the property also gets eliminated from you saved list.
              </v-card-text>
          </div>
        </v-card>
      </v-dialog>
  </v-container>
</template>

<script>
// @ is an alias to /src
// import store from '@/actions/store'
import Room from '@/components/Room/Room.vue'
import EditUserForm from '@/components/User/EditUserForm.vue'
import { mapGetters, mapActions, mapMutations} from 'vuex'
import Alert from '@/components/Alert/Alert.vue'

export default {
  name: 'Profile',
  components: {
    EditUserForm,
    Alert,
    Room
  },
  computed: {
      ...mapGetters([
        'currentUser',
        'userLoading',
        'userErrors',
        'isOfferDeleted',
        'isUserUpdated',
        'isPasswordResetEmailSent',
        'isOfferAcceptedByOwner',
        'shouldUpdatingUserDialogBeOpen',
        'shouldDeletingOfferDialogBeOpen'
      ]),
  },
  data(){
    return {
      editUser: false,
      deleteUser: false,
      openSavedRoomsCatalog: false,
      savedRooms: [],
      roomsSaved: 0,
      // myRooms: []
    }
  },
  beforeMount(){
    // console.log(this.currentUser.savedRoomsIds)
    // const { objectId } = this.currentUser;
    // this.myRooms = this.contentRooms.filter(room => room.ownerId === objectId);
  },
  methods:{
      ...mapMutations([
        'SHOW_USER_UPDATING_DIALOG',
      ]),
      ...mapActions([
          'deleteUserAccount',
          'updateUser'
      ]),
      openUserUpdatinDialog(){
        this.SHOW_USER_UPDATING_DIALOG(true)
      },

      userRemoval(e){
        e.preventDefault();
        const roomIds = [];
        const notificationIds = [];
        if(this.$store.getters.currentUserRooms && this.$store.getters.currentUserRooms.length !== 0){
          this.$store.getters.currentUserRooms.forEach(room => roomIds.push(room.objectId));
        }
        if(this.$store.getters.currentUserOffers && this.$store.getters.currentUserOffers.length !== 0){
          console.log("heree")
          this.$store.getters.currentUserOffers.forEach(noti => notificationIds.push(noti.objectId));
        }

        console.log({
          roomIds,
          notificationIds,
        })
        this.deleteUserAccount({
          userId: this.$store.getters.currentUser.objectId,
          roomIds,
          notificationIds,
          sessionToken: localStorage.getItem('user-token') || ''
        })
      },
      openSavedRooms(){
        if(this.$store.getters.currentUser.savedRoomsIds && this.$store.getters.currentUser.savedRoomsIds.length > 0 
          && this.savedRooms.length == 0) {
          this.$store.getters.currentUser.savedRoomsIds.forEach(id => {
            this.savedRooms.push(...this.$store.getters.contentRooms.filter(room => room.objectId === id));
            // console.log(this.savedRooms,'roomsss')
          })
          if(this.savedRooms.length !== this.$store.getters.currentUser.savedRoomsIds.length){
            let roomIds = [];
            this.savedRooms.forEach(room => roomIds.push(room.objectId));
            this.updateUser({
                objectId: this.$store.getters.currentUser.objectId,
                savedRoomsIds: roomIds
              })
          }
        }

        this.openSavedRoomsCatalog = true;
      }

  }
}
</script>