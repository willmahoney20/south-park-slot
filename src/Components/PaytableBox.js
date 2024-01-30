import ATrans from '../images/a_trans.png'
import JTrans from '../images/j_trans.png'
import KTrans from '../images/k_trans.png'
import QTrans from '../images/q_trans.png'
import Butters from '../images/butters.png'
import Cartman from '../images/cartman.png'
import Kenny from '../images/kenny.png'
import Kyle from '../images/kyle.png'
import Stan from '../images/stan.png'
import Tolkien from '../images/tolkien.png'
import Wendy from '../images/wendy.png'

const images = {
    'J': JTrans,
    'Q': QTrans,
    'K': KTrans,
    'A': ATrans,
    'Butters': Butters,
    'Cartman': Cartman,
    'Kenny': Kenny,
    'Kyle': Kyle,
    'Stan': Stan,
    'Tolkien': Tolkien,
    'Wendy': Wendy
}

export default ({ symbols, payouts }) => {
    return (
        <div className='slot-paytable-box'>
            <div className='slot-paytable-images'>
                {symbols.map((symbol, index) => {
                    let top = 10
                    let left = 5
                    if(symbols.length === 2 && index === 1){
                        top = 70
                        left = 25
                    }
                    if(symbols.length === 3){
                        top = 10
                        if(index === 2) top = 70
                        if(index === 0) left = -20
                        if(index === 1) left = 40
                    }
                    return (
                        <div key={index} style={{top: top + 'px', left: left + 'px'}}>
                            <img src={images[symbol]} alt={`${symbol} symbol`} />
                        </div>
                    )
                })}
            </div>
            <div className='slot-paytable-payouts'>
                <div>
                    <h3>X5</h3>
                    <h1>{payouts[2]}</h1>
                </div>
                <div>
                    <h3>X4</h3>
                    <h1>{payouts[1]}</h1>
                </div>
                <div>
                    <h3>X3</h3>
                    <h1>{payouts[0]}</h1>
                </div>
            </div>
        </div>
    )
}