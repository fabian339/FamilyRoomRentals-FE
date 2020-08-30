<template>
  <v-row class="text-center" justify="center">
    <v-col cols="12" sm="10" md="8" lg="6">
    <h1 class="display-2 font-weight-bold mb-3">
        Post A Room
    </h1>

    <v-col class="mb-4">
        <form
          @submit="submit"
        >

            <v-text-field
                ref="title"
                v-model="title"
                :rules="[() => !!title || 'This field is required']"
                label="Room Title"
                placeholder="Special Room Available in the NYC Area"
                required
            ></v-text-field>

            <label> Location </label>
            <v-text-field
                ref="street1"
                v-model="location.street1"
                :rules="[() => !!location.street1 || 'This field is required']"
                label="Street1"
                placeholder="76 Columbus St"
                required
            ></v-text-field>
            <v-text-field
                ref="street2"
                v-model="location.street2"
                :rules="[() => !!location.street2 || 'This field is required']"
                label="Street2"
                placeholder="Apt: 3b"
                required
            ></v-text-field>
            <v-text-field
                ref="city"
                v-model="location.city"
                :rules="[() => !!location.city || 'This field is required']"
                label="City"
                placeholder="Brooklyn"
                required
            ></v-text-field>
            <v-text-field
                ref="state"
                v-model="location.state"
                :rules="[() => !!location.state || 'This field is required']"
                label="State/Province/Region"
                required
                placeholder="NY"
            ></v-text-field>
            <v-text-field
                ref="zip"
                v-model="location.zip"
                :rules="[() => !!location.zip || 'This field is required']"
                label="ZIP / Postal Code"
                required
                placeholder=75155
            ></v-text-field>
            <v-autocomplete
                ref="country"
                v-model="location.country"
                :rules="[() => !!location.country || 'This field is required']"
                :items="countries"
                label="Country"
                placeholder="Select..."
                required
            ></v-autocomplete>
            
            <label> Description </label>
            <v-spacer></v-spacer>

            <div style="display: inline-flex">
                <p style="margin: 20px;">Are you the owner of this property?</p>
                <v-switch v-model="propertyOwner" inset :label="`(${propertyOwner.toString()})`">fsdfsdfsdf</v-switch>
            </div>  
            <v-text-field
                ref="price"
                v-model="price"
                :rules="[() => !!price || 'This field is required']"
                label="Price per month"
                required
                placeholder="$500"
            ></v-text-field>
            <v-textarea
                name="input-7-1"
                filled
                label="Details of Property:"
                v-model="description"
            ></v-textarea>    


            <label> Property Images </label>
            <div>
                <div style="margin-top: 20px">
                        <v-icon large color="green darken-2">mdi-camera</v-icon>
                    <input 
                        type="file" 
                        prepend-icon="mdi-camera" 
                        accept="image/*" 
                        :disabled="(6 - images.length) === 0" 
                        @change=uploadImage>
                </div>
                <div id="imgContainer">
                    <small>({{6 - images.length}} images reminding)</small>
                    <v-row no-gutters>
                        <v-col v-for="image in images" :key="image.street1">
                            <img :src="image" alt="img" width="150">
                        </v-col>
                    </v-row>
                </div>
            </div>
            <v-col
                class="mb-12"
                cols="12"
                style="marginTop: 5px"
            >
            <input type="submit" value="Submit">
                <!-- <v-btn
                    color="success"
                    class="mr-4"
                    @click="submit"
                    >
                    Post Room
                </v-btn> -->
            </v-col>
  </form>
    </v-col>
    </v-col>
  </v-row>
</template>
<script>
import { mapActions } from 'vuex'

  export default {
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
        propertyOwner: false,
        description: '',
        images: [],
      }
    }, 
    methods:{
        uploadImage(e){
            console.log("Calling1..", e);
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{
                console.log(this.images.length)
                this.images.push(e.target.result);
            };
        },
        ...mapActions([                  // Add this
            'addRoom'
        ]),
        submit(e) {
            e.preventDefault();
            // console.log(this.title)
            const room = {
                title: this.title,
                location: this.location,
                price: this.price,
                propertyOwner: this.propertyOwner,
                description: this.description,
                images: this.images
            }
            this.addRoom(room)
            this.$router.push("rooms")
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
