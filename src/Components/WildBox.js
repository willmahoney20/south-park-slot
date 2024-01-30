import Bonus from '../images/bonus.png'
import Wild from '../images/wild.png'

export default () => {
    return (
        <div className='slot-wild'>
            <div className='slot-wild-main'>
                <img src={Wild} alt='Wild symbol' />
            </div>
            <div className='slot-wild-info'>
                <h3>SUBSTITUTES ALL SYMBOLS EXCEPT:</h3>
                <div>
                    <img src={Bonus} alt='Bonus symbol' />
                </div>
            </div>
        </div>
    )
}