import { useSelector } from 'react-redux';
import ImageGallery from './ImageGallery/ImageGallery';

function ProductDetails() {
	const airfryers = useSelector((state) => state.airfryers);

	return (
		<ImageGallery images={airfryers[0].thumbnails} />
	);
  }

  export default ProductDetails;
