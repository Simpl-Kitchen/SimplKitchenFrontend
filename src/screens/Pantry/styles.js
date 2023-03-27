// style screen for a pantry of ingredients and items in the home that can be used to make a recipe
// needs style for search bar, list of items, and buttons
// needs style for barcode item next to search box 
// needs style for list of items in pantry
// needs style for categories of items in pantry

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#0099ff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  carouselContainer: {
    height: 300,
  },
  slide: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  photo: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
});

export default styles;



