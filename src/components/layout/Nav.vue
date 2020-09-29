<template>
        <!-- <v-app-bar
            app
            color="#556B2F"
            dark
            hide-on-scroll  
        > -->
        <v-container>
       <v-row
            justify="center"
            no-gutters
            class="nav"
         >
                <div>
                    <v-toolbar-title id="title">FamilyRoomRentals</v-toolbar-title>
                </div>
                <v-spacer></v-spacer>

                <v-btn to="/" text>
                    <span>Home</span>
                </v-btn>

                <v-btn to="/rooms" text>
                    <span>View Rooms</span>
                </v-btn>

                <v-btn v-if="isAuthenticated" to="/create-room" text>
                    <span>Post Your Room</span>
                </v-btn>

                <v-btn v-if="isAuthenticated" to="/profile" text>
                    <span>My Profile</span>
                </v-btn>

                <div v-if="isAuthenticated" class="text-center" style="margin: auto 15px;">
                    <v-menu open-on-hover bottom offset-y>
                        <template v-slot:activator="{ on, attrs }">
                        <div
                            v-bind="attrs"
                            v-on="on"
                            >
                                <v-badge
                                    :content="currentUserNotifications.filter((item) => item.readByReceiver === false).length"
                                    :value="currentUserNotifications.filter((item) => item.readByReceiver === false).length"
                                    color="green"  
                                    overlap 
                                >
                                    <v-icon large>mdi-email</v-icon>
                                </v-badge>
                        </div>
                        </template>
                        <v-card
                            class="mx-auto"
                            max-width="450"
                            max-height="350"
                            outlined
                        >
                        
                            <v-list                         
                                rounded
                                v-if="currentUserNotifications.length !== 0"
                            >
                                <v-list-item
                                    v-for="(item, index) in currentUserNotifications"
                                    :key="index"
                                    @click.stop="openNotificationDialog(item)"
                                >
                                    <v-list-item-avatar>
                                        <v-avatar color="#66CDAA">
                                            <span class="white--text text-center" style="font-size: 25px; margin-left: -5px">
                                                {{$store.getters.currentUser.fName[0].toUpperCase()}}{{$store.getters.currentUser.lName[0].toUpperCase()}}
                                            </span>
                                        </v-avatar>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title :style="`${item.readByReceiver === false ? 'color: green' : 'color: #778899'}`" >
                                            {{`(${new Date(item.createdAt).toLocaleString('en-US')})- ${item.readByReceiver === false ? 'Unread Message' : 'Check Message'}`}}
                                        </v-list-item-title>
                                        <v-list-item-subtitle v-html="`${item.message.substring(0, 35)}...`"></v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                                
                            </v-list>
                            <div v-else style="width: 400px">
                                <p class="text-center">No New Messages</p>
                            </div>
                        </v-card>
                        <v-divider inset></v-divider>
                    </v-menu>
                    <ViewNotification v-model="openNoticicationDialog" :notificationData="notification" />
                </div>

                <v-btn v-if="isAuthenticated" @click="logoutUser" text>
                    <span>Log out</span>
                </v-btn>

                <v-btn v-if="!isAuthenticated" to="/signup" text>
                    <span>Signup</span>
                </v-btn>

                <v-btn v-if="!isAuthenticated" to="/login" text>
                    <span>Login</span>
                </v-btn>
                
                <v-btn to="/about" text>
                    <span>About US</span>
                </v-btn>
       </v-row>
        <!-- </v-app-bar> -->
    </v-container>
</template>
<script>
import ViewNotification from '@/components/notification/ViewNotification.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'Nav',
    components: {
        ViewNotification
    },
    computed: {
        ...mapGetters([
            'isAuthenticated',
            'currentUserNotifications',
        ])
    },
    data: () => ({
        openNoticicationDialog: false,
        notification: {},
    }),
    methods:{
        ...mapActions([
            'logout',
            'markNotificationRead'
        ]),
        logoutUser(e){
            e.preventDefault();
            this.logout()
        },
        openNotificationDialog(item){
            this.notification = item;
            this.openNoticicationDialog = true;
            if(item.readByReceiver === false) this.markNotificationRead(item.objectId)   
        }
    },
}
</script>
<style scoped>
    #title {
        font-family: 'Rochester', cursive;
        font-size: 35px;
        margin: 10px;
    }

    .nav{
        background-color: #556B2F;
        color: white;
        position: relative;
        align-items: center;
    }
</style>