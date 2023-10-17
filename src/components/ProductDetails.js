import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ImageGallery from './ImageGallery/ImageGallery';

function ProductDetails() {
	const airfryers = useSelector((state) => state.airfryers);
	useEffect(() => {
		// Utiliza el identificador para desplazarte a la parte superior de la vista
		  // Supongamos que deseas desplazarte a la parte superior cuando el id es '2'
		  window.scrollTo(0, 0); // Esto llevará la vista al principio
	  }, []);
	return (
		<ImageGallery images={airfryers[0].thumbnails} />
	);
  }

  export default ProductDetails;
