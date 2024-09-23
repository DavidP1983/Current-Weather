import spinner from './spinner.gif';



const Spinner = () => {
    return (
        <div className='spiner-error'>
            <img src={spinner} alt="" />
            <div>Loading...</div>
        </div>
    );
}

export default Spinner;