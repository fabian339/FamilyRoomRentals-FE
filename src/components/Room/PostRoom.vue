<template>
  <v-row class="text-center" justify="center">
    <v-col cols="12" sm="10" md="8" lg="6">
    <div class="logo" >
        <img :src="require('../../assets/logo.png')" alt="logo" width="400">
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
                label="Details of Property: (include rules)"
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

            <label> Property Images </label>
            <div>
                <div style="margin-top: 20px">
                        <v-icon large color="green darken-2">mdi-camera</v-icon>
                    <input 
                        type="file" 
                        prepend-icon="mdi-camera" 
                        accept="image/*" 
                        :disabled="(6 - images.length) === 0" 
                        @change="uploadImage">
                </div>
                <div id="imgContainer">
                    <small>({{6 - images.length}} images reminding)</small>
                    <v-row no-gutters>
                        <v-col v-for="(image, index) in images" :key="image.street1">
                            <div>
                                <img :src="image" alt="img" width="150" height="100">
                                <div class="my-2" @click="images.splice(index, 1)">
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
                style="marginTop: 10px"
            >
                <v-btn type="submit"  rounded color="#2E8B57" dark>Post Room</v-btn>
            </v-col>
        </form>
    </v-col>
    </v-col>
  </v-row>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import noImageForRoom from './noImageForRoom'
import {validateCreateRoom} from '../../store/validators'

  export default {
    computed: {
      ...mapGetters([
        'currentUser',
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
        // propertyOwner: false,
        description: '',
        propertyRules: [],
        tempRule: '',
        images: [],
        errors: {}
      }
    }, 
    methods:{
        uploadImage(e){
            // console.log("Calling1..", e);
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e => this.images.push(e.target.result);
        },
        removePhoto(index){
            console.log("Deleting photo",index)
            this.images.splice(index, 1);
        },
        ...mapActions([                  // Add this
            'addRoom'
        ]),
        submit(e) {
            e.preventDefault();
            const room = {
                title: this.title,
                location: this.location,
                propertyRules: this.propertyRules,
                price: this.price,
                description: this.description,
                ownerId: this.currentUser.objectId,
                ownerFname: this.currentUser.fName,
                ownerLname: this.currentUser.lName,
                ownerEmail: this.currentUser.email,
                rented: false,
                images: this.images.length === 0 ? noImageForRoom : this.images
            }
            const {valid, errors} = validateCreateRoom(room);
            if(!valid) this.errors = errors;
            else this.addRoom(room)
        },
        addRule(){
            if(this.tempRule !== ''){
                this.propertyRules.push(this.tempRule);
                this.tempRule = '';
            }
        }

    }
  }
</script>




<style scoped>
    #imgContainer{
        margin-top: 20px;
        border: 2px solid gainsboro;
    }
</style>
