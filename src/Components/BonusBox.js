import Bonus from '../images/bonus.png'

export default () => {
    return (
        <div className='slot-bonus'>
            <div className='slot-bonus-symbols'>
                <div className='slot-bonus-images'>
                    <div>
                        <img src={Bonus} alt='Bonus symbol' />
                    </div>
                    <div>
                        <img src={Bonus} alt='Bonus symbol' />
                    </div>
                    <div>
                        <img src={Bonus} alt='Bonus symbol' />
                    </div>
                </div>
                <div className='slot-bonus-text'>
                    <h2>3 OR MORE</h2>
                </div>
            </div>
            <div className='slot-bonus-awards'>
                <h2>AWARDS</h2>
            </div>
            <div className='slot-bonus-main'>
                <div>
                    <img src={Bonus} alt='Bonus symbol' />
                </div>
            </div>
        </div>
    )
}