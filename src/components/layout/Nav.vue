<template>
    <div>
        <v-row
            no-gutters
            class="nav"
        >
            <div>
                <v-toolbar-title @click.stop="homePage" id="title">FamilyRoomRentals</v-toolbar-title>
            </div>
            <v-spacer></v-spacer>

            <v-btn color="#e9ffd4" to="/" text>
                <span>Home</span>
            </v-btn>

            <v-btn color="#e9ffd4" to="/rooms" text>
                <span>View Properties</span>
            </v-btn>

            <v-btn color="#e9ffd4" v-if="isAuthenticated" to="/create-room" text>
                <span>Share Property</span>
            </v-btn>

            <v-btn color="#e9ffd4" v-if="isAuthenticated" to="/profile" text>
                <span>{{this.$store.getters.currentUser.fName}}'s Profile</span>
            </v-btn>

            <div v-if="isAuthenticated" class="text-center" style="margin: auto 15px;">
                <v-menu open-on-hover bottom offset-y>
                    <template v-slot:activator="{ on, attrs }">
                    <div
                        v-bind="attrs"
                        v-on="on"
                        >
                            <v-badge
                                :content="currentUserOffers.filter((item) => item.readByReceiver === false).length"
                                :value="currentUserOffers.filter((item) => item.readByReceiver === false).length"
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
                            v-if="currentUserOffers.length !== 0"
                        >
                            <v-list-item
                                v-for="(item, index) in currentUserOffers"
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
                                    <v-list-item-title :style="`${!item.readByReceiver ? 'color: green' : 'color: #778899'}`" >
                                        {{`(${new Date(item.createdAt).toLocaleString('en-US')}) - ${!item.readByReceiver ? item.meetingScheduled ? 'Offer Status Updated' : 'New Offer' : item.followupSent ? item.submittedFollowUpData ? 'Offer Not Active' : 'Submit Survey' : 'Check Offer'}`}}
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
                <ViewOffer v-model="openOfferDialog" />
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
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
    name: 'Nav',
    components: {
        ViewOffer
    },
    computed: {
        ...mapGetters([
            'isAuthenticated',
            'currentUserOffers',
        ])
    },
    data: () => ({
        openOfferDialog: false,
    }),
    methods:{
        ...mapActions([
            'logout',
            'updateOffer'
        ]),
        ...mapMutations([
            'SET_OFFER'
        ]),
        logoutUser(e){
            e.preventDefault();
            this.logout()
        },
        homePage(e){
            e.preventDefault();
            if(this.$router.history.current.path !== '/') this.$router.push('/')
        },
        openNotificationDialog(item){
            this.SET_OFFER(item)
            this.openOfferDialog = true;
            let data = {
                objectId: item.objectId,
                readByReceiver: true
            }
            if(item.readByReceiver === false) this.updateOffer(data)   
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
    #title:hover{
        background-color:#ffffff1c;
        cursor: pointer;
    }

    .nav{
        background-color: #556B2F;
        position: relative;
        align-items: center;
    }
</style>