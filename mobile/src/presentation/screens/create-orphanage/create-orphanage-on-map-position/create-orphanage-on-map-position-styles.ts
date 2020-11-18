import { Dimensions, StyleSheet } from 'react-native'

const screenDimensions = Dimensions.get('screen')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },

  mapStyle: {
    height: screenDimensions.height,
    width: screenDimensions.width
  },

  nextButton: {
    alignItems: 'center',
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    bottom: 40,
    height: 56,

    justifyContent: 'center',
    left: 24,
    position: 'absolute',
    right: 24
  },

  nextButtonText: {
    color: '#FFF',
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16
  }
})

export default styles
