let geocoder;

window.onload = function() {
  geocoder = new google.maps.Geocoder();
  
  document.getElementById("getLocationButton").addEventListener("click", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          geocoder.geocode({'location': pos}, function(results, status) {
            if (status === 'OK') {
              if (results[0]) {
                let country = null;
                let postal_code = null;
                let administrative_area_level_1 = null;
                let locality = null;
                let sublocality_level_1 = null;
                let sublocality_level_2 = null;

                for (let i = 0; i < results[0].address_components.length; i++) {
                  const component = results[0].address_components[i];
                  
                  if (component.types.includes("country")) {
                    country = component.long_name;
                  } else if (component.types.includes("postal_code")) {
                    postal_code = component.long_name;
                  } else if (component.types.includes("administrative_area_level_1")) {
                    administrative_area_level_1 = component.long_name;
                  } else if (component.types.includes("locality")) {
                    locality = component.long_name;
                  } else if (component.types.includes("sublocality_level_1")) {
                    sublocality_level_1 = component.long_name;
                  } else if (component.types.includes("sublocality_level_2")) {
                    sublocality_level_2 = component.long_name;
                  }
                }

                document.getElementById("input").value = postal_code;
                document.getElementById("address1").value = administrative_area_level_1;
                document.getElementById("address2").value = sublocality_level_1
              ? locality + " " + sublocality_level_1
              : locality;

                document.getElementById("address3").value = sublocality_level_2;

              } else {
                window.alert('No results found');
              }
            } else {
              window.alert('Geocoder failed due to: ' + status);
            }
          });
        },
        () => {
          handleLocationError(true);
        }
      );
    } else {
      handleLocationError(false);
    }
  });
}

function handleLocationError(browserHasGeolocation) {
  document.getElementById("locationInfo").textContent =
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation.";
}
