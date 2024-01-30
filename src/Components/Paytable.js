import '../Stylesheets/Paytable.css'
import BonusBox from './BonusBox'
import WildBox from './WildBox'
import PaytableBox from './PaytableBox'

export default () => {
    return (
        <div className='slot-paytable'>
            <div className='slot-paytable-left'>
                <div>
                    <div>
                        <BonusBox />
                    </div>
                </div>
                <div>
                    <PaytableBox symbols={['Cartman', 'Kyle']} payouts={[20, 50, 175]} />
                    <PaytableBox symbols={['Stan', 'Kenny']} payouts={[15, 40, 125]} />
                </div>
                <div>
                    <PaytableBox symbols={['Butters', 'Wendy', 'Tolkien']} payouts={[10, 25, 75]} />
                    <PaytableBox symbols={['A', 'K']} payouts={[5, 10, 40]} />
                </div>
            </div>
            <div className='slot-paytable-right'>
                <div>
                    <WildBox />
                </div>
                <div>
                    <PaytableBox symbols={['Q', 'J']} payouts={[2, 5, 20]} />
                </div>
            </div>
        </div>
    )
}