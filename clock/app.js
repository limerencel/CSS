const targetSecond = document.querySelector('.second-hand')
const targetMinute = document.querySelector('.minute-hand')
const targetHour = document.querySelector('.hour-hand')

function setDate() {
    const now = new Date()
    const second = now.getSeconds()
    const minute = now.getMinutes()
    const hour = now.getHours()
    const secondDegree = second/60 * 360
    const minuteDegree = minute/60 * 360
    const hourDegree = hour/12 * 360
    targetSecond.style.transform = `rotate(${secondDegree}deg)`
    targetMinute.style.transform = `rotate(${minuteDegree}deg)`
    targetHour.style.transform = `rotate(${hourDegree}deg)`
}

setInterval(setDate, 1000)