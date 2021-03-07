<template>
    <v-dialog
        v-model="show"
        transition="dialog-top-transition"
        persistent
        width="650px"
    >
        <v-card 
            v-if="this.component.type === 'success'"
            style="background-color: #d7ffd4;"
        >                
            <v-card-text                     
                class="headline justify-center font"
                style="color: #1a7cab; padding: 30px; text-align: center"
            >
                {{this.component.message}}
            </v-card-text>
    
            <v-btn id="closeBtn" small color="red" @click.stop="closeAlert" dark >X</v-btn>
        
        </v-card>
    </v-dialog>
</template>

<script>
// import SuccessAlert from '@/components/notification/SuccessAlert.vue'
import { mapMutations } from 'vuex'

export default {
    name: "Alert",
    props: {
        value: Boolean,
        component: Object 
    },
    components: {},
    computed: {
        show: {
            get () {
                return this.value
            },
            set (value) {
                if (!value) {
                    this.$emit('input', value)
                }
            }
        },
    },
    data(){
        return{
            // rewardSelected: false,
            // ownerReward: {}
        }
    },
    methods: {
        ...mapMutations([
            'SET_ROOM_UPDATED',
            'SHOW_ROOM_UPDATING_DIALOG',
            'SET_OFFER_SENT_BY_CLIENT',
            'SET_ROOM_DELETED',
            'SET_NEW_ROOM_ADDED',
            'SET_USER_UPDATED',
            'SHOW_USER_UPDATING_DIALOG',
            'SET_OFFER_ACCEPTED_BY_OWNER',
            'SET_OFFER_DELETED',
            'SHOW_OFFER_DELETING_DIALOG'
        ]),
        closeAlert(){
            switch (this.component.mutation) {
            case 'roomUpdated':
                this.SET_ROOM_UPDATED(false);
                this.SHOW_ROOM_UPDATING_DIALOG(false)
                break;
            case 'offerSentByClient':
                this.SET_OFFER_SENT_BY_CLIENT(false);
                break;
            case 'roomDeleted':
                this.SET_ROOM_DELETED(false);
                break;
            case 'newRoomAdded':
                this.SET_NEW_ROOM_ADDED(false)
                break;
            case 'userUpdated':
                this.SET_USER_UPDATED(false)
                this.SHOW_USER_UPDATING_DIALOG(false)
                break;
            case 'offerAcceptedByOwner':
                this.SET_OFFER_ACCEPTED_BY_OWNER(false)
                break;
            case 'offerDeleted':
                this.SHOW_OFFER_DELETING_DIALOG(false)
                this.SET_OFFER_DELETED(false)
                break;
            default:
                this.show = false;
            }
        }
    }
}
</script>
<style scoped>
  #closeBtn{
    position: absolute;
    top: 0px;
    right: 0;
  }
</style>