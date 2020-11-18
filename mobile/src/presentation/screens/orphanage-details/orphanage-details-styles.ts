import { StyleSheet, Dimensions } from 'react-native'

const screenDimensions = Dimensions.get('screen')

const styles = StyleSheet.create({
  contactButton: {
    alignItems: 'center',
    backgroundColor: '#3CDC8C',
    borderRadius: 20,
    flexDirection: 'row',
    height: 56,
    justifyContent: 'center',
    marginTop: 40
  },

  contactButtonText: {
    color: '#FFF',
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    marginLeft: 16
  },

  container: {
    flex: 1
  },

  description: {
    color: '#5c8599',
    fontFamily: 'Nunito_600SemiBold',
    lineHeight: 24,
    marginTop: 16
  },

  detailsContainer: {
    padding: 24
  },

  image: {
    height: 240,
    resizeMode: 'cover',
    width: screenDimensions.width
  },

  imagesContainer: {
    height: 240
  },

  mapContainer: {
    backgroundColor: '#E6F7FB',
    borderColor: '#B3DAE2',
    borderRadius: 20,
    borderWidth: 1.2,
    marginTop: 40,
    overflow: 'hidden'
  },

  mapStyle: {
    height: 150,
    width: '100%'
  },

  routesContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16
  },

  routesText: {
    color: '#0089a5',
    fontFamily: 'Nunito_700Bold'
  },

  scheduleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24
  },

  scheduleItem: {
    padding: 20,
    width: '48%'
  },

  scheduleItemBlue: {
    backgroundColor: '#E6F7FB',
    borderColor: '#B3DAE2',
    borderRadius: 20,
    borderWidth: 1
  },

  scheduleItemGreen: {
    backgroundColor: '#EDFFF6',
    borderColor: '#A1E9C5',
    borderRadius: 20,
    borderWidth: 1
  },

  scheduleText: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 20
  },

  scheduleTextBlue: {
    color: '#5C8599'
  },

  scheduleTextGreen: {
    color: '#37C77F'
  },

  separator: {
    backgroundColor: '#D3E2E6',
    height: 0.8,
    marginVertical: 40,
    width: '100%'
  },

  title: {
    color: '#4D6F80',
    fontFamily: 'Nunito_700Bold',
    fontSize: 30
  }
})

export default styles
