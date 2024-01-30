// Reel.js
import React from 'react'
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

export default ({ symbols }) => {
    return (
        <div className='slot-reel'>
            <div
                style={{
                    borderColor: styles[symbols[0]]['sec'],
                    backgroundColor: styles[symbols[0]]['bg']
                }}
            >
                {symbols[0] && styles[symbols[0]]['img'] ?
                <img src={styles[symbols[0]]['img']} alt={`${symbols[0]} image`} /> :
                symbols[0] ?
                <h3 style={{color: styles[symbols[0]]['pri']}}>{symbols[0]}</h3>
                : null}
            </div>
            <div
                style={{
                    borderColor: styles[symbols[1]]['sec'],
                    backgroundColor: styles[symbols[1]]['bg']
                }}
            >
                {symbols[1] && styles[symbols[1]]['img'] ?
                <img src={styles[symbols[1]]['img']} alt={`${symbols[1]} image`} /> :
                symbols[1] ?
                <h3 style={{color: styles[symbols[1]]['pri']}}>{symbols[1]}</h3>
                : null}
            </div>
            <div
                style={{
                    borderColor: styles[symbols[2]]['sec'],
                    backgroundColor: styles[symbols[2]]['bg']
                }}
            >
                {symbols[2] && styles[symbols[2]]['img'] ?
                <img src={styles[symbols[2]]['img']} alt={`${symbols[2]} image`} /> :
                symbols[2] ?
                <h3 style={{color: styles[symbols[2]]['pri']}}>{symbols[2]}</h3>
                : null}
            </div>
        </div>
    )
}