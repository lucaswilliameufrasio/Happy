import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  comment: {
    color: '#8fa7b3',
    fontSize: 11
  },

  container: {
    flex: 1
  },

  contentContainer: {
    padding: 24
  },

  currentPage: {
    fontFamily: 'Nunito_800ExtraBold'
  },

  imagesInput: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderColor: '#96D2F0',
    borderRadius: 20,
    borderStyle: 'dashed',
    borderWidth: 1.4,
    height: 56,
    justifyContent: 'center',
    marginBottom: 32
  },

  input: {
    backgroundColor: '#fff',
    borderColor: '#d3e2e6',
    borderRadius: 20,
    borderWidth: 1.4,
    height: 56,
    marginBottom: 16,
    paddingHorizontal: 24,
    paddingVertical: 18,
    textAlignVertical: 'top'
  },

  label: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 8
  },

  multiLineInput: {
    height: 110
  },

  nextButton: {
    alignItems: 'center',
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    marginTop: 32
  },

  nextButtonText: {
    color: '#FFF',
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16
  },

  pageIndicator: {
    color: '#5c8599',
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 14
  },

  removeUploadedImageButton: {
    marginRight: 10
  },

  title: {
    color: '#5c8599',
    fontFamily: 'Nunito_700Bold',
    fontSize: 24
  },

  titleContainer: {
    alignItems: 'center',
    borderBottomColor: '#D3E2E6',
    borderBottomWidth: 0.8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    paddingBottom: 24
  },

  uploadedImage: {
    borderRadius: 20,
    height: 64,
    marginRight: 8,
    width: 64
  },

  uploadedImageContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    flexDirection: 'row',
    height: 77,
    justifyContent: 'space-between',

    margin: 1,
    paddingHorizontal: 10,
    paddingVertical: 7
  },

  uploadedImageContainerGradient: {
    borderRadius: 20,
    marginBottom: 10
  },

  uploadedImageInfo: {
    alignItems: 'center',
    flexDirection: 'row'
  },

  uploadedImageName: {
    color: '#37C77F',
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 15,
    width: 150
  },

  uploadedImagesContainer: {

  }
})

export default styles
