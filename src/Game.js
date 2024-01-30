import React, { useState, useEffect } from 'react'
import './Stylesheets/Slot.css'
import Reel from './Components/Reel'
import PaylineButton from './Components/PaylineButton'
import PaylineOverlay from './Components/PaylineOverlay'
import Background from './images/south_park.jpg'
import Logo from './images/south_park_logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRotateRight, faCaretUp, faCaretDown, faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import Info from './Components/Info'
import Paytable from './Components/Paytable'
import WinningOverlay from './Components/WinningOverlay'
import ReelSpinning from './Components/ReelSpinning'

const paylines = [
    [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]],
    [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1]],
    [[0, 2], [1, 2], [2, 2], [3, 2], [4, 2]],
    [[0, 0], [1, 1], [2, 2], [3, 1], [4, 0]],
    [[0, 2], [1, 1], [2, 0], [3, 1], [4, 2]],
    [[0, 1], [1, 2], [2, 2], [3, 2], [4, 1]],
    [[0, 1], [1, 0], [2, 0], [3, 0], [4, 1]],
    [[0, 2], [1, 2], [2, 1], [3, 0], [4, 0]],
    [[0, 0], [1, 0], [2, 1], [3, 2], [4, 2]],
    [[0, 2], [1, 1], [2, 1], [3, 1], [4, 0]]
] 

const symbols = [
    { name: 'J', probability: 0.175, payout_multiplier: [2, 5, 20] },
    { name: 'Q', probability: 0.175, payout_multiplier: [2, 5, 20] },
    { name: 'K', probability: 0.125, payout_multiplier: [5, 10, 40] },
    { name: 'A', probability: 0.125, payout_multiplier: [5, 10, 40] },
    { name: 'Butters', probability: 0.06, payout_multiplier: [10, 25, 75] },
    { name: 'Wendy', probability: 0.06, payout_multiplier: [10, 25, 100] },
    { name: 'Tolkien', probability: 0.06, payout_multiplier: [10, 25, 75] },
    { name: 'Stan', probability: 0.04, payout_multiplier: [15, 40, 125] },
    { name: 'Kenny', probability: 0.04, payout_multiplier: [15, 40, 125] },
    { name: 'Kyle', probability: 0.03, payout_multiplier: [20, 50, 175] },
    { name: 'Cartman', probability: 0.03, payout_multiplier: [20, 50, 175] },
    { name: 'Bonus', probability: 0.07 },
    { name: 'Wild Card', probability: 0.01, payout_multiplier: [null, null, 250] }
]

// Function to select a random symbol based on probabilities
const getRandomSymbol = () => {
    const randomValue = Math.random()
    let cumulative_probability = 0
  
    for(const symbol of symbols){
        cumulative_probability += symbol.probability
        if(randomValue <= cumulative_probability) return symbol
    }
  
    // Fallback (shouldn't reach this point under normal circumstances)
    return symbols[0]
}

const spin = bet => {
    // we need to...
    // - get 15 random values
    let slot_grid = Array.from({ length: 5 }, () => Array(3).fill(null))
    for(let column = 0; column < 5; column++){
        for(let row = 0; row < 3; row++){
            const ran_sym = getRandomSymbol().name
            slot_grid[column][row] = ran_sym
        }
    }

    // - check for and calculate payouts, if a wild card is present, then check for payouts with every symbol in place of wild card
    const payouts = []
    for(const payline of paylines){
        const symbols_in_payline = payline.map(([column, row]) => {
            return slot_grid[column][row]
        })

        let symbol = symbols_in_payline.find(symbol => symbol !== 'Wild Card')
        if(!symbol) symbol = 'Wild Card' // this will trigger if all 5 are wild cards
        
        // - check for bonus game
        if(symbol === 'Bonus'){
            let bonus_random = Math.random()
            let bonus_active = null
            if(symbols_in_payline.every(item => item === 'Bonus')){
                bonus_active = 'Triple'
            } else if(symbols_in_payline.slice(0, 4).every(item => item === 'Bonus')){
                if(bonus_active !== 'Triple') bonus_active = 'Double'
            } else if(symbols_in_payline.slice(0, 3).every(item => item === 'Bonus')){
                if(bonus_active !== 'Triple' && bonus_active !== 'Double') bonus_active = 'Standard'
            }

            if(bonus_active){
                let bonus_payout = null
                if(bonus_random < 0.2){
                    bonus_payout = bet * 50
                } else if(bonus_random < 0.4){
                    bonus_payout = bet * 30
                } else if(bonus_random < 0.6){
                    bonus_payout = bet * 20
                } else if(bonus_random < 0.8){
                    bonus_payout = bet * 10
                } else {
                    bonus_payout = bet * 5
                }

                if(bonus_payout){
                    let payout_multiplier = bonus_active === 'Treble' ? 3 : bonus_active === 'Double' ? 2 : 1

                    payouts.push({
                        symbol: 'Bonus',
                        streak: bonus_active === 'Treble' ? 5 : bonus_active === 'Double' ? 4 : 3,
                        payout: payout_multiplier * bonus_payout,
                        payline
                    })
                }
            }
        } else {
            if(symbols_in_payline.every(item => item === symbol || item ==='Wild Card')){
                const symbol_obj = symbols.find(item => item.name === symbol)
                const payout_multiplier = symbol_obj.payout_multiplier[2]
                payouts.push({
                    symbol,
                    streak: 5,
                    payout: payout_multiplier * bet,
                    payline
                })
            } else if(symbols_in_payline.slice(0, 4).every(item => item === symbol || item ==='Wild Card')){
                const symbol_obj = symbols.find(item => item.name === symbol)
                const payout_multiplier = symbol_obj.payout_multiplier[1]
                payouts.push({
                    symbol,
                    streak: 4,
                    payout: payout_multiplier * bet,
                    payline
                })
            } else if(symbols_in_payline.slice(0, 3).every(item => item === symbol || item ==='Wild Card')){
                const symbol_obj = symbols.find(item => item.name === symbol)
                const payout_multiplier = symbol_obj.payout_multiplier[0]
                payouts.push({
                    symbol,
                    streak: 3,
                    payout: payout_multiplier * bet,
                    payline
                })
            }
        }
    }

    let sum_payouts = 0
    payouts.forEach(item => sum_payouts += item.payout)

    return { slot_grid, sum_payouts, payouts }
}

// get the array of symbols to spin through, current is the last reel symbols, and landed is the new reel symbols
const handleSpinningCalc = (current, landed) => {
    let final_arr = []
    
    for(let i = 0; i < 5; i++){
        let arr = []
        let limit = 24 + (6 * i)
        for(let j = 0; j < limit; j++){
            const { name } = getRandomSymbol()
            arr.push(name)
        }

        final_arr.push([...landed[i], ...arr, ...current[i]])
    }

    return final_arr
}

export default () => {
    const [reelSpinning, setReelSpinning] = useState(Array(5).fill([]))
    const [slotGrid, setSlotGrid] = useState([
        ['Tolkien', 'Kenny', 'Butters'],
        ['Wendy', 'Bonus', 'Cartman'],
        ['Cartman', 'Kenny', 'K'],
        ['A', 'J', 'Q'],
        ['Kyle', 'Stan', 'Wild Card']
    ])
    const [reel1Spinning, setReel1Spinning] = useState(false)
    const [reel2Spinning, setReel2Spinning] = useState(false)
    const [reel3Spinning, setReel3Spinning] = useState(false)
    const [reel4Spinning, setReel4Spinning] = useState(false)
    const [reel5Spinning, setReel5Spinning] = useState(false)
    const [balance, setBalance] = useState(1000)
    const [balanceError, setBalanceError] = useState(false)
    const [bet, setBet] = useState(1)
    const [payline, setPayline] = useState(null)
    const [winningPaylines, setWinningPaylines] = useState([])
    const [lastSpin, setLastSpin] = useState(0)
    const [autoplay, setAutoplay] = useState(false)
    const [paytable, setPaytable] = useState(false)
    const [info, setInfo] = useState(false)
    const [spinning, setSpinning] = useState(false)
    const [screenError, setScreenError] = useState(false)
    const [dataLoaded, setDataLoaded] = useState(false)

	useEffect(() => {
		document.title = 'South Park Game'		
		window.history.replaceState(null, "South Park Game", '/projects/south-park-game')

        if(window.innerWidth < 992) setScreenError(true)
        setDataLoaded(true)
	}, [])

    useEffect(() => {
        if(!spinning && autoplay && winningPaylines.length < 1){
            setSpinning(true)
            handleSpin()
        }
    }, [spinning, autoplay, winningPaylines])
  
    const handleSpin = async (max_bet) => {
        let current_balance = balance
        let spin_stake = max_bet ? betOptions[betOptions.length - 1] : bet

        if(current_balance < spin_stake){
            setBalanceError(true)
            if(autoplay) setAutoplay(false)
            return
        }

        if(max_bet){
            setBet(betOptions[betOptions.length - 1])
        }

        const result = await spin(spin_stake)

        current_balance -= spin_stake
        current_balance += parseFloat(result.sum_payouts)

        // get symbols for spinning reels
        const spinning_arr = await handleSpinningCalc(slotGrid, result.slot_grid)

        setReelSpinning(spinning_arr)
        setReel1Spinning(true)
        setReel2Spinning(true)
        setReel3Spinning(true)
        setReel4Spinning(true)
        setReel5Spinning(true)

        setSlotGrid(result.slot_grid)

        // set values after spinning animation has completed
        setTimeout(() => {
            setLastSpin(result.sum_payouts)
            setBalance(current_balance)
            if(result.payouts.length > 0) setWinningPaylines(result.payouts)
        }, 4500)

        return
    }

    const handleLeave = () => setPayline(null)

    const betOptions = [1, 2, 5, 10, 20, 50]

    const increaseBet = () => {
        if(!autoplay && !spinning){
            if(bet !== betOptions[betOptions.length - 1]) setBet(prev => betOptions[betOptions.indexOf(prev) + 1])
        }
    }

    const decreaseBet = () => {
        if(!autoplay && !spinning){
            if(bet !== betOptions[0]) setBet(prev => betOptions[betOptions.indexOf(prev) - 1])
        }
    }

    return (
        <div className='slot-shell'>
            <img src={Background} alt='slot background image' />
            
            {dataLoaded && screenError ? (
            <div className='slot-error'>
                <h3>Not Accessible</h3>
                <p>Sorry, this game is not currently available on mobile devices.</p>
            </div>
            ) : dataLoaded ? (
            <div className='slot-container'>
                <div>
                    {paytable && <Paytable />}

                    <div className='slot-payline-btns'>
                        <PaylineButton handleEnter={() => setPayline(paylines[0])} handleLeave={handleLeave} active={paylines[0]} />
                        <PaylineButton handleEnter={() => setPayline(paylines[1])} handleLeave={handleLeave} active={paylines[1]} />
                        <PaylineButton handleEnter={() => setPayline(paylines[2])} handleLeave={handleLeave} active={paylines[2]} />
                        <PaylineButton handleEnter={() => setPayline(paylines[3])} handleLeave={handleLeave} active={paylines[3]} />
                        <PaylineButton handleEnter={() => setPayline(paylines[4])} handleLeave={handleLeave} active={paylines[4]} />
                        <PaylineButton handleEnter={() => setPayline(paylines[5])} handleLeave={handleLeave} active={paylines[5]} />
                        <PaylineButton handleEnter={() => setPayline(paylines[6])} handleLeave={handleLeave} active={paylines[6]} />
                        <PaylineButton handleEnter={() => setPayline(paylines[7])} handleLeave={handleLeave} active={paylines[7]} />
                        <PaylineButton handleEnter={() => setPayline(paylines[8])} handleLeave={handleLeave} active={paylines[8]} />
                        <PaylineButton handleEnter={() => setPayline(paylines[9])} handleLeave={handleLeave} active={paylines[9]} />
                    </div>
                    
                    {(!paytable && winningPaylines.length > 0) && <WinningOverlay
                        paylines={winningPaylines} 
                        removePaylines={() => setWinningPaylines([])}
                    />}
                    {(!paytable && payline !== null) && <PaylineOverlay payline={payline} />}

                    <div className='slot-logo'>
                        <img src={Logo} alt='South Park Logo' />
                    </div>
                    <div className='slot-reels-container'>
                        <div className='slot-reels'>
                            {reel1Spinning ? 
                            <ReelSpinning
                                symbols={reelSpinning[0]}
                                reel_num={0} 
                                handleChange={() => setReel1Spinning(false)}
                            /> :
                            <Reel symbols={slotGrid[0]} />}
                            {reel2Spinning ? 
                            <ReelSpinning
                                symbols={reelSpinning[1]}
                                reel_num={1}
                                handleChange={() => setReel2Spinning(false)}
                            /> :
                            <Reel symbols={slotGrid[1]} />}
                            {reel3Spinning ? 
                            <ReelSpinning
                                symbols={reelSpinning[2]}
                                reel_num={2}
                                handleChange={() => setReel3Spinning(false)}
                            /> :
                            <Reel symbols={slotGrid[2]} />}
                            {reel4Spinning ? 
                            <ReelSpinning
                                symbols={reelSpinning[3]}
                                reel_num={3}
                                handleChange={() => setReel4Spinning(false)}
                            /> :
                            <Reel symbols={slotGrid[3]} />}
                            {reel5Spinning ? 
                            <ReelSpinning
                                symbols={reelSpinning[4]}
                                reel_num={4}
                                handleChange={() => {
                                    setReel5Spinning(false)
                                    setSpinning(false)
                                }}
                            /> :
                            <Reel symbols={slotGrid[4]} />}
                        </div>
                    </div>
                    <div className='slot-details'>
                        <button
                            className='slot-paytable-btn'
                            onClick={() => {
                                if(!spinning){
                                    setPaytable(prev => !prev)
                                    setAutoplay(false)
                                }
                            }}>
                            {paytable ? 'CLOSE' : 'PAYTABLE'}
                        </button>
                        <button
                            className='slot-info-btn'
                            onMouseEnter={() => setInfo(true)}
                            onMouseLeave={() => setInfo(false)}
                        >
                            <FontAwesomeIcon icon={faCircleInfo} className='slot-info-icon' />
                        </button>
                        {info && <Info />}
                        <div>
                            <div className='slot-stake'>
                                <div>
                                    <h5>BET</h5>
                                    <h5>${bet}</h5>
                                </div>
                                <div>
                                    <button onClick={increaseBet}>
                                        <FontAwesomeIcon icon={faCaretUp} className='slot-stake-arrow' />
                                    </button>
                                    <button onClick={decreaseBet}>
                                        <FontAwesomeIcon icon={faCaretDown} className='slot-stake-arrow' />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='slot-winbar'>
                                <div>
                                    <h4>{spinning ? 'SPINNING...' : `WIN: $${parseFloat(lastSpin).toFixed(2)}`}</h4>
                                </div>
                            </div>
                            <button
                                className='slot-btn'
                                onClick={() => {
                                    if(autoplay){
                                        setAutoplay(false)
                                        setSpinning(false)
                                    } else {
                                        if(!paytable && !spinning){
                                            if(balance < bet){
                                                setBalanceError(true)
                                                return
                                            }

                                            setWinningPaylines([])
                                            setAutoplay(true)
                                            setSpinning(true)
                                            setBalance(prev => prev - bet)
                                            handleSpin()
                                        }
                                    }
                                }}
                            >
                                {autoplay ? 'STOP' : 'AUTOPLAY'}
                            </button>
                            <button
                                className='slot-spin-btn'
                                onClick={() => {
                                    if(!spinning && !paytable){
                                        if(balance < bet){
                                            setBalanceError(true)
                                            return
                                        }

                                        setWinningPaylines([])
                                        setSpinning(true)
                                        setBalance(prev => prev - bet)
                                        handleSpin()
                                    }
                                }}
                            >
                                <FontAwesomeIcon icon={faArrowRotateRight} className='slot-spin' />
                            </button>
                            <button
                                className='slot-btn'
                                onClick={() => {
                                    if(!paytable && !spinning){
                                        if(balance < betOptions[betOptions.length - 1]){
                                            setBalanceError(true)
                                            return
                                        }

                                        setWinningPaylines([])
                                        setSpinning(true)
                                        setBalance(prev => prev - betOptions[betOptions.length - 1])
                                        handleSpin(true)
                                    }
                                }}
                            >MAX BET</button>
                        </div>
                        <div>
                            <div className='slot-balance'>
                                <div>
                                    <h5>BALANCE</h5>
                                    <h5>${balance}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ) : null}
        </div>
    )
}