import airfWoman from '../assets/images/woman.jpg'
import haydenA from '../assets/images/haydenA-1.jpg'
import haydenX from '../assets/images/haydenX-1.jpg'
import cube from '../assets/images/cube-smart-5.jpg'

function Accesories() {
  return (
	<div className='row align-items-center p-5 pb-0'>
		<div className='d-flex col-9'>
			<div className='text-center px-3 col-4'>
				<img src={haydenA} alt='airfryer haydenA' className='img-fluid mb-2' />
				<span>HAYDEN-A</span>
				<h5 className='mt-2 mb-1'>Capacidad: 4L</h5>
				<p className='price'>56€</p>
			</div>
			<div className='text-center px-3 col-4'>
				<img src={haydenX} alt='airfryer haydenx' className='img-fluid' />
				<span>HAYDEN-X</span>
				<h5 className='mt-2 mb-1'>Capacidad: 4L</h5>
				<p className='price'>60€</p>
			</div>
			<div className='text-center px-3 col-4'>
				<img src={cube} alt='airfryer cube smart' className='img-fluid' />
				<span>CUBE SMART</span>
				<h5 className='mt-2 mb-1'>Capacidad: 7L</h5>
				<p className='price'>95€</p>
			</div>
		</div>
		<div className='col-3'>
			<img src={airfWoman} alt='aigostar airfryer' className="img-fluid"/>
		</div>
	</div>
  )
}

export default Accesories
