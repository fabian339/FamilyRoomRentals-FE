<template>
    <v-row justify="center">
        <v-dialog
            v-model="show"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
        >
            <v-card>
                <v-toolbar dark color="#2F4F4F">
                    <v-btn icon dark @click.stop="closeModal">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>
                        <span class="headline">UPDATE ROOM</span>
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn 
                            dark 
                            text 
                            @click="saveUpdatedRoomData"
                        > 
                            <span v-if="!contentLoading.contentRoomUpdating">Save Changes</span>
                            <v-progress-circular
                                v-else
                                color="#ffffff"
                                :size="30"
                                :width="5"
                                indeterminate
                            ></v-progress-circular>
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-row class="text-center" justify="center">
                    <v-col lg="4">
                        <!-- <form> -->
                            <v-radio-group
                                v-model="rentedRadioChecked"
                                @change="roomRented"
                                row
                                :disabled="disabled"
                                >
                                <span>Mark room as rented: </span>
                                <v-spacer></v-spacer>
                                <v-radio
                                    label="No"
                                ></v-radio>
                                <v-radio
                                    label="Yes"
                                ></v-radio>
                            </v-radio-group>
                            <v-radio-group
                                v-model="disabledRadioChecked"
                                @change="roomDisabled"
                                row
                                >
                                <span>Disable room (it will hide property from others): </span>
                                <v-spacer></v-spacer>
                                <v-radio
                                    label="No"
                                ></v-radio>
                                <v-radio
                                    label="Yes"
                                ></v-radio>
                            </v-radio-group>
                            <v-text-field
                                name="title"
                                v-model="title"
                                label="Room Title"
                                placeholder="Special Room Available in the NYC Area"
                                :error-messages="errors.title"
                                @keydown="onKeyboardPressed"
                            ></v-text-field>
                            <label> Location </label>
                            <v-text-field
                                name="street1"
                                v-model="location.street1"
                                label="Street1"
                                placeholder="76 Columbus St"
                                :error-messages="errors.street1"
                                @keydown="onKeyboardPressed"
                            ></v-text-field>
                            <v-text-field
                                name="street2"
                                v-model="location.street2"
                                label="Street2"
                                placeholder="Apt: 3b"
                                :error-messages="errors.street2"
                                @keydown="onKeyboardPressed"
                            ></v-text-field>
                            <v-text-field
                                name="city"
                                v-model="location.city"
                                label="City"
                                placeholder="Brooklyn"
                                :error-messages="errors.city"
                                @keydown="onKeyboardPressed"
                            ></v-text-field>
                            <v-text-field
                                name="state"
                                v-model="location.state"
                                label="State/Province/Region"
                                placeholder="NY"
                                :error-messages="errors.state"   
                                @keydown="onKeyboardPressed"
                            ></v-text-field>
                            <v-text-field
                                name="zipCode"
                                v-model="location.zipCode"
                                label="ZIP / Postal Code"
                                type="number"
                                placeholder="75155"
                                :error-messages="errors.zipCode"
                                @keydown="onKeyboardPressed"
                            ></v-text-field>
                            <v-autocomplete
                                name="country"
                                v-model="location.country"
                                :items="countries"
                                label="Country"
                                placeholder="Select..."
                                :error-messages="errors.country"   
                                @click="onKeyboardPressed"
                                @keydown="onKeyboardPressed"
                            ></v-autocomplete>
                            
                            <label> Description </label>
                            <v-spacer></v-spacer>

                            <v-textarea
                                name="description"
                                filled
                                label="Details of Property: (include rules)"
                                v-model="description"
                                :error-messages="errors.description"   
                                @keydown="onKeyboardPressed"
                            ></v-textarea>   

                            <label> Property Rules </label>
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
                                        @click:close="removeRule(index)"
                                    >
                                        {{item}}
                                    </v-chip>                
                                </div>
                            </v-row>

                            <label> Property Price </label>

                            <v-row justify="center">
                                <v-col cols="4">
                                    <v-text-field
                                        name="price"
                                        v-model="price"
                                        type="number"
                                        label="Price"
                                        full-width
                                        prefix="$"
                                        suffix="/month"
                                        :error-messages="errors.price"   
                                        @keydown="onKeyboardPressed"
                                    ></v-text-field>
                                </v-col>
                            </v-row>

                            <label> Property Images </label>
                            <div>
                                <div style="margin-top: 20px">
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
                                </div>
                                <div id="imgContainer">
                                    <small>({{6 - images.length}} images reminding)</small>
                                    <v-row no-gutters>
                                        <v-col v-for="(image, index) in images" :key="image.street1">
                                            <div>
                                                <img :src="image.source" alt="img" width="150" height="100">
                                                <div class="my-2" @click="removeImage(index)">
                                                    <v-btn small color="warning">Remove</v-btn>
                                                </div>
                                            </div>
                                        </v-col>
                                    </v-row>
                                </div>
                            </div>
                            <v-col
                                class="mb-12"
                                cols="12"
                            >
                            </v-col>
                        <!-- </form> -->
                    </v-col>
                                    <p class="errorMsg">{{errors.message}}</p>
                </v-row>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import {validateUpdateRoom} from '../../store/validators'
import axios from 'axios'
import {mapActions, mapGetters, mapMutations} from 'vuex'

export default {
    name: "EditRoomForm",
    props: {
        value: Boolean
    },
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
        ...mapGetters([
            'contentLoading'
        ]),
    },
    data(){
        return{
            countries: ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla', 'Antigua &amp; Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia &amp; Herzegovina', 'Botswana', 'Brazil', 'British Virgin Islands', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Cape Verde', 'Cayman Islands', 'Chad', 'Chile', 'China', 'Colombia', 'Congo', 'Cook Islands', 'Costa Rica', 'Cote D Ivoire', 'Croatia', 'Cruise Ship', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Polynesia', 'French West Indies', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Kyrgyz Republic', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mauritania', 'Mauritius', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russia', 'Rwanda', 'Saint Pierre &amp; Miquelon', 'Samoa', 'San Marino', 'Satellite', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'St Kitts &amp; Nevis', 'St Lucia', 'St Vincent', 'St. Lucia', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', "Timor L'Este", 'Togo', 'Tonga', 'Trinidad &amp; Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks &amp; Caicos', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe'],
            title: this.$store.getters.contentRoom.title,
            location: {
                street1: this.$store.getters.contentRoom.location.street1,
                street2: this.$store.getters.contentRoom.location.street2,
                city: this.$store.getters.contentRoom.location.city,
                state: this.$store.getters.contentRoom.location.state,
                zipCode: this.$store.getters.contentRoom.location.zipCode,
                country: this.$store.getters.contentRoom.location.country,
            },
            price: this.$store.getters.contentRoom.price,
            // propertyOwner: false,
            description: this.$store.getters.contentRoom.description,
            propertyRules: this.$store.getters.contentRoom.propertyRules === undefined ? [] : [...this.$store.getters.contentRoom.propertyRules],
            images: this.$store.getters.contentRoom.images === undefined ? [] : [...this.$store.getters.contentRoom.images],
            tempRule: '',
            imagesToBeDeleted: [],
            changes: [],
            errors: {},
            rentedRadioChecked: this.$store.getters.contentRoom.rented === false ? 0 : 1,
            rented: this.$store.getters.contentRoom.rented,
            disabledRadioChecked: this.$store.getters.contentRoom.disabled === false ? 0 : 1,
            disabled: this.$store.getters.contentRoom.disabled
        }
    },
    methods: {
        ...mapMutations([
            'SHOW_ROOM_UPDATING_DIALOG',
        ]),
        ...mapActions([
            'updateRoom'
        ]),
        removeImage(index){
            this.imagesToBeDeleted.push(this.images[index]);
            this.images.splice(index, 1)
            this.changes.push('images');
        },
        removeRule(index){
            this.propertyRules.splice(index, 1)
            this.changes.push('propertyRules');
        },
        addRule(){
            if(this.tempRule !== ''){
                this.propertyRules.push(this.tempRule);
                this.changes.push('propertyRules');
                this.tempRule = '';
            }
        },
        openUploadModal() {
            let folderName = this.$store.getters.contentRoom.cloudinaryFolderName;
            localStorage.setItem('img-folder-name', folderName);   
            window.cloudinary.openUploadWidget(
                { 
                    cloud_name: 'dr4l6xat9',
                    upload_preset: 'ure7xgev',
                    maxFiles: 1,
                    resourceType: 'image',
                    folder: folderName,
                }, (error, result) => {
                if(error){
                    console.log(error)
                }
                else if (!error && result && result.event === "success") {
                    // console.log('Done uploading..: ', result.info);
                    this.images.push({
                        source: result.info.secure_url,
                        public_id: result.info.public_id,
                    })
                    this.changes.push('images');
                    if(this.errors.image) delete this.errors.image
                }
            }).open();
        },
        roomRented(e){
            this.changes.push('rented');
            this.rented = e === 0 ? false : true
            // console.log("chanigin",e)
        },
        roomDisabled(e){
            this.changes.push('disabled');
            this.disabled = e === 0 ? false : true
            // console.log("chanigin",e)
        },
        saveUpdatedRoomData(e) {
            e.preventDefault();
            if(this.changes.length !== 0){
                const data = {
                    location: {},
                };
                let locationBeingUpdated = false;
                let properties = [...new Set(this.changes)]
                properties.forEach(item => {
                    if(item === 'zipCode' || item === 'street2' || item === 'street1' || 
                    item === 'state' || item === 'country' || item === 'city') {
                        data.location = this.location;
                        locationBeingUpdated = true;
                    } else {
                        data[item] = this[item];
                    }
                });
                if(locationBeingUpdated === false) delete data.location
                if(this.imagesToBeDeleted.length > 0){
                    this.imagesToBeDeleted.forEach(img =>{
                        this.removeCloudImage(img.public_id)
                    })
                }

                const {valid, errors} = validateUpdateRoom(data);
                if(!valid) this.errors = errors;
                else {
                    if(data.rented && data.rented === true) data.rentedDate = new Date()
                    data.objectId = this.$store.getters.contentRoom.objectId;
                    this.updateRoom(data);
                    localStorage.removeItem('img-folder-name')
                    // this.show = false;
                    // console.log(data);
                }
            } else {
                let errors = {
                    message: 'Nothing to update!'
                }
                this.errors = errors;
            }
            
        },
        removeCloudImage(public_id){
            // console.log("Deleting photo",index)
            axios.post(process.env.VUE_APP_DELETE_IMG, {public_id})
            .then(() => { console.log("Removed imgs!")})
            .catch(() => { console.log("Could not remove img!")})
            // this.images.splice(index, 1);
        },
        closeModal(){
            // console.log("caling close");
            if(this.changes.length > 0){
                this.resetValues();
            }
            this.SHOW_ROOM_UPDATING_DIALOG(false)
        },
        resetValues(){
            if(this.changes.length > 0){
                let copyImages = this.images;
                let orginalImages = this.$store.getters.contentRoom.images;
                //if images were uploaded and then the dialog was closed, deleted them
                if(copyImages.length > orginalImages.length){
                    this.deleteUploadedImgs(copyImages, orginalImages);
                } 
                // reseting values
                this.title = this.$store.getters.contentRoom.title,
                this.location = {
                    street1: this.$store.getters.contentRoom.location.street1,
                    street2: this.$store.getters.contentRoom.location.street2,
                    city: this.$store.getters.contentRoom.location.city,
                    state: this.$store.getters.contentRoom.location.state,
                    zipCode: this.$store.getters.contentRoom.location.zipCode,
                    country: this.$store.getters.contentRoom.location.country,
                },
                this.price = this.$store.getters.contentRoom.price,
                // propertyOwner: false,
                this.description = this.$store.getters.contentRoom.description,
                this.propertyRules = this.$store.getters.contentRoom.propertyRules === undefined ? [] : [...this.$store.getters.contentRoom.propertyRules],
                this.images = this.$store.getters.contentRoom.images === undefined ? [] : [...this.$store.getters.contentRoom.images],
                this.tempRule = '',
                this.imagesToBeDeleted = [],
                this.changes = [],
                this.errors = {},
                this.rentedRadioChecked = this.$store.getters.contentRoom.rented === false ? 0 : 1,
                this.rented = this.$store.getters.contentRoom.rented,
                this.disabledRadioChecked = this.$store.getters.contentRoom.disabled === false ? 0 : 1,
                this.disabled = this.$store.getters.contentRoom.disabled
            }
        },
        // images that were uploaded but editing process was not completed
        deleteUploadedImgs(copyImages, orginalImages){ 
            //if the room actually has images
            if(orginalImages){
                //find the different images and delete them
                let diffImgs = copyImages.filter(x => !orginalImages.includes(x));
                if(diffImgs.length > 0){
                    diffImgs.forEach(img => {
                        this.removeCloudImage(img.public_id)
                    })
                    //reset images value
                    this.images = this.$store.getters.contentRoom.images === undefined ? [] : [...this.$store.getters.contentRoom.images]
                }
            } else { // if the room dont have images but images where uploaded then delete all new images added
                copyImages.forEach(img => {
                    this.removeCloudImage(img.public_id)
                })
                //reset images value
                this.images = this.$store.getters.contentRoom.images === undefined ? [] : [...this.$store.getters.contentRoom.images]
            }
        },
        onKeyboardPressed(e){
            this.changes.push(e.target.name);
            // console.log('focus' ,e.target.name)
        }
    }
}
</script>
<style scoped>
    #imgContainer{
        margin-top: 20px;
        border: 2px solid gainsboro;
    }
    .errorMsg{
        color: red;
        text-align: center;
        margin: 10px;
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
</style>