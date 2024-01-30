export default ({ payline }) => {
    return (
        <div className='slot-payline-container'>
            <div className='slot-payline-reel'>
                <div style={{opacity: payline.some(element => element[0] === 0 && element[1] === 0) ? 0.8 : 0}}></div>
                <div style={{opacity: payline.some(element => element[0] === 0 && element[1] === 1) ? 0.8 : 0}}></div>
                <div style={{opacity: payline.some(element => element[0] === 0 && element[1] === 2) ? 0.8 : 0}}></div>
            </div>
            <div className='slot-payline-reel'>
                <div style={{opacity: payline.some(element => element[0] === 1 && element[1] === 0) ? 0.8 : 0}}></div>
                <div style={{opacity: payline.some(element => element[0] === 1 && element[1] === 1) ? 0.8 : 0}}></div>
                <div style={{opacity: payline.some(element => element[0] === 1 && element[1] === 2) ? 0.8 : 0}}></div>
            </div>
            <div className='slot-payline-reel'>
                <div style={{opacity: payline.some(element => element[0] === 2 && element[1] === 0) ? 0.8 : 0}}></div>
                <div style={{opacity: payline.some(element => element[0] === 2 && element[1] === 1) ? 0.8 : 0}}></div>
                <div style={{opacity: payline.some(element => element[0] === 2 && element[1] === 2) ? 0.8 : 0}}></div>
            </div>
            <div className='slot-payline-reel'>
                <div style={{opacity: payline.some(element => element[0] === 3 && element[1] === 0) ? 0.8 : 0}}></div>
                <div style={{opacity: payline.some(element => element[0] === 3 && element[1] === 1) ? 0.8 : 0}}></div>
                <div style={{opacity: payline.some(element => element[0] === 3 && element[1] === 2) ? 0.8 : 0}}></div>
            </div>
            <div className='slot-payline-reel'>
                <div style={{opacity: payline.some(element => element[0] === 4 && element[1] === 0) ? 0.8 : 0}}></div>
                <div style={{opacity: payline.some(element => element[0] === 4 && element[1] === 1) ? 0.8 : 0}}></div>
                <div style={{opacity: payline.some(element => element[0] === 4 && element[1] === 2) ? 0.8 : 0}}></div>
            </div>
        </div>
    )
}