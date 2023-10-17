import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ImageGallery from './ImageGallery/ImageGallery';
import { useParams } from 'react-router-dom';

function ProductDetails() {
	let { category, name, id, } = useParams();
	console.log(category, name, id)
	const categoryData = useSelector((state) => {
		if (category === "airfryers") {
		  return state.airfryers;
		} else if (category === "accesories") {
		  return state.accesories;
		}
		return null; // Maneja el caso en el que no se encuentra la categoría
	  });
	useEffect(() => {
		  window.scrollTo(0, 0);
	  }, []);
	return (
		<ImageGallery images={categoryData[id].thumbnails} />
	);
  }

  export default ProductDetails;
