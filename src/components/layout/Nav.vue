<template>
    <div>
        <v-row
            no-gutters
            class="nav"
        >
            <div>
                <v-toolbar-title id="title">FamilyRoomRentals</v-toolbar-title>
            </div>
            <v-spacer></v-spacer>

            <v-btn color="#e9ffd4" to="/" text>
                <span>Home</span>
            </v-btn>

            <v-btn color="#e9ffd4" to="/rooms" text>
                <span>View Rooms</span>
            </v-btn>

            <v-btn color="#e9ffd4" v-if="isAuthenticated" to="/create-room" text>
                <span>Post Your Room</span>
            </v-btn>

            <v-btn color="#e9ffd4" v-if="isAuthenticated" to="/profile" text>
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
                                :content="currentOffers.filter((item) => item.readByReceiver === false).length"
                                :value="currentOffers.filter((item) => item.readByReceiver === false).length"
                                color="green"  
                                overlap 
                            >
                                <v-icon color="#e9ffd4" large>mdi-email</v-icon>
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
                            v-if="currentOffers.length !== 0"
                        >
                            <v-list-item
                                v-for="(item, index) in currentOffers"
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
                                        {{`(${new Date(item.createdAt).toLocaleString('en-US')}) - ${item.readByReceiver === false ? 'New Offer' : 'Check Offer'}`}}
                                    </v-list-item-title>
                                    <v-list-item-subtitle >*********************</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                            
                        </v-list>
                        <div v-else style="width: 400px; margin: 10px">
                            <p class="text-center">No New Messages</p>
                        </div>
                    </v-card>
                </v-menu>
                <ViewOffer v-model="openOfferDialog" :offerData="notification" />
            </div>

            <v-btn color="#e9ffd4" v-if="isAuthenticated" @click="logoutUser" text>
                <span>Log out</span>
            </v-btn>

            <v-btn color="#e9ffd4" v-if="!isAuthenticated" to="/signup" text>
                <span>Signup</span>
            </v-btn>

            <v-btn color="#e9ffd4" v-if="!isAuthenticated" to="/login" text>
                <span>Login</span>
            </v-btn>
            
            <v-btn color="#e9ffd4" to="/about" text>
                <span>About US</span>
            </v-btn>
        </v-row>
    </div>
</template>
<script>
import ViewOffer from '@/components/notification/ViewOffer.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'Nav',
    components: {
        ViewOffer
    },
    computed: {
        ...mapGetters([
            'isAuthenticated',
            'currentOffers',
        ])
    },
    data: () => ({
        openOfferDialog: false,
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
            this.openOfferDialog = true;
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
        color: #e9ffd4;
    }

    .nav{
        background-color: #556B2F;
        position: relative;
        align-items: center;
    }
</style>