export default ({ handleEnter, handleLeave, active }) => {
    return (
        <div
            style={{backgroundColor: active ? '#ffd500' : '#8d99ae'}}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
        ></div>
    )
}