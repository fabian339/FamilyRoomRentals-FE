<template>
    <div>
        <PageLoading  
        v-model="isPageLoading" 
        :component="{
            seconds: 1000,
            type: 'content',
            color: ''
        }"
        />        
        <v-row v-if="!isPageLoading" class="text-center" justify="center">
            <v-col cols="12" sm="10" md="8" lg="6">
            <div class="logo" >
                <img src="https://i.ibb.co/DrcHFyW/logo.png" alt="logo" width="400">
            </div>
            <h2 class="headline font-weight-bold mb-3">
                Publish Your Room
            </h2>
            <v-col class="mb-4">
                <form
                    @submit="submit"
                >
                    <v-text-field
                        ref="title"
                        v-model="title"
                        label="Room Title"
                        placeholder="Special Room Available in the NYC Area"
                        :error-messages="errors.title"
                    ></v-text-field>
                    <label> <strong>Location</strong> </label>
                    <v-text-field
                        ref="street1"
                        v-model="location.street1"
                        label="Street1"
                        placeholder="76 Columbus St"
                        :error-messages="errors.street1"
                    ></v-text-field>
                    <v-text-field
                        ref="street2"
                        v-model="location.street2"
                        label="Street2"
                        placeholder="Apt: 3b"
                        :error-messages="errors.street2"
                    ></v-text-field>
                    <v-text-field
                        ref="city"
                        v-model="location.city"
                        label="City"
                        placeholder="Brooklyn"
                        :error-messages="errors.city"
                    ></v-text-field>
                    <v-text-field
                        ref="state"
                        v-model="location.state"
                        label="State/Province/Region"
                        placeholder="NY"
                        :error-messages="errors.state"   
                    ></v-text-field>
                    <v-text-field
                        ref="zipCode"
                        v-model="location.zipCode"
                        label="ZIP / Postal Code"
                        type="number"
                        placeholder="75155"
                        :error-messages="errors.zipCode"
                    ></v-text-field>
                    <v-autocomplete
                        ref="country"
                        v-model="location.country"
                        :items="countries"
                        label="Country"
                        placeholder="Select..."
                        :error-messages="errors.country"   
                    ></v-autocomplete>
                    
                    <label> <strong>Description</strong> </label>
                    <v-spacer></v-spacer>

                    <v-textarea
                        name="input-7-1"
                        filled
                        label="Details of Property: (What you expect and what you are looking for)"
                        v-model="description"
                        :error-messages="errors.description"   
                    ></v-textarea>   

                    <label> <strong>Property Rules</strong> </label>
                    <v-row justify="center">
                        <v-col cols="6" style="display: inline-flex;" >
                            <v-text-field
                                ref="rule"
                                v-model="tempRule"
                                label="Example: No Pets"
                                outlined
                            ></v-text-field>
                            <v-tooltip top>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn 
                                        fab 
                                        color="#008080"
                                        dark
                                        @click="addRule"
                                        v-bind="attrs"
                                        v-on="on">
                                            <v-icon dark>mdi-plus</v-icon>
                                    </v-btn>
                                </template>
                                    <span>Add Rule</span>
                            </v-tooltip>
                        </v-col>
                    </v-row>
                    <v-row style="margin-top: -35px; margin-bottom: 30px;" justify="center">
                        <div v-for="(item, index) in propertyRules" :key="index +10">
                            <v-chip
                                class="ma-2"
                                close
                                @click:close="propertyRules.splice(index, 1)"
                            >
                                {{item}}
                            </v-chip>                
                        </div>
                    </v-row>

                    <label> <strong>Property Price</strong> </label>

                    <v-row justify="center">
                        <v-col cols="4">
                            <v-text-field
                                ref="price"
                                v-model="price"
                                type="number"
                                label="Price"
                                full-width
                                prefix="$"
                                suffix="/month"
                                :error-messages="errors.price"   
                            ></v-text-field>
                        </v-col>
                    </v-row>

                    <label> <strong>Property Images</strong> </label>
                    <div>
                        <v-tooltip right>
                            <template v-slot:activator="{ on, attrs }">
                                <label 
                                    fab
                                    id="imgIconLabel" 
                                    v-bind="attrs"
                                    v-on="on"
                                >
                                    <v-icon @click="openUploadModal" id="cameraIcon">mdi-camera</v-icon>

                                </label>
                            </template>
                                <span>{{(6 - images.length) === 0 ? 'Maximum amount of images' : 'Add Image'}}</span>
                        </v-tooltip>

                    
                        <p style="color: red" v-if="errors.image">{{errors.image}}</p>
                        <p v-if="images.length === 0" style="color: #3c46d2">Images increase the chances of getting better offers!</p>

                        <div id="imgContainer">
                            <small>({{6 - images.length}} images reminding)</small>
                            <v-row no-gutters class="text-center" justify="center">
                                <!-- <v-col v-for="(image, index) in images" :key="image.street1"> -->
                                    <div v-for="(image, index) in images" :key="image.street1" style="margin: 5px">
                                        <img :src="image.source" alt="img" width="150" height="100">
                                        <div class="my-2">
                                            <v-btn small color="warning" @click.stop="removeImage(index)">
                                                <v-progress-circular
                                                    v-if="imgLoading"
                                                        indeterminate
                                                        color="#9e3333"
                                                    >
                                                </v-progress-circular>
                                                {{!imgLoading ? 'Remove' : '' }}
                                            </v-btn>
                                        </div>
                                    </div>
                                <!-- </v-col> -->
                            </v-row>
                        </div>
                        <v-checkbox
                            style="margin: 15px 15%;"
                            v-model="checkbox"
                            :error-messages="errors.agreementToShare"
                        >
                            <template slot="label">
                            <label >I agree to the <a @click.stop href="/#/terms-and-conditions" target="_blank">   Terms & Conditions.</a></label>
                            </template>
                        </v-checkbox>
                    </div>
                    <!-- <v-btn 
                        rounded 
                        color="#2E8B57" 
                        dark
                    >
                        View Priview
                    </v-btn> -->
                      
                    
                    <v-btn 
                        type="submit"  
                        rounded 
                        color="#2E8B57" 
                        dark
                    >
                        <span v-if="!contentLoading.addingContent">Post Room</span>
                        <v-progress-circular
                            v-else
                            color="#12f4ff"
                            :size="30"
                            :width="5"
                            indeterminate
                        ></v-progress-circular>
                    </v-btn>

                </form>
            </v-col>
            </v-col>
        </v-row>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
// import noImageForRoom from './noImageForRoom'
import PageLoading from '@/components/Loading/PageLoading.vue';
import {validateCreateRoom} from '../../store/validators'
import axios from 'axios'
// const imgbbUploader = require("imgbb-uploader");


  export default {
    name: "shareRoom",
    components: {
        PageLoading
    },
    computed: {
      ...mapGetters([
        'currentUser',
        'contentLoading'
      ])
    },
    data () {
      return {
        countries: ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla', 'Antigua &amp; Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia &amp; Herzegovina', 'Botswana', 'Brazil', 'British Virgin Islands', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Cape Verde', 'Cayman Islands', 'Chad', 'Chile', 'China', 'Colombia', 'Congo', 'Cook Islands', 'Costa Rica', 'Cote D Ivoire', 'Croatia', 'Cruise Ship', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Polynesia', 'French West Indies', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Kyrgyz Republic', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mauritania', 'Mauritius', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russia', 'Rwanda', 'Saint Pierre &amp; Miquelon', 'Samoa', 'San Marino', 'Satellite', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'St Kitts &amp; Nevis', 'St Lucia', 'St Vincent', 'St. Lucia', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', "Timor L'Este", 'Togo', 'Tonga', 'Trinidad &amp; Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks &amp; Caicos', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe'],
        title: '',
        location: {
            street1: '',
            street2: '',
            city: '',
            state: '',
            zipCode: '',
            country: ''
        },
        price: '',
        checkbox: false,
        description: '',
        propertyRules: [],
        tempRule: '',
        images: [],
        imgLoading: false,
        errors: {},
        isPageLoading: false
      }
    }, 
    created(){
        console.log("Entering Route")
        this.isPageLoading = true
        // next()
    },
    beforeMount(){
        // console.log("entering..")
        let folderName = localStorage.getItem('img-folder-name')
        if(folderName && folderName.length > 0){
            let prefix = `${folderName}/`
            this.removeResources(prefix);
        }
    },
    beforeDestroy(){
        // console.log('leaving...')
        let folderName = localStorage.getItem('img-folder-name')
        if(folderName && folderName.length > 0){
            let prefix = `${folderName}/`
            this.removeResources(prefix);
        }
    },
    methods:{
        ...mapActions([  
            'removeResources',
            'shareRoom',
        ]),

        openUploadModal() {
            let folderName = this.getFolderName()
            
            window.cloudinary.openUploadWidget(
                { 
                    cloud_name: process.env.VUE_APP_CLOUDINARY_NAME,
                    upload_preset: process.env.VUE_APP_CLOUDINARY_UPLOAD_PRESET,
                    maxFiles: 1,
                    resourceType: 'image',
                    folder: folderName,
                },
            (error, result) => {
                if(error){
                    console.log('error', error)
                }
                else if (!error && result && result.event === "success") {
                    // console.log('Done uploading..: ', result.info);
                    this.images.push({
                        source: result.info.secure_url,
                        public_id: result.info.public_id,
                    })
                    if(this.errors.image) delete this.errors.image
                }
            }).open();
        },

        getFolderName(){
            let folderName = localStorage.getItem('img-folder-name')
            if(!folderName){
                folderName = this.randomStringName()
                localStorage.setItem('img-folder-name', folderName);   
            }
            return folderName;
        },
        // remove an image from array
        removeImage(index){
            // console.log("Deleting photo",index)
            this.imgLoading = true;
            axios.post(process.env.VUE_APP_DELETE_IMG, {public_id: this.images[index].public_id})
            .then(() => {
                this.images.splice(index, 1);
                this.imgLoading = false
            })
            .catch(() => { //if there is an error while deleting the img, delete it from the array, it will just be loose in cloudinary
                this.images.splice(index, 1)
                this.imgLoading = false
            })
            // this.images.splice(index, 1);
        },
        async submit(e) {
            e.preventDefault();
            let room = {
                //required
                title: this.title,
                location: this.location,
                price: this.price,
                description: this.description,
                agreementToShare: this.checkbox,
                ownerId: this.currentUser.objectId,
                ownerFname: this.currentUser.fName,
                ownerLname: this.currentUser.lName,
                ownerEmail: this.currentUser.email,
                ownerPhone: this.currentUser.phone
            }
            //optionals
            if(this.images.length > 0) {
                room.cloudinaryFolderName = localStorage.getItem('img-folder-name')
                room.images = this.images
            }
            if(this.propertyRules.length > 0) room.propertyRules = this.propertyRules

            // console.log(room)
            const {valid, errors} = validateCreateRoom(room);
            if(!valid) this.errors = errors;
            else {
                // console.log("Room:", room)
                this.shareRoom(room)
                localStorage.removeItem('img-folder-name')
            }
        },
        //add rule to property
        addRule(){
            if(this.tempRule !== ''){
                this.propertyRules.push(this.tempRule);
                this.tempRule = '';
            }
        },

        randomStringName(){
            var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz_-";
            var string_length = 6;
            var randomstring = '';
            for (var i=0; i<string_length; i++) {
                var rnum = Math.floor(Math.random() * chars.length);
                randomstring += chars.substring(rnum,rnum+1);
            }
            return `room_${randomstring}`
        }
    }
  }
</script>

<style scoped>
    #imgContainer{
        margin-top: 20px;
        border: 2px solid gainsboro;
        margin: 0 15%;
    }
    #cameraIcon{
        font-size: 50px;
        color: #62807e;
        margin: 10px;
        transition: all 0.5s;
    }

    #cameraIcon:hover{
        cursor: pointer;
        transform: rotate(45deg);
        color: #3bcccc
        /* transform: scale(1.3); */
    }
    #imgIconLabel div {
        display: none;
    }
</style>
