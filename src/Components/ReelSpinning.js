// Reel.js
import React, { useEffect } from 'react'
import Butters from '../images/butters.png'
import Cartman from '../images/cartman.png'
import Kenny from '../images/kenny.png'
import Kyle from '../images/kyle.png'
import Stan from '../images/stan.png'
import Tolkien from '../images/tolkien.png'
import Wendy from '../images/wendy.png'
import Bonus from '../images/bonus.png'
import Wild from '../images/wild.png'
import A from '../images/a.png'
import J from '../images/j.png'
import K from '../images/k.png'
import Q from '../images/q.png'

const styles = {
    'J': { img: J, pri: '#6818a5', sec: '#e2afff', bg: '#ffb7ff' },
    'Q': { img: Q, pri: '#003049', sec: '#48cae4', bg: '#caf0f8' },
    'K': { img: K, pri: '#40916c', sec: '#fff75e', bg: '#d8f3dc' },
    'A': { img: A, pri: '#d90429', sec: '#ffa200', bg: '#ffc971' },
    'Butters': { img: Butters, pri: '#fdc43f', sec: '#ff6d00', bg: '#fffae5' },
    'Stan': { img: Stan, pri: '#013a63', sec: '#2a6f97', bg: '#a9d6e5' },
    'Kenny': { img: Kenny, pri: '#ff8800', sec: '#452103', bg: '#fff75e' },
    'Kyle': { img: Kyle, pri: '#c9184a', sec: '#297B78', bg: '#fff0f3' },
    'Cartman': { img: Cartman, pri: '#0077b6', sec: '#48cae4', bg: '#caf0f8' },
    'Tolkien': { img: Tolkien, pri: '#3c096c', sec: '#9d4edd', bg: '#dec0f1' },
    'Wendy': { img: Wendy, pri: '#3c096c', sec: '#9d4edd', bg: '#dec0f1' },
    'Bonus': { img: Bonus, pri: '#757bc8', sec: '#03045e', bg: '#e0c3fc' },
    'Wild Card': { img: Wild, pri: '#1a7431', sec: '#4ad66d', bg: '#b7efc5' }
}

export default ({ symbols, reel_num, handleChange }) => {
    
    useEffect(() => {
        // Simulate spinning effect by smoothly scrolling symbols from top to bottom
        const reel = document.getElementById('slot-reel' + reel_num)
        if(reel){
            setTimeout(() => {
                reel.style.transform = 'translateY(0px)'
            }, 50)
        }
        
        setTimeout(() => {
            handleChange()
        }, 3000 + (reel_num * 400))
    }, [])

    return (
        <div
            id={'slot-reel' + reel_num}
            className='slot-reel'
            style={{
                transform: `translateY(${-159 * (symbols.length - 3)}px)`,
                transition: `transform ${3 + (reel_num * 0.4)}s ease-in-out`
            }}
        >
            {symbols.map((symbol, index) => {
                return (
                    <div key={index} style={{borderColor: styles[symbol]['sec']}}>
                        {(symbol && styles[symbol]['img']) &&
                        <img src={styles[symbol]['img']} alt={`${symbol} image`} />}
                    </div>
                )
            })}
        </div>
    )
}