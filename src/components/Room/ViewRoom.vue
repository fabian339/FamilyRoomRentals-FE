<template>
    <v-container>
        <v-row class="text-center">
            <v-col
                class="mb-5"
                cols="12"
                style="marginTop: -30px"
            >
                <v-progress-circular
                    v-if="isContentLoading"
                    color="green"
                    :size="100"
                    :width="15"
                    indeterminate
                ></v-progress-circular>
                <v-carousel v-if="!isContentLoading" class="RoomImages">
                    <v-carousel-item
                        v-for="(image,i) in contentRoom.images"
                        :key="i"
                        :src="image"
                        reverse-transition="fade-transition"
                        transition="fade-transition"
                    ></v-carousel-item>
                </v-carousel>
            </v-col>
            <v-col
                class="mb-5"
                cols="12"
                style="marginTop: -30px"
            >
            <div v-if="isOwner">
                <v-btn type="submit"  rounded color="#2E8B57" dark>Edit Room</v-btn>
                <v-btn type="submit"  rounded color="#2E8B57" dark>Elminate Room</v-btn>
            </div>
            <h2>{{contentRoom.title}} - ${{contentRoom.price}}/month</h2>
            <div style="width: 80%; margin: auto">{{contentRoom.description}}</div>
            </v-col>
            <NotificationForm />
        </v-row>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import NotificationForm from '@/components/notification/NotificationForm.vue'

// import contentActions from '/.././store/actions/contentActions'
  export default {
    name: 'viewRoom',
    components: {
        NotificationForm
    },
    computed: {
        ...mapGetters([
            'contentRoom',
            'isContentLoading',
            'currentUser',
            'contentRoom'
        ]),
    },
    data(){
        return {
            isOwner: false
        }
    },
    methods:{
        ...mapActions([                  // Add this
            'setRoom'
        ])
    },
    created(){
        // contentActions.setRoom(this.$route.params.id);
        this.setRoom(this.$route.params.id)

        if(this.contentRoom.ownerId === this.currentUser.objectId){
            this.isOwner = true;
        }
    }

  }
</script>

<style>
.RoomImages{
    width: 80%;
    margin: auto 10%;
}
</style>v-row>