import { GuessType, LocationType } from '../../@types'
import LatLng = google.maps.LatLng

const createPolyline = (path: LatLng[], map: google.maps.Map) => {
  return new google.maps.Polyline({
    path,
    map: map,
    clickable: false,
    strokeOpacity: 1,
    strokeColor: '#FF0000',
    strokeWeight: 2,
  })
}

export default createPolyline
