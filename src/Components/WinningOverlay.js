import React, { useState, useEffect } from 'react'

export default ({ paylines, removePaylines }) => {
    const [paylineIndex, setPaylineIndex] = useState(0)

    useEffect(() => {
        if(paylines.length > 0){
            const interval = setInterval(() => {
                // Increment the paylineIndex and wrap around if it exceeds the array length
                setPaylineIndex((prevIndex) => (prevIndex + 1) % paylines.length)
            }, 2000)
        
            // Clear the interval after 1.5 seconds multiplied by the number of paylines
            const timeout = setTimeout(() => {
                clearInterval(interval)
                removePaylines()
            }, 2000 * paylines.length)
        
            return () => {
                clearInterval(interval)
                clearTimeout(timeout)
            }
        }
    }, [paylines.length])

    let payout = paylines[paylineIndex].payout
    let streak = paylines[paylineIndex].streak
    let arr = paylines[paylineIndex].payline.slice(0, streak)

    return (
        <div className='slot-payline-container'>
            <div className='slot-payout-banner' style={{top: ((arr[0][1] + 1) * 159) + 20 + 'px'}}>
                <h1>${parseFloat(payout).toFixed(2)}</h1>
            </div>
            <div className='slot-payline-reel'>
                <div className={arr.some(element => element[0] === 0 && element[1] === 0) ? 'slot-winning-active slot-winning' : 'slot-winning'}></div>
                <div className={arr.some(element => element[0] === 0 && element[1] === 1) ? 'slot-winning-active slot-winning' : 'slot-winning'}></div>
                <div className={arr.some(element => element[0] === 0 && element[1] === 2) ? 'slot-winning-active slot-winning' : 'slot-winning'}></div>
            </div>
            <div className='slot-payline-reel'>
                <div className={arr.some(element => element[0] === 1 && element[1] === 0) ? 'slot-winning-active slot-winning' : 'slot-winning'}></div>
                <div className={arr.some(element => element[0] === 1 && element[1] === 1) ? 'slot-winning-active slot-winning' : 'slot-winning'}></div>
                <div className={arr.some(element => element[0] === 1 && element[1] === 2) ? 'slot-winning-active slot-winning' : 'slot-winning'}></div>
            </div>
            <div className='slot-payline-reel'>
                <div className={arr.some(element => element[0] === 2 && element[1] === 0) ? 'slot-winning-active slot-winning' : 'slot-winning'}></div>
                <div className={arr.some(element => element[0] === 2 && element[1] === 1) ? 'slot-winning-active slot-winning' : 'slot-winning'}></div>
                <div className={arr.some(element => element[0] === 2 && element[1] === 2) ? 'slot-winning-active slot-winning' : 'slot-winning'}></div>
            </div>
            <div className='slot-payline-reel'>
                <div className={arr.some(element => element[0] === 3 && element[1] === 0) ? 'slot-winning-active slot-winning' : 'slot-winning'}></div>
                <div className={arr.some(element => element[0] === 3 && element[1] === 1) ? 'slot-winning-active slot-winning' : 'slot-winning'}></div>
                <div className={arr.some(element => element[0] === 3 && element[1] === 2) ? 'slot-winning-active slot-winning' : 'slot-winning'}></div>
            </div>
            <div className='slot-payline-reel'>
                <div className={arr.some(element => element[0] === 4 && element[1] === 0) ? 'slot-winning-active slot-winning' : 'slot-winning'}></div>
                <div className={arr.some(element => element[0] === 4 && element[1] === 1) ? 'slot-winning-active slot-winning' : 'slot-winning'}></div>
                <div className={arr.some(element => element[0] === 4 && element[1] === 2) ? 'slot-winning-active slot-winning' : 'slot-winning'}></div>
            </div>
        </div>
    )
}