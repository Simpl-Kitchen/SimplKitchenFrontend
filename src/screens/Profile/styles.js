import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#00BFFF',
    height: 200,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: -100,
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#fff',
    marginBottom: 10,
  },
  nameContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  nameText: {
    fontSize: 22,
    fontWeight: '600',
  },
  bioContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  bioText: {
    fontSize: 18,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    backgroundColor: '#00BFFF',
    paddingVertical: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 20,
  },
  logoutButtonContainer: {
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '700',
  },
});

export default styles;
