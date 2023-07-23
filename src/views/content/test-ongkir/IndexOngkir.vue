<template>
    <div class="container">
      <!-- Leaflet Map Container -->
      <l-map :zoom="zoom" :center="mapCenter" style="height: 500px; width: 500px">
        <l-tile-layer :url="tileLayerUrl"></l-tile-layer>
  
        <!-- Draggable Marker -->
        <l-marker v-if="selectedPosition" :lat-lng="selectedPosition" :draggable="true" @dragend="handleMarkerDrag"></l-marker>
      </l-map>
  
      <p>Selected Position: {{ locationName }}</p>
      <p>Location Name: {{ locationName }}</p> <!-- Display fetched location details -->
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet';
  import 'leaflet/dist/leaflet.css';
  
  export default {
    components: {
      LMap,
      LTileLayer,
      LMarker,
    },
    data() {
      return {
        zoom: 15,
        tileLayerUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        selectedPosition: null, 
        // Initialize with null
        locationName: null,
      };
    },
    computed: {
      mapCenter() {
        return this.selectedPosition || [0, 0];
      },
    },
    mounted() {
      this.geolocate(); 
    },
    methods: {
      geolocate() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            position => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              this.fetchLocationDetails(latitude, longitude);
            },
            error => {
              console.error('Error occurred while retrieving current location:', error);
            }
          );
        } else {
          console.error('Geolocation is not supported by this browser.');
        }
      },
      handleMarkerDrag(e) {
        if (e && e.target) {
          const latitude = e.target._latlng.lat;
          const longitude = e.target._latlng.lng;
          this.selectedPosition = [latitude, longitude];
          this.fetchLocationDetails(latitude, longitude);
        }
      },
      fetchLocationDetails(latitude, longitude) {
        axios
          .get('https://nominatim.openstreetmap.org/reverse', {
            params: {
              lat: latitude,
              lon: longitude,
              format: 'jsonv2',
            },
          })
          .then(response => {
            this.locationName = response.data.display_name;
            this.selectedPosition = [response.data.lat, response.data.lon];
            console.log(response);
          })
          .catch(error => {
            console.error('Error occurred while fetching location details:', error);
          });
      },
    },
  };
  </script>
  