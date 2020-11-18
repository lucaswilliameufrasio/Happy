import { Dimensions, StyleSheet } from 'react-native'

const screenDimensions = Dimensions.get('screen')

const styles = StyleSheet.create({
  calloutContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    height: 46,
    justifyContent: 'center',
    paddingHorizontal: 16,
    width: 160
  },

  calloutText: {
    color: '#0089A5',
    fontFamily: 'Nunito_700Bold',
    fontSize: 14
  },

  container: {
    flex: 1
  },

  createOrphanageButton: {
    alignItems: 'center',
    backgroundColor: '#15C3D6',
    borderRadius: 20,
    height: 56,

    justifyContent: 'center',
    width: 56
  },

  footer: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 20,
    bottom: 32,

    elevation: 3,
    flexDirection: 'row',

    height: 56,
    justifyContent: 'space-between',

    left: 24,
    paddingLeft: 24,
    position: 'absolute',

    right: 24
  },

  footerText: {
    color: '#8FA7B3',
    fontFamily: 'Nunito_700Bold'
  },

  map: {
    height: screenDimensions.height,
    width: screenDimensions.width
  }
})

export default styles
