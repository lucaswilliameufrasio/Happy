import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  confirmButton: {
    alignItems: 'center',
    backgroundColor: '#3CDC8C',
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    marginTop: 32
  },

  confirmButtonText: {
    color: '#FFF',
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16
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

  pageIndicator: {
    color: '#5c8599',
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 14
  },

  selectButtonContainer: {
    flexDirection: 'row'
  },

  selectButtonText: {
    color: '#5C8599',
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16
  },

  selectContainer: {
    marginTop: 16
  },

  selectFirstButton: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 20,
    borderColor: '#D3E2E5',
    borderTopStartRadius: 20,
    borderWidth: 1,
    flex: 1,
    height: 56,
    justifyContent: 'center'
  },

  selectSecondButton: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomEndRadius: 20,
    borderColor: '#D3E2E5',
    borderTopRightRadius: 20,
    borderWidth: 1,
    flex: 1,
    height: 56,
    justifyContent: 'center'
  },

  selectedFirstButton: {
    backgroundColor: '#EDFFF6',
    borderColor: '#3CDC8C'
  },

  selectedFirstButtonText: {
    color: '#3CDC8C'
  },

  selectedSecondButton: {
    backgroundColor: '#FBF0F4',
    borderColor: '#ECB4B7'
  },

  selectedSecondButtonText: {
    color: '#FF669D'
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
  }
})

export default styles
